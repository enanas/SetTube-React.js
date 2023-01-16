import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:5175/api/Users/";

class UserService {
    getAll(){
        return axios.get(USER_API_BASE_URL);
    }

    add(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    getById(userId){
        return axios.get(USER_API_BASE_URL + userId);
    }

    logIn(logInInfo){
        return axios.post(USER_API_BASE_URL + 'LogIn/', logInInfo);
    }

    update(user){
        return axios.put(USER_API_BASE_URL, user);
    }

    delete(userId){
        return axios.delete(USER_API_BASE_URL + userId);
    }

    getUserSubscribedChannels(userId){
        return axios.get(USER_API_BASE_URL + 'GetSubscribedChannels/' + userId);
    }

    getWatchedVideos(userId){
        return axios.get(USER_API_BASE_URL + 'GetWatchedVideos/' + userId);
    }

    getLikedVideos(userId){
        return axios.get(USER_API_BASE_URL + 'GetLikedVideos/' + userId);
    }

    getDislikedVideos(userId){
        return axios.get(USER_API_BASE_URL + 'GetDislikedVideos/' + userId);
    }

    addUserSubscribedChannel(userId, channelId){
        return axios.post(USER_API_BASE_URL + 'AddSubscribedChannel/' + userId + "?channelId=" + channelId);
    }

    deleteUserSubscribedChannel(userId, channelId){
        return axios.post(USER_API_BASE_URL + 'DeleteSubscribedChannel/' + userId + "?channelId=" + channelId);
    }

    addUserWatchedVideo(userId, videoId){
        return axios.post(USER_API_BASE_URL + 'AddWatchedVideo/' + userId + "?videoId=" + videoId);
    }
    
    addUserLikedVideo(userId, videoId){
        return axios.post(USER_API_BASE_URL + 'AddLikedVideo/' + userId + "?videoId=" + videoId);
    }
    
    deleteUserLikedVideo(userId, videoId){
        return axios.post(USER_API_BASE_URL + 'DeleteLikedVideo/' + userId + "?videoId=" + videoId);
    }
    
    addUserDislikedVideo(userId, videoId){
        return axios.post(USER_API_BASE_URL + 'AddDislikedVideo/' + userId + "?videoId=" + videoId);
    }
    
    deleteUserDislikedVideo(userId, videoId){
        return axios.post(USER_API_BASE_URL + 'DeleteDislikedVideo/' + userId + "?videoId=" + videoId);
    }
}

export default new UserService();