import axios from 'axios';

const VIDEO_API_BASE_URL = "http://localhost:5175/api/Videos/";

class VideoService {
    getAll(){
        return axios.get(VIDEO_API_BASE_URL);
    }

    add(video){
        return axios.post(VIDEO_API_BASE_URL + "Add/", video);
    }

    getById(videoId){
        return axios.get(VIDEO_API_BASE_URL + 'GetById?id=' + videoId);
    }

    getByChannelId(channelId){
        return axios.get(VIDEO_API_BASE_URL + 'GetByChannelId?channelId=' + channelId);
    }

    getByCategoryId(categoryId){
        return axios.get(VIDEO_API_BASE_URL + 'GetByCategoryId?categoryId=' + categoryId);
    }

    update(video){
        return axios.put(VIDEO_API_BASE_URL + 'Update/', video);
    }

    delete(videoId){
        return axios.delete(VIDEO_API_BASE_URL + 'Delete?id=' + videoId);
    }
}

export default new VideoService();