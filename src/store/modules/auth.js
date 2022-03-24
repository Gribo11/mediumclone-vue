import authApi from "@/api/auth"
import {setItem} from '@/helpers/persistanceStorage'

const state = {
    isSubmitting:false,
    currentUser:null,
    validatonErrors:null,
    isLoggedIn:null
}

export const mutationTypes = {
    registerStart:'[auth] registerStart',
    registerSuccess:'[auth] registerSuccess',
    registerFailure:'[auth] registerFailure'
}

export const actionType = {
    register:'[auth] register'
}

const mutations = {
    [mutationTypes.registerStart](state){
        state.isSubmitting = true
        state.validatonErrors = null
    },

    [mutationTypes.registerSuccess](state, payload){
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },

    [mutationTypes.registerFailure](state, payload){
        state.isSubmitting = false
        state.validatonErrors = payload
    }
}

const actions = {
    [actionType.register](context, credential){
        return new Promise(resolve =>{
            context.commit(mutationTypes.registerStart)

            authApi.register(credential)
            .then(response =>{
                 context.commit(mutationTypes.registerSuccess, response.data.user)
                 setItem('accessToken', response.data.user.token)
                 resolve(response.data.user)
            })
            .catch(result =>{
                context.commit(mutationTypes.registerFailure, result.response.data.errors)
                console.log(result);
            })
        })
    }
}


export default{
    state,
    mutations,
    actions
}