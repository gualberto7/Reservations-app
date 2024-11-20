import LoginPage from "./LogInPage";
import RegisterPage from "./RegisterPage";
import NavbarPage from "./NavbarPage";
import CreateRestaurantPage from "./CreateRestaurantPage";
import HomePage from "./HomePage";
import ReservationModal from "./ReservationModal";

class AppTest {
  constructor() {
    this.loginPage = new LoginPage();
    this.registerPage = new RegisterPage();
    this.navbarPage = new NavbarPage();
    this.createRestaurantPage = new CreateRestaurantPage();
    this.homePage = new HomePage();
    this.reservationModal = new ReservationModal();
  }
}

export default new AppTest();
