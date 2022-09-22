<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="item" :to="{ path: '/' }">{{link}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    computed:{
        link(){
            return this.$route.meta?.title
        }
    }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb{
    height: 20px;
    line-height: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0 0 0 / 10%);
}
.item{
    border-left: 3px solid #f60;
    padding-left: 10px;
}
</style>
