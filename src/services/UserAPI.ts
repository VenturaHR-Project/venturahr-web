import axios from 'axios'

const userAPI = axios.create({
    baseURL: 'http://localhost:3333',
})

export default userAPI