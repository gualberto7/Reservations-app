import { socket } from "../components/socket";
import Events from "~/utils/constans/ReservationEvents";

export default class ReservationEvents {
  public socket: any;

  constructor() {
    this.socket = socket;
  }

  addReservation(form: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        Events.RESERVATION_CREATED,
        JSON.parse(JSON.stringify(form)),
        (response: { data: any; error?: any }) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.data);
          }
        }
      );
    });
  }

  removeReservation(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        Events.RESERVATION_REJECTED,
        id,
        (response: { data: any; error?: any }) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.data);
          }
        }
      );
    });
  }
}
