import type { User } from "../models/user.interface";

export function createUser(userData: Partial<User>): User {
  const data = {
    id: Date.now(),
    username: userData.username ?? "default_username",
    email: userData.email ?? "default@gmail.com",
    isActive: userData.isActive ?? true,
    role: userData.role ?? "user",
  } as User;

  return data;
}
