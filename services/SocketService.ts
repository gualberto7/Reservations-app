import { socket } from "../components/socket";
import ReservationEvent from "~/utils/constans/ReservationEvents";

const onConnect = () => {
  console.log("Connected to socket server");
};

const onDisconnect = () => {
  console.log("Disconnected from socket server");
};

const onReservationCreated = ({ data }: { data: any }) => {
  const { updateReservation, addReservation } = useReservationsStore();
  if (data.updated) {
    updateReservation(data.data);
  } else {
    addReservation(data);
  }
};

const onReservationRejected = ({ data }: { data: any }) => {
  const { removeReservation } = useReservationsStore();
  removeReservation(data._id);
};

const registerSocketEvents = () => {
  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on(ReservationEvent.RESERVATION_CREATED, onReservationCreated);
  socket.on(ReservationEvent.RESERVATION_REJECTED, onReservationRejected);
};

const unregisterSocketEvents = () => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
  socket.off(ReservationEvent.RESERVATION_CREATED, onReservationCreated);
  socket.off(ReservationEvent.RESERVATION_REJECTED, onReservationRejected);
};

export { socket, registerSocketEvents, unregisterSocketEvents };
