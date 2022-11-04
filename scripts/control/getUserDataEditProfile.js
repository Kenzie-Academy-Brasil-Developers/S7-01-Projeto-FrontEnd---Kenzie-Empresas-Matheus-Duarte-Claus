function getUserUpdatesProfile() {
    let inputs = document.querySelectorAll('.js-user__profile');
    let user = {};
    inputs.forEach(el => user[el.name] = el.value);
    let keys = Object.keys(user);
    let fieldsEmpty = keys.filter(el => {
        if (user[el] === "") {
            return el
        } 
    });
    fieldsEmpty.map(el => {
        delete user[el]
    })
    return user
}

export {
    getUserUpdatesProfile
}