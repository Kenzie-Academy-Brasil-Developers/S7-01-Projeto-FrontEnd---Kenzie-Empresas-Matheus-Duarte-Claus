import { getUserData, goToLogin} from "../generalFunctions.js";
import { baseURL } from "../generalData.js";

async function sendSingUpUserTo() {
    let user = getUserData();
    if (user === undefined) {return};
    try {
        const requestUser = await fetch(`${baseURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (requestUser.ok) {
            const responseUser = await requestUser.json();
            goToLogin();
        }
    } catch {}
}

export {
    sendSingUpUserTo
}