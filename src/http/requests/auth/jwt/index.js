import axios from "../../../axios/index.js"
import jwt_decode from 'jwt-decode'

import store from "../../../../store/store.js"

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
    subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

export default {
    init() {
        axios.interceptors.response.use(function (response) {
            return response
        }, function (error) {

            const {response, config} = error
            const originalRequest = config

            if (response && response.status === 401 && !originalRequest.url.includes('auth/login')) {
                if (!isAlreadyFetchingAccessToken) {
                    isAlreadyFetchingAccessToken = true
                    store.dispatch("auth/fetchAccessToken")
                        .then((response) => {
                            isAlreadyFetchingAccessToken = false
                            onAccessTokenFetched(response.data.token)
                        })
                }
                return new Promise((resolve) => {
                    addSubscriber(access_token => {
                        originalRequest.headers.Authorization = 'Bearer ' + access_token
                        resolve(axios(originalRequest))
                    })
                })
            }
            return Promise.reject(error)
        })
    },
    decode(token) {
        return jwt_decode(token)
    },
    me() {
        return axios.get("/auth/me")
    },
    login(email, pwd) {
        return axios.post("/auth/login", {username: email, password: pwd})
    },
    refreshToken() {
        return axios.post("/auth/refresh", {refresh: localStorage.getItem("refreshToken")})
    }
}
