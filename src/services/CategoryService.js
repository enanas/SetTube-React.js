import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://localhost:5175/api/Categories/";

class CategoryService {
    getAll(){
        return axios.get(CATEGORY_API_BASE_URL);
    }

    add(category, userId){
        return axios.post(CATEGORY_API_BASE_URL + "?userId=" + userId, category);
    }

    getById(categoryId){
        return axios.get(CATEGORY_API_BASE_URL + categoryId);
    }

    update(category){
        return axios.put(CATEGORY_API_BASE_URL, category);
    }

    delete(categoryId){
        return axios.delete(CATEGORY_API_BASE_URL + categoryId);
    }
}

export default new CategoryService();