import router from "./router";
import store from './store/'
router.beforeEach(async (to, from, next) => {
    // 先获取token
    const token = store.state.token
    // console.log(token, '11');
    // 判断有没有token
    if (token) {
        // 有token，如果去登录页面
        if (to.path == '/login') {
            // 去之前的页面
            next(from.path)
        } else {
            // 先获取用户信息
            let users = store.state.UserInfo
            // 判断用户信息是否是对象，是返回JSON.stringify(users) 不是就返回 ""
            users = typeof users == 'object' ? JSON.stringify(users) : users
            // console.log(users,'users');
            // 如果users是空对象，就调用获取用户信息接口
            if (users == '{}') {
                // console.log(123);
                // 获取用户信息接口
                const a = await store.dispatch('UserInfos')
                // console.log(a);
                // 调用接口成功就放行
                if (a) {
                    next()
                } else {
                    // 否则跳转到login
                    next('/login')
                }
            } else {
                // user不为空时 放行所有页面
                next()
            }
        }
    } else {
        // token 不存在，
        // 如果要跳转login页面
        if (to.path == '/login') {
            // 放行
            next()
        } else {
            // 否则跳转到login
            next('/login')
        }
    }
})