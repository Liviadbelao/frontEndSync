import axios from "axios";


export default axios.create({
        baseURL: 'https://192.168.69.191:3033',
        timeout: 50000,
        headers: {'X-Custom-Header': 'foobar'}
})
