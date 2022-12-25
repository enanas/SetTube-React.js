import axios from 'axios';

const REPLY_API_BASE_URL = "http://localhost:5175/api/Replys/";

class ReplyService {
    getAll(){
        return axios.get(REPLY_API_BASE_URL);
    }

    add(reply){
        return axios.post(REPLY_API_BASE_URL + "Add/", reply);
    }

    getById(replyId){
        return axios.get(REPLY_API_BASE_URL + 'GetById?id=' + replyId);
    }

    getByCommentId(commentId){
        return axios.get(REPLY_API_BASE_URL + 'GetByCommentId?commentId=' + commentId);
    }

    getByUpperReplyId(upperReplyId){
        return axios.get(REPLY_API_BASE_URL + 'GetByUpperReplyId?upperReplyId=' + upperReplyId);
    }

    update(reply){
        return axios.put(REPLY_API_BASE_URL + 'Update/', reply);
    }

    delete(replyId){
        return axios.delete(REPLY_API_BASE_URL + 'Delete?id=' + replyId);
    }
}

export default new ReplyService();