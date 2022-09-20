<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {index,fan} from '../api/index'
import $axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      num:1,
      page:5,
      form:{
        username:'admin',
        password:"admin"     
        }
    }
  },
  created() {
    // $axios({
    //   url:process.env.VUE_APP_BASE_API+'/user/login',
    //   data:this.form,
    //   method:'post'
    // }).then(res=>{
    //   console.log(res);
    // })
    index(this.form).then(res=>{
      console.log(res);
    })
    fan(this.form).then(res=>{
      console.log(res,'1111');
    })
  },
}
</script>
