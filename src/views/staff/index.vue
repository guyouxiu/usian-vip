<template>
  <div class="mt-20">
    <!-- <el-form
      :inline="true"
      :model="formInline"
      ref="ruleForm"
      class="demo-form-inline"
    >
      <el-form-item prop="username">
        <el-input v-model="formInline.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="handleOpen">新增</el-button>
        <el-button @click="getInit('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
    <queryForm
      v-model.sync="formInline"
      @search="handlequeryform"
      :formItem="formItem"
      ref="queryForm"
    >
      <template v-slot:query>
        <el-button type="primary" @click="handlequeryform">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </queryForm>

    <baseTable
      @size="handleSize"
      @page="handlePage"
      :tableData="memberList"
      :colums="colums"
      pages
      :total="total"
      :page="page"
      :size="size"
    >
      <template v-slot:opteration="scope">
        <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
          >编辑</el-button
        >
        <el-button size="mini" @click="del(scope.row.id)">删除</el-button>
      </template>
    </baseTable>

    <i-dialog
      :dialogFormItem="dialogFormItem"
      @submit="handleSubmit"
      :dialogRules="dialogRules"
      labelWidth="120px"
      :dialogConfig="dialogConfig"
      v-model.sync="dialogForm"
      :dialogVisible.sync="dialogVisible"
    ></i-dialog>
    <!-- 分页 -->
    <!-- <div class="block mt-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    <!-- 新增弹窗 -->
    <!-- <el-dialog
        :title="dialogtitle"
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
        width="400px"
      >
        <el-form
          :model="dialogform"
          label-width="120px"
          :rules="dialogrules"
          ref="dialogForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="dialogform.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="dialogform.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="年龄" prop="age">
            <el-input v-model="dialogform.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="dialogform.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="薪酬" prop="salary">
            <el-input v-model="dialogform.salary" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="entryDate" label="入职时间">
            <el-date-picker
              v-model="dialogform.entryDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </el-dialog> -->
    <!-- </div> -->
  </div>
</template>

<script>
import {
  getMemberListApi,
  deleteMember,
  AddMember,
  FindMember,
  EditMember,
} from "../../api/staff";
import baseTable from "../../components/basetable.vue";

export default {
  // data() {
  //   return {

  //     // 弹窗默认隐藏
  //     dialogFormVisible: false,
  //     // 弹窗表单
  //     dialogform: {
  //       username: "",
  //       name: "",
  //       age: "",
  //       mobile: "",
  //       salary: "",
  //       entryDate: "",
  //     },
  //     // 弹窗校验
  //     dialogrules: {
  //       username: [
  //         { required: true, message: "卡号不能为空", trigger: "blur" },
  //       ],
  //       name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
  //       // payType: [{ required: true, message: "类型不能为空", trigger: "change" }],
  //     },
  //     // 标题
  //     dialogtitle: "",
  //     // 接收数据
  //     memberList: [],
  //     // 页码
  //     page: 1,
  //     // 条数
  //     size: 10,
  //     total: null,
  //     // 查询参数
  //     formInline: {
  //       // cardNum: "",
  //       // name: "",
  //       // payType: "",
  //       // birthday: "",
  //       username: "",
  //       name: "",
  //     },
  //   };
  // },

  data() {
    return {
      
      page: 1,
      size: 10,
      total: null,
      memberList: [],
      // 查询参数
      formInline: {
        username: "",
        name: "",
      },
      dialogConfig: {
        title: "",
        width: "500px",
        formWidth: "400",
      },
      dialogRules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        username: [
          { required: true, message: "供应商不能为空", trigger: "blur" },
        ],
      },
      dialogFormItem: [
        {
          label: "账号",
          type: "input",
          prop: "username",
        },
        {
          label: "姓名",
          type: "input",
          prop: "name",
        },
        {
          label: "年龄",
          type: "input",
          prop: "age",
        },
         {
          label: "薪酬",
          type: "input",
          prop: "entryDate",
        },
         {
          label: "年龄",
          type: "input",
          prop: "mobile",
        }
      ],
      dialogVisible: false,
      colums: [
        {
          label: "序号",
          type: "index",
          width: 50,
        },
        {
          label: "账号",
          prop: "username",
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "年龄",
          prop: "age",
        },
        {
          label: "电话",
          prop: "mobile",
        
        },
         {
          label: "薪酬",
          prop: "salary",
        
        },
         {
          label: "入职时间",
          prop: "entryDate",
        
        },
        {
          label: "操作",
          type: "slot",
          slot_name: "opteration",
        },
      ],

      formItem: [
        {
          type: "input",
          placeholder: "账号",
          prop: "username",
        },
        {
          type: "input",
          placeholder: "姓名",
          prop: "name",
        },
        {
          type: "slot",
          slot_name: "query",
        },
      ],

      // 弹窗默认隐藏
      dialogFormVisible: false,
      // 标题
      dialogtitle: "",
      // 接收数据
      memberList: [],
      // 页码
      page: 1,
      // 条数
      size: 10,
      total: null,
      dialogForm: {
        name: "",
        linkman: "",
        remark: "",
        mobile: "",
      },
    };
  },
  created() {
    this.getmemberList();
  },
  components: {
    baseTable,
    queryForm: () => import("../../components/queryForm.vue"),
    "i-dialog": () => import("../../components/Dialog.vue"),
  },
  methods: {
    // 获取会员列表
    async getmemberList() {
      try {
        const { rows, count } = await getMemberListApi(
          this.page,
          this.size,
          this.formInline
        );
        (this.memberList = rows), (this.total = count);
      } catch (error) {
        console.log(error);
      }
    },
    handleSubmit() {
      if (!this.dialogForm.id) {
        this.handleAdd();
      } else {
        this.handleEdit();
      }
    },
    async handleAdd() {
      try {
        const response = await AddMember(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getmemberList();
      } catch (error) {
        console.log(error);
      }
    },
    async handleEdit() {
      try {
        const supplier = await EditMember(this.dialogForm.id, this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("编辑成功");
        this.getmemberList();
      } catch (error) {
        console.log(error);
      }
    },
     del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          try {
            const supplier = await deleteMember(id);
            this.$message.success("删除成功");
            this.getmemberList();
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleOpenDialog(id) {
      this.dialogVisible = true;
      if (typeof id === "number") {
        this.handleFind(id);
        this.dialogConfig.title = "供应商编辑";
        return;
      }
      this.dialogConfig.title = "供应商新增";
    },
    async handleFind(id) {
      try {
        const supplier = await FindMember(id);
        this.dialogForm = supplier;
      } catch (error) {
        console.log(error);
      }
    },

    handleReset() {
      this.$refs["queryForm"].handleResetForm();
    },
    handlequeryform() {
      this.page = 1;
      this.getmemberList();
    },
    handleSize(size) {
      this.size = size;
      this.getmemberList();
    },
    handlePage(page) {
      this.page = page;
      this.getmemberList();
    },

    // 获取会员列表
    // async getmemberList() {
    //   const { rows, total } = await getMemberListApi(
    //     this.page,
    //     this.size,
    //     this.formInline
    //   );
    //   (this.memberList = rows), (this.total = total);
    //   // console.log(rows, total, "1111");
    // },
    // 每页条数
    handleSizeChange(size) {
      //   console.log(value);
      this.size = size;
      this.getmemberList();
    },
    // 当前页数
    handleCurrentChange(page) {
      this.page = page;
      //   console.log(value);
      this.getmemberList();
    },

  },
};
</script>
<style lang="scss">
</style>