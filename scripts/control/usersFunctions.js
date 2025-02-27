import { baseURL } from "../generalData.js";
import { closeModal } from "./createModals.js";
import { insertTooltip } from "../generalFunctions.js";
import { receiveAllData } from "./receiveDataAdmin.js";
import { getDataFromPageAdmin } from "./getDataFromPage.js";
import { updateJoblessList } from "./createModals.js";
import { receiveUnplacedUsersList } from "./receiveDataAdmin.js";

async function deleteUserDataAPI(identifier) {
    const token = localStorage.getItem("@token");
    try {
        const requestDeleteUser = await fetch(`${baseURL}/admin/delete_user/${identifier}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseDeleteUser = await requestDeleteUser.json();      
    } catch {} finally {
        closeModal();
        insertTooltip('success', `Usuário deletado com sucesso`);
        setTimeout(() => receiveAllData('restrict'), 500);
    }
}

async function updateUserOfficeAPI(identifier) {
    const token = localStorage.getItem("@token");
    let infoToInsert = getDataFromPageAdmin();
    if (infoToInsert === undefined) {return};
    try {
        const requestUpdateUser = await fetch(`${baseURL}/admin/update_user/${identifier}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(infoToInsert)
        })
        const responseUpdateUser = await requestUpdateUser.json();
    } catch {} finally {
        closeModal();
        insertTooltip('success', `Usuário atualizado com sucesso`);
        setTimeout(() => receiveAllData('restrict'), 500);
    }
}

async function dismissUser(identifierUser, idDepartment) {
    const token = localStorage.getItem("@token");
    try {
        const requestDemit = await fetch(`${baseURL}/departments/dismiss/${identifierUser}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseDemit = await requestDemit.json();
    } catch {} finally {
        insertTooltip('success', `Usuário demitido com sucesso`);
        receiveAllData('only', idDepartment);
        let unemployedList = await receiveUnplacedUsersList();
        updateJoblessList(unemployedList);
    }
}

export {
    deleteUserDataAPI,
    updateUserOfficeAPI,
    dismissUser
}