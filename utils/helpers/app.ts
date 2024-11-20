import type { Restaurant } from "../interfaces/Restaurant";

export const totalRestaurantTables = (restaurant: Restaurant) => {
  const openAt = restaurant.openHours.open.split(":");
  const closeAt = restaurant.openHours.close.split(":");
  const open = Number(openAt[0]);
  const close = Number(closeAt[0]);
  const openHours = close - open;
  return openHours * restaurant.tables!.length;
};
