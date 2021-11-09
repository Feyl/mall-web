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
        <el-button type="primary" size="small" @click="getPageOfRetailerInfoByCondition(currentPage,currentPageSize)"
          >查询搜索</el-button
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="23" :offset="1">
        <el-row class="search-criteria">
          <el-col :span="7"
            ><label for="name">姓名：</label
            ><el-input
              v-model="retailerQueryData.name"
              id="name"
              placeholder="零售商姓名"
              size="small"
          /></el-col>
          <el-col :span="7"
            ><label for="telephone">电话：</label
            ><el-input
              v-model="retailerQueryData.telephone"
              id="telephone"
              placeholder="零售商电话"
              size="small"
          /></el-col>
          <el-col :span="7"
            ><label for="address">地址：</label
            ><el-input
              v-model="retailerQueryData.address"
              id="address"
              placeholder="零售商地址"
              size="small"
          /></el-col>
        </el-row>
        <el-row class="search-criteria">
          <el-col :span="7">
            <label for="status">状态：</label>
            <el-select
              v-model="retailerQueryData.status"
              placeholder="零售商状态"
              size="small"
            >
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
            <label>创建日期：</label>
            <el-date-picker
              v-model="queryCreateDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              size="small"
              value-format="YYYY-MM-DD HH:mm:ss"
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
        ><el-button size="small" @click="addDialogVisible = true"
          >添加</el-button
        ></el-col
      >
    </el-row>
  </el-card>

  <!-- 数据表格 -->
  <el-table
    ref="multipleTable"
    :data="retailersData"
    style="width: 98%"
    :row-style="{ height: '54px' }"
    :cell-style="{ padding: '0' }"
    border
    @selection-change="handleSelectionChange"
    class="retailer-table"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column property="viewNumber" label="序号" width="60" align="center" />
    <el-table-column property="name" label="姓名" width="120" align="center" />
    <el-table-column
      property="telephone"
      label="手机号"
      width="200"
      align="center"
    />
    <el-table-column
      property="address"
      label="地址"
      show-overflow-tooltip
      align="center"
    />
    <el-table-column label="启用/禁用" width="100" align="center">
      <template #default="scope"
        ><el-switch
          v-model="scope.row.status"
          @change="changeRetailerStatus(scope.row.number - 1)"
      /></template>
    </el-table-column>
    <el-table-column
      property="createTime"
      label="创建日期"
      width="220"
      align="center"
    />
    <el-table-column label="操作" width="180" align="center">
      <template #default="scope">
        <el-button
          size="small"
          @click="getEditRetailerInfo(scope.row.number - 1)"
          >编辑</el-button
        >
        <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="red"
          title="确定要删除此零售商吗?"
          @confirm="deleteRetailerInfo(scope.row.number - 1)"
        >
          <template #reference>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 底部分页导航 -->
  <retailer-manage-footer-nav  :retailer-total-number="retailerTotalNumber" @get-page-of-retailer-info-by-condition="getPageOfRetailerInfoByCondition"/>

  <!-- 添加弹出框 -->
  <el-dialog v-model="addDialogVisible" title="添加零售商信息" width="36%">
    <el-row class="add-dialog-row">
      <el-col :span="14" :offset="4">
        <label for="addName">姓名：</label>
        <el-input
          v-model="addName"
          id="addName"
          size="medium"
          placeholder="请输入姓名"
        />
      </el-col>
      <el-col :span="14" :offset="4">
        <label for="addName">手机号：</label>
        <el-input
          v-model="addTelephone"
          id="addTelephone"
          size="medium"
          placeholder="请输入手机号"
        />
      </el-col>

      <el-col :span="14" :offset="4">
        <label for="addName">地址：</label>
        <el-input
          v-model="addAddress"
          id="addAddress"
          :rows="2"
          type="textarea"
          placeholder="请输入地址"
        />
      </el-col>
      <el-col :span="14" :offset="4">
        <label for="addStatus" id="">状态：</label>
        <el-select
          v-model="addStatus"
          id="addStatus"
          size="medium"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in addStatuslist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false" size="small"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="addDialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 编辑弹出框 -->
  <el-dialog v-model="editDialogVisible" title="编辑零售商信息" width="36%">
    <el-row class="edit-dialog-row">
      <el-col :span="14" :offset="4">
        <label for="editName">姓名：</label>
        <el-input
          v-model="retailerEditInfo.name"
          id="editName"
          size="medium"
          placeholder="请输入姓名"
        />
      </el-col>
      <el-col :span="14" :offset="4">
        <label for="editTelephone">手机号：</label>
        <el-input
          v-model="retailerEditInfo.telephone"
          id="editTelephone"
          size="medium"
          placeholder="请输入手机号"
        />
      </el-col>

      <el-col :span="14" :offset="4">
        <label for="editAddress">地址：</label>
        <el-input
          v-model="retailerEditInfo.address"
          id="editAddress"
          :rows="2"
          type="textarea"
          placeholder="请输入地址"
        />
      </el-col>
      <el-col :span="14" :offset="4">
        <label for="editStatus" id="">状态：</label>
        <el-select
          v-model="retailerEditInfo.status"
          id="editStatus"
          size="medium"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in editStatuslist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false" size="small"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="editRetailerInfo"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { Search, Document } from "@element-plus/icons";
