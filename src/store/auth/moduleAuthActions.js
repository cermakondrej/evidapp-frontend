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

                        localStorage.setItem("accessToken", response.data.token)
                        localStorage.setItem("refreshToken", response.data.refresh)
                        // Set bearer token in axios
                        commit("SET_BEARER", response.data.token)
                        const decoded = jwt.decode(response.data.token)
                        let role;
                        if (decoded.roles.includes('ROLE_ADMIN') || decoded.roles.includes('ROLE_SUPER_ADMIN')) {
                            role = 'admin'
                        } else {
                            role = 'editor'
                        }

                        const data = {
                            userRole: role,
                            id: decoded.id,
                            displayName: decoded.full_name,
                            email: decoded.email
                        }
                        commit('UPDATE_USER_INFO', data, {root: true})

                        resolve(data)

                    } else {
                        reject({message: "Nesprávný email nebo heslo."})
                    }

                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        reject({message: "Nesprávný email nebo heslo."})
                    }
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

                const decoded = jwt.decode(response.data.token)
                let role;
                if (decoded.roles.includes('ROLE_ADMIN') || decoded.roles.includes('ROLE_SUPER_ADMIN')) {
                    role = 'admin'
                } else {
                    role = 'editor'
                }

                const data = {
                    userRole: role,
                    id: decoded.id,
                    displayName: decoded.full_name,
                    email: decoded.email
                }
                commit('UPDATE_USER_INFO', data, {root: true})


                resolve(response)
            })
                .catch(error => {
                    if (error.status === 401) {
                        if (localStorage.getItem("accessToken")) {
                            localStorage.removeItem("accessToken")
                        }

                        // Change role on logout. Same value as initialRole of acj.js
                        this.$acl.change('public')
                        localStorage.removeItem('userInfo')
                        router.push('/login')
                    } else {
                        reject(error)
                    }

                })
        })
    }
}
