
const setUser = (user) => {
    if(user.name){
        sessionStorage.setItem("usertoken", user.token);
        sessionStorage.setItem("userid", user.id);
        sessionStorage.setItem("username", user.name);
        sessionStorage.setItem("useremail", user.email);
        sessionStorage.setItem("userfirstname", user.firstname);
        sessionStorage.setItem("userlastname", user.lastname);
        sessionStorage.setItem("userphone", user.phone);
        sessionStorage.setItem("userdescription", user.description);
        sessionStorage.setItem("usersex", user.sex);
        sessionStorage.setItem("userbirthday", user.birthday)
    }
}

const loadUser = () => {
    if(sessionStorage.getItem("username"))
        return {
            token: sessionStorage.getItem("usertoken"),
            id: sessionStorage.getItem("userid"),
            name: sessionStorage.getItem("username"),
            email: sessionStorage.getItem("useremail"),
            firstname: sessionStorage.getItem("userfirstname"),
            lastname: sessionStorage.getItem("userlastname"),
            phone: sessionStorage.getItem("userphone"),
            description: sessionStorage.getItem("userdescription"),
            sex: sessionStorage.getItem("usersex"),
            birthday: sessionStorage.getItem("userbirthday")
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
