function logout() {
    localStorage.clear();
    window.location.href = `/pages/home`;
}

export {
    logout
}