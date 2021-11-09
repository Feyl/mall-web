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
        <el-button type="primary" size="small" @click="getPageOfProductInfoByCondition(currentPage,currentpageSize)"
          >查询搜索</el-button
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="23" :offset="1">
        <el-row class="search-criteria">
          <el-col :span="7"
            ><label for="name">名称：</label
            ><el-input
              v-model="productQueryData.name"
              id="name"
              placeholder="商品名称"
              size="small"
          /></el-col>
          <el-col :span="7"
            ><label for="locality">产地：</label
            ><el-input
              v-model="productQueryData.locality"
              id="locality"
              placeholder="商品产地"
              size="small"
          /></el-col>
          <el-col :span="10"
            ><label for="lowerPrice">价格：</label
            ><el-input
              v-model="productQueryData.lowerPrice"
              id="lowerPrice"
              class="price-input"
              placeholder="价格下限"
              size="small"
            />
            <el-icon>
              <minus style="margin-top: 10px" />
            </el-icon>
            <el-input
              v-model="productQueryData.upperPrice"
              id="upperPrice"
              class="price-input"
              placeholder="价格上限"
              size="small"
            />
          </el-col>
        </el-row>

        <el-row class="search-criteria">
          <el-col :span="7">
            <label for="status">状态：</label>
            <el-select
              v-model="productQueryData.status"
              placeholder="商品状态"
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
        ><span class="search-title">数据列表</span></el-col
      >
      <el-col :span="2" :offset="16"
        ><el-button size="small" @click="toAddProduct">添加</el-button></el-col
      >
    </el-row>
  </el-card>

  <!-- 数据表格 -->
  <el-table
    ref="multipleTable"
    :data="productsData"
    style="width: 98%"
    :row-style="{ height: '54px' }"
    :cell-style="{ padding: '0' }"
    border
    @selection-change="handleProductSelectionChange"
    class="retailer-table"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column property="viewNumber" label="序号" width="60" align="center" />
    <el-table-column property="name" label="名称" width="120" align="center" />
    <el-table-column label="商品图片" width="180" align="center">
      <template #default="scope">
        <el-image
          style="width: 100px; height: 100px; margin-top: 7px"
          :src="scope.row.image"
          :alt="scope.row.image"
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column property="price" label="价格" width="100" align="center" />
    <el-table-column
      property="locality"
      label="产地"
      show-overflow-tooltip
      align="center"
    />
    <el-table-column label="上架/下架" width="100" align="center">
      <template #default="scope"
        ><el-switch
          v-model="scope.row.status"
          @change="changeProductStatus(scope.row.number - 1)"
      /></template>
    </el-table-column>

    <el-table-column
      property="createTime"
      label="创建日期"
      width="220"
      align="center"
    />
    <el-table-column label="操作" width="240" align="center">
      <template #default="scope">
        <el-button
          size="small"
          @click="getEditProductInfo(scope.row.number - 1)"
          >编辑</el-button
        >
        <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="red"
          title="确定要删除此商品吗?"
          @confirm="deleteProductInfo(scope.row.number - 1)"
        >
          <template #reference>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button
          type="primary"
          size="small"
          @click="getAccessoriesInfo(scope.row.number - 1)"
          >附属品</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 底部分页导航 -->
  <product-manage-footer-nav :product-total-number="productTotalNumber" @get-page-of-product-info-by-condition="getPageOfProductInfoByCondition"/>

  <!-- 编辑弹出框 -->
  <el-dialog v-model="editDialogVisible" title="编辑商品信息" width="36%">
    <el-row class="edit-dialog-row">
      <el-col :span="14" :offset="4">
        <label for="editName">名称：</label>
        <el-input
          v-model="productEditInfo.name"
          id="editName"
          size="medium"
          placeholder="请输入姓名"
        />
      </el-col>
      <el-col :span="14" :offset="4">
        <label for="editImage">图片：</label>
        <el-upload
          action="src/assets/upload/image"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="filelist"
          list-type="picture"
          id="editImage"
        >
          <el-button size="small" type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">jpg/png 文件大小不多于500kb</div>
          </template>
        </el-upload>
      </el-col>
      <el-col :span="14" :offset="4">
        <label for="editPrice">价格：</label>
        <el-input
          v-model="productEditInfo.price"
          id="editPrice"
          size="medium"
          placeholder="请输入价格"
        />
      </el-col>

      <el-col :span="14" :offset="4">
        <label for="editLocality">产地：</label>
        <el-input
          v-model="productEditInfo.locality"
          id="editLocality"
          :rows="2"
          type="textarea"
          placeholder="请输入产地"
        />
      </el-col>
      <el-col :span="14" :offset="4">
        <label for="editStatus" id="">状态：</label>
        <el-select
          v-model="productEditInfo.status"
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
        <el-button type="primary" size="small" @click="editProductInfo"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 附属商品弹出框 -->
  <el-dialog v-model="accessoryDialogVisible" title="附属商品管理" width="42%">
    <el-row class="accessory-dialog-row">
      <el-col :span="10" :offset="1">
        <label for="addAssessoryName">名称：</label
        ><el-input
          v-model="addAssessoryName"
          id="addAssessoryName"
          placeholder="附属商品名称"
          size="small"
          style="width: 180px"
        />
      </el-col>
      <el-col :span="8">
        <label for="addAssessoryPrice">价格：</label
        ><el-input
          v-model="addAssessoryPrice"
          id="addAssessoryPrice"
          placeholder="附属商品价格"
          size="small"
          style="width: 120px"
        />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small">添加</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="20" :offset="2">
        <el-table
          ref="multipleTable"
          :data="accessoryData"
          style="width: 100%"
          :row-style="{ height: '54px' }"
          :cell-style="{ padding: '0' }"
          @selection-change="handleAccessorySelectionChange"
        >
          <el-table-column type="selection" width="40" />
          <el-table-column
            property="name"
            label="名称"
            width="120"
            align="center"
          />
          <el-table-column
            property="price"
            label="价格"
            width="60"
            align="center"
          />
          <el-table-column
            property="createDate"
            label="创建日期"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column label="操作" width="80" align="center">
            <el-button
              type="primary"
              plain
              size="small"
              @click="editAccessoryDialogVisible = true"
              >编辑</el-button
            >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top: 12px">
      <el-col :span="4" :offset="2">
        <b>总价格：</b>
      </el-col>
      <el-col :span="2" :offset="14">
        <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="red"
          title="确定要批量删除附属商品吗?"
        >
          <template #reference>
            <el-button type="danger" size="small">批量删除</el-button>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>

    <!-- 编辑附属商品内部弹框 -->
    <el-dialog
      v-model="editAccessoryDialogVisible"
      width="20%"
      title="编辑附属商品"
      append-to-body
      custom-class="edit-accessory-dialog"
    >
      <el-row>
        <el-col :span="24">
          <label for="editAssessoryName">名称：</label
          ><el-input
            v-model="editAssessoryName"
            id="editAssessoryName"
            placeholder="附属商品名称"
            size="small"
            style="width: 180px"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label for="editAssessoryPrice">价格：</label
          ><el-input
            v-model="editAssessoryPrice"
            id="editAssessoryPrice"
            placeholder="附属商品价格"
            size="small"
            style="width: 120px"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="18">
          <el-button type="primary" size="small">确认</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { Search, Document, Minus } from "@element-plus/icons";
