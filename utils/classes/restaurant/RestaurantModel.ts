import type { User } from "~/utils/interfaces/User";
import RegisterForm from "../auth/RegisterModel";

export default class RestaurantModel {
  name: string;
  address: string;
  phone: string;
  email: string;
  owner: User;
  menu: [];
  tables: [];
  openHours: {
    open: string;
    close: string;
  };

  constructor() {
    this.name = "";
    this.address = "";
    this.phone = "";
    this.email = "";
    this.owner = new RegisterForm();
    this.menu = [];
    this.tables = [];
    this.openHours = {
      open: "",
      close: "",
    };
  }
}
