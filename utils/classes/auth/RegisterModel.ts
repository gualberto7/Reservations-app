export default class RegisterForm {
  _id?: string;
  name: string;
  phone?: string;
  email: string;
  password: string;
  roles: string[];
  password_confirmation: string;

  constructor() {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.password = "";
    this.roles = ["user"];
    this.password_confirmation = "";
  }
}
