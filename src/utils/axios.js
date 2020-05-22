import axios from 'axios'

let service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000 // 请求超时
})

// 请求拦截
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response拦截
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code != 200) {
            return Promise.reject(res.data)
        } else {
            return response.data
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
