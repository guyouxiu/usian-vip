<template>
  <div class="mt-20">
    <el-form
      :inline="true"
      :model="formInline"
      ref="ruleForm"
      class="demo-form-inline"
    >
      <el-form-item prop="name">
        <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="formInline.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          v-model="formInline.supplierName"
          placeholder="选择供应商"
        ></el-input>
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
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="supplierID" label="商品编码"> </el-table-column>
      <el-table-column prop="spec" label="商品规格"> </el-table-column>
      <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
      <el-table-column prop="storageNum" label="库存数量"> </el-table-column>
      <el-table-column prop="supplierName" label="供应商"> </el-table-column>
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
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="dialogform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品编码" prop="code">
            <el-input v-model="dialogform.code" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="spec">
            <el-input v-model="dialogform.spec" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="零售价" prop="retailPrice">
            <el-input
              v-model="dialogform.retailPrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="进货价" prop="purchasePrice">
            <el-input
              v-model="dialogform.purchasePrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="库存数量" prop="storageNum">
            <el-input
              v-model="dialogform.storageNum"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="supplierName">
            <el-input v-model="dialogform.supplierName" autocomplete="off">
              <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
                <el-dialog
                  width="30%"
                  title="内层 Dialog"
                  :visible.sync="innerVisible"
                  append-to-body
                >
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="outerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="innerVisible = true"
                    >打开内层 Dialog</el-button
                  >
                </div>
              </el-dialog>
            </el-input>
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
} from "../../api/goods";
export default {
  data() {
    return {
      // 内置弹窗
      outerVisible:false,
      innerVisible: false,
      // 弹窗默认隐藏
      dialogFormVisible: false,
      // 弹窗表单
      dialogform: {
        linkman: "",
        mobile: "",
        name: "",
        remark: "",
      },
      // 弹窗校验
      dialogrules: {
        name: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        code: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        retailPrice: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
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
        code: "",
        name: "",
        supplierName: "",
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
        this.$message.success("添加成功");
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
        this.$message.success("编辑成功");
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