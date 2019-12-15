import axios from 'axios';

export default axios.create({
    // ngrok changes the url every 8 hours
    baseURL: 'http://231355ab.ngrok.io/'
})