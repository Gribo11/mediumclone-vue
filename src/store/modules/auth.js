import authApi from "@/api/auth"


const state = {
    isSubmitting:false,
    currentUser:null,
    validatonErrors:null,
    isLoggedIn:null
}

const mutations = {
    registerStart(state){
        state.isSubmitting = true
        state.validatonErrors = null
    },

    registerSuccess(state, payload){
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },

    registerFailure(state, payload){
        state.isSubmitting = false
        state.validatonErrors = payload
    }
}

const actions = {
    register(context, credential){
        // setTimeout(()=>{
        // context.commit('registerStart')
        // }, 1000)
        return new Promise(resolve =>{
            context.commit('registerStart')

            authApi.register(credential)
            .then(response =>{
                 context.commit('registerSuccess', response.data.user)
                 resolve(response.data.user)
            })
            .catch(result =>{
                context.commit('registerFailure', result.response.data.errors)
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