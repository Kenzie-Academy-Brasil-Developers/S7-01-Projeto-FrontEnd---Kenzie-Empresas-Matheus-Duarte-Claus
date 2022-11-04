import { insertTooltip } from "../generalFunctions.js";

function getDataFromPageAdmin() {
    let inputs = document.querySelectorAll(".js-modal__vessel");
    let empty = false;
    inputs.forEach(({value}) => {
        if (value === "") {
            insertTooltip('alert', `Digite todas as informações necessárias antes de continuar`);
            empty = true;
        }
    });
    if (empty) {return};
    let recipient = {};
    inputs.forEach(el => recipient[el.name] = el.value);
    return recipient
}

export {
    getDataFromPageAdmin
}