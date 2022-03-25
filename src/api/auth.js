import axios from '@/api/axios'

const register = credential =>{
    return axios.post('/users', {user:credential})
}

const login = credential =>{
    return axios.post('/users/login', {user:credential})
}

const gerCurrentUser = () =>{
    return axios.get('/user')
}

export default{
    register,
    login,
    gerCurrentUser
}


//sdwdsadxxaaw11111@dasdad.asdad 1234567890