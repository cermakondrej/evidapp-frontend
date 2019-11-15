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
    create({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("localhost:8000/api/companies", {payload: payload})
          .then((response) => {
            router.push('/companies')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
  removeRecord({ commit }, companyId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/companies/${userId}`)
        .then((response) => {
          commit('REMOVE_COMPANY', companyId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchCompanies({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("localhost:8000/api/companies")
        .then((response) => {
          commit('SET_COMPANIES', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
