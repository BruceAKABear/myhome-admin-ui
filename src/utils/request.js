import axios from 'axios'
import { Notification } from 'element-ui'
import router from '@/router'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 8000
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers.token = store.state.userToken
    return config
  },
  error => {
    Notification.error('对不起，请求出错了!')
    Promise.reject(error)
  }
)

// 响应
instance.interceptors.response.use(
  response => {
    const realRes = response.data
    const status = realRes.status
    const message = realRes.message
    const code = realRes.code
    const type = realRes.type
    if (status) {
      return response.data
    } else {
      console.log(type)
      if (code === 10002 || code === 10004) {
        // token失效需要重新登录
        router.push('/login')
      } else {
        // 判断是警告还是错误
        Notification.error(message)
      }
      return Promise.reject(new Error('业务不能被执行'))
    }
  },
  error => {
    Notification.error(error.message)
    return Promise.reject(error)
  }
)

export const createAPI = (url, method, data) => {
  const config = {}
  if (method === 'get') {
    config.params = data
  } else if (method === 'post') {
    config.data = data
  }
  return instance({
    url,
    method,
    ...config
  })
}

export const createDownLoadAPI = (url, method, data) => {
  const config = {}
  config.responseType = 'arraybuffer'
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  config.transformRequest = [
    function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}

export const createFormAPI = (url, method, data) => {
  const config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'json'
  config.transformRequest = [
    function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}

export const createImgAPI = (url, method, data) => {
  const config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'blob'
  config.transformRequest = [
    function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
// 组织架构导出
export const createFileAPI = (url, method, data) => {
  const config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'arraybuffer'
  config.transformRequest = [
    function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
// 员工导出
export const createDown = (url, method, data) => {
  const config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'blob'
  return instance({
    url,
    method,
    ...config
  })
}
// 上传文件
export const createFileUpload = (url, data) => {
  const config = {}
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'multipart/form-data'
  }
  const formData = new FormData()
  formData.append('file', data)
  return instance({
    url,
    ...config
  })
}
