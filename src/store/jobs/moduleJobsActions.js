import axios from "@/axios.js"
import router from '@/router'

export default {
    create({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("/jobs/",  payload)
          .then((response) => {
            commit('CREATE_JOB', response.data)
            router.push('/jobs')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
  remove({ commit }, jobId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/jobs/${jobId}`)
        .then((response) => {
          commit('REMOVE_JOB', jobId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  edit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/jobs/${payload.id}`, payload)
        .then((response) => {
          router.push('/jobs')
          commit('EDIT_JOB', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchOne(context,jobId) {
    return new Promise((resolve, reject) => {
      axios.get(`/jobs/${jobId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("/jobs/")
        .then((response) => {
          commit('SET_JOBS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
