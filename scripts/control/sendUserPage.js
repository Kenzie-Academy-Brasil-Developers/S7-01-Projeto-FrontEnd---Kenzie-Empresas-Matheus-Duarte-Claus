import { baseURL } from "../generalData.js";
import { closeModal } from "./createModals.js";
import { getUserUpdatesProfile } from "./getUserDataEditProfile.js";
import { insertTooltip } from "../generalFunctions.js";

async function updateOwnProfile() {
    const token = localStorage.getItem("@token");
    const userChanges = getUserUpdatesProfile(); 
    if (Object.keys(userChanges).length === 0) {return}
    try {
        const requestUpdate = await fetch(`${baseURL}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userChanges)
        });
        const responseUpdate = await requestUpdate.json();
        if (requestUpdate.ok) {
            closeModal();
            insertTooltip('success', `Edições feitas com sucesso`);
            setTimeout(() => location.reload(), 5000);
        } else {
            let errorCatch = responseUpdate.error;
            if (errorCatch === 'email alread exists') {
                insertTooltip('alert', `Esse e-mail já existe, tente outro`);
            }
        }
            
    } catch {
        console.error("Erro, você não pode atualizar essas informações");
    }
}

export {
    updateOwnProfile
}