import { dropDownMenu, stopDefaultBehaviorForm, goToLogin, goToHome } from "../generalFunctions.js";
import { sendSignUpUserTo } from "./sendDataAPI.js";

stopDefaultBehaviorForm();
window.dropDownMenu = dropDownMenu;
window.goToLogin = goToLogin;
window.goToHome = goToHome;
window.sendSignUpUserTo = sendSignUpUserTo;