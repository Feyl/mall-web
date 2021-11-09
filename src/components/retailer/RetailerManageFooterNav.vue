<template>
  <el-row>
    <el-col :span="6">
      <el-select v-model="operation" placeholder="批量操作" size="small">
        <el-option
          v-for="item in operations"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click="batchOperate"
        >确认</el-button
      >
    </el-col>
    <el-col :span="8" :offset="4">
      <el-pagination
        v-model:currentPage="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="retailerTotalNumber"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "@vue/reactivity";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  name: "RetailerManageFooterNav",
  props: {
    retailerTotalNumber: Number,
  },
  emits: ["get-page-of-retailer-info-by-condition"],

  setup({ emit }, context) {
    /* 批量处理选择器 */
    const operations = ref([
      {
        value: "enable",
        label: "批量启用",
      },
      {
        value: "disable",
        label: "批量禁用",
      },
      {
        value: "delete",
        label: "批量删除",
      },
    ]);
    let operation = ref("");

    const batchOperate = () => {
      ElMessageBox.confirm("是否要进行该批量操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          /* 确定后执行的动作... */
          ElMessage({
            type: "success",
            message: "操作成功",
          });
        })
        .catch(() => {
          /* 取消后执行的动作... */
          ElMessage({
            type: "info",
            message: "操作被取消",
          });
        });
    };

    /* 分页 */
    let currentPage = ref(1);
    let pageSize = ref(10);
    

    const handleSizeChange = (val) => {
      pageSize.value = val;
      context.emit(
        "get-page-of-retailer-info-by-condition",
        currentPage.value,
        pageSize.value
      );
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      currentPage.value = val;
      context.emit(
        "get-page-of-retailer-info-by-condition",
        currentPage.value,
        pageSize.value
      );
      console.log(`current page: ${val}`);
    };

    let curpage = ref(1);

    return {
      /* 批处理选择器 */
      operations,
      operation,
      batchOperate,

      /* 分页 */
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="less" scoped>
.el-select {
  margin-right: 20px;
}
</style>
