import {
  createOrUpdateReservation,
  removeReservation,
} from "../controllers/reservation";
import ReservationEvent from "~/utils/constans/ReservationEvents";
import { Server as Engine } from "engine.io";
import io from "../utils/io";

const engine = new Engine();

io.bind(engine);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on(ReservationEvent.RESERVATION_CREATED, async (data, callback) => {
    const response = await createOrUpdateReservation(data);
    callback(response);
    socket.broadcast.emit(ReservationEvent.RESERVATION_CREATED, response);
  });

  socket.on(ReservationEvent.RESERVATION_REJECTED, async (id, callback) => {
    const response = await removeReservation(id);
    callback(response);
    socket.broadcast.emit(ReservationEvent.RESERVATION_REJECTED, response);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

export default engine;
