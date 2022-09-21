import request from '../utils/requist'

// 登录方法
export const login=(data={})=>{
    return request ({
        url:'user/login',
        method:"POST",
        data,
    })
}