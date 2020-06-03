
<template>
  <el-container style="box-shadow:none !important">

    <el-aside  style="width:150px !important; font-size:14px;"> 
      <el-menu router style="padding:0px">
        <el-menu-item v-for="(nav,id) in $router.options.routes[1].children[1].children" :index="nav.path" :key="id" :class="$route.path==nav.path?'is-active':''"> <i class="el-icon-check">{{nav.name}}</i></el-menu-item>
      </el-menu>
    </el-aside>

    <el-main style="padding:0px ;box-shadow:none !important">
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