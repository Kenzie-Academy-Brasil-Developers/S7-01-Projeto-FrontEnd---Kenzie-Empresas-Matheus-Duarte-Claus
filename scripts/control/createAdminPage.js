import { createElementWithClassList , createOptionWithNameAndValue } from "../generalFunctions.js";
import { insertModal } from "./createModals.js";
import { selectThisSector } from "./departmentsFunctions.js";
import { arrayModalities, arrayProfessionalLevels } from "../generalData.js";
import { receiveAllData, receiveSectors } from "./receiveDataAdmin.js"; 

function createDepartment({ name , description, companies, uuid }) {
    let card = createElementWithClassList('li','c-department u-el');
    let cardName = createElementWithClassList('h4','c-department__name u-name');
    let cardDescription = createElementWithClassList('legend','c-department__description u-description');
    let cardCompany = createElementWithClassList('legend','c-department__company u-company');
    let contBtns = createElementWithClassList('div','c-department__options u-list__btns');
    let btnEye = createElementWithClassList('button','u-btn--icon');
    let btnEdit = createElementWithClassList('button','u-btn--icon');
    let btnDelete = createElementWithClassList('button','u-btn--icon');
    let imgEye = document.createElement('img');
    let imgEdit = document.createElement('img');
    let imgDelete = document.createElement('img');

    cardName.innerText = name;
    cardDescription.innerText = description;
    cardCompany.innerText = companies.name;
    imgEye.src = `../../assets/eye.svg`;
    imgEdit.src = `../../assets/pencil_black.svg`;
    imgDelete.src = `../../assets/trash.svg`;

    btnEye.onclick = () => receiveAllData('just', uuid);
    btnEdit.onclick = () => insertModal(`editDepartment`, uuid, description);
    btnDelete.onclick = () => insertModal(`deleteDepartment`, uuid, name);

    btnEye.append(imgEye);
    btnEdit.append(imgEdit);
    btnDelete.append(imgDelete);
    contBtns.append(btnEye, btnEdit, btnDelete);
    card.append(cardName, cardDescription, cardCompany, contBtns);

    return card

}

function createList(type, array) {
    let list = createElementWithClassList('ul', `${type} u-list`);
    array.forEach(el => {
        if (type === `c-departments__list`) {
            let card = createDepartment(el);
            list.append(card); 
        } 
        if (type === `c-users__list`) {
            let card = createUser(el);
            list.append(card); 
        }
    });
    
    return list
}

function createUser({ username , professional_level , company_name , id_company, department_uuid, uuid}) {
    let card = createElementWithClassList('li','c-user u-el');
    let cardName = createElementWithClassList('h4','c-user__name u-name');
    let cardJob = createElementWithClassList('legend','c-user__description u-description');
    let cardCompany = createElementWithClassList('legend','c-user__company u-company');
    let contBtns = createElementWithClassList('div','c-department__options u-list__btns');
    let btnEdit = createElementWithClassList('button','u-btn--icon');
    let btnDelete = createElementWithClassList('button','u-btn--icon');
    let imgEdit = document.createElement('img');
    let imgDelete = document.createElement('img');

    
    
    card.dataset.id_user = uuid;

    if (company_name !== undefined) {
        cardCompany.innerText = company_name;
        card.dataset.id_company = id_company;
    } else {
        cardCompany.innerText = "⠀";
    }

    if (department_uuid !== undefined) {
        card.dataset.id_department = department_uuid;
    }

    cardName.innerText = username;
    if (professional_level !== null) {
        cardJob.innerText = professional_level[0].toUpperCase() + professional_level.substring(1);
    } else {
        cardJob.innerText = "⠀";
    }
    imgEdit.src = `../../assets/pencil_mainColor.svg`;
    imgDelete.src = `../../assets/trash.svg`;

    btnEdit.onclick = () => insertModal(`editOtherUser`, arrayModalities, arrayProfessionalLevels, uuid);
    btnDelete.onclick = () => insertModal(`deleteUser`, uuid, username);

    btnEdit.append(imgEdit);
    btnDelete.append(imgDelete);
    contBtns.append(btnEdit, btnDelete);
    card.append(cardName, cardJob, cardCompany, contBtns);

    return card

}

function createHeaderDepartments(arrayCompanies) {
    let headContainer = createElementWithClassList('div','c-departments__head');
    let title = createElementWithClassList('h2','c-department__title');
    let selectCompany = createCompanySelect(arrayCompanies);
    let btnAdd = createElementWithClassList('button','c-btn-add u-btn--mainColor');
    let btnStr = createElementWithClassList('span','c-btn__name');
    let imgAdd = document.createElement('img');
    let btnRegistry = createElementWithClassList('button','u-btn--mainColor');

    title.innerText = `Departamentos`;
    btnStr.innerText = `Criar`;
    btnRegistry.innerText = `Cadastrar empresa`;
    imgAdd.src = `../../assets/plus.svg`;

    btnAdd.onclick = () => insertModal(`makeDepartment`, arrayCompanies);
    btnRegistry.onclick = () => receiveSectors(); 


    btnAdd.append(imgAdd, btnStr);
    headContainer.append(title, selectCompany, btnRegistry, btnAdd);

    return headContainer
}

function createCompanySelect(arrayCompanies) {
    let selectCompany = createElementWithClassList('select','c-select__company');
    let instructions = createElementWithClassList('option','u-displayNone');
    let AllDepartmentsOption = document.createElement('option');
    AllDepartmentsOption.value = "Todos";
    AllDepartmentsOption.innerText = `Todos os departamentos`;
    instructions.value = "";
    instructions.innerText = `Selecionar empresa`;
    selectCompany.append(instructions, AllDepartmentsOption);
    arrayCompanies.forEach(({name, uuid}) => {
        let option = createOptionWithNameAndValue(name, uuid);
        selectCompany.append(option);
    });
    selectCompany.onclick = () => selectThisSector(selectCompany.value);
    return selectCompany
}

function createHeadUsers() {
    let container = createElementWithClassList('div','c-users__head');
    let title = createElementWithClassList('h2','c-department__title u-textCenter');
    title.innerText = `Usuários cadastrados`;
    container.append(title);
    return container
}

function insertDepartments(arrayDepartments) {
    let ancientList = document.querySelector(".c-departments__list");
    ancientList.remove();
    let container = document.querySelector(".c-departments");
    let currentList = createList(`c-departments__list`, arrayDepartments);
    container.append(currentList);
}

function insertUsers(arrayUsers) {
    let ancientList = document.querySelector(".c-users__list");
    ancientList.remove();
    let container = document.querySelector(".c-users");
    let currentList = createList(`c-users__list`, arrayUsers);
    container.append(currentList); 
}

function insertDataOnPageAdmin(arrayCompanies, arrayDepartments, arrayUsers) {
    let main = document.querySelector('main');
    main.innerHTML = "";
    let headDepartments = createHeaderDepartments(arrayCompanies);
    let listDepartments = createList(`c-departments__list`, arrayDepartments);
    let listUsers = createList(`c-users__list`, arrayUsers);
    let sectionDepartments = createElementWithClassList('section','c-departments');
    let sectionUsers = createElementWithClassList('section','c-users');
    let headUsers = createHeadUsers();
    sectionDepartments.append(headDepartments, listDepartments);
    sectionUsers.append(headUsers, listUsers);
    main.append(sectionDepartments, sectionUsers);
}

export {
    insertDataOnPageAdmin,
    createHeaderDepartments,
    insertDepartments,
    insertUsers
}

