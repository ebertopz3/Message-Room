
export interface IUser {
  id?: number | string;
  email: string;
  password: string;
  name?: string;
  token?: string;
  photo?: string;
}
