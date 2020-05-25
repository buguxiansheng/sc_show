<template>
    <div style="width:300px; 
    height:300px ;
    position:absolute;
     top:30% ; left:35% ;
     ">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      
    >
      <h2>SmartCost</h2>
      <el-form-item label="账号" prop="empno">
        <el-input type="text" v-model="ruleForm.empno" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>

        <!-- 系统建立数据库，不能注册 -->

        <!-- <el-button @click="register()">注册</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入工号"));
      } else{
        //查询数据库看是否有此账户       
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
        empno: "",
        pass: ""
      },
      rules: {
        empno: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      },
    };
  },
  methods: {
    submitForm(formName){
      // var user=this.$qs.stringify(this.ruleForm);
      axios({
        method:"post",
        url: "http://localhost:8081/sc/verify",
        data:this.ruleForm
      }).then(
        re =>{
          //在这里验证和跳转
          if(re.data.status==="1"){

            //充当权限级别
            sessionStorage.setItem("username",this.ruleForm.empno);
            //存储token
            localStorage.setItem("token",re.data.token);
            alert("登录成功");
            
            this.$router.push({ path: "/cob/cob_01" });
          }else{
            // this.$options.methods.resetForm(formName);
            alert("信息错误，请重新登录");
          }
        }
      ).catch(
        err =>{
        }
      );
      this.$refs[formName].validate(
        valid => {
        if (valid) {   
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
h2{
  text-align: center;
}
el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 20px 0 0;
    box-sizing: border-box;
}

</style>