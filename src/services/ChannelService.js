import axios from 'axios';

const CHANNEL_API_BASE_URL = "http://localhost:5175/api/Channels/";

class ChannelService {
    getAll(){
        return axios.get(CHANNEL_API_BASE_URL);
    }

    add(channel){
        return axios.post(CHANNEL_API_BASE_URL + "Add/", channel);
    }

    getById(channelId){
        return axios.get(CHANNEL_API_BASE_URL + 'GetById?id=' + channelId);
    }

    getByUserId(userId){
        return axios.get(CHANNEL_API_BASE_URL + 'GetByUserId?userId=' + userId);
    }

    update(channel){
        return axios.put(CHANNEL_API_BASE_URL + 'Update/', channel);
    }

    delete(channelId){
        return axios.delete(CHANNEL_API_BASE_URL + 'Delete?id=' + channelId);
    }
}

export default new ChannelService();