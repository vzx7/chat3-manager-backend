import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

const TOKENS_TIME = {
  TOKEN: '15m',
  REFRESH_TOKEN: '14d'
}

const createTokens = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  return { 
    token: {
      key: sign(dataStoredInToken, TOKEN_SECRET_KEY, { expiresIn: TOKENS_TIME.TOKEN }),
      expiresIn: TOKENS_TIME.TOKEN
    },
    refreshToken: {
      key: sign(dataStoredInToken, REFRESH_TOKEN_SECRET_KEY, { expiresIn: TOKENS_TIME.REFRESH_TOKEN }),
      expiresIn: TOKENS_TIME.REFRESH_TOKEN 
    }
  };
};

const saveToken = () => {
  // save to DB
}

const createCookie = (tokenData: TokenData): string[] => {
  return [
    `Authorization=${tokenData.token.key}; HttpOnly; Max-Age=${tokenData.token.expiresIn}`,
    `RefreshToken=${tokenData.refreshToken.key}; HttpOnly; Max-Age=${tokenData.refreshToken.expiresIn}`
  ];
};

@Service()
export class AuthService {
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
      VALUES ($1, $2)
      RETURNING "email", "photo", "fio"
      `,
      [email, hashedPassword, fio, phone, bio, role, active],
    );

    return signUpUserData[0];
  }

  public async login(userData: User): Promise<{ cookie: string[]; findUser: User, token: string }> {
    const { email, password } = userData;

    const { rows, rowCount } = await pg.query(
      `
      SELECT
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

    const tokenData = createTokens(rows[0]);
    const cookie = createCookie(tokenData);
    return { cookie, findUser: rows[0], token: tokenData.token.key };
  }

  public async logout(userData: User): Promise<User> {
    const { email, password } = userData;
    createCookie
    const { rows, rowCount } = await pg.query(
      `
    SELECT
        "email",
        "password"
      FROM
        users
      WHERE
        "email" = $1
      AND
        "password" = $2
    `,
      [email, password],
    );
    if (!rowCount) throw new HttpException(409, "User doesn't exist");

    return rows[0];
  }
}
