import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
  timeout: 80000,
  withCredentials: false
  // headers: {
  // 'Content-Type': 'application/json',
  // 'token': x-auth-token',
  // 'X-Requested-With': 'XMLHttpRequest',
  // },
})

request.interceptors.request.use(
  config => {
    // let token = localStorage.getItem("x-auth-token");
    // if (token) {
    //     config.headers = {"x-auth-token": token}
    // }
    return config
  },
  error => {
    Promise.reject(error).then(r => { console.log(r) })
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default request
