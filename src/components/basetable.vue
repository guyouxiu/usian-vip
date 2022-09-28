<template>
  <div>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <template v-for="item in colums">
        <el-table-column v-if="!item.type" v-bind="item"> </el-table-column>
        <el-table-column v-if="item.type === 'slot'" v-bind="item">
          <template v-slot="scope">
           <slot :name="item.slot_name" :row='scope.row' ></slot>
          </template>
        </el-table-column>
        <el-table-column v-if="item.type === 'index'" v-bind="item">
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pages"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="size"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "i-table",
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    colums: {
      type: Array,
      default: () => [],
    },
    page: {
      type: [Number, String],
      default: 1,
    },
    size: {
      type: [Number, String],
      default: 10,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50],
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    pages: Boolean,
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("size", size);
    },
    handleCurrentChange(page) {
      this.$emit("page", page);
    },
  },
};
</script>