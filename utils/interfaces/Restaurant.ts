import type { User } from "./User";

export interface Restaurant {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  owner: User;
  menu?: string[];
  tables?: Table[];
  openHours: {
    open: string;
    close: string;
  };
}

export interface Table {
  number: number;
  seats?: number;
  available: boolean;
}
