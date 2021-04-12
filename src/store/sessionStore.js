
const setUser = (user) => {
    if(user.name){
        sessionStorage.setItem("usertoken", user.token);
        sessionStorage.setItem("userid", user.id);
        sessionStorage.setItem("username", user.name);
        sessionStorage.setItem("useremail", user.email);
    }
}

const loadUser = () => {
    if(sessionStorage.getItem("username"))
        return {
            token: sessionStorage.getItem("usertoken"),
            id: sessionStorage.getItem("userid"),
            name: sessionStorage.getItem("username"),
            email: sessionStorage.getItem("useremail")
        }
}
const clearUser = () =>{
    sessionStorage.clear();
}
const storage = {
    setUser: setUser,
    loadUser: loadUser,
    clearUser : clearUser
}

export default storage;
