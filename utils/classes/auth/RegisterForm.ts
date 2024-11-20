import type { User } from "~/utils/interfaces/User";
import RegisterModel from "./RegisterModel";
import Form from "../Form";

export default class RegisterRequest extends Form<User> {
  private router: ReturnType<typeof useRouter>;
  private user: ReturnType<typeof useUserStore>;

  constructor() {
    super(new RegisterModel());

    this.router = useRouter();
    this.user = useUserStore();

    this.rules = {
      name: "required|min:3",
      email: "required|email",
      password: "required|min:6",
      password_confirmation: "required|match:f-password",
    };

    this.labels = {
      name: "Name",
      phone: "Phone",
      email: "Email",
      password: "Password",
      password_confirmation: "Password Confirmation",
    };
  }

  public async submit(): Promise<void> {
    const { data } = await this.submitForm("/api/auth/register");
    this.user.setUser(data.user, data.token);
    this.router.push("/");
  }
}