import { ref } from "@vue/reactivity";
import { onMounted, reactive, toRefs } from "vue";
import RetailerManageFooterNav from "./RetailerManageFooterNav.vue";
import retailerApi from "@/api/retailer";
export default {
  name: "RetailerManage",
  components: {
    /* el */
    Search,
    Document,
    /*  */
    RetailerManageFooterNav,
  },
  setup() {
    /* 搜索相关的信息 */
    let statuslist = ref([
      {
        value: null,
        label: "全部",
      },
      {
        value: 0,
        label: "启用",
      },
      {
        value: 1,
        label: "禁用",
      },
    ]);

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
      queryCreateDate: [], //queryCreateDate: [new Date(2021, 1, 1, 0, 0), new Date(2021, 11, 1, 0, 0)],
    });
    let states = toRefs(state);

    let retailerQueryData = reactive({
      name: "",
      telephone: "",
      address: "",
      status: "",
      startTime: states.queryCreateDate.value[0],
      endTime: states.queryCreateDate.value[1],
    });

    /* 表格中零售商的信息 */
    let retailersData = reactive([
      /*       {
        number: 1,
        name: "Tom",
        telephone: "15998960683",
        address: "No. 189, Grove St, Los Angeles",
        status: true,
        date: "2021-11-01 00:00:00",
      },
      {
        number: 2,
        name: "Tom",
        telephone: "15998960683",
        address: "No. 189, Grove St, Los Angeles",
        status: true,
        date: "2021-11-01 00:00:00",
      },
      {
        number: 3,
        name: "Tom",
        telephone: "15998960683",
        address: "No. 189, Grove St, Los Angeles",
        status: true,
        date: "2021-11-01 00:00:00",
      } */
    ]);
    const retailerSelection = [];

    function toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }

    function handleSelectionChange(val) {
      this.retailerSelection = val;
    }

    /* 添加弹出框 */
    const addDialogVisible = ref(false);
    let addName = ref("");
    let addTelephone = ref("");
    let addAddress = ref("");
    const addStatuslist = ref([
      {
        value: 0,
        label: "启用",
      },
      {
        value: 1,
        label: "禁用",
      },
    ]);
    let addStatus = ref("");

    /* 编辑弹出框 */
    const editDialogVisible = ref(false);

    let retailerEditInfo = reactive({
      name: "",
      telephone: "",
      address: "",
      status: 0,
    });

    const editStatuslist = ref([
      {
        value: 0,
        label: "启用",
      },
      {
        value: 1,
        label: "禁用",
      },
    ]);

    onMounted(() => {
      getPageOfRetailerInfoByCondition(1,10);
    });

    /* api function */

    /* 根据条件查询零售商信息 */
    function getInfoByCondition() {
      retailerQueryData.startTime = states.queryCreateDate.value[0];
      retailerQueryData.endTime = states.queryCreateDate.value[1];
      let number = 0;
      retailerApi.getInfoByCondition(retailerQueryData).then((res) => {
        retailersData.length = 0;
        res.data.forEach(function (retailer) {
          retailer.status = retailer.status === 0;
          retailer.number = ++number;
          retailersData.push(retailer);
        });
      });
    }

    /* 获取所有零售商信息 */
    function getAllRetailersInfo() {
      let number = 0;
      retailerApi.getAllInfo().then((res) => {
        retailersData.length = 0;
        res.data.forEach(function (retailer) {
          retailer.number = ++number;
          retailer.status = retailer.status === 0;
          retailersData.push(retailer);
        });
      });
    }

    /* let selectedEditRetailer; */
    function getEditRetailerInfo(number) {
      editDialogVisible.value = true;
      const selectedEditRetailer = retailersData[number];
      console.log(selectedEditRetailer);
      retailerEditInfo.id = selectedEditRetailer.id;
      retailerEditInfo.name = selectedEditRetailer.name;
      retailerEditInfo.telephone = selectedEditRetailer.telephone;
      retailerEditInfo.address = selectedEditRetailer.address;
      if (selectedEditRetailer.status == true) {
        retailerEditInfo.status = 0;
      } else {
        retailerEditInfo.status = 1;
      }
    }

    /* 编辑零售商信息 */
    function editRetailerInfo() {
      editDialogVisible.value = false;
      retailerApi.update(retailerEditInfo).then((res) => {
        getAllRetailersInfo();
      });
      /* selectedEditRetailer.name = retailerEditInfo.name;
      selectedEditRetailer.telephone = retailerEditInfo.telephone;
      selectedEditRetailer.address = retailerEditInfo.address;
      selectedEditRetailer.status = retailerEditInfo.status===0; */
      /* getAllRetailersInfo(); */
    }

    /* 删除零售商信息 */
    function deleteRetailerInfo(number) {
      retailerApi.delete(retailersData[number].id).then((res) => {
        getAllRetailersInfo();
      });
    }

    /* 修改零售商信息状态 */
    function changeRetailerStatus(number) {
      const retailer = retailersData[number];
      if (retailer.status) {
        retailer.status = 0;
        retailerApi.update(retailer);
        retailer.status = true;
      } else {
        retailer.status = 1;
        retailerApi.update(retailer);
        retailer.status = false;
      }
    }

    /* 分页查询 */

    /* 当前页码、商品总数量 */
    let currentPage = 1;
    let retailerTotalNumber = ref();
    let currentPageSize = 10;

    function getPageOfRetailerInfoByCondition(currentPage, pageSize) {
      retailerQueryData.startTime = states.queryCreateDate.value[0];
      retailerQueryData.endTime = states.queryCreateDate.value[1];
      let number = 0;
      let viewNumber = (currentPage - 1) * pageSize;
      currentPageSize = pageSize;
      retailerApi
        .getPageOfInfoByCondition(currentPage, pageSize, retailerQueryData)
        .then((res) => {
          retailersData.length = 0;
          retailerTotalNumber.value = res.data.retailerTotalNumber;
          res.data.retailersInfo.forEach(function (retailer) {
            retailer.status = retailer.status === 0;
            retailer.number = ++number;
            retailer.viewNumber = ++viewNumber;
            retailersData.push(retailer);
          });
        });
    }

    return {
      /* 变量 */
      /* 搜索相关的信息 */
      retailerQueryData,

      statuslist,
      ...states,

      /* 表格中零售商的信息 */

      retailersData,
      retailerSelection,

      /* 添加弹出框 */
      addName,
      addTelephone,
      addAddress,
      addStatuslist,
      addStatus,

      /* 编辑弹出框 */
      retailerEditInfo,
      editStatuslist,

      /* 函数 */

      /* 表格复选按钮 */
      toggleSelection,
      handleSelectionChange,

      /* 编辑弹出框 */
      editDialogVisible,
      addDialogVisible,

      /* api funtion */
      getAllRetailersInfo,

      /* 根据条件查询零售商信息 */
      getInfoByCondition,

      /* 编辑零售商信息 */
      getEditRetailerInfo,
      editRetailerInfo,

      /* 修改零售商状态 */
      changeRetailerStatus,

      /* 删除零售商信息 */
      deleteRetailerInfo,

      /* 分页查询 */
      currentPage,
      currentPageSize,
      retailerTotalNumber,
      getPageOfRetailerInfoByCondition,

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

/* 表格 */
.retailer-table {
  margin-bottom: 30px;
}

/* 编辑弹出框 */
.add-dialog-row,
.edit-dialog-row {
  width: 100%;
  .el-col {
    display: flex;
    margin-bottom: 16px;
    label {
      line-height: 30px;
      width: 80px;
    }
  }
}
</style>
