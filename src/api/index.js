import instance from '../utils/requist'

export const index = (data) => {
    return instance({
        url: '/user/login',
        data,
        method: 'post'
    })

}

export const fan = (data) => {
    return instance({
        url: '/login',
        data,
        method: 'post',
        proxy:process.env.VUE_APP_BASE_API2
    })

}


