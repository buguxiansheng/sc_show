<template>
  <div id="app"  >
    <!-- 默认跳转 -->
    <img src="./assets/image/login_07.jpg">
    <router-view></router-view>
  </div>
</template>

<style>
html,body{
  margin:0;
  height:100%;
  /* background-image: url("assets/image/login-background.jpg"); */
}
#app{
  position: relative;
  height: 100%;
  /* background: url('./assets/login-background.jpg'); */
}
img{
  position:absolute;
  height: 100%;
  width: 100%
}
</style>

<script>
export default {
  
};
</script>
