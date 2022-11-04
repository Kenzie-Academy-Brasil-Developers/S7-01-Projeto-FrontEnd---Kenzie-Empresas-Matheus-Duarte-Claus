import { insertSelectSector } from "./selectSector.js";
import { baseURL } from "../generalData.js";
import { createDynamicListCompanies } from "./companiesList.js";

async function getDataSectors() {
    try {
        const requestSectors = await fetch(`${baseURL}/sectors`, {
            method: "GET",
            headers: {
                "Content-Type": "applications/json"
            }
        });
        const responseSectors = await requestSectors.json();
        const arraySectors = [...responseSectors];
        insertSelectSector(arraySectors);
    } catch {}
}

async function getDataCompanies(filter) {
    if (filter === "") {return}
    let strainer = "";
    filter === "Todos" ? strainer = "" : strainer = filter;
    try {
        const requestCompanies = await fetch(`${baseURL}/companies/${strainer}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseCompanies = await requestCompanies.json();
        const arrayBusiness = [...responseCompanies];
        createDynamicListCompanies(arrayBusiness);
    } catch {}
}

export {
    getDataSectors,
    getDataCompanies
}