import { baseURL } from "../generalData.js";
import { getDataFromPageAdmin } from "./getDataFromPage.js";
import { insertTooltip } from "../generalFunctions.js";
import { closeModal } from "./createModals.js";
import { receiveAllData } from "./receiveDataAdmin.js";

async function sendCompany() {
    const token = localStorage.getItem("@token");
    let infoToInsert = getDataFromPageAdmin();
    if (infoToInsert === undefined) {return};
    try {
        const requestSendCompany = await fetch(`${baseURL}/companies/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(infoToInsert)
        });
        const responseSendCompany = await requestSendCompany.json();
    } catch {} finally {
        closeModal();
        insertTooltip('success', `Empresa cadastrada com sucesso`);
        setTimeout(() => receiveAllData('all'), 500);
    }
}

export {
    sendCompany
}