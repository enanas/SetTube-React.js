import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://localhost:5175/api/Categories/";

class CategoryService {
    getAll(){
        return axios.get(CATEGORY_API_BASE_URL);
    }

    add(category){
        return axios.post(CATEGORY_API_BASE_URL + "Add/", category);
    }

    getById(categoryId){
        return axios.get(CATEGORY_API_BASE_URL + 'GetById?id=' + categoryId);
    }

    update(category){
        return axios.put(CATEGORY_API_BASE_URL + 'Update/', category);
    }

    delete(categoryId){
        return axios.delete(CATEGORY_API_BASE_URL + 'Delete?id=' + categoryId);
    }
}

export default new CategoryService();