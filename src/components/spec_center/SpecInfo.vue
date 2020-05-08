<template>
  <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="product_name" label="产品名称" width="150"></el-table-column>
        <el-table-column prop="processor" label="处理器" width="120"></el-table-column>
        <el-table-column prop="hard_disk_capacity" label="硬盘" width="120"></el-table-column>
        <el-table-column prop="ram" label="内存" width="120"></el-table-column>
        <el-table-column prop="display_card" label="显卡" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->

            <el-button  @click="open_01(scope.row)" size="small" v-if="right" type="danger" icon="el-icon-delete" circle></el-button>

            <!-- 编辑数据    @click="modify(scope.row)" -->
            <el-button  type="primary" icon="el-icon-edit" circle size="small" @click="modify(scope.row)" v-if="right"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <div
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); margin-top: 30px;"
    >
      <!-- 增加spec -->
      <el-button type="primary" @click="add('addForm')" v-if="right" round>
        发布新产品
        <!-- <i class="el-icon-circle-plus el-icon--right"></i> -->
      </el-button>

      <el-dialog title="新建spec" :visible.sync="newSpecFormVisible">
        <el-form :model="form" :rules="rules" ref="addForm">
          <el-form-item label="product_name" :label-width="formLabelWidth" prop="product_name">
            <el-input v-model="form.product_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="processor" :label-width="formLabelWidth" prop="processor">
            <el-input v-model="form.processor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="hard_disk_capacity"
            :label-width="formLabelWidth"
            prop="hard_disk_capacity"
          >
            <el-input v-model="form.hard_disk_capacity" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="ram" :label-width="formLabelWidth" prop="ram">
            <el-input v-model="form.ram" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="display_card" :label-width="formLabelWidth" prop="display_card">
            <el-input v-model="form.display_card" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addForm')">重置</el-button>
          <el-button @click="newSpecFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 修改spec -->
    <div
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); margin-top: 30px;"
    >
      <el-dialog title="修改spec" :visible.sync="modifySpecFormVisible">
        <el-form :model="row" :rules="rules" ref="modifyForm">
          <el-form-item label="product_name" :label-width="formLabelWidth" prop="product_name">
            <el-input v-model="row.product_name" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="processor" :label-width="formLabelWidth" prop="processor">
            <el-input v-model="row.processor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="hard_disk_capacity"
            :label-width="formLabelWidth"
            prop="hard_disk_capacity"
          >
            <el-input v-model="row.hard_disk_capacity" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="ram" :label-width="formLabelWidth" prop="ram">
            <el-input v-model="row.ram" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="display_card" :label-width="formLabelWidth" prop="display_card">
            <el-input v-model="row.display_card" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CancelModifyForm">取 消</el-button>
          <el-button type="primary" @click="submitModifyForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); margin-top: 30px;height:300px"
    >评论区</div>

    <div
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); margin-top: 5px;"
    >
      <el-form :inline="true" :model="msg" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="msg.mes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateProduct_name = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var validateProcessor = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var validateRam = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var validateHard_disk_capacity = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var validateDisplay_card = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      //分页
      total: 0,
      currentPage1: 1,
      //权限限制功能
      right: false,

      //数据显示
      tableData: [
        // {
        //   product_name: "",
        //   ram: "",
        //   display_card: "",
        //   processor: "",
        //   hard_disk_capacity: ""
        // }
      ],
      //增加
      newSpecFormVisible: false,
      modifySpecFormVisible: false,
      form: {
        product_name: "",
        ram: "",
        hard_disk_capacity: "",
        processor: "",
        display_card: ""
      },
      formLabelWidth: "120px",
      rules: {
        product_name: [{ validator: validateProduct_name, trigger: "blur" }],
        processor: [{ validator: validateProcessor, trigger: "blur" }],
        ram: [{ validator: validateRam, trigger: "blur" }],
        hard_disk_capacity: [
          { validator: validateHard_disk_capacity, trigger: "blur" }
        ],
        display_card: [{ validator: validateDisplay_card, trigger: "blur" }]
      },
      //评论
      msg: {
        mes: ""
      },
      //修改
      row: {
        product_name: "",
        ram: "",
        display_card: "",
        processor: "",
        hard_disk_capacity: ""
      },
      //row副本
      row_counterpart: {
        product_name: "",
        ram: "",
        display_card: "",
        processor: "",
        hard_disk_capacity: ""
      }
    };
  },

  methods: {
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //修改数据
    modify(row) {
      this.modifySpecFormVisible = true;
      //回显数据
      this.row = row;
      // this.row_counterpart=row;
    },
    submitModifyForm() {
      var self = this;
      axios({
        method: "post",
        url: "http://localhost:8081/sc/spec_update",
        data: self.row
      })
        .then()
        .catch();

      //更新表格数据
      axios({
        method: "get",
        url: "http://localhost:8081/sc/spec_find"
      })
        .then(res => {
          console.log(self.tableData);
        })
        .catch();
      this.modifySpecFormVisible = false;
    },
    //取消修改
    CancelModifyForm(formName) {
      var self = this;
      var cData = {
        product_name: self.row.product_name
      };
      axios({
        method: "post",
        url: "http://localhost:8081/sc/spec_findone",
        data: cData
      })
        .then(res => {
          self.row = res.data;
        })
        .catch();

      // var temp=this.row_counterpart;
      // console.log(temp);
      // this.row=temp;

      this.modifySpecFormVisible = false;
    },

    //增加数据
    add(name){
      this.newSpecFormVisible=true;
      var form=this.form;
      form.product_name='';
      form.ram='';
      form.hard_disk_capacity='';
      form.processor='';
      form.display_card='';
    },
    submitForm(formName) {
      var self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          //提交到后台
          axios({
            method: "post",
            url: "http://localhost:8081/sc/spec_add",
            data: self.form
          })
            .then()
            .catch();
          // //提交后数据仍在input框中 提交后清空
          // self.$refs[formName].resetFields();
          console.log(self.form);

          //更新表格数据
          axios({
            method: "get",
            url: "http://localhost:8081/sc/spec_find"
          })
            .then(res => {
              // for (var i = 0; i < res.data.length; i++) {
              //    self.tableData.push(res.data[i]);
              // }
              self.total = res.data.length;
              console.log(self.total);
              self.tableData = res.data;
              console.log(self.tableData);
            })
            .catch();
          // this.getData();
          self.newSpecFormVisible = false;
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //第一次请求数据
    getData() {
      var self = this;
      axios({
        method: "get",
        url: "http://localhost:8081/sc/spec_find"
      })
        .then(res => {
          self.tableData = res.data;
          console.log(self.tableData);
          self.total = res.data.length;
          console.log(self.total);
        })
        .catch();
    },

    //删除
    open_01(row) {
      // var product_name = [row.product_name];
      var self = this;
      var delData = {
        product_name: row.product_name
      };

      self.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "post",
            url: "http://localhost:8081/sc/spec_delPd",
            data: delData
          })
            .then()
            .catch();

          //更新表格数据
          axios({
            method: "get",
            url: "http://localhost:8081/sc/spec_find"
          })
            .then(res => {
              self.total = res.data.length;
              self.tableData = res.data;
              console.log(self.tableData);
            })
            .catch();

          self.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    onSubmit() {
      console.log("submit!");
    }
  },
  //功能按钮是否显示
  created() {
    console.log(this.right);
    console.log(sessionStorage.getItem("username"));
    if (sessionStorage.getItem("username") == "00001") {
      this.right = true;
    } else {
    }
    console.log(this.right);
  },

  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>