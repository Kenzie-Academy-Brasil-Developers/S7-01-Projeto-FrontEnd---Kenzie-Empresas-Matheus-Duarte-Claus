import { receiveAllData } from "./receiveDataAdmin.js";

async function renderAdmin() {
    await receiveAllData(`all`);
}

export {
    renderAdmin
}