<template>
  <el-container style="height:100%; border: 1px solid #eee">
    <el-aside width="260px" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
        <el-submenu v-for="(nav,id) in $router.options.routes" :index="id+''" :key="id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            {{nav.name}}
          </template>
          <el-menu-item v-for="(cnav,cid) in nav.children" :index="cnav.path" :key="cid" :class="$route.path==cnav.path?'is-active':'' ">
            {{cnav.name}}</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-dropdown @command="login_out">
          <i class="el-icon-setting" style="margin-right: 15px ;float:right;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{user}}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import {mapState} from "vuex";
export default {
  data(){
    return{
      user: "ll"
    }
  },
  methods:{
    login_out(command){
      if(command==="b"){

        //退出后清空记录  可以设置过期时间
        localStorage.clear();
        this.$router.push("/");
      }else{
      }   
    }
  },
  computed:{
    ...mapState(["username"])
  },

  created(){
    this.user=this.username;
  }
};
</script>

<style>
header.el-header{
  text-align: right;
  font-size: 12px;
  background-color: burlywood;
}
main.el-main{
  padding: 0;
}
</style>