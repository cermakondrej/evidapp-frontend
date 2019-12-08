import axios from "@/axios.js"
import router from '@/router'

export default {
    create({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("/api/companies/",  payload)
          .then((response) => {
            commit('CREATE_COMPANY', response.data)
            router.push('/companies')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
  remove({ commit }, companyId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/companies/${companyId}`)
        .then((response) => {
          commit('REMOVE_COMPANY', companyId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  edit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/companies/${payload.id}`, payload)
        .then((response) => {
          router.push('/companies')
          commit('EDIT_COMPANY', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchOne(context,companyId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/companies/${companyId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("/api/companies/")
        .then((response) => {
          commit('SET_COMPANIES', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
