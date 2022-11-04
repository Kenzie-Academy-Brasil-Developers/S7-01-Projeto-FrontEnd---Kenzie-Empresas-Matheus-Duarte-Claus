import { createElementWithClassList , createOptionWithNameAndValue , stopDefaultBehaviorForm , createInputWithAllYouNeed } from "../generalFunctions.js";
import { updateOwnProfile } from "./sendUserPage.js";
import { deleteUserDataAPI, updateUserOfficeAPI } from "./usersFunctions.js";
import { deleteThisDepartment, editThisDepartment, createDepartment } from "./departmentsFunctions.js";

function createModalManageUsers() {
 //Depois eu faço 🔴🔴🔴🔴🔴🔴🔴🔴
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


function selectModalEditUser(array, orientation, str, value, name) {
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
    closeModal
}