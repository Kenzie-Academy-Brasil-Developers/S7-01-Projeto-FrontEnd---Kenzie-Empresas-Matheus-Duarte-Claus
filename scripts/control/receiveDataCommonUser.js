import { baseURL } from "../generalData.js";
import { insertHeader, verifyUserWorkStatus, insertUserStatus } from "./createUserPages.js";

async function receiveUserData() {
    const token = localStorage.getItem("@token");
    try {
        const requestUserInfo = await fetch(`${baseURL}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseUserInfo = await requestUserInfo.json();
        const userToRender = {...responseUserInfo};
        insertHeader(userToRender);
        verifyUserWorkStatus(userToRender);
    } catch {}
}

async function receiveDataDepartment(identifier) {
    const token = localStorage.getItem("@token");
    try {
        const requestListWorkers = await fetch(`${baseURL}/users/departments/coworkers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseListWorkers = await requestListWorkers.json();
        const allWorkers = responseListWorkers[0];
        const uuidCompany = responseListWorkers[0].company_uuid;
        const companyName = await getCompanyName(uuidCompany);
        insertUserStatus(allWorkers, `full`, companyName);
    } catch {}
}

async function getCompanyName(identifier) {
    const requestListCompanies = await fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseListCompanies = await requestListCompanies.json();
    const listCompanies = [...responseListCompanies];
    const businessObj = listCompanies.find(({uuid}) => identifier === uuid);
    const companyName = businessObj.name;
    return companyName
}

export {
    receiveUserData,
    receiveDataDepartment
}