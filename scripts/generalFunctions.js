function dropDownMenu() {
    let btnList = document.querySelector(".c-btnsHead");
    btnList.classList.toggle(`u-showMenu`);
    document.getElementsByClassName("c-imgBtnHead")[0].classList.toggle('u-displayNone');
    document.getElementsByClassName("c-imgBtnHead")[1].classList.toggle('u-displayNone');
}


export {
    dropDownMenu
}