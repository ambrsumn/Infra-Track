import axios from "axios";
import { config } from "process";

const ApiMiddleware = axios.create({
    baseURL: "http://localhost:8080/infratrack/api/",
});


ApiMiddleware.interceptors.request.use((config) => {

    console.log(config.url);
    let token = localStorage.getItem("token");
    if (token && !config.url?.includes('auth')) {

        let user = JSON.parse(localStorage.getItem("userDetails") || "{}");
        //console.log(user.roleName);
        // axios.get

        axios.get(`http://localhost:8080/infratrack/api/${user.roleName}/test`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.data.message === 'Token has expired') {
                let newToken: string = response.data.token;
                //console.log("setting new token");
                localStorage.setItem("token", newToken);
            }
            // //console.log(response.data.token);
        }).catch((error) => {
            //console.log(error.response.data);
        });

        let newToken = localStorage.getItem("token");

        //console.log(token);
        //console.log(newToken);

        console.log("adding token to header");
        config.headers.Authorization = `Bearer ${newToken}`;
    }
    return config;

})

export default ApiMiddleware;