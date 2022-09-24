import request from '../utils/requist'

// 登录方法
export const login=(data={})=>{
    return request ({
        url:'user/login',
        method:"POST",
        data,
    })
}

// 获取用户信息
export const getUserInfo =()=>{
    return request({
        url:'user/info/admin',
        method:'GET'
    })
}

// 退出登录
export const Logout =()=>{
    return request({
        url :"user/logout",
        method:"POST"
    })
}