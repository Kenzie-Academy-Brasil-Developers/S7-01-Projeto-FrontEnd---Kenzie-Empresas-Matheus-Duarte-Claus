import { baseURL } from "../generalData.js";
import { insertDataOnPageAdmin, insertUsers, insertDepartments } from "./createAdminPage.js";
import { insertModal, updateUsersAlreadyHiredList } from "./createModals.js";

async function receiveAllData(typeRender, identifier) {
    let listAdminToRender = [];
    const token = localStorage.getItem("@token");

    try {
        const requestAllCompanies = await fetch(`${baseURL}/companies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseAllCompanies = await requestAllCompanies.json();
        const arrayAllCompanies = [...responseAllCompanies];
        listAdminToRender.push(arrayAllCompanies);
        
    } catch {}
    try {
        const requestAllDepartments = await fetch(`${baseURL}/departments`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const responseAllDepartments = await requestAllDepartments.json();
        const arrayAllDepartments = [...responseAllDepartments];
        listAdminToRender.push(arrayAllDepartments);
    } catch {}
    try {
        const requestAllUsers = await fetch(`${baseURL}/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const responseAllUsers = await requestAllUsers.json();
        const arrayAllUsers = [...responseAllUsers];
        listAdminToRender.push(arrayAllUsers);
    } catch {} finally {
        let arrayProv = fuseUserWithCompany(listAdminToRender[0],listAdminToRender[1],listAdminToRender[2]);
        let arrayUsersWithId = arrayProv.filter(({is_admin}) => is_admin === false);
        if (typeRender === `all`) {
            insertDataOnPageAdmin(listAdminToRender[0],listAdminToRender[1], arrayUsersWithId);
        } else 
        if (typeRender === 'restrict') {
            insertUsers(arrayUsersWithId);
        } else 
        if (typeRender === 'attribute') {
            insertDepartments(listAdminToRender[1]);
        } else
        if (typeRender === 'just') {
            let usersFiltered = arrayUsersWithId.filter(({department_uuid}) => department_uuid === identifier);
            let unemployedList = await receiveUnplacedUsersList();
            let departmentFiltered = listAdminToRender[1].find(({uuid}) => uuid === identifier);
            insertModal(`viewDepartment`, departmentFiltered, unemployedList, usersFiltered);
        } else
        if (typeRender === 'only') {
            let usersFiltered = arrayUsersWithId.filter(({department_uuid}) => department_uuid === identifier);
            updateUsersAlreadyHiredList(usersFiltered);
        } 
        
    }
}



function fuseUserWithCompany(listCompanies, listDepartments, listUsers) {
    let departmentsWithIdCompany = listDepartments.map(el => {
        let idCompany = el.companies.uuid;
        el.idBusiness = idCompany;
        return el 
    });
    let usersHired = listUsers.filter(el => el.department_uuid !== null); 
    let notHiredListUsers = listUsers.filter(el => el.department_uuid === null);
    let usersWithIdCompany = usersHired.map(el => {
        departmentsWithIdCompany.forEach(({uuid, idBusiness}) => {
            if (el.department_uuid === uuid) {
                el.id_company = idBusiness;
                return 
            }
        });
        return el
    })
    let usersWithIdAndNameCompany = usersWithIdCompany.map((el) => {
        let cleanCompany = listCompanies.find(({uuid}) => el.id_company === uuid);
        el.company_name = cleanCompany.name;
        return el
    })
   
    let arrComplete = usersWithIdAndNameCompany.concat(notHiredListUsers);

    return arrComplete
}


async function receiveUnplacedUsersList() {
    let usersJoblessList = [];
    const token = localStorage.getItem("@token");
    try {
        const requestOutOfWorkUsers = await fetch(`${baseURL}/admin/out_of_work`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseOutOfWorkUsers = await requestOutOfWorkUsers.json();
        usersJoblessList = [...responseOutOfWorkUsers];
    } catch {}

    return usersJoblessList
}

async function receiveSectors() {
    let sectors = [];
    try {
        const requestSectors = await fetch(`${baseURL}/sectors`, {
            method: "GET",
            headers: {
                "Content-Type": "applications/json"
            }
        });
        const responseSectors = await requestSectors.json();
        const arraySectors = [...responseSectors];
        sectors = arraySectors;
    } catch {} finally {
        insertModal(`registryCompany`, sectors);
        return sectors
    }
}



export {
    receiveAllData,
    receiveUnplacedUsersList,
    receiveSectors
}
