import { goToHome } from "../generalFunctions.js";
import { renderCommonUser } from "./renderCommonUserPage.js";
import { renderAdmin } from "./renderAdminPage.js";

function verifyLogin() {
    let token = localStorage.getItem("@token");
    if (token === null) {
        goToHome();
    } else {
        verifyTypeUser();
    }
}

function verifyTypeUser() {
    let isAdmin = JSON.parse(localStorage.getItem("@admin"));
    if (isAdmin) {
        renderAdmin();
    } else {
        renderCommonUser();
    }
}

export {
    verifyLogin,
    verifyTypeUser
}