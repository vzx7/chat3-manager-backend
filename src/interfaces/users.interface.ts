export interface User {
  id?: number;
  email: string;
  password: string;
  fio: string;
  phone: string;
  bio?: string;
  role: number;
  active?: boolean;
}
