import axios from "@/axios.js"
import router from '@/router'

export default {
    create({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("/users/",  payload)
          .then((response) => {
            commit('CREATE_USER', response.data)
            router.push('/users')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
  remove({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/users/${userId}`)
        .then((response) => {
          commit('REMOVE_USER', userId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  edit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/users/${payload.id}`, payload)
        .then((response) => {
          router.push('/users')
          commit('EDIT_USER', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchOne(context, userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/users/${userId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("/users/")
        .then((response) => {
          commit('SET_USERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
