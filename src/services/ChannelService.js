import axios from 'axios';

const CHANNEL_API_BASE_URL = "http://localhost:5175/api/Channels/";

class ChannelService {
    getAll(){
        return axios.get(CHANNEL_API_BASE_URL);
    }

    add(channel){
        return axios.post(CHANNEL_API_BASE_URL, channel);
    }

    getById(channelId){
        return axios.get(CHANNEL_API_BASE_URL + channelId);
    }

    getByUserId(userId){
        return axios.get(CHANNEL_API_BASE_URL + 'GetByUserId/' + userId);
    }

    update(channel){
        return axios.put(CHANNEL_API_BASE_URL, channel);
    }

    delete(channelId){
        return axios.delete(CHANNEL_API_BASE_URL + channelId);
    }
}

export default new ChannelService();