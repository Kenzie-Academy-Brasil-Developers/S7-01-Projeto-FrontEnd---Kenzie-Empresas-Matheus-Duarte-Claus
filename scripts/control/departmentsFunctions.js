import { baseURL } from "../generalData.js";
import { insertDepartments } from "./createAdminPage.js";
import { insertTooltip } from "../generalFunctions.js";
import { closeModal, updateJoblessList } from "./createModals.js";
import { receiveAllData, receiveUnplacedUsersList } from "./receiveDataAdmin.js";
import { getDataFromPageAdmin } from "./getDataFromPage.js";

async function selectThisSector(uuid) {
    const token = localStorage.getItem("@token");
    let identifier = "";
    if (uuid === "") {return};
    uuid === "Todos" ? identifier = "" : identifier = uuid;
    try {
        const requestDepartmentList = await fetch(`${baseURL}/departments/${identifier}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseDepartmentList = await requestDepartmentList.json();
        const departmentsCompany = [...responseDepartmentList];
        insertDepartments(departmentsCompany);
    } catch {} finally {}
}

async function deleteThisDepartment(identifier) {
    const token = localStorage.getItem("@token");
    try {
        const requestDeleteDepartment = await fetch(`${baseURL}/departments/${identifier}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseDeleteDepartment = await requestDeleteDepartment.json();
    } catch {} finally {
        closeModal();
        insertTooltip('success', `Departamento deletado com sucesso`);
        setTimeout(() => receiveAllData('attribute'), 500);
    }
}

async function editThisDepartment(identifier) {
    const token = localStorage.getItem("@token");
    let infoToRefresh = getDataFromPageAdmin();
    if (infoToRefresh === undefined) {return};
    try {
        const requestUpdateDepartment = await fetch(`${baseURL}/departments/${identifier}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(infoToRefresh)
        });
        const responseUpdateDepartment = await requestUpdateDepartment.json();
    } catch {} finally {
        closeModal();
        insertTooltip('success', `Departamento atualizado com sucesso`);
        setTimeout(() => receiveAllData('attribute'), 500);
    }
}

async function createDepartment() {
    const token = localStorage.getItem("@token");
    let infoToInsert = getDataFromPageAdmin();
    if (infoToInsert === undefined) {return};
    try {
        const requestMakeDepartment = await fetch(`${baseURL}/departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(infoToInsert)
        })
        const responseMakeDepartment = await requestMakeDepartment.json();
    } catch {} finally {
        closeModal();
        insertTooltip('success', `Departamento criado com sucesso`);
        setTimeout(() => receiveAllData('attribute'), 500);
    }
}

async function hireUser(name) {
    const token = localStorage.getItem("@token");
    let infoToInsert = getDataFromPageAdmin();
    if (infoToInsert === undefined) {return};
    try {
        const requestHireUser = await fetch(`${baseURL}/departments/hire`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(infoToInsert)
        })
        const responseHireUser = await requestHireUser.json();
    } catch {} finally {
        insertTooltip('success', `O usuário foi adicionado ao departamento ${name}`);
        let unemployedList = await receiveUnplacedUsersList();
        updateJoblessList(unemployedList);
        let idCompany = document.querySelector('.js-uuid__department').value;
        receiveAllData('only', idCompany);
    }
}


export {
    selectThisSector,
    deleteThisDepartment,
    editThisDepartment,
    createDepartment,
    hireUser
}