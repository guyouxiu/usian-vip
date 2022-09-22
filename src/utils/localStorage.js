const TOKEN = 'token'
const USERINFO = 'userinfo'

export const setToken = (token) => {
    localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN)
}

export const setuserinfo = (userinfo) => {
    localStorage.setItem(USERINFO, JSON.stringify(userinfo))
}

export const getuserinfo = () => {
    return JSON.parse(localStorage.getItem(USERINFO) || '{}')
}

export const remove = () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USERINFO)
}