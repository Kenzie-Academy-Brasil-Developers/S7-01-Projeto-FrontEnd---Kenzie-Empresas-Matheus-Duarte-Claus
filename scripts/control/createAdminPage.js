import { createElementWithClassList } from "../generalFunctions.js";

function createDepartment({ name , description, companies }) {
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

    btnEye.onclick = () => console.log('sou btn view');
    btnEdit.onclick = () => console.log('sou btn edit');
    btnDelete.onclick = () => console.log('sou btn delete');

    btnEye.append(imgEye);
    btnEdit.append(imgEdit);
    btnDelete.append(imgDelete);
    contBtns.append(btnEye, btnEdit, btnDelete);
    card.append(cardName, cardDescription, cardCompany, contBtns);

    return card

}

function createList(type, array, nameCompany) {
    let list = createElementWithClassList('ul', `${type} u-list`);
    array.forEach(el => {
        if (type === `c-departments__list`) {
            let card = createDepartment(el);
            list.append(card); 
        } 
        if (type === `c-users__list`) {
            let card = createUser(el, nameCompany);
            list.append(card); 
        }
    });

    return list
}

function createUser({ username , professional_level }, nameCompany) {
    let card = createElementWithClassList('li','c-user u-el');
    let cardName = createElementWithClassList('h4','c-user__name u-name');
    let cardJob = createElementWithClassList('legend','c-user__description u-description');
    let cardCompany = createElementWithClassList('legend','c-user__company u-company');
    let contBtns = createElementWithClassList('div','c-department__options u-list__btns');
    let btnEdit = createElementWithClassList('button','u-btn--icon');
    let btnDelete = createElementWithClassList('button','u-btn--icon');
    let imgEdit = document.createElement('img');
    let imgDelete = document.createElement('img');

    cardName.innerText = username;
    cardJob.innerText = professional_level[0].toUpperCase() + professional_level.substring(1);
    cardCompany.innerText = nameCompany;
    imgEdit.src = `../../assets/pencil_mainColor.svg`;
    imgDelete.src = `../../assets/trash.svg`;

    btnEdit.onclick = () => console.log('sou btn edit');
    btnDelete.onclick = () => console.log('sou btn delete');

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

    title.innerText = `Departamentos`;
    btnStr.innerText = `Criar`;
    imgAdd.src = `../../assets/plus.svg`;

    btnAdd.onclick = () => console.log('Clicou no add');

    btnAdd.append(imgAdd, btnStr);
    headContainer.append(title, selectCompany, btnAdd);

    return headContainer
}

function createCompanySelect(arrayCompanies) {
    let selectCompany = createElementWithClassList('select','c-select__company');
    let instructions = createElementWithClassList('option','u-displayNone');

    instructions.innerText = `Selecionar empresa`;
    selectCompany.append(instructions);
    arrayCompanies.forEach(({name, uuid}) => {
        let option = createOptionWithNameAndValue(name, uuid, "souApenasUmNamePrecisoMudar");
        selectCompany.append(option);
    });

    return selectCompany
}

function createOptionWithNameAndValue(str, value, name) {
    let option = document.createElement('option');
    option.innerText = str;
    option.value = value;
    option.name = name;
    return option
}

function createHeadUsers() {
    let container = createElementWithClassList('div','c-users__head');
    let title = createElementWithClassList('h2','c-department__title u-textCenter');
    title.innerText = `Usuários cadastrados`;
    container.append(title);
    return container
}

function insertDataOnPageAdmin(arrayCompanies, arrayDepartments, arrayUsers, nameCompany) {
    let main = document.querySelector('main');
    let headDepartments = createHeaderDepartments(arrayCompanies);
    let listDepartments = createList(`c-departments__list`, arrayDepartments);
    let listUsers = createList(`c-users__list`, arrayUsers, nameCompany);
    let sectionDepartments = createElementWithClassList('section','c-departments');
    let sectionUsers = createElementWithClassList('section','c-users');
    let headUsers = createHeadUsers();
    sectionDepartments.append(headDepartments, listDepartments);
    sectionUsers.append(headUsers, listUsers);
    main.append(sectionDepartments, sectionUsers);
}

export {
    insertDataOnPageAdmin
}