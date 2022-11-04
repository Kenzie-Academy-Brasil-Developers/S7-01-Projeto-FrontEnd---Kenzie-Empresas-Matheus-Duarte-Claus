import { createElementWithClassList , createOptionWithNameAndValue , stopDefaultBehaviorForm , createInputWithAllYouNeed } from "../generalFunctions.js";
import { updateOwnProfile } from "./sendUserPage.js";
import { deleteUserDataAPI, updateUserOfficeAPI } from "./usersFunctions.js";
import { deleteThisDepartment, editThisDepartment, createDepartment, hireUser } from "./departmentsFunctions.js";
import { dismissUser } from "./usersFunctions.js";
import { sendCompany } from "./companyFunctions.js";

function createModalManageUsers({ name , description, companies, uuid }, arrayUsersNotHired, arrayUsersWorkingInThisDepartment) {
    let modal = createElementWithClassList('form','c-modal__managementUsers');
    let btnCloseModal = createBtnCloseModal();
    let departmentName = createElementWithClassList('h2','c-modal__department--name');
    let containerDepartmentAndUsersInfo = createElementWithClassList('div','c-modal__department--options');
    let containerDepartmentInfo = createElementWithClassList('div','c-modal__department--info');
    let descriptionDepartment = createElementWithClassList('h3','c-modal__department--description');
    let companyName = createElementWithClassList('h4','c-modal__company--owner');
    let containerSelection = createElementWithClassList('div','c-modal__selectUser');
    let select = selectUserFromModalViewDepartment(arrayUsersNotHired, `Selecionar usuário`, "user_uuid");
    let btnHire = createElementWithClassList('button','c-modal__btnHire u-btn--success');
    let listOfEmployeesInThisDepartment = createUsersHiredList(arrayUsersWorkingInThisDepartment); //Aqui preciso criar a função para passar dinamicamente a lista de funcionários deste departamento
    let inputDepartmentHide = createInputWithAllYouNeed('input', 'text', '', "department_uuid", "", "js-modal__vessel u-displayNone");

    inputDepartmentHide.value = uuid;
    companyName.innerText = companies.name;
    descriptionDepartment.innerText = description;
    departmentName.innerText = name;
    btnHire.innerText = `Contratar`;

    btnHire.onclick = () => hireUser(name);

    containerDepartmentInfo.append(descriptionDepartment, companyName);
    containerSelection.append(select, btnHire, inputDepartmentHide);
    containerDepartmentAndUsersInfo.append(containerDepartmentInfo, containerSelection);
    modal.append(btnCloseModal, departmentName, containerDepartmentAndUsersInfo, listOfEmployeesInThisDepartment);

    return modal

}

function createModalMakeDepartment(arrayCompanies) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let inputDepartmentName = createInputWithAllYouNeed('input', 'text', 'Nome do departamento', "name", "", "js-modal__vessel");
    let inputDescription = createInputWithAllYouNeed('input', 'text', 'Descrição', "description", "", "js-modal__vessel");
    let selectCompany = selectModalMakeDepartment(arrayCompanies);
    let btnCreateDepartment = createElementWithClassList('button','u-btn--mainColor');

    title.innerText = `Criar departamento`;
    btnCreateDepartment.innerText = `Criar o departamento`;
    btnCreateDepartment.onclick = () => createDepartment();

    containerInputs.append(title, inputDepartmentName, inputDescription, selectCompany, btnCreateDepartment);
    modal.append(btnCloseModal, containerInputs)
    
    return modal

}

function createModalEditDepartment(uuid, description) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let textarea = createInputWithAllYouNeed('textarea',"", "Valores anteriores da descrição", "description", "", "js-modal__vessel");
    let btnSave = createElementWithClassList('button','u-btn--mainColor');

    textarea.value = description;
    title.innerText = `Editar departamento`;
    btnSave.innerText = `Salvar alterações`;
    
    btnSave.onclick = () => editThisDepartment(uuid);

    containerInputs.append(title, textarea, btnSave);
    modal.append(btnCloseModal, containerInputs);

    return modal
}



function createModalEditSomeUser(arrayModalities, arrayProfessionalLevel, uuid) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let selectModality = selectModalEditUser(arrayModalities, `Selecionar a modalidade de trabalho`, "kind_of_work", "kind_of_work", "kind_of_work");
    let selectProfessionalLevel = selectModalEditUser(arrayProfessionalLevel, `Selecionar nível profissional`, "professional_level", "professional_level", "professional_level");
    let btnEdit = createElementWithClassList('button','u-btn--mainColor');
    btnEdit.innerText = `Editar`;
    title.innerText = `Editar usuário`;
    btnEdit.onclick = () => updateUserOfficeAPI(uuid);

    containerInputs.append(title, selectModality, selectProfessionalLevel, btnEdit);
    modal.append(btnCloseModal, containerInputs);

    return modal 

}


