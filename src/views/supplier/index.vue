<template>
  <div class="mt-20">
    <queryForm
      v-model.sync="queryFormParams"
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
  </div>
</template>

<script>
import {
  getMemberListApi,
  deleteMember,
  AddMember,
  FindMember,
  EditMember,
} from "../../api/supplier";
import baseTable from "../../components/basetable.vue";
const payTypeEnum = {
  1: "微信",
  2: "现金",
  3: "支付宝",
  4: "银行卡",
};
export default {
  data() {
    return {
      dialogConfig: {
        title: "",
        width: "500px",
        formWidth: "400",
      },
      dialogRules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        linkman: [
          { required: true, message: "供应商不能为空", trigger: "blur" },
        ],
      },
      dialogFormItem: [
        {
          label: "供应商名称",
          type: "input",
          prop: "name",
        },
        {
          label: "联系人",
          type: "input",
          prop: "linkman",
        },
        {
          label: "联系电话",
          type: "input",
          prop: "mobile",
        },
        {
          label: "备注",
          type: "input",
          prop: "remark",
        },
      ],
      dialogVisible: false,
      colums: [
        {
          label: "序号",
          type: "index",
          width: 50,
        },
        {
          label: "供应商",
          prop: "name",
        },
        {
          label: "联系人",
          prop: "linkman",
        },
        {
          label: "联系电话",
          prop: "mobile",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "操作",
          type: "slot",
          slot_name: "opteration",
        },
      ],
      queryFormParams: {
        linkman: "",
        name: "",
        mobile: "",
      },
      formItem: [
        {
          type: "input",
          placeholder: "供应商名称",
          prop: "name",
        },
        {
          type: "input",
          placeholder: "联系人",
          prop: "linkman",
        },
        {
          type: "input",
          placeholder: "电话",
          prop: "mobile",
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
  components: {
    baseTable,
    queryForm: () => import("../../components/queryForm.vue"),
    "i-dialog": () => import("../../components/Dialog.vue"),
  },
  created() {
    this.getmemberList();
  },
  methods: {
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
    async getmemberList() {
      const { rows, count } = await getMemberListApi(
        this.page,
        this.size,
        this.formInline
      );
      (this.memberList = rows), (this.total = count);
      // console.log(rows, total, "1111");
    },
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

    // 删除单个会员信息
    // handleDel(id) {
    //   // console.log(id);
    //   this.$confirm("确认删除这条记录吗 ?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(async () => {
    //       try {
    //         const response = await deleteMember(id);
    //         this.$message.success("删除成功");
    //         this.getmemberList();
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
  },
};
</script>
<style lang="scss">
</style>