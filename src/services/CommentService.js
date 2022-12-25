import axios from 'axios';

const COMMENT_API_BASE_URL = "http://localhost:5175/api/Comments/";

class CommentService {
    getAll(){
        return axios.get(COMMENT_API_BASE_URL);
    }

    add(comment){
        return axios.post(COMMENT_API_BASE_URL + "Add/", comment);
    }

    getById(commentId){
        return axios.get(COMMENT_API_BASE_URL + 'GetById?id=' + commentId);
    }

    getByVideoId(videoId){
        return axios.get(COMMENT_API_BASE_URL + 'GetByVideoId?videoId=' + videoId);
    }

    update(comment){
        return axios.put(COMMENT_API_BASE_URL + 'Update/', comment);
    }

    delete(commentId){
        return axios.delete(COMMENT_API_BASE_URL + 'Delete?id=' + commentId);
    }
}

export default new CommentService();