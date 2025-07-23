import UserAccount from "./user-account.class";

export default class AdminUser extends UserAccount {
  private permissions: string[];
  
  constructor(
    username: string,
    email: string,
    password: string,
    isActive?: boolean
  ){
    super(username, email, 'admin', password, isActive);
    this.permissions = [];
  }

  override validatePassword(): boolean {
    return this.getPassword().length >= 12;
  }
}