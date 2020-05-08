<template>
  <div class="Echarts">
    <div id="select" style="width: 100%;height:200px;">
      <p>选择要对比的产品</p>
    </div>
    <div id="main" style="width: 100%;height:400px; "></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data(){

    return{
      
    };
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        dataset: [
          {
            source: [
              ["product", "spec_01","spec_02","spec_03"],
              ["价格", 200, 300, 400],
              ["性能", 300, 400, 700]
            ],
          },
          {
           source: [
              ["cpu", 300, 400, "xx"],
              ["ram", 200, 180, "xx"],
              ["硬盘", 200, 120, "xx"],
              ["显卡", 300, 400, "xx"],
            ], 
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
            gridIndex:0
          },
          {
            type: "category",
            gridIndex:1
          }
        ],
        yAxis:[
          {gridIndex: 0},
          {gridIndex: 1}
        ],

        grid:[
          {
            bottom:"55%"
          },
          {
            top:"55%"
          }
        ],
        series: [
          {datasetIndex:0,type: 'bar', seriesLayoutBy: 'row'},
          {datasetIndex:0,type: 'bar', seriesLayoutBy: 'row'},
        // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
          {datasetIndex:0,type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
          {datasetIndex:0,type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
          {datasetIndex:0,type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.myEcharts();
  }
};
</script>