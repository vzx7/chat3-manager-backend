export interface User {
  id?: number;
  email: string;
  password: string;
  fio: string;
  photo: string | Blob;
  phone: string;
  bio?: string;
  role: number;
  active?: boolean;
}
