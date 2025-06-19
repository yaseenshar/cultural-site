export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: 'ACTIVE' | 'INACTIVE';
  role: 'ADMIN' | 'USER';
  image: string;
  createdAt: string;
}