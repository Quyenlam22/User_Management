import type { User } from "../models/user.interface";

export default class UserAccount implements User {
  readonly id: number;
  username: string;
  email: string;
  isActive?: boolean;
  role: "admin" | "user" | "guest";
  private password: string;

  constructor(
    username: string,
    email: string,
    role: "admin" | "user" | "guest",
    password: string,
    isActive?: boolean
  ) {
    this.id = Date.now();
    this.username = username;
    this.email = email;
    this.role = role;
    this.password = password;
    if (isActive !== undefined) this.isActive = isActive;
  }

  validatePassword(): boolean {
    return this.password.length >= 8;
  }

  getPassword(): string {
    return this.password;
  }
}
