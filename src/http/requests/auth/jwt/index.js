import axios from "../../../axios/index.js"
import jwt_decode from 'jwt-decode'
import router from '@/router'


export default {
  init() {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {


      if (error && error.status === 401) {
        if(localStorage.getItem("accessToken")) {
          localStorage.removeItem("accessToken")
        }

        // Change role on logout. Same value as initialRole of acj.js
        this.$acl.change('public')
        localStorage.removeItem('userInfo')
        router.push('/login')
      }
      return Promise.reject(error)
    })
  },
  decode(token) {
    return jwt_decode(token)
  },
  me() {
    return axios.get("/api/auth/me")
  },
  login(email, pwd) {
    return axios.post("/api/login_check", {username: email, password: pwd})
  },
  refreshToken() {
    return axios.post("/api/auth/refresh", {refresh: localStorage.getItem("refreshToken")})
  }
}
