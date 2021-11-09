<template>
  <!-- 筛选搜索 -->
  <el-card class="box-card" shadow="never">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-icon :size="16"><search /></el-icon>
        <span class="search-title">筛选搜索</span>
      </el-col>
      <el-col :span="4" :offset="14" class="search-button">
        <el-button size="small">重置</el-button>
        <el-button type="primary" size="small">查询搜索</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="23" :offset="1">
        <el-row class="search-criteria">
          <el-col :span="7"
            ><label for="barcode">合同号：</label
            ><el-input
              v-model="barcode"
              id="barcode"
              placeholder="合同号"
              size="small"
          /></el-col>

          <el-col :span="7"
            ><label for="retailerName">零售商：</label
            ><el-input
              v-model="retailerName"
              id="retailerName"
              placeholder="零售商"
              size="small"
          /></el-col>

          <el-col :span="7">
            <label for="type">类型：</label>
            <el-select v-model="type" placeholder="类型" size="small">
              <el-option
                v-for="item in typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                id="type"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="search-criteria">
          <el-col :span="7" offset="1">
            <label for="status">状态：</label>
            <el-select v-model="status" placeholder="零售商状态" size="small">
              <el-option
                v-for="item in statuslist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                id="status"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="10">
            <label for="createDate">创建日期：</label>
            <el-date-picker
              v-model="createDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              size="small"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>

  <!-- 数据列表/添加 -->
  <el-card class="box-card" shadow="never">
    <el-row>
      <el-col :span="6" class="data-list-col"
        ><el-icon :size="16"><document /></el-icon
        ><span class="datalist-title">数据列表</span></el-col
      >
      <el-col :span="2" :offset="16"
        ><el-button size="small" @click="toAddContract">添加</el-button></el-col
      >
    </el-row>
  </el-card>

  <!-- 数据表格合同列表 -->
  <el-table
    ref="multipleTable"
    :data="contractData"
    style="width: 98%"
    :row-style="{ height: '54px' }"
    :cell-style="{ padding: '0' }"
    border
    class="contract-table"
    @selection-change="handleContractSelectionChange"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column property="number" label="序号" width="60" align="center" />
    <el-table-column label="合同编号" width="180" align="center">
      <template #default="scope">
        <el-link @click="viewContractDetail(scope.row.barcode)">{{
          scope.row.barcode
        }}</el-link>
      </template>
    </el-table-column>
    <el-table-column
      property="retailerName"
      label="零售商"
      width="120"
      align="center"
    />
    <el-table-column property="type" label="类型" width="100" align="center" />
    <el-table-column
      property="money"
      label="合同金额"
      width="100"
      align="center"
    />
    <el-table-column
      property="payment"
      label="支付方式"
      width="100"
      align="center"
    />
    <el-table-column
      property="status"
      label="合同状态"
      width="120"
      align="center"
    />
    <el-table-column property="createTime" label="创建时间" align="center" />
    <el-table-column label="操作" width="180" align="center">
      <el-button size="small" @click="editDialogVisible = true">编辑</el-button>
      <el-popconfirm
        confirm-button-text="确认"
        cancel-button-text="取消"
        icon-color="red"
        title="确定要删除此合同吗?"
      >
        <template #reference>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-popconfirm>
    </el-table-column>
  </el-table>
  <!-- 底部分页导航 -->
  <contract-manage-footer-nav />
</template>

<script>
import { Search, Document } from "@element-plus/icons";
import { ref } from "vue-demi";
import { reactive, toRefs } from "vue";
import ContractManageFooterNav from "./ContractManageFooterNav.vue";
import { useRouter } from "vue-router";
export default {
  name: "ContractManage",
  components: {
    /* el */
    Search,
    Document,
    /*  */
    ContractManageFooterNav,
  },
  setup() {
    /* 筛选搜索 */
    let barcode = ref("");
    let retailerName = ref("");
    const typelist = ref([
      {
        value: 0,
        label: "省内",
      },
      {
        value: 1,
        label: "省外",
      },
    ]);
    let type = ref();
    const statuslist = ref([
      {
        value: 0,
        label: "待支付",
      },
      {
        value: 1,
        label: "待发货",
      },
      {
        value: 2,
        label: "已发货",
      },
      {
        value: 3,
        label: "待收货",
      },
      {
        value: 4,
        label: "已完成",
      },
      {
        value: 5,
        label: "已关闭",
      },
    ]);
    let status = ref();

    const state = reactive({
      shortcuts: [
        {
          text: "Last week",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "Last month",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "Last 3 months",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      createDate: [], //createDate: [new Date(2021, 1, 1, 0, 0), new Date(2021, 11, 1, 0, 0)],
    });
    let states = toRefs(state);

    const router = useRouter();
    /* 数据列表/添加 */
    function toAddContract() {
      router.push("/contract/add");
    }

    /* 数据表格合同列表 */
    let contractData = [
      {
        number: 1,
        barcode: "cq156a41s6d4a",
        retailerName: "小李",
        type: "省外",
        money: 1800,
        payment: "微信",
        status: "待收货",
        createTime: "2021-11-1",
      },
      {
        number: 2,
        barcode: "cq156a41s6d4a",
        retailerName: "小李",
        type: "省外",
        money: 1800,
        payment: "微信",
        status: "待收货",
        createTime: "2021-11-1",
      },
      {
        number: 3,
        barcode: "cq156a41s6d4a",
        retailerName: "小李",
        type: "省外",
        money: 1800,
        payment: "微信",
        status: "待收货",
        createTime: "2021-11-1",
      },
      {
        number: 4,
        barcode: "cq156a41s6d4a",
        retailerName: "小李",
        type: "省外",
        money: 1800,
        payment: "微信",
        status: "待收货",
        createTime: "2021-11-1",
      },
      {
        number: 5,
        barcode: "cq156a41s6d4a",
        retailerName: "小李",
        type: "省外",
        money: 1800,
        payment: "微信",
        status: "待收货",
        createTime: "2021-11-1",
      },
    ];
    let contractSelection = [];
    function handleContractSelectionChange(val) {
      this.multipleSelection = val;
    }

    return {
      /* 筛选搜索 */
      barcode,
      retailerName,
      typelist,
      type,
      statuslist,
      status,
      ...states,
      /* 数据列表/添加 */
      toAddContract,

      /* 表格数据合同列表 */
      contractData,
      contractSelection,
      handleContractSelectionChange,
    };
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 16px 0;
  width: 98%;
}
.search-title,
.datalist-title {
  margin-left: 6px;
  position: relative;
  bottom: 2px;
}
.search-button .el-button {
  margin: 0 8px;
}
.search-criteria {
  margin: 8px 0;
  .el-col {
    margin: 12px 0;
    display: flex;
    label {
      margin-right: 6px;
      line-height: 32px;
      font-size: 14px;
    }
    .el-input {
      width: 220px;
    }
  }
}

/* 数据列表 */
.data-list-col {
  line-height: 32px;
}
/* 表格数据合同列表 */
.contract-table {
  margin-bottom: 30px;
}
</style>
