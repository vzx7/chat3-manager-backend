import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, NODE_ENV, REFRESH_TOKEN_TIME, TOKEN_TIME } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { verify } from 'jsonwebtoken';

const createTokens = async (user: User): Promise<TokenData> => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };

  const refreshToken = sign(dataStoredInToken, REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_TOKEN_TIME });
  const refreshTokenSaved = await saveRefreshToken(user.id, refreshToken);

  if (!refreshTokenSaved) throw new HttpException(409, "RefreshToken could not be saved!");

  return {
    token: {
      key: sign(dataStoredInToken, TOKEN_SECRET_KEY, { expiresIn: TOKEN_TIME }),
      expiresIn: TOKEN_TIME
    },
    refreshToken: {
      key: refreshTokenSaved,
      expiresIn: REFRESH_TOKEN_TIME
    }
  };
};

const saveRefreshToken = async (userId: number, refreshToken: string) => {
  const { rows: findToken } = await pg.query(
    `
  SELECT EXISTS(
    SELECT
      "token"
    FROM
      tokens
    WHERE
      "userId" = $1
  )`,
    [userId],
  );

  let newToken;

  if (findToken[0].exists) {
    const { rows } = await pg.query(
      `
      UPDATE
        tokens
      SET
        "token" = $2
      WHERE
        "userId" = $1
      RETURNING "token"
    `,
      [userId, refreshToken]
    );
    newToken = rows;
  } else {
    const { rows } = await pg.query(
      `
      INSERT INTO
        tokens(
          "token",
          "userId"
        )
      VALUES ($1, $2)
      RETURNING "token"
      `,
      [refreshToken, userId]
    );
    newToken = rows;
  }

  return newToken[0]?.token;
}

const findUser = async (where: string, param: string | number): Promise<User> => {
  const { rows, rowCount } = await pg.query(
    `
    SELECT
      "id",
      "fio",
      "role",
      "active",
      "password"
    FROM
      users
    WHERE
      ${where}`,
    [param],
  );

  if (!rowCount) throw new HttpException(409, `User not found`);

  return rows[0];
}

const getUserData = async (user: User): Promise<{ findUser: User, tokenData: TokenData }> => {
  const tokenData = await createTokens(user);
  //FIXME убрать после отладки
  if (NODE_ENV === 'development') {
    console.log('JWT: ' + tokenData.token.key);
    console.log('REFRESH: ' + tokenData.refreshToken.key);
  }

  return { findUser: user, tokenData };
}

const resetToken = (user: User) => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };

  return {
    token: {
      key: sign(dataStoredInToken, TOKEN_SECRET_KEY, { expiresIn: TOKEN_TIME })
    }
  };
}

@Service()
export class AuthService {
  /**
   * Выполнить авторизацию
   * @param userData 
   * @returns 
   */
  public async login(userData: User): Promise<{ findUser: User, tokenData: TokenData }> {
    const { email, password } = userData;

    const user = await findUser('"email" = $1', email);

    const isPasswordMatching: boolean = await compare(password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    return await getUserData(user);
  }

  /**
   * Перевыпуск jwt token
   * @param userData 
   * @returns 
   */
  public async updateToken(refreshToken: string): Promise<{ token: { key: string } }> {
    try {
      verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    } catch (error) {
      console.log(refreshToken, 789);
      pg.query(
        `
        DELETE
        FROM
          tokens
        WHERE
          "token" = $1
        RETURNING "id"
        `,
        [refreshToken]
      );
      throw new HttpException(401, "RefreshToken not valid...");
    }

    const { rows: findToken, rowCount } = await pg.query(
      `
      SELECT
        "userId"
      FROM
        tokens
      WHERE
        "token" = $1
    `,
      [refreshToken],
    );

    if (!rowCount) throw new HttpException(401, "RefreshToken not faund");

    const user = await findUser('"id" = $1', findToken[0].userId);
    return resetToken(user);
  }

  /**
   * Ралогин, удаляем рефрештокен
   * @param userData 
   * @returns 
   */
  public async logout(userData: User): Promise<{ id: number }> {
    const { id } = userData;

    const { rows: deleteToken } = await pg.query(
      `
      DELETE
      FROM
        tokens
      WHERE
        "userId" = $1
      RETURNING "id"
      `,
      [id]
    );

    return deleteToken[0];
  }
}
