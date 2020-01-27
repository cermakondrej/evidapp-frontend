import axios from "@/axios.js"
import router from '@/router'

export default {
    create({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("/works/",  payload)
          .then((response) => {
            commit('CREATE_WORK', response.data)
            router.push('/works')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
  remove({ commit }, workId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/works/${workId}`)
        .then((response) => {
          commit('REMOVE_WORK', workId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  edit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/works/${payload.id}`, payload)
        .then((response) => {
          router.push('/works')
          commit('EDIT_WORK', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchOne(context, workId) {
    return new Promise((resolve, reject) => {
      axios.get(`/works/${workId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("/works/")
        .then((response) => {
          commit('SET_WORKS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
