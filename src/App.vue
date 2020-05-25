<template>
  <div id="app"  >
    <!-- 默认跳转 -->
    <router-view></router-view>
  </div>
</template>

<style>
html,body,#app {
  margin:0;
  height:100%;
  /* background-image: url("assets/image/login-background.jpg"); */
  background-color: lightgray
}
el-main{
  padding: 0;
}
.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: rgb(68, 32, 59);
}
</style>

<script>
export default {
  
};
</script>
