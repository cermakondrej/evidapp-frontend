/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from "../../http/requests/auth/jwt/index.js"


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'

export default {
  loginAttempt({dispatch}, payload) {

    // New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation
    }

    // If remember_me is enabled change firebase Persistence
    if (!payload.checkbox_remember_me) {

      // Change firebase Persistence
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

        // If success try to login
        .then(function () {
          dispatch('login', newPayload)
        })

        // If error notify
        .catch(function (err) {

          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    } else {
      // Try to login
      dispatch('login', newPayload)
    }
  },
  login({dispatch}, payload) {
      dispatch('loginJWT', payload)
  },

  registerUser({dispatch}, payload) {

    // create user using firebase
    firebase.auth().createUserWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
      .then(() => {
        payload.notify({
          title: 'Account Created',
          text: 'You are successfully registered!',
          iconPack: 'feather',
          icon: 'icon-check',
          color: 'success'
        })

        const newPayload = {
          userDetails: payload.userDetails,
          notify: payload.notify,
          updateUsername: true
        }
        dispatch('login', newPayload)
      }, (error) => {
        payload.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
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
        // Update user details

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
