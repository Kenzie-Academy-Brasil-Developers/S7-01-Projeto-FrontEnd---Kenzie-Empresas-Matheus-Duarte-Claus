import { createElementWithClassList , createOptionWithNameAndValue , stopDefaultBehaviorForm , createInputWithAllYouNeed } from "../generalFunctions.js";

function createModalManageUsers() {
 //Depois eu faço
}

function createModalMakeDepartment(arrayCompanies) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let inputDepartmentName = createInputWithAllYouNeed('input', 'text', 'Nome do departamento');
    let inputDescription = createInputWithAllYouNeed('input', 'text', 'Descrição');
    let selectCompany = selectModalMakeDepartment(arrayCompanies);
    let btnCreateDepartment = createElementWithClassList('button','u-btn--mainColor');

    title.innerText = `Criar departamento`;
    btnCreateDepartment.innerText = `Criar o departamento`;
    btnCreateDepartment.onclick = () => console.log('Você clicou em criar um departamento');

    containerInputs.append(title, inputDepartmentName, inputDescription, selectCompany, btnCreateDepartment);
    modal.append(btnCloseModal, containerInputs)
    
    return modal

}

function createModalEditDepartment({uuid, description}) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let textarea = createInputWithAllYouNeed('textarea',"", "Valores anteriores da descrição");
    let btnSave = createElementWithClassList('button','u-btn--mainColor');

    textarea.value = description;
    title.innerText = `Editar departamento`;
    btnSave.innerText = `Salvar alterações`;
    
    btnSave.onclick = () => console.log("uuid ➔ " + uuid);

    containerInputs.append(title, textarea, btnSave);
    modal.append(btnCloseModal, containerInputs);

    return modal
}

function createModalEdit(arrayModalities, arrayProfessionalLevel) {
    let modal = createElementWithClassList('form','c-modal__small');
    let btnCloseModal = createBtnCloseModal();
    let containerInputs = createElementWithClassList('div','c-modal__inputs');
    let title = createElementWithClassList('h2','c-modal__department--name');
    let selectModality = selectModalEditUser(arrayModalities, `Selecionar a modalidade de trabalho`, "kind_of_work", "kind_of_work", "kind_of_work");
    let selectProfessionalLevel = selectModalEditUser(arrayProfessionalLevel, `Selecionar nível profissional`, "professional_level", "professional_level", "professional_level");
    let btnEdit = createElementWithClassList('button','u-btn--mainColor');

    btnEdit.innerText = `Editar`;
    title.innerText = `Editar usuário`;
    btnEdit.onclick = () => console.log("cliquei edit");

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
    btnConfirm.onclick = () => console.log('clicou no confirm del departamento' + uuid);

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
    btnConfirm.innerText = `Confirmar`;
    btnConfirm.onclick = () => console.log('clicou no confirm del usuário' + uuid);

    contInfo.append(title, btnConfirm);
    modal.append(btnCloseModal, contInfo);

    return modal
}


function selectModalEditUser(array, orientation, str, value, name) {
    let select = createElementWithClassList('select','u-select-default');
    let instructions = createElementWithClassList('option','u-displayNone');
    instructions.value = "";
    instructions.innerText = orientation; 
    select.append(instructions);
    array.forEach(el => {
        let option = createOptionWithNameAndValue(el[str], el[value], el[name]);
        select.append(option);
    });
    return select
}




function selectModalMakeDepartment(arrayCompanies) {
    let select = createElementWithClassList('select','u-select-default');
    let instructions = createElementWithClassList('option','u-displayNone');
    instructions.value = "";
    instructions.innerText = `Selecionar empresa`; 
    select.append(instructions);
    arrayCompanies.forEach(({name, uuid}) => {
        let option = createOptionWithNameAndValue(name, uuid, "souApenasUmNamePrecisoMudar");
        select.append(option);
    });
    return select
}

function createBtnCloseModal() {
    let container = createElementWithClassList('div','c-modal__btn');
    let btnCloseModal = createElementWithClassList('button','c-btn__closeModal u-btn--icon');
    let imgCloseModal = document.createElement('img');
    imgCloseModal.src = `../../assets/close.svg`;
    btnCloseModal.onclick = () => console.log('clicou no fechar modal');
    btnCloseModal.append(imgCloseModal);
    container.append(btnCloseModal);
    return container
}

function insertModal(temp, to) {
    let modalContainer = createElementWithClassList('div','c-modalWrapper');
    let modal = createModalDelUser(temp, to); //Criar uma lógica pra cada tipo de modal
    modalContainer.append(modal)
    document.body.append(modalContainer)
    stopDefaultBehaviorForm();
}

export {
    insertModal
}