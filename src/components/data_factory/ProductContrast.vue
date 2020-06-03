<template>
  <div class="Echarts">
    <div id="select" >
      <el-transfer v-model="value" :data="data" :titles="title"></el-transfer>
    </div>

    <div id="contrast"></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data() {
    // const generateData = _ => {
    //   const data = [];
    //   // for (let i = 1; i <= 15; i++) {
    //   //   data.push({
    //   //     // key: i,
    //   //     label: `备选项 ${i}`,
    //   //     // disabled: i % 4 === 0
    //   //   });
    //   // }
    //   return data;
    // };
    return {
      title:['等待区','候选区'],
      //根据value去查询
      value: [1,3],
      data:[],
      tableData:[
        {
          product_name:'',
          price:'',
          performance:''
        }
      ]
    };
  },

  methods: {
    getData() {
      var self = this;
      axios({
        method: "post",
        url: "http://localhost:8081/sc/get_all",   
      })
        .then(res => {
          
         
          self.tableData = res.data;
          console.log(self.tableData);

          for(let i=0;i<self.tableData.length;i++){
            self.data.push(
              {
                key: i,
                label: self.tableData[i].product_name
              }
            );
          }
          console.log(self.data);
          self.myEcharts();
        })
        .catch();

    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var self=this;
      var myChart = this.$echarts.init(document.getElementById("contrast"));

      // 指定图表的配置项和数据
      var data_01=["product"];
      var data_02=["价格"];
      var data_03=["性能"];
      //选中的数据不少于2个
      if(self.value.length>=2){
        for(let i=0;i<self.value.length;i++){
          data_01.push(self.tableData[self.value[i]].product_name);
          data_02.push(self.tableData[self.value[i]].price);
          data_03.push(self.tableData[self.value[i]].performance);
        }
      }
      var option = {
        dataset: [
          {
            source: [
              data_01,
              data_02,
              data_03
            ]
          },
          {
            source: [
              ["cpu", 300, 400, "xx"],
              ["ram", 200, 180, "xx"],
              ["硬盘", 200, 120, "xx"],
              ["显卡", 300, 400, "xx"]
            ]
          }
        ],
        title: {
          text: "性价比"
        },
        tooltip: {},
        legend: {},
        xAxis: [
          {
            type: "category",
            gridIndex: 0
          },
          {
            type: "category",
            gridIndex: 1
          }
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],

        grid: [
          {
            bottom: "55%"
          },
          {
            top: "55%"
          }
        ],
        series: [
          { datasetIndex: 0, type: "bar", seriesLayoutBy: "row" },
          { datasetIndex: 0, type: "bar", seriesLayoutBy: "row" },
          // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
          { datasetIndex: 0, type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { datasetIndex: 0, type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { datasetIndex: 0, type: "bar", xAxisIndex: 1, yAxisIndex: 1 }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },

  mounted() {
    this.myEcharts();
  },
  created(){
    this.getData();
  }

  
};
</script>
<style >

#select{
  height:300px;
  width:98%;
  margin-left: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.el-transfer {
  margin-top: 20px;
  margin-left: 50px;

  
}
#contrast{
  width:98%;
  height: 400px;
  margin-top: 20px;
  margin-left: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>>