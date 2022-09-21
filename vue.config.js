const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  devServer:{
    // 端口号
    port :7777,
    // 主机号
    host:'localhost',
    // 是否自动打开浏览器
    open:true,
    // 是否打开https
    https:false,
    // 开启跨域
    proxy:{
      // 代理名称
      [process.env.VUE_APP_BASE_API]:{
        target:process.env.VUE_APP_SERVER_URL,
        changeOrigin:true,
        pathRewrite:{
          ['^'+process.env.VUE_APP_BASE_API]:""
            }
      },

     




      // "/gu-api":{
      //   // 跨域地址
      //   target:"http://localhost:3000",
      //   // 开启跨域
      //   changeOrigin:true,
      //   // 路径重写
      //   pathRewrite:{
      //     "^/gu-api":""
      //   }
      // }
    }
  },
})
