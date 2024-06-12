import { hash } from 'bcrypt';
import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { Role } from '@/types/Role';

@Service()
export class UserService {
  /**
 * Регистрация
 * @param userData 
 * @returns 
 */
  public async createUser(userData: User): Promise<User> {
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


  public async findManagers(): Promise<User[]> {
    const { rows, rowCount } = await pg.query(
      `
    SELECT
      "id",
      "email",
      "fio",
      "phone",
      "bio",
      "active"
    FROM
      users
    WHERE
      role = $1
    ORDER BY active ASC
    `,
      [Role.manager],
    );
    if (!rowCount) throw new HttpException(409, "Managers not found");

    return rows;
  }

  public async findUserById(userId: number): Promise<User> {
    const { rows, rowCount } = await pg.query(
      `
    SELECT
      "id",
      "email",
      "fio",
      "phone",
      "bio"
    FROM
      users
    WHERE
      id = $1
    `,
      [userId],
    );
    if (!rowCount) throw new HttpException(409, "User doesn't exist");

    return rows[0];
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    const { rows: findUser } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          "id"
        FROM
          users
        WHERE
          "id" = $1
      )`,
      [userId],
    );

    if (!findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { email, password, fio, phone, bio } = userData;

    let queryParams = [];
    const params = [];
    let iterator = 2;

    if (password) {
      let hashedPassword: string;
      hashedPassword = await hash(password, 10);
      queryParams.push('"password" = $' + iterator++);
      params.push(hashedPassword);
    }

    if (email) {
      params.push(email);
      queryParams.push('"email" = $' + iterator++);
    }

    if (fio) {
      params.push(fio);
      queryParams.push('"fio" = $' + iterator++);
    }

    if (phone) {
      params.push(phone);
      queryParams.push('"phone" = $' + iterator++);
    }

    if (bio) {
      params.push(bio);
      queryParams.push('"bio" = $' + iterator++);
    }

    const query = queryParams.join(',');
    const { rows: updateUserData } = await pg.query(
      `
      UPDATE
        users
      SET
        ${query}
      WHERE
        "id" = $1
      RETURNING "id"
    `,
      [userId, ...params],
    );

    return updateUserData[0];
  }

  public async deleteUser(userId: number): Promise<User> {
    const { rows: findUser } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          "id"
        FROM
          users
        WHERE
          "id" = $1
      )`,
      [userId],
    );
    if (!findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { rows: deleteUserData } = await pg.query(
      `
      DELETE
      FROM
        users
      WHERE
        id = $1
      RETURNING "id"
      `,
      [userId],
    );

    return deleteUserData[0];
  }

  public async setActiveUser(userData: User): Promise<User> {
    const { id, active } = userData;
    const { rows: findUser } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          "id"
        FROM
          users
        WHERE
          "id" = $1
      )`,
      [id],
    );
    if (!findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { rows: updateUserData } = await pg.query(
      `
      UPDATE
        users
      SET
        "active" = $2
      WHERE
        "id" = $1
      RETURNING "id"
    `,
      [id, active],
    );

    return updateUserData[0];
  }
}
