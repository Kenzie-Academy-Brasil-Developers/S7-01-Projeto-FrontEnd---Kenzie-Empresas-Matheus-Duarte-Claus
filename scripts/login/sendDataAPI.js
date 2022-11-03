import { getUserData, goToControl } from "../generalFunctions.js";
import { baseURL } from "../generalData.js";
import { checkTypeUser } from "./verificationToken.js";

async function sendLoginUserTo() {
    let user = getUserData();
    if (user === undefined) {return};
    try {
        const requestUser = await fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (requestUser.ok) {
            const responseUser = await requestUser.json();
            let token = responseUser.token;
            localStorage.setItem("@token", token);
            await checkTypeUser();
            goToControl();
        }
        //Perguntar pra sofia como deve ser essa mensagem de erro

    } catch {}
}

export {
    sendLoginUserTo
}