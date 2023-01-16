import axios from 'axios';

const VIDEO_API_BASE_URL = "http://localhost:5175/api/Videos/";

class VideoService {
    getAll(){
        return axios.get(VIDEO_API_BASE_URL);
    }

    add(video){
        return axios.post(VIDEO_API_BASE_URL, video);
    }

    getById(videoId){
        return axios.get(VIDEO_API_BASE_URL + videoId);
    }

    getSubscribedChannelVideos(userId){
        return axios.get(VIDEO_API_BASE_URL + 'GetSubscribedChannelVideos/' + userId);
    }

    getByChannelId(channelId){
        return axios.get(VIDEO_API_BASE_URL + 'GetByChannelId/' + channelId);
    }

    getByCategoryId(categoryId){
        return axios.get(VIDEO_API_BASE_URL + 'GetByCategoryId/' + categoryId);
    }

    update(video){
        return axios.put(VIDEO_API_BASE_URL, video);
    }

    delete(videoId){
        return axios.delete(VIDEO_API_BASE_URL + videoId);
    }
}

export default new VideoService();