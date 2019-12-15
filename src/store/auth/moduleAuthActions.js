import jwt from "../../http/requests/auth/jwt/index.js"
import router from '@/router'

export default {

  login({dispatch}, payload) {
      dispatch('loginJWT', payload)
  },

  // JWT
  loginJWT({commit}, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.email, payload.userDetails.password)
        .then(response => {

          // If there's user data in response
          if (response.data.token) {
            // Navigate User to homepage
            router.push('/')

            localStorage.setItem("accessToken", response.data.token)
            localStorage.setItem("refreshToken", response.data.refresh)
            // Set bearer token in axios
            commit("SET_BEARER", response.data.token)

            jwt.me().then(response => {
              const data = {
                userRole: 'admin',
                id: response.data.id,
                displayName: response.data.full_name,
                email: response.data.email
              }
              commit('UPDATE_USER_INFO', data, {root: true})
            })

            resolve(response)
          } else {
            reject({message: "Wrong Email or Password"})
          }

        })
        .catch(error => {
          reject(error)
        })
    })
  },
  fetchAccessToken({commit}) {

    return new Promise((resolve, reject) => {
      jwt.refreshToken().then(response => {
        localStorage.setItem("accessToken", response.data.token)
        localStorage.setItem("refreshToken", response.data.refresh)
        // Set bearer token in axios
        commit("SET_BEARER", response.data.token)

        jwt.me().then(response => {
          const data = {
            userRole: 'admin',
            id: response.data.id,
            displayName: response.data.full_name,
            email: response.data.email
          }
          commit('UPDATE_USER_INFO', data, {root: true})
        })

        resolve(response)
      })
        .catch(error => {
            if (error.status === 401){
              if(localStorage.getItem("accessToken")) {
                localStorage.removeItem("accessToken")
                this.$router.push('/login').catch(() => {})
              }

              // Change role on logout. Same value as initialRole of acj.js
              this.$acl.change('public')
              localStorage.removeItem('userInfo')

            }else{
              reject(error)
            }

        })
    })
  }
}
