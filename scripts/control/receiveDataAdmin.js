import { baseURL } from "../generalData.js";
import { insertDataOnPageAdmin, insertUsers, insertDepartments } from "./createAdminPage.js";

async function receiveAllData(typeRender) {
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
        let arrayUsersWithId = fuseUserWithCompany(listAdminToRender[0],listAdminToRender[1],listAdminToRender[2])
        if (typeRender === `all`) {
            insertDataOnPageAdmin(listAdminToRender[0],listAdminToRender[1], arrayUsersWithId);
        } else 
        if (typeRender === 'restrict') {
            insertUsers(arrayUsersWithId);
        } else 
        if (typeRender === 'attribute') {
            insertDepartments(listAdminToRender[1]);
        }
        
    }

}



function fuseUserWithCompany(listCompanies, listDepartments, listUsers) {
    let departmentsWithIdCompany = listDepartments.map(el => {
        let idCompany = el.companies.uuid;
        el.idBusiness = idCompany;
        return el 
    });
    let usersHired = [];
    let notHiredListUsers = [];
    listUsers.forEach((el) => {
        if (el.department_uuid !== null) {
            usersHired.push(el);
        } else {
            notHiredListUsers.push(el);
        }
    });
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



export {
    receiveAllData
}