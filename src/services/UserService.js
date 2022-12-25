import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:5175/api/Users/";

class UserService {
    getAll(){
        return axios.get(USER_API_BASE_URL);
    }

    add(user){
        return axios.post(USER_API_BASE_URL + "Add/", user);
    }

    getById(userId){
        return axios.get(USER_API_BASE_URL + 'GetById?id=' + userId);
    }

    logIn(logInInfo){
        return axios.post(USER_API_BASE_URL + 'LogIn/', logInInfo);
    }

    update(user){
        return axios.put(USER_API_BASE_URL + 'Update/', user);
    }

    delete(userId){
        return axios.delete(USER_API_BASE_URL + 'Delete?id=' + userId);
    }
}

export default new UserService();