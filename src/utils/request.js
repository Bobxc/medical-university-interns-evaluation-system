import axios from 'axios'

const service = axios.create({
    baseURL: 'http://sxs.sailwish.vip/',
    timeout: 60000
})

service.interceptors.request.use(config => {
    config.headers.Authorization = `Bear ${window.sessionStorage.getItem("token")}`
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

service.interceptors.response.use(res => {
    return res.data
}, error => {
    console.log(error);
    return Promise.reject(error)
})


export default service