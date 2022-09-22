<template>
  <div>
    <bread v-if="controllink"></bread>
    <router-view></router-view>
  </div>
</template>


<script>
import bread from "./bread.vue";
export default {
  name: "index",
  components: {
    bread,
  },
  computed:{
    controllink(){
        return !(this.$route.path==='/index')
    }
  }
};
</script>