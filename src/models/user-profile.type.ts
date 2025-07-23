import type { User } from "./user.interface";

export type UserProfile = User & {
  birthDate: Date;
  address?: string;
}
