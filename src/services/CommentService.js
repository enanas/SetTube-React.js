import axios from 'axios';

const COMMENT_API_BASE_URL = "http://localhost:5175/api/Comments/";

class CommentService {
    getAll(){
        return axios.get(COMMENT_API_BASE_URL);
    }

    add(comment){
        return axios.post(COMMENT_API_BASE_URL, comment);
    }

    getById(commentId){
        return axios.get(COMMENT_API_BASE_URL + commentId);
    }

    getByVideoId(videoId){
        return axios.get(COMMENT_API_BASE_URL + 'GetByVideoId/' + videoId);
    }

    update(comment){
        return axios.put(COMMENT_API_BASE_URL, comment);
    }

    delete(commentId){
        return axios.delete(COMMENT_API_BASE_URL + commentId);
    }
}

export default new CommentService();