import authApi from "@/api/auth"


const state = {
    isSubmitting:false
}

const mutations = {
    registerStart(state){
        state.isSubmitting = true
    },

    registerSuccess(state){
        state.isSubmitting = false
    },

    registerFailure(state){
        state.isSubmitting = false
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