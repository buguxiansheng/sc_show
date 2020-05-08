<template>
  <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="数量"
        prop="amount"
        :rules="[
          { required: true, message: '数量不能为空'},
          { type: 'number', message: '数量必须为数字值'}
        ]"
      >
        <el-input type="amount" v-model.number="numberValidateForm.age" autocomplete="off" style=" width:200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div
      id="rule"
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); height:300px ;margin-top:12px;"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberValidateForm: {
        amount: ""
      },
      vendor:{
        processor:"",
        ram:"",
        hard_disk_capacity:"",
        display_card:"",
        amount:""
      }
    };
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("rule"));

      // 指定图表的配置项和数据

      var option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["0", "100", "101", "200"]
        },
        yAxis: {
          type: "value",
          scale: true
        },
        tooltip: {},
        legend: {},
        series: [
          {
            name: "供应商A",
            data: [800, 800, 900, 900],
            type: "line"
          },
          {
            name: "供应商B",
            data: [820, 820, 932, 932],
            type: "line"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //向后台传产品规格和数量信息
    amountConfirm(){
      var self=this;
      axios(
        {
          method:"post",
          url:"",
          data:self.vendor
        }
      ).then().catch();
    }
  },
  mounted() {
    this.myEcharts();
  }
};
</script>

<style>
</style>