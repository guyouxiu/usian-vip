<template>
  <div class="home">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Asid></Asid>
        </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../home/Header.vue";
import Asid from "../home/Asid.vue";
import Main from "../home/Main.vue";
export default {
  components: { Header, Asid, Main },
  data() {
    return {};
  },
  methods: {},
};
</script>




<style scoped >
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2d3a4b;
  height: 50px !important ;
  color: #fff;
}

.el-aside {
  background-color: #555c64;
  color: #fff;
  height: 100%;
}

.el-main {
  background-color: #fff;
  height: 100%;
}
</style>