import axios from "axios";
import { Message } from "element-ui";
import { Loading } from 'element-ui';
import store from '../store/index'
import { remove } from "../utils/localStorage"

// 错误信息提示内容
const exceptionMessage = {
    1000: '用户名或密码错误',
    2000: 'xxx发生错误',
    3000: ""
}
const loading = {
    loadingInstance: null,
    open() {
        if (!this.loadingInstance) {
            this.loadingInstance = Loading.service({
                target: '.el-main',
                text: '拼命加载中...',
                background: 'rgba(0, 0, 0, 0.4)'
            });
        }
    },
    close() {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
            this.loadingInstance = null
        }
    }
}

const instance = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,

    timeout: 1000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 请求头
    loading.open()
    let token = store.state.token
    console.log(token,'UserInfo');
    if (token) {
        config.headers.authorization='Bearer '+token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    loading.close()
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // token 错误提示 过期处理
    loading.close()

    if (response.status < 400) {
        // _showError(response.data.code, response.data.message)
        if (response.data.data) {
            return response.data.data
        } else {
            return response.data.msg
        }

    }
    if (response.status === 401) {
        store.commit('SET_TOKEN', '')
        store.commit('USERINFO', '')
        remove()
        return
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    loading.close()
    return Promise.reject(error);
});
// 错误提示
const _showError = (errorCode, message) => {
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    Message.error(title)
}


//  封装多个批量实例
const request = (options) => {
    // 如果option 里method有，就用method，如果没有就用get
    options.method = options.method || 'get'
    // 如果options里的method 方式为get
    if (options.method.toLowerCase() === 'get') {
        // 如果没有params的情况下，将data赋值给params ，有params就用params
        options.params = options.data || options.params
        // 删除多余的data
        delete options.data

    }
    // 如果封装api里的写了proxy代理路径就用prox，没有的话就用默认路径
    instance.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API

    return instance(options)


}


export default request