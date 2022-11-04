import { createElementWithClassList , createOptionWithNameAndValue } from "../generalFunctions.js";
// import { getDataCompanies } from "./getDataAPI.js";

function createSelectSector(array, orientation, str, value, name) {
    let select = createElementWithClassList('select','c-list__head');
    let instructions = createElementWithClassList('option','u-displayNone');
    let optionAll = document.createElement('option');
    optionAll.innerText = `Todos`;
    optionAll.value = "Todos";
    instructions.innerText = orientation; 
    instructions.value = "";
    select.append(instructions, optionAll);
    select.onclick = () => getDataCompanies(select.value);
    array.forEach(el => {
        let option = createOptionWithNameAndValue(el[str], el[str], el[name]);
        select.append(option);
    });
    return select
}

function insertSelectSector(arraySectors) {
    let section = document.querySelector('.js-list');
    let select = createSelectSector(arraySectors, `Selecionar Setor`, 'description', 'uuid', 'description');
    section.insertAdjacentElement("afterbegin", select);
}

export {
    insertSelectSector,
}