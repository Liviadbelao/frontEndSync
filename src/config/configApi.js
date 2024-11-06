import axios from "axios";


export default axios.create({
        baseURL: 'http://localhost:3003',
        timeout: 5000,
        headers: {'X-Custom-Header': 'foobar'}
})
