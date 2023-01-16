import axios from 'axios';

const ADMIN_API_BASE_URL = "http://localhost:5175/api/Admins/";

class AdminService {
    getAll(){
        return axios.get(ADMIN_API_BASE_URL);
    }

    add(admin){
        return axios.post(ADMIN_API_BASE_URL, admin);
    }

    update(admin){
        return axios.put(ADMIN_API_BASE_URL, admin);
    }

    delete(adminId){
        return axios.delete(ADMIN_API_BASE_URL + adminId);
    }

    logIn(logInInfo){
        return axios.post(ADMIN_API_BASE_URL + 'LogIn/', logInInfo);
    }
}

export default new AdminService();