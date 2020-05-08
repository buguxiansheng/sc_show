
<template>
  <el-container style="height:100%; border: 1px solid #eee">

    <el-aside width="150px" style="background-color: rgb(238, 241, 246)"> 
      <el-menu router>
        <el-menu-item v-for="(nav,id) in $router.options.routes[1].children[1].children" :index="nav.path" :class="$route.path==nav.path?'is-active':''"> <i class="el-icon-check">{{nav.name}}</i></el-menu-item>
      </el-menu>
    </el-aside>

    <el-main style="padding:0px">
       <router-view></router-view>
    </el-main>
  </el-container>
  <!-- <div class="Echarts">
    <el-aside></el-aside>  
    <div id="main" style="width: 100%;height:400px; "></div>
  </div>-->
</template>

<script>
export default {};
</script>