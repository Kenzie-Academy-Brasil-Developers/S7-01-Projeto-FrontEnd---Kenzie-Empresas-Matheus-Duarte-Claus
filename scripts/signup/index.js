import { dropDownMenu, stopDefaultBehaviorForm, goToLogin, goToHome } from "../generalFunctions.js";

stopDefaultBehaviorForm();
window.dropDownMenu = dropDownMenu;
window.goToLogin = goToLogin;
window.goToHome = goToHome;