import { ElMessageBox } from "element-plus";
import { ref, toRaw } from "@vue/reactivity";
import { onMounted, reactive, toRefs} from "vue";
import ProductManageFooterNav from "./ProductManageFooterNav.vue";
import router from "@/router/index.js";
import productApi from "../../api/product";
import accessoryApi from "../../api/accessory";
export default {
  name: "ProductManage",
  components: {
    /* el */
    Search,
    Document,
    Minus,
    /*  */
    ProductManageFooterNav,
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
        label: "上架",
      },
      {
        value: 1,
        label: "下架",
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

    let productQueryData = reactive({
      name: "",
      locality: "",
      lowerPrice: "",
      upperPrice: "",
      status: "",
      startTime: states.queryCreateDate.value[0],
      endTime: states.queryCreateDate.value[1],
    });

    /* 表格中商品的信息 */
    let productsData = reactive([
      /*       {
        number: 1,
        name: "火龙果",
        image:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        price: 100.5,
        locality: "浙江省金华市",
        status: true,
        createTime: "2021-11-01 00:00:00",
      },
      {
        number: 2,
        name: "火龙果",
        image:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        price: 100.5,
        locality: "浙江省金华市",
        status: true,
        createTime: "2021-11-01 00:00:00",
      },
      {
        number: 3,
        name: "火龙果",
        image:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        price: 100.5,
        locality: "浙江省金华市",
        createTime: "2021-11-01 00:00:00",
      } */
    ]);
    const productSelection = [];

    function handleProductSelectionChange(val) {
      this.productSelection = val;
    }

    /* 编辑弹出框 */
    const editDialogVisible = ref(false);

    let productEditInfo = reactive({
      name: "",
      price: 0,
      locality: "",
      status: 0,
    });

    const editStatuslist = ref([
      {
        value: 0,
        label: "上架",
      },
      {
        value: 1,
        label: "下架",
      },
    ]);

    //上传的图片文件列表
    let filelist = [
      {
        name: "fruit.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      },
    ];
    /* 商品图片上传 */
    function handleRemove(file, filelist) {
      console.log(file, filelist);
    }
    function handlePreview(file) {
      console.log(file);
    }
    function handleExceed(files, filelist) {
      this.$message.warning(
        `上传限制数量为1个, 你选择了 ${files.length} 个图片, 一共 ${
          files.length + filelist.length
        } 个图片`
      );
    }

    function beforeRemove(file, filelist) {
      return ElMessageBox.confirm(`取消图片 ${file.name} 的上传吗?`, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      });
    }

    /* 附属商品弹出框 */
    let accessoryDialogVisible = ref(false);
    let editAccessoryDialogVisible = ref(false);
    let addAssessoryName = ref("");
    let addAssessoryPrice = ref("");
    let accessoryData = reactive([
      /*  {
        name: "捆绳",
        price: "1.5",
        createDate: "2016-05-03",
      },
      {
        name: "捆绳",
        price: "1.5",
        createDate: "2016-05-03",
      },
      {
        name: "捆绳",
        price: "1.5",
        createDate: "2016-05-03",
      }, */
    ]);
    const accessorySelection = [];

    function handleAccessorySelectionChange(val) {
      accessorySelection = val;
    }

    let editAssessoryName = ref("");
    let editAssessoryPrice = ref("");

    function toAddProduct() {
      router.push("/product/add");
    }

    /* 根据条件查询商品的信息 */
    function getInfoByCondition() {
      productQueryData.startTime = states.queryCreateDate.value[0];
      productQueryData.endTime = states.queryCreateDate.value[1];
      let number = 0;
      productApi.getInfoByCondition(productQueryData).then((res) => {
        productsData.length = 0;
        res.data.forEach(function (product) {
          product.status = product.status === 0;
          product.number = ++number;
          productsData.push(product);
        });
      });
    }

    /* 调用api获取所有商品的信息 */
    function getAllProductsInfo() {
      let number = 0;
      productApi.getAllInfo().then((res) => {
        productsData.length = 0;
        res.data.forEach(function (product) {
          product.status = product.status === 0;
          product.number = ++number;
          productsData.push(product);
        });
      });
    }

    /* 页面渲染 */
    onMounted(() => {
      getPageOfProductInfoByCondition(1,10);
    });

    

    /* 商品状态改变 */
    function changeProductStatus(number) {
      const product = productsData[number];
      if (product.status == true) {
        product.status = 0;
        productApi.update(product);
        product.status = true;
      } else {
        product.status = 1;
        productApi.update(product);
        product.status = false;
      }
    }

    /* 编辑商品信息 */
    /* let selectedEditProduct; */
    function getEditProductInfo(number) {
      editDialogVisible.value = true;
      const selectedEditProduct = productsData[number];
      productEditInfo.id = selectedEditProduct.id;
      productEditInfo.name = selectedEditProduct.name;
      productEditInfo.price = selectedEditProduct.price;
      productEditInfo.locality = selectedEditProduct.locality;
      if (selectedEditProduct.status == true) {
        productEditInfo.status = 0;
      } else {
        productEditInfo.status = 1;
      }
    }

    function editProductInfo() {
      productApi.update(productEditInfo).then((res) => {
        getAllProductsInfo();
      });
      editDialogVisible.value = false;
      /* getAllProductsInfo(); */
      /* selectedEditProduct.name = productEditInfo.name;
      selectedEditProduct.price = productEditInfo.price;
      selectedEditProduct.locality = productEditInfo.locality;
      selectedEditProduct.status = productEditInfo.status===0; */
    }

    /* 删除商品信息 */
    function deleteProductInfo(number) {
      productApi.delete(productsData[number].id).then((res) => {
        getAllProductsInfo();
      });
    }

    /* 查询附属商品信息 */
    function getAccessoriesInfo(number) {
      accessoryDialogVisible.value = true;
      accessoryData.length = 0;
      accessoryApi.getInfoByProductId(productsData[number].id).then((res) => {
        res.data.forEach(function (accessory) {
          accessoryData.push(accessory);
        });
      });
    }

    /* 分页查询 */

    /* 当前页码、商品总数量 */
    let currentPage=1;
    let productTotalNumber=ref();
    let currentpageSize = 10;

    function getPageOfProductInfoByCondition(currentPage,pageSize) {
      productQueryData.startTime = states.queryCreateDate.value[0];
      productQueryData.endTime = states.queryCreateDate.value[1];
      let number = 0;
      let viewNumber = (currentPage-1)*pageSize;
      currentpageSize = pageSize;
      productApi
        .getPageOfInfoByCondition(currentPage, pageSize, productQueryData)
        .then((res) => {
          productsData.length = 0;
          productTotalNumber.value = res.data.productTotalNumber;
          res.data.productsInfo.forEach(function (product) {
            product.status = product.status === 0;
            product.number = ++number;
            product.viewNumber = ++viewNumber;
            productsData.push(product);
          });
        });
    }


    return {
      /* 变量 */
      /* 搜索相关的信息 */
      productQueryData,
      statuslist,
      ...states,

      /* 表格中商品的信息 */
      productsData,
      productSelection,

      /* 编辑弹出框 */
      productEditInfo,
      editStatuslist,
      filelist,

      /* 附属商品弹出框 */
      addAssessoryName,
      addAssessoryPrice,
      accessoryData,
      accessorySelection,
      accessoryDialogVisible,
      editAccessoryDialogVisible,
      handleAccessorySelectionChange,
      /* 附属编辑 内弹出框 */
      editAssessoryName,
      editAssessoryPrice,

      /* 函数 */

      /* 表格复选按钮 */
      handleProductSelectionChange,

      /* 编辑弹出框 */
      editDialogVisible,

      //上传图片文件
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove,

      /* 跳转到添加商品页面 */
      toAddProduct,
      /* api function*/

      /* 根据条件查询商品信息 */
      getInfoByCondition,

      /* 商品状态改变 */
      changeProductStatus,
      getEditProductInfo,
      editProductInfo,

      /* 删除商品信息 */
      deleteProductInfo,

      /* 查看附属商品信息 */
      getAccessoriesInfo,

      /* 分页查询 */
      currentPage,
      currentpageSize,
      productTotalNumber,
      getPageOfProductInfoByCondition,
    };
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 16px 0;
  width: 98%;
}
.search-title {
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
    .price-input {
      width: 100px !important;
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

/* 附属商品弹出框 */
.accessory-dialog-row {
  .el-col {
    display: flex;
    label {
      line-height: 30px;
    }
  }
}

.edit-accessory-dialog .el-row {
  margin: 12px 16px;
}
</style>
