import { createElementWithClassList } from "../generalFunctions.js";

function createUserPageInfo({ username, email, professional_level , kind_of_work }) {
    let section = createElementWithClassList('section','c-user__info');
    let userDescription = createElementWithClassList('div','c-user__description');
    let userData = createElementWithClassList('div','c-user__data');
    let btnEdit = createElementWithClassList('button','c-btn--editIcon u-btn--icon js-btn--edit');
    let btnImg = document.createElement('img');
    let noun = document.createElement('h1');
    let electronicAddress = document.createElement('h3');
    let job = document.createElement('h3');
    let modalityWork = document.createElement('h3');

    noun.innerText = username;
    electronicAddress.innerText = `Email: ${email}`;
    job.innerText = professional_level;
    modalityWork.innerText = kind_of_work;
    btnImg.src = `../../assets/pencil_mainColor.svg`;
    btnEdit.onclick = () => console.log(`Fui clicado`);

    userData.append(electronicAddress, job, modalityWork);
    userDescription.append(noun, userData);
    btnEdit.append(btnImg);
    section.append(userDescription, btnEdit);

    return section

}

function insertHeader(userInfo) {
    let main = document.querySelector('main');
    let userDetails = createUserPageInfo(userInfo);
    main.append(userDetails);
}


function createUserStatusEmpty() {
    let section = createElementWithClassList('section','c-user__status c-user__status--empty');
    let situation = document.createElement('h2');

    situation.innerText = `Você ainda não foi contratado`;
    section.append(situation);

    return section
}


function createUserStatusFull({ name , description , users }) {
    let section = createElementWithClassList('section','c-user__status c-user__status--full');
    let companyAndDepartmentName = document.createElement('h2');
    let coworkersList = createElementWithClassList('ul','c-listWorkers');

    companyAndDepartmentName.innerText = `${name} - ${description}`;
    users.forEach(el => {
        let worker = createWorkerCard(el);
        coworkersList.append(worker);
    });

    section.append(companyAndDepartmentName, coworkersList);

    return section

}


function createWorkerCard({ username, professional_level }) {
    let laborer = createElementWithClassList('li','c-worker');
    let laborerName = createElementWithClassList('h4','c-worker__name');
    let laborerJob = createElementWithClassList('p','c-worker__job');

    laborerName.innerText = username;
    laborerJob.innerText = professional_level[0].toUpperCase() + professional_level.substring(1);

    laborer.append(laborerName, laborerJob);

    return laborer

}


function insertUserStatus(companyInfo) {
    let main = document.querySelector('main');
    let userStatus = createUserStatusFull(companyInfo); /* Preciso fazer a identificação para saber quando vem vazio */
    main.append(userStatus);
}




export { 
    insertHeader,
    insertUserStatus 
}