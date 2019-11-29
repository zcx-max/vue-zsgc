<template>
  <el-container>
    <!-- <el-header>Header</el-header> -->
    <!-- Element的<el-main> 表格，button按钮 </el-main>   对话框  -->

    <el-main>
      <el-button type="primary" @click=" dialogFormVisible=true">添加</el-button>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="姓名" prop="name" width="180"></el-table-column>
        <el-table-column label="密码" prop="password" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- 分页，条数 page-size，总数total, pagenum不用写在属性里，因changePage()事件里需要跳到相应的页数里 -->

      <el-pagination background layout="prev, pager, next" 
      :total="total"
      :page-size="limit"
      @current-change='changePage'
      >
      </el-pagination>

    </el-main>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- 给确定重新命名一个事件名称，方便调用弹框，原先这里是直接控制弹框的和取消一样-->
        <el-button type="primary" @click="queD">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], //表格的数组
      dialogFormVisible: false, //控制弹框
      //操控弹框的表单
      id: null,
      form: {
        name: "",
        password:""
      },
      formLabelWidth: "120px",
      //做分页用的参数
      total:0,//总数
      limit:3,//条数, :page-size="limit"
      pagenum:1,//第几页,分页的事件里用来切换页数
    };
  },
  //生命周期调用
  created() {
    this.getData();
  },
  methods: {
    //所有用户
    getData() {
      this.axios.get("/list",{params:{pagenum:this.pagenum,limit:this.limit}}).then(res => {
        console.log(res)
        console.log(res.data.total);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //分页
    changePage(cur){
      console.log(cur) //cur打印出来的是相对应的下标
      this.pagenum = cur;
      this.getData();
    },
    //修改
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true; //点击修改打开弹框

      this.id = row.id;
      this.form={
        name:row.name,
        password:row.password
      }
      //特别提醒一下，修改需要id而添加不需要id,所以下面queD()方法里才会有一个判断是否有id,有,方为哪个接口
    },
    queD(){
      let url ="";

      if(this.id){
        //有id的话 就是修改接口
        url="/xiulist"
      }else{
        //没有id 是添加接口
        url="/addlist"
      }

      this.axios.post(url,{...this.form,id:this.id}).then(res=>{
        console.log(res)
        if(res.data.code === 1){
          this.getData()//多次调用

          this.$message({
              type: "success",
              message: res.data.msg
            });
        }else{
           this.$message({
            type: "info",
            message: res.data.msg
          });
        }
        this.dialogFormVisible=false; 
        this.reset()
      })
    },
    //清空，因name,password都在form下
    reset(){
      this.form.name="",
      this.form.password=""
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除里的id注意一下，只是一个参数
          this.axios.get("/dellist", { params: { id: row.id } }).then(res => {
            console.log(res);
            this.getData();//多次调用
            
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>