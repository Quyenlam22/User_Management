import type { UserProfile } from "../models/user-profile.type";
import type { User } from "../models/user.interface";

export function formatUserInfo(user: User | UserProfile): string {
  if ("birthDate" in user && user.birthDate) {
    return `User ${user.username} born on ${user.birthDate.toDateString()}`;
  }

  return `User ${user.username} (${user.role})`;
}
