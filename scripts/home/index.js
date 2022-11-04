import { dropDownMenu, goToSignUp, goToLogin } from "../generalFunctions.js";
import { getDataSectors , getDataCompanies } from "./getDataAPI.js";

getDataSectors();
getDataCompanies("Todos");
window.goToLogin = goToLogin;
window.goToSignUp = goToSignUp;
window.dropDownMenu = dropDownMenu;
window.getDataCompanies = getDataCompanies;