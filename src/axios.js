// axios
import axios from 'axios'

console.log(process.env)

export default axios.create({
  baseURL: process.env.API_URL || "https://tichysvet-evidapp.randef.com/v1"
  // You can add your headers here
})
