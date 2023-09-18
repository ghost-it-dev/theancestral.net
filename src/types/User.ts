export interface UserType {
  username: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'guest';
  _id: string;
  postAmount: number;
}
