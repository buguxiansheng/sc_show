<template>
  <div id="app" >
    <!-- 默认跳转 -->
    <router-view></router-view>
  </div>
</template>

<style>
html,body,#app {
  height: 100%;
}
.el-main{
  padding: 0;
}
.el-header {
  background-color: #105a97;
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
