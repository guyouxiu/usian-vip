<template>
  <el-dialog
    :title="dialogConfig.title"
    :width="dialogConfig.width"
    :visible.sync="visible"
  >
    <el-form
    :rules='dialogRules'
      :model="value"
      ref="dialogform"
      :label-width="labelWidth"
      :style="{ width: `${dialogConfig.formWidth}px` }"
    >
      <template v-for="item in dialogFormItem">
        <el-form-item :label="item.label" v-bind="item">
          <el-input v-model="value[item.prop]" autocomplete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="dialogSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "index",
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: [Number, String],
      default: "80px",
    },
    dialogFormItem: {
      type: Array,
      default: () => [],
    },
    dialogConfig: {
      type: Object,
      default: () => {},
    },
    dialogRules: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val);
      },
    },
  },
  methods: {
    dialogSubmit(){
        this.$refs['dialogform'].validate(valid=>{
            if(!valid) return
            
            this.$emit('submit')
        })
    }
  },
};
</script>