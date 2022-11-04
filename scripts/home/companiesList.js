import { createElementWithClassList } from "../generalFunctions.js";

function createDynamicListCompanies(array) {
    let list = document.querySelector('.js-list__companies');
    list.innerHTML = "";
    array.forEach(business => {
        let card = createCompany(business);
        list.append(card);
    })
}

function createCompany({uuid, name, opening_hours, sectors}) {
    let card = createElementWithClassList('li','c-company');
    let cardName = createElementWithClassList('h3','c-company__name');
    let cardOpenTime = createElementWithClassList('legend','c-description');
    let cardSector = createElementWithClassList('div','c-tag');

    card.dataset.uuid = uuid;
    cardName.innerText = name;
    cardOpenTime.innerText = opening_hours;
    cardSector.innerText = sectors.description;
    
    card.append(cardName, cardOpenTime, cardSector);

    return card

}

export {
    createDynamicListCompanies
}