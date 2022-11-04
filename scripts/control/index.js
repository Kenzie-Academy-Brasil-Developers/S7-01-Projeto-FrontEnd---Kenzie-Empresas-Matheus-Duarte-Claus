import { logout } from "./gotOutFunction.js";
import { verifyLogin } from "./validationLogin.js";
import { updateOwnProfile } from "./sendUserPage.js";



verifyLogin();
window.logout = logout;
window.updateOwnProfile = updateOwnProfile
