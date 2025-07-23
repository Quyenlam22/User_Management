export interface User {
  readonly id: number;
  username: string;
  email: string;
  isActive?: boolean;
  role: 'admin' | 'user' | 'guest';
};
