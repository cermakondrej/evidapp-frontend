// axios
import axios from 'axios'

console.log(process.env)

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "https://tichysvet-evidapp.randef.com/v1" : "http://localhost:8000/v1"
  // You can add your headers here
})
