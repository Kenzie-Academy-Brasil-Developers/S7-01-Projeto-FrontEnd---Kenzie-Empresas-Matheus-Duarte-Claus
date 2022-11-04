import { getUserData, goToLogin, insertTooltip} from "../generalFunctions.js";
import { baseURL } from "../generalData.js";

async function sendSignUpUserTo() {
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
        console.log(requestUser)
        const responseUser = await requestUser.json();
        if (requestUser.ok) {
            insertTooltip('success', `Usuário criado com sucesso`);
            setTimeout(() => {
                goToLogin();
            }, 1100)
        } else {
            let errorDetected = responseUser.error[0];
            if (errorDetected === 'email alread exists!') {
                insertTooltip('alert', `Esse e-mail já existe. Tente outro`);
            } else if (errorDetected === 'insert a valid email!') {
                insertTooltip('alert', `Insira um e-mail válido`);
            }
        }
    } catch {
        insertTooltip('alert', `Ocorreu um erro com seu e-mail`);
    } finally {
    }
}

export {
    sendSignUpUserTo
}
