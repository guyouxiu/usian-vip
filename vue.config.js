const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // 端口号
    port :7777,
    // 主机号
    host:'localhost',
    // 是否自动打开浏览器
    open:true,
    // 是否打开https
    https:false
  }
})
