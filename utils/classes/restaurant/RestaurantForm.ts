import Form from "../Form";
import RestaurantModel from "./RestaurantModel";
import type { Restaurant } from "~/utils/interfaces/Restaurant";

export default class RestaurantForm extends Form<Restaurant> {
  private router: ReturnType<typeof useRouter>;
  private restaurant: ReturnType<typeof useRestaurantStore>;

  constructor() {
    super(new RestaurantModel());

    this.router = useRouter();
    this.restaurant = useRestaurantStore();

    this.rules = {
      name: "required",
      address: "required",
      phone: "required",
      email: "required|email",
    };

    this.labels = {
      name: "Name",
      address: "Address",
      phone: "Phone",
      email: "Email",
      "openHours.open": "Open At",
      "openHours.close": "Close At",
    };
  }

  public async submit() {
    const { data } = await this.submitForm("/api/restaurants");
    this.restaurant.setRestaurant(data);
    this.router.push("/");
  }
}