function createModalRegistryCompany(sectors, uuid) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let selectSector = selectModalSectors(sectors, `Selecionar um setor`, "sector_uuid", "sector_uuid", "sector_uuid");
    let btnSave = createElementWithClassList('button','u-btn--mainColor');
    let inputName = createInputWithAllYouNeed('input', 'text', 'Digite o nome da sua empresa', "name", "", "js-modal__vessel");
    let inputTime = createInputWithAllYouNeed('input', 'text', 'Coloque o horário de abertura da sua empresa', "opening_hours", "", "js-modal__vessel");
    let inputDescription = createInputWithAllYouNeed('input', 'text', 'Escreva uma descrição da sua empresa', "description", "", "js-modal__vessel");

    btnSave.innerText = `Registrar`;
    title.innerText = `Cadastrar empresa`;
    btnSave.onclick = () => sendCompany();

    containerInputs.append(title, inputName, inputTime, inputDescription, selectSector, btnSave);
    modal.append(btnCloseModal, containerInputs);

    return modal 

}

function createModalDelDepartment(uuid, departmentName) {
    let modal = createElementWithClassList('form','c-modal__long');
    let btnCloseModal = createBtnCloseModal();
    let contInfo = createElementWithClassList('div','c-modal__delete--info');
    let title = createElementWithClassList('h2','c-modal__alert u-textCenter');
    let btnConfirm = createElementWithClassList('button','c-btn-confirm u-btn--success');

    title.innerText = `Realmente deseja deletar o Departamento ${departmentName} e demitir seus funcionários?`;
    btnConfirm.innerText = `Confirmar`;
    btnConfirm.onclick = () => deleteThisDepartment(uuid);

    contInfo.append(title, btnConfirm);
    modal.append(btnCloseModal, contInfo);

    return modal
}


function createModalDelUser(uuid, username) {
    let modal = createElementWithClassList('form','c-modal__long');
    let btnCloseModal = createBtnCloseModal();
    let contInfo = createElementWithClassList('div','c-modal__delete--info');
    let title = createElementWithClassList('h2','c-modal__alert u-textCenter');
    let btnConfirm = createElementWithClassList('button','c-btn-confirm u-btn--success');

    title.innerText = `Realmente deseja remover o usuário ${username}?`;
    btnConfirm.innerText = `Deletar`;
    btnConfirm.onclick = () => deleteUserDataAPI(uuid);

    contInfo.append(title, btnConfirm);
    modal.append(btnCloseModal, contInfo);

    return modal
}


function createModalEditProfile(name, email) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let inputUsername = createInputWithAllYouNeed("input", "text", "Seu nome", "username","", "js-user__profile");
    let inputEmail = createInputWithAllYouNeed("input", "text", "Seu e-mail", "email","", "js-user__profile");
    let inputPasswd = createInputWithAllYouNeed("input", "password", "Sua senha", "password","", "js-user__profile");
    let btnEdit = createElementWithClassList('button','u-btn--mainColor');
    title.innerText = `Editar Perfil`;
    btnEdit.innerText = `Editar perfil`;
    inputUsername.value = name;
    inputEmail.value = email;
    btnEdit.onclick = () => updateOwnProfile();

    containerInputs.append(title, inputUsername, inputEmail, inputPasswd, btnEdit);
    modal.append(btnCloseModal, containerInputs);

    return modal
}

function createUsersHiredList(array) {
    let list = createElementWithClassList('ul','c-users__list--hired js-users__list--hired');
    array.forEach(employee => {
        let card = createCardUsersHiredList(employee);
        list.append(card);
    });
    return list
}

function createCardUsersHiredList({department_uuid, username, company_name, professional_level, uuid}) {
    let card = createElementWithClassList('li','c-modal__user u-el');
    let cardUsername = createElementWithClassList('h4','c-modal--user__name u-name');
    let cardDescription = createElementWithClassList('legend','c-modal--user__description u-description');
    let cardCompany = createElementWithClassList('legend','c-modal--user__company u-company');
    let containerBtns = createElementWithClassList('div','u-list__btns');
    let btnDelete = createElementWithClassList('button','u-btn--whiteAlertColor');

    cardUsername.innerText = username;
    cardDescription.innerText = professional_level;
    if (professional_level !== null) {
        cardDescription.innerText = professional_level[0].toUpperCase() + professional_level.substring(1);
    }
    cardCompany.innerText = company_name;
    btnDelete.innerText = `Desligar`;

    btnDelete.onclick = () => dismissUser(uuid, department_uuid);

    containerBtns.append(btnDelete);
    card.append(cardUsername, cardDescription, cardCompany, containerBtns);

    return card
}

