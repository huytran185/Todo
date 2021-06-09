import axios from 'axios';

const instance = axios.create({
    baseURL:'https://todo-275fa-default-rtdb.asia-southeast1.firebasedatabase.app'
})

export default instance;