import axios from "axios";
export class LoginService {

    static async signUp(signUp) {
        try {
            await axios.post('http://localhost:4567/api/login/signUp', signUp).then(response => {
                if (response.data.isUserCreated === 'true') {
                    alert(`Your account was created. 
                    Please sign in.`);
                    window.location.replace("http://localhost:4567/login");
                    console.log(response.data);
                }
                else {
                    alert('User name is already used.');
                }
            })
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }

    static async login(login) {
        try {
            await axios.post('http://localhost:4567/api/login/submit', login).then(response => {
                localStorage.setItem("isLoggedIn", JSON.stringify(response.data.isLoggedIn));
                localStorage.setItem("isSupervisor", JSON.stringify(response.data.isSupervisor));

                if (response.data.isLoggedIn) {
                    window.location.replace("http://localhost:4567/assessment/new");

                }
                else {
                    alert('Username and Password do not match.');
                }
            })
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }

    static async logout() {
        try {
            localStorage.removeItem("isSupervisor");
            localStorage.removeItem("isLoggedIn");

            window.location.replace("http://localhost:4567/api/logout");
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }

    static getCurrentUser() {
        const user = {};
        user.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        user.isSupervisor = JSON.parse(localStorage.getItem('isSupervisor'));
        return user;
    }
}