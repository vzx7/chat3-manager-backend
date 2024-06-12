import { Request } from 'express';
import { User } from '@interfaces/users.interface';

type TokenSet = {
  key: string,
  expiresIn: string
}

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
    token: TokenSet,
    refreshToken: TokenSet
}

export interface RequestWithUser extends Request {
  user: User;
}
