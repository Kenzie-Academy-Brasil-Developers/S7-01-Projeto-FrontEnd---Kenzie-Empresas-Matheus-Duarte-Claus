import { baseURL } from "../generalData.js";

async function checkTypeUser() {
    const token = localStorage.getItem("@token");
    try {
        const requestAuth = await fetch(`${baseURL}/auth/validate_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseAuth = await requestAuth.json();
        const status = responseAuth.is_admin;
        localStorage.setItem("@admin", status);
    } catch {}
}

export {
    checkTypeUser
}