import { dropDownMenu, stopDefaultBehaviorForm, goToSignUp, goToHome } from "../generalFunctions.js";
import { sendLoginUserTo } from "./sendDataAPI.js";

stopDefaultBehaviorForm();
window.dropDownMenu = dropDownMenu;
window.goToSignUp = goToSignUp;
window.goToHome = goToHome;
window.sendLoginUserTo = sendLoginUserTo;