function selectUserFromModalViewDepartment(array, orientation, name) {
    let select = createElementWithClassList('select','u-select-default c-selectUnemployedUsers js-modal__vessel');
    let instructions = createElementWithClassList('option','u-displayNone');
    instructions.value = "";
    if (array.length > 0) {
        instructions.innerText = orientation; 
    } else {
        instructions.innerText = `Não há usuários disponíveis`; 
    }
    select.name = name;
    select.append(instructions);
    array.forEach(({username, uuid}) => {
        let option = createOptionWithNameAndValue(username, uuid);
        select.append(option);
    });
    return select
}


function selectModalEditUser(array, orientation, name) {
    let select = createElementWithClassList('select','u-select-default js-modal__vessel');
    let instructions = createElementWithClassList('option','u-displayNone');
    instructions.value = "";
    instructions.innerText = orientation; 
    select.name = name;
    select.append(instructions);
    array.forEach(el => {
        let txt = el;
        if (el === "hibrido") {
            txt = "Híbrido"
        }
        txt = txt[0].toUpperCase() + txt.substring(1);
        let option = createOptionWithNameAndValue(txt, el);
        select.append(option);
    });
    return select
}


function selectModalSectors(array, orientation, name) {
    let select = createElementWithClassList('select','u-select-default js-modal__vessel');
    let instructions = createElementWithClassList('option','u-displayNone');
    instructions.value = "";
    instructions.innerText = orientation; 
    select.name = name;
    select.append(instructions);
    array.forEach(({description, uuid}) => {
        let option = createOptionWithNameAndValue(description, uuid);
        select.append(option);
    });
    return select
}


function selectModalMakeDepartment(arrayCompanies) {
    let select = createElementWithClassList('select','u-select-default js-modal__vessel');
    let instructions = createElementWithClassList('option','u-displayNone');
    instructions.value = "";
    select.name = 'company_uuid';
    instructions.innerText = `Selecionar empresa`; 
    select.append(instructions);
    arrayCompanies.forEach(({name, uuid}) => {
        let option = createOptionWithNameAndValue(name, uuid);
        select.append(option);
    });
    return select
}

function createBtnCloseModal() {
    let container = createElementWithClassList('div','c-modal__btn');
    let btnCloseModal = createElementWithClassList('button','c-btn__closeModal u-btn--icon');
    let imgCloseModal = document.createElement('img');
    imgCloseModal.src = `../../assets/close.svg`;
    btnCloseModal.onclick = () => closeModal();
    btnCloseModal.append(imgCloseModal);
    container.append(btnCloseModal);
    return container
}

function closeModal() {
    let modalWrapper = document.querySelector(".c-modalWrapper");
    let kids = Array.from(modalWrapper.children);
    kids[0].classList.add('u-fadeout');
    setTimeout(() => {
        modalWrapper.classList.add('u-fadeout');
    },50)
    setTimeout(() => {
        modalWrapper.remove();
        document.body.classList.remove('u-stopScroll');
    }, 600)

}

function updateUsersAlreadyHiredList(array) {
    let container = document.querySelector(".c-modal__managementUsers");
    let ancientList = document.querySelector(".js-users__list--hired");
    ancientList.remove();
    let currentList = createUsersHiredList(array);
    container.append(currentList);
    stopDefaultBehaviorForm();
}

function updateJoblessList(array) {
    let container = document.querySelector(".c-modal__selectUser");
    let ancientList = document.querySelector(".c-selectUnemployedUsers");
    ancientList.remove();
    let currentList = selectUserFromModalViewDepartment(array, `Selecionar usuário`, "user_uuid");
    container.insertAdjacentElement("afterbegin", currentList);
}

function insertModal(type, arg1, arg2, arg3) {
    let modalContainer = createElementWithClassList('div','c-modalWrapper');
    let modal = []
    switch(type) {
        case `editOtherUser`: 
            modal = createModalEditSomeUser(arg1, arg2, arg3);
            break
        
        case `editOwnProfile`:
            modal = createModalEditProfile(arg1, arg2);
            break

        case `editDepartment`:
            modal = createModalEditDepartment(arg1, arg2); 
            break
        
        case `deleteUser`:
            modal = createModalDelUser(arg1, arg2);
            break

        case `deleteDepartment`:
            modal = createModalDelDepartment(arg1, arg2);
            break

        case `makeDepartment`:
            modal = createModalMakeDepartment(arg1);
            break

        case `viewDepartment`:
            modal = createModalManageUsers(arg1, arg2, arg3);
            break

        case `registryCompany`:
            modal = createModalRegistryCompany(arg1);
            break
            
        default: 
            console.error("Nenhuma opção válida foi selecionada");
            break
        
    }
        
    modalContainer.append(modal)
    document.body.append(modalContainer)
    stopDefaultBehaviorForm();
    document.body.classList.add('u-stopScroll');
}

export {
    insertModal,
    closeModal,
    updateJoblessList,
    updateUsersAlreadyHiredList
}