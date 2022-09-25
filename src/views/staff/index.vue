<template>
  <div class="mt-20">
    <el-form
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
    </el-form>
    <!-- 表格 -->
    <el-table :data="memberList" height="350" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="salary" label="薪酬"> </el-table-column>
      <el-table-column prop="entryDate" label="入职时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template v-slot="scope">
          <el-button size="small" @click="handleOpen(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block mt-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 新增弹窗 -->
      <el-dialog
        :title="dialogtitle"
        :visible.sync="dialogFormVisible"
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
      </el-dialog>
    </div>
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
export default {
  data() {
    return {
      // 弹窗默认隐藏
      dialogFormVisible: false,
      // 弹窗表单
      dialogform: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      // 弹窗校验
      dialogrules: {
        username: [
          { required: true, message: "卡号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        // payType: [{ required: true, message: "类型不能为空", trigger: "change" }],
      },
      // 标题
      dialogtitle: "",
      // 接收数据
      memberList: [],
      // 页码
      page: 1,
      // 条数
      size: 10,
      total: null,
      // 查询参数
      formInline: {
        // cardNum: "",
        // name: "",
        // payType: "",
        // birthday: "",
        username: "",
        name: "",
      },
    };
  },

  created() {
    this.getmemberList();
  },
  methods: {
    // 获取会员列表
    async getmemberList() {
      const { rows, total } = await getMemberListApi(
        this.page,
        this.size,
        this.formInline
      );
      (this.memberList = rows), (this.total = total);
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
    // 搜索
    search(ruleForm) {
      this.page = 1;
      this.getmemberList();
    },
    // 重置搜索框
    getInit(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除单个会员信息
    handleDel(id) {
      // console.log(id);
      this.$confirm("确认删除这条记录吗 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await deleteMember(id);
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
    // 按钮，打开弹窗
    handleOpen(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.dialogtitle = "编辑会员";
        this.handleFind(id);
        return;
      }
      this.dialogtitle = "会员新增";
    },

    // 弹窗提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((validate) => {
        if (!validate) return;
        // console.log(this.dialogform);
        // 调用会员添加方法
        // this.handleAdd();
        this.dialogform.id ? this.handleEdit() : this.handleAdd();
      });
    },
    // 会员添加方法
    async handleAdd() {
      try {
        const response = await AddMember(this.dialogform);
        console.log(response);
        this.getInit("dialogForm");
        this.dialogFormVisible = false;
        this.$message.warning("新增成功, 初始密码为:123456");
        this.getmemberList();
      } catch (error) {
        console.log(error);
      }
    },
    // 会员编辑方法
    async handleEdit() {
      try {
        const response = await EditMember(this.dialogform.id);
        this.getInit("dialogForm");
        this.dialogFormVisible = false;
        // this.$message.success("编辑成功");
        this.getmemberList();
      } catch (error) {
        console.log(error);
      }
    },
    // 查询单个会员数据
    async handleFind(id) {
      try {
        const member = await FindMember(id);
        // console.log(member);
        this.dialogform = member;
        // this.handleEdit()
      } catch (error) {
        console.log(error);
      }
    },
    // 弹窗取消功能
    handleCancel() {
      this.getInit("dialogForm");
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss">
</style>