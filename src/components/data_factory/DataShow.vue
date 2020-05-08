<template>
  <div class="Echarts">
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" width="60"></el-table-column>
      <el-table-column fixed prop="product_name" label="产品名" width="100"></el-table-column>
      <el-table-column fixed prop="product_cost" label="总支出" width="100"></el-table-column>
      <el-table-column prop="salary_cost" label="薪水支出" width="120"></el-table-column>
      <el-table-column prop="machine_cost" label="机器支出" width="120"></el-table-column>
      <el-table-column prop="legal_cost" label="法律支出" width="120"></el-table-column>
      <el-table-column prop="environment_cost" label="环境支出" width="120"></el-table-column>
      <el-table-column prop="material_cost" label="物料支出" width="120"></el-table-column>
      <el-table-column prop="product_amount" label="生产数量" width="120"></el-table-column>
    </el-table>
    <div id="main_01" style="width: 100%;height:300px;"></div>
    <div id="main" style="width: 100%;height:400px; "></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",

  data() {
    return {
      pc: [
        { value: 235, name: "salary_cost" },
        { value: 274, name: "machine_cost" },
        { value: 310, name: "material_cost" },
        { value: 335, name: "legal_cost" },
        { value: 400, name: "environment_cost"}
      ],
      rate:[
        [],
        [],
        [],
        [],
        []
      ],
      tableData: [
      ]
    };
  },
  watch:{
      pc:{
        handler(newVal,oldVal){
          this.pc=newVal;
          this.myEcharts_01();
        },
        //啥意思
        deep: true,
	      // immediate: true
      },
      rate:{
        handler(newVal,oldVal){
          this.rate=newVal;
          this.myEcharts();
        },
        //啥意思
        deep: true,
      },
      tableData:{
        handler(newVal,oldVal){
          this.tableData=newVal; 
          // console.log(this.tableData);
        },
        deep: true,
        
      }
  },
  methods: {

    //最大    最小 和  当前
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据

      //
      var option = {
        dataset: {
          source: this.rate
        },

        title: {
          text: "CostCompare"
        },
        tooltip: {

        },
        legend: {

        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0
            }
          }
        ],
        yAxis: {},
        series: [
          {
            name: "min_rate",
            type: "bar",
            encode: { x: 0, y: 1 }
          },
          {
            name: "current_rate",
            type: "bar",
            encode: { x: 0, y: 2 }
          },
          
          {
            name: "max_rate",
            type: "bar",
            encode: { x: 0, y: 3 }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
    },

    //饼图展示花费比例
    myEcharts_01() {
      
      var myChart = this.$echarts.init(document.getElementById("main_01"));
      var pc = this.pc;
      var option = {
        title: {
          text: "Cost Consist",
          // left: "center",
          top: 20
          // textStyle: {
          //   color: "#ccc"
          // }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : ({d}%)"
        },
        series: [
          {
            name: "costConsist",
            type: "pie",
            radius: "55%",
            data: this.pc,
            label: {
              color: "rgba(0, 0, 0)",
              formatter: "{b} : {d}%"
            }
          }
        ]
      };
      //ture不设置原数据保留
      myChart.setOption(option, true);
      //刷新
    },
    //更新数据
    getData() {
      var pn = this.$store.state.product_names;
      //res.data
      var bc = [];
      var tbd=[];
      var self=this;
      //获取数据
      if (pn.length != 0) {
        axios({
          method: "post",
          url: "http://localhost:8081/sc/fpcd",
          data: pn
        })
          .then(res => {
           

            //绑定饼图的数据
            bc = res.data;
            this.pc[0].value = bc[0][0].salary_cost;
            this.pc[1].value = bc[0][0].machine_cost;
            this.pc[2].value = bc[0][0].material_cost;
            this.pc[3].value = bc[0][0].legal_cost;
            this.pc[4].value = bc[0][0].environment_cost;



            //绑定柱状图的数据
            this.rate[0].push("salary_cost");
            this.rate[0].push(bc[0][1].salary_cost);
            this.rate[0].push(bc[0][0].salary_cost);
            this.rate[0].push(bc[0][2].salary_cost);

            this.rate[1].push("machine_cost");
            this.rate[1].push(bc[0][1].machine_cost);
            this.rate[1].push(bc[0][0].machine_cost);
            this.rate[1].push(bc[0][2].machine_cost);


            this.rate[2].push("material_cost");
            this.rate[2].push(bc[0][1].material_cost);
            this.rate[2].push(bc[0][0].material_cost);
            this.rate[2].push(bc[0][2].material_cost);

            this.rate[3].push("legal_cost");
            this.rate[3].push(bc[0][1].legal_cost);
            this.rate[3].push(bc[0][0].legal_cost);
            this.rate[3].push(bc[0][2].legal_cost);

            this.rate[4].push("environment_cost");
            this.rate[4].push(bc[0][1].environment_cost);
            this.rate[4].push(bc[0][0].environment_cost);
            this.rate[4].push(bc[0][2].environment_cost);




            
            console.log(this.pc);
            console.log(this.rate);
            console.log(bc);

            //表格数据源  数据量不一

            
            // for(var obj in bc[1]){
            //   var obj_new=new Object();
            //   obj_new.product_name=obj.product_name;
            //   obj_new.salary_cost=obj.salary_cost;
            //   obj_new.machine_cost=obj.machine_cost;
            //   obj_new.legal_cost=obj.legal_cost;
            //   obj_new.environment_cost=obj.environment_cost;
            //   obj_new.material_cost=obj.material_cost;
            //   obj_new.product_amount=obj.product_amount;
            //   obj_new.product_cost=obj.product_cost;
            //   this.tableData.push(obj_new);
            // };  


            console.log(bc[1]);
            // for(var obj in bc[1]){
              
            //   tbd.push(obj);
            //   this.$set(this.tableData,0,bc[1])

            // }
            self.tableData=bc[1];
            // this.$set(this.tableData,0,bc[1])
            console.log(self.tableData);

            
          })
          .catch();
      } else {

        alert("还未有历史记录,暂无报价");
        // this.$router.push();
      }
    },
    // fresh(){
    //   var myChart = this.$echarts.init(document.getElementById("main_01"));
    //   var option_new = this.myChart.getOption();
    //   option_new.series[0].data =this.pc;
    //   myChart.setOption(option_new);
    // }
  },

  mounted() {
    this.getData();
    //此处获取数据
    // this.myEcharts();
    // this.myEcharts_01();
  },
  // activated(){
  //   this.getData();
  // }


};
</script>

<style>
</style>