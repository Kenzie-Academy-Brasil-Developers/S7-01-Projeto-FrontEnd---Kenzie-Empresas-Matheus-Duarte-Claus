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

export {
    dropDownMenu,
    stopDefaultBehaviorForm
}