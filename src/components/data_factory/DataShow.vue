<template>
  <div class="Echarts">
    <!-- 筛选得到的数据 -->
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
    <!-- 平均的饼状图 -->
    <div id="main_01" ></div>

    <!-- 高中低三部分的柱状图 -->
    <div id="main" style="width: 100%;height:400px; "></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",

  data() {
    return {
      // confirm:false,
      //饼状图数据  pc中数据响应 会出现的问题
      pc: [
        { value: 235, name: "salary_cost" },
        { value: 274, name: "machine_cost" },
        { value: 310, name: "material_cost" },
        { value: 335, name: "legal_cost" },
        { value: 400, name: "environment_cost"}
      ],
      //高中低数据
      rate:[
        [],
        [],
        [],
        [],
        []
      ],
      //赛选数据
      tableData: [
      ]
    };
  },
  watch:{
      //即时响应  pc为发生变化的数据
      pc:{
        handler(newVal,oldVal){
          this.pc=newVal;
          this.myEcharts_01();
        },
        deep: true,
	      // immediate: true
      },
      //即时响应 rate为发生变化的数据
      rate:{
        handler(newVal,oldVal){
          this.rate=newVal;
          this.myEcharts();
        },
        deep: true,
      },

      
      //为什么tabledata不写也能即时响应
      tableData:{
        handler(newVal,oldVal){
          this.tableData=newVal; 
          // console.log(this.tableData);
        },
        deep: true, 
      }
  },
  methods: {

    //高中低
    myEcharts() {
      
      var myChart = this.$echarts.init(document.getElementById("main"));
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
      myChart.setOption(option, true);
    },

    //饼图
    myEcharts_01() {
      
      var myChart = this.$echarts.init(document.getElementById("main_01"));
      var pc = this.pc;
      var option = {
        title: {
          text: "Cost Consist",
          top: 20
         
        },
        //formatter属性  {a}是series中的name; b是series.data中的name ; c是series.data中的value; d是自动得出的比例

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



            //高中低
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
    }
  },

  mounted() {
    this.getData();
    // if(this.tableData.length!=0){
    //   this.confirm=true;
    // }
    console.log(this.confirm);
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
#main_01{
  height: 300px;
  width:100%;
  padding-top:10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

#main{
  height: 300px;
  width:100%;
  padding-top:10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>