function dropDownMenu() {
    let btnList = document.querySelector(".c-btnsHead");
    btnList.classList.toggle(`u-showMenu`);  
    document.getElementsByClassName("c-imgBtnHead")[0].classList.toggle('u-displayNone');
    document.getElementsByClassName("c-imgBtnHead")[1].classList.toggle('u-displayNone');
}

function stopDefaultBehaviorForm() {
    let form = document.querySelector('form');
    let formList = Array.from(form.elements);
    let btnList = formList.filter(el =>  el.tagName === 'BUTTON');
    btnList.forEach(btn => btn.addEventListener("click", (event) => event.preventDefault()));
}

function createElementWithClassList(tagName, classes) {
    let element = document.createElement(tagName);
    element.classList = classes;
    return element;
}

function createOptionWithNameAndValue(str, value, name) {
    let option = document.createElement('option');
    option.innerText = str;
    option.value = value;
    option.name = name;
    return option
}

function createInputWithAllYouNeed(definition, type, placeholder = "", name = "", id = "", classList = "") {
    let element = document.createElement(definition);
    if (definition === 'input') { element.type = type };
    element.placeholder = placeholder;
    element.name = name;
    element.id = id;
    element.classList = classList;
    return element
}   

function goToHome() {
    window.location.href = `/pages/home`;
}

function goToLogin() {
    window.location.href = `/pages/login`;
}

function goToSignUp() {
    window.location.href = `/pages/signup`;
}

function goToControl() {
    window.location.href = `/pages/control`;
}

function getUserData() {
    let inputs = document.querySelectorAll('.js-user__data');
    let empty = false;
    let vessel = Array.from(inputs).filter(el => el.tagName === 'INPUT');
    let receptacles = Array.from(inputs).filter(el => el.tagName === 'SELECT');
    vessel.forEach(el => {if (el.value === "") {empty = true}});
    if (empty) {return};
    let user = {};
    inputs.forEach(el => user[el.name] = el.value);
    receptacles.forEach(el => {
        if (el !== undefined && el.value === "") {
            if (el.name === "professional_level") {
                delete user.professional_level;
            } else
            if (el.name === "kind_of_work") {
                delete user.kind_of_work;
            }
        }
    });
    return user
}

export {
    goToControl,
    goToSignUp,
    goToLogin,
    goToHome,
    dropDownMenu,
    stopDefaultBehaviorForm,
    createElementWithClassList,
    createOptionWithNameAndValue,
    createInputWithAllYouNeed,
    getUserData
}