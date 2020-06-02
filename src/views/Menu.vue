<template>
  <el-container style="height:100%">
    <el-aside style="width:200px">
      <el-menu router>
        <el-submenu v-for="(nav,id) in $router.options.routes" :index="id+''" :key="id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            {{nav.name}}
          </template>
          <el-menu-item
            v-for="(cnav,cid) in nav.children"
            :index="cnav.path"
            :key="cid"
            :class="$route.path==cnav.path?'is-active':'' "
          >{{cnav.name}}</el-menu-item>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      user: "ll"
    };
  },
  methods: {
    login_out(command) {
      if (command === "b") {
        //退出后清空记录  可以设置过期时间
        localStorage.clear();
        this.$router.push("/");
      } else {
      }
    }
  },
  computed: {
    ...mapState(["username"])
  },

  created() {
    this.user = this.username;
  }
};
</script>

<style>
main.el-main {
  padding: 10px;
  opacity: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-aside {
  width: 200px !important;
}
.el-menu {
  background-color: transparent !important;
  border-right: 0 !important;
}

.el-header {
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-dropdown {
  position: relative;
  top: 30%;
  float: right;
  font-size: 20px !important;
}
.el-container {
  position: relative !important;
}
</style>