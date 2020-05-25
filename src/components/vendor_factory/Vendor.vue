<template>
  <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 数量输入框 -->
      <el-form-item
        label="数量"
        prop="amount"
        :rules="[
          { required: true, message: '数量不能为空'},
          { type: 'number', message: '数量必须为数字值'}
        ]"
      >
        <el-input
          type="text"
          v-model.number="numberValidateForm.amount"
          autocomplete="off"
          style=" width:200px"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>

      <!-- 价格生成框  -->
      <el-form-item label="报价">
        <el-input
          type="text"
          autocomplete="off"
          style=" width:200px "
          :disabled="true"
          v-model="cost"
        ></el-input>
      </el-form-item>
    </el-form>

    <h3>物料组成可视化</h3>
    <div id="rule">
    </div>
    <div>
      <!-- 生成原材料报价单   导出功能 -->
      <el-button type="primary" @click="show" style="float:left">生成原材料报价单</el-button>

      <el-button type="primary" @click>导出</el-button>

      <!-- 原材料报价单 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        v-if="right"
      >
        <el-table-column prop="spec" label="名称及规格" width="180"></el-table-column>
        <el-table-column prop="amount" label="数量(个)" width="180"></el-table-column>
        <el-table-column prop="price" label="单价(元)" width="180"></el-table-column>
        <el-table-column prop="sum" label="总价(元)" width="180"></el-table-column>
        <el-table-column prop="vendor" label="供应商" width="180"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cost: 0,
      right: false,
      numberValidateForm: {
        amount: ""
      },

      vendor_select: {
        product_name: "",
        processor_vendor: "",
        ram_vendor: "",
        hard_disk_capacity_vendor: "",
        display_vendor: "",

        processor_price: "",
        ram_price: "",
        hard_disk_capacity_price: "",
        display_price: "",

        processor_spec: "",
        ram_spec: "",
        hard_disk_capacity_spec: "",
        display_spec: ""
      },
      //供应商
      vendor: {
        processor: "",
        ram: "",
        hard_disk_capacity: "",
        display_card: "",
        amount: ""
      },
      //QuatationSheet
      tableData: [
        // {
        //   spec: "",
        //   amount: "",
        //   price: "",
        //   sum: "",
        //   vendor: ""
        // }
      ]
    };
  },
  methods: {
    show() {
      this.right = true;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex%2 === 1) {
        return "warning-row";
      } else if (rowIndex%2 === 0) {
        return "success-row";
      }
      return "";
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("rule"));

      // 指定图表的配置项和数据

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["processor", "ram", "hard_disk_capacity", "display"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "30%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: ["物料"]
        },
        series: [
          {
            name: "processor",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            // data: this.tableData[0].sum
           data:[this.tableData[0].sum]
          },
          {
            name: "ram",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            // data:this.tableData[1].sum
            data:[this.tableData[1].sum]
          },
          {
            name: "hard_disk_capacity",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            // data: this.tableData[3].sum
            data:[this.tableData[3].sum]
          },
          {
            name: "display",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            // data: this.tableData[2].sum
            data:[this.tableData[2].sum]
          } 
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      // console.log(this.tableData[2].sum);
      myChart.setOption(option);
    },
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.amountConfirm();
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //向后台传产品规格和数量信息
    amountConfirm() {
      var self = this;
      axios({
        method: "post",
        url: "http://localhost:8081/sc/vendor_select",
        data: self.numberValidateForm
      })
        .then(res => {
          self.vendor_select = res.data.costInfo;
          self.cost = res.data.cost;
          self.tableData.push(res.data.qs_processor);
          self.tableData.push(res.data.qs_ram);
          self.tableData.push(res.data.qs_display);
          self.tableData.push(res.data.qs_hard_disk_capacity);

          console.log(self.vendor_select);
          console.log(self.tableData);
          self.myEcharts();
        })
        .catch();
    }
  },
  // mounted() {
  //   this.myEcharts();
  // }
};
</script>

<style>
#rule {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 300px;
  margin-top: 12px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>