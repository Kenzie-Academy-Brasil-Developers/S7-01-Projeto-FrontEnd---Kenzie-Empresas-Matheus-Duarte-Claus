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


export {
    goToSignUp,
    goToLogin,
    goToHome,
    dropDownMenu,
    stopDefaultBehaviorForm,
    createElementWithClassList,
    createOptionWithNameAndValue,
    createInputWithAllYouNeed
}