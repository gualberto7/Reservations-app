import ReservationEvents from "~/services/ReservationEvents";
import type { Email } from "~/utils/interfaces/Email";
import type { Reservation } from "~/utils/interfaces/Reservation";

export const useReservations = (form: Reservation) => {
  const ReservationEvent = new ReservationEvents();
  const { modal, reservations, snackbar, user } = useAppStore();
  const nuxtApp: any = useNuxtApp();
  const snackbarMessage = ref("Reservation created successfully");

  const addReservation = async () => {
    const data = await ReservationEvent.addReservation(form);
    if (data.updated) {
      reservations.updateReservation(data.data);
      if (form.user && isValidEmail(form.user.email)) {
        const email: Email = {
          to: form.user!.email,
          subject: "Your reservation has been updated",
          text: `Hi dear ${
            form.user!.name
          }, your reservation has been updated for ${form.date} at ${
            form.time
          }.`,
        };
        sendEmail(email);
      }
    } else {
      reservations.addReservation(data);
      if (!user.isAdmin)
        snackbarMessage.value = "Reservation request sent successfully";
    }
    modal.hide();
    snackbar.show(snackbarMessage.value, "success");
  };

  const acceptReservation = async () => {
    await ReservationEvent.addReservation(form);
    reservations.markReservationAsConfirmed(form._id!);
    modal.hide();
    snackbar.show("Reservation request accepted", "success");

    if (form.user && isValidEmail(form.user.email)) {
      const email: Email = {
        to: form.user.email,
        subject: "Reservation Confirmed",
        text: `Hi dear ${form.user.name}, your reservation for ${form.date} at ${form.time} has been confirmed. We are waiting for you!`,
      };
      sendEmail(email);
    }
  };

  const removeReservation = async () => {
    await ReservationEvent.removeReservation(form._id!);
    reservations.removeReservation(form._id!);
    modal.hide();
    snackbar.show("Reservation request deleted", "success");

    if (form.user && isValidEmail(form.user.email)) {
      const email: Email = {
        to: form.user.email,
        subject: "Reservation Rejected",
        text: `Hi dear ${form.user.name}, your reservation has been rejected. Please contact the restaurant for more information.`,
      };
      sendEmail(email);
    }
  };

  const sendEmail = async (emailData: Email) => {
    await nuxtApp.$fetch("/api/email/send", {
      method: "POST",
      body: emailData,
    });
  };

  const isValidEmail = (email: string) => {
    return email.includes("@unosquare.com") || email.includes("@gmail.com");
  };

  return {
    addReservation,
    removeReservation,
    acceptReservation,
  };
};
