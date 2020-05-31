<template>
  <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    <el-form ref="form" :model="form" label-width="80px" style="padding:5px">
      <el-form-item label="处理器">
        <el-select v-model="form.processor" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内存">
        <el-radio-group v-model="form.ram">
          <el-radio label="32G"></el-radio>
          <el-radio label="16G"></el-radio>
          <el-radio label="8G"></el-radio>
          <el-radio label="4G"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="硬盘容量">
        <el-radio-group v-model="form.hard_disk_capacity">
          <el-radio label="128G"></el-radio>
          <el-radio label="256G"></el-radio>
          <el-radio label="512G"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="显卡">
        <el-radio-group v-model="form.dispaly_card">
          <el-radio label="GTX1650"></el-radio>
          <el-radio label="GTX980"></el-radio>
          <el-radio label="GTX970"></el-radio>
          <el-radio label="GTX960"></el-radio>
          <el-radio label="GTX950"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">报价结果</el-button>
      </el-form-item>

    <!-- 生产数量 -->

    </el-form>



    <!-- 让表单和table分开 -->


    <!-- <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column fixed prop="product_name" label="产品名" width="100"></el-table-column>
      <el-table-column prop="salary_cost" label="薪水支出" width="80"></el-table-column>
      <el-table-column prop="machine_cost" label="机器支出" width="80"></el-table-column>
      <el-table-column prop="legal_cost" label="法律支出" width="80"></el-table-column>
      <el-table-column prop="environment_cost" label="环境支出" width="80"></el-table-column>
      <el-table-column prop="material_cost" label="物料支出" width="80"></el-table-column>
      <el-table-column prop="product_cost" label="总支出" width="80"></el-table-column>
      <el-table-column prop="product_amount" label="生产数量" width="80"></el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ram: "",
        hard_disk_capacity: "",
        display_card: "",
        processor: "",
        product_name:""
      },
      product_names: [],
      options: [
          {
            value: "i7",
            label: "i7"
          },
          {
            value: "i6",
            label: "i6"
          },
          {
            value: "i5",
            label: "i5"
          },
          {
            value: "i4",
            label: "i4"
          },
          {
            value: "i3",
            label: "i3"
          }
        ]
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "http://localhost:8081/sc/fpn",
        // data: this.form
        data: this.$qs.stringify(this.form)
      })
        .then(res => {
          //获取到价格
          this.product_names = res.data;
          console.log(res.data);
          //将pn设为全局变量
          this.$store.commit("changePn", res.data);
          this.$router.push("/co/co_03/gap_01");
        })
        .catch();
    }
  }
};
</script>

<style>
.bg-purple {
  background: #d3dce6;
  margin: 0px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 10px;
  background-color: #f9fafc;
}
</style>