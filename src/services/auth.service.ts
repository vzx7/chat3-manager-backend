import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

const TOKENS_TIME = {
  TOKEN: 15 * 60000,            //  15m
  REFRESH_TOKEN: 15 * 86400000  // '15d'
}

const createTokens = async (user: User): Promise<TokenData> => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  
  const refreshToken = sign(dataStoredInToken, REFRESH_TOKEN_SECRET_KEY, { expiresIn: TOKENS_TIME.REFRESH_TOKEN });
  const refreshTokenSaved = await saveRefreshToken(user.id, refreshToken);

  if (!refreshTokenSaved) throw new HttpException(409, "RefreshToken could not be saved!");
  
  return { 
    token: {
      key: sign(dataStoredInToken, TOKEN_SECRET_KEY, { expiresIn: TOKENS_TIME.TOKEN }),
      expiresIn: TOKENS_TIME.TOKEN
    },
    refreshToken: {
      key: refreshTokenSaved,
      expiresIn: TOKENS_TIME.REFRESH_TOKEN 
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

@Service()
export class AuthService {
  /**
   * Регистрация
   * @param userData 
   * @returns 
   */
  public async signup(userData: User): Promise<User> {
    const { email, password, bio, fio, phone } = userData;

    const { rows: findUser } = await pg.query(
      `
    SELECT EXISTS(
      SELECT
        "email"
      FROM
        users
      WHERE
        "email" = $1
    )`,
      [email],
    );

    if (findUser[0].exists) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(password, 10);
    const role = 2; // manager
    const active = true;
    const { rows: signUpUserData } = await pg.query(
      `
      INSERT INTO
        users(
          "email",
          "password",
          "fio",
          "phone",
          "bio",
          "role",
          "active"
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id", "fio"
      `,
      [email, hashedPassword, fio, phone, bio, role, active],
    );

    return signUpUserData[0];
  }

  /**
   * Авторизация
   * @param userData 
   * @returns 
   */
  public async login(userData: User): Promise<{ findUser: User, tokenData: TokenData }> {
    const { email, password } = userData;

    const { rows, rowCount } = await pg.query(
      `
      SELECT
        "id",
        "email",
        "password"
      FROM
        users
      WHERE
        "email" = $1
    `,
      [email],
    );

    if (!rowCount) throw new HttpException(409, `This email ${email} was not found`);

    const isPasswordMatching: boolean = await compare(password, rows[0].password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    const tokenData = await createTokens(rows[0]);
    console.log(111, tokenData)
    return { findUser: rows[0], tokenData };
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
