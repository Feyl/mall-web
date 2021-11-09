<template>
  <el-row>
    <el-col :span="14" :offset="4">
      <el-card class="box-card" shadow="never">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-steps :active="stepActive" finish-status="success" align-center>
              <el-step
                title="填写主信息"
                description="类型、零售商、商品信息"
              ></el-step>
              <el-step
                title="填写副信息"
                description="物流、支付、备注信息"
              ></el-step>
            </el-steps>
          </el-col>
        </el-row>

        <div v-if="stepActive === 0">
          <el-row>
            <el-col :span="16" :offset="5">
              <label for="barcode">合同编码：</label
              ><el-input
                v-model="barcode"
                id="barcode"
                readonly
                size="small"
                style="width: 280px"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="5">
              <label for="type">类型：</label>
              <el-select
                v-model="type"
                id="type"
                size="small"
                placeholder="请选择类型"
                style="width: 120px"
              >
                <el-option
                  v-for="item in typelist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <!-- 零售商信息 -->
          <el-row>
            <el-col :span="18" :offset="1">
              <label for="barcode">零售商信息：</label>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                size="small"
                style="width: 120px"
                @click="retailerSelectDialogVisable = true"
                >关联</el-button
              >
            </el-col>
          </el-row>
          <div class="retailer-info">
            <el-row>
              <el-col :span="14" :offset="4">
                <label for="retailerName">姓名：</label
                ><span :="retailerName" id="retailerName" size="small">{{
                  retailerName
                }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14" :offset="4">
                <label for="retailerTelephone">联系电话：</label
                ><span
                  :="retailerTelephone"
                  id="retailerTelephone"
                  size="small"
                  >{{ retailerTelephone }}</span
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14" :offset="4">
                <label for="retailerAddress">送货地址：</label
                ><span :="retailerAddress" id="retailerAddress" size="small">{{
                  retailerAddress
                }}</span>
              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>

          <!-- 商品信息 -->
          <el-row>
            <el-col :span="18" :offset="1">
              <label for="barcode">商品信息：</label>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                size="small"
                style="width: 120px"
                @click="productSelectDialogVisable = true"
                >添加</el-button
              >
            </el-col>
          </el-row>
          <div class="product-info">
            <el-row>
              <el-col :span="22" :offset="1">
                <el-table :data="productData" border style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="名称"
                    width="100"
                    align="center"
                  />
                  <el-table-column
                    prop="price"
                    label="价格"
                    width="60"
                    align="center"
                  />
                  <el-table-column
                    prop="locality"
                    label="产地"
                    align="center"
                  />
                  <el-table-column
                    prop="accessory"
                    label="附属品"
                    align="center"
                  />
                  <el-table-column label="数量" width="140" align="center">
                    <template #default="scope">
                      <el-input-number
                        v-model="scope.row.quantity"
                        placeholder="斤数"
                        :min="1"
                        size="small"
                        style="width: 90px"
                        controls-position="right"
                        @change="handleQuantityChange"
                      />
                      <span> 斤</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :offset="1">
                <b>总金额：</b><span></span>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="6" :offset="9">
              <el-button type="primary" size="medium" @click="stepNext"
                >下一步，填写合同副信息</el-button
              >
            </el-col>
          </el-row>
        </div>

        <div v-if="stepActive === 1">
          <!-- 物流信息 -->
          <el-row>
            <el-col :span="18" :offset="1">
              <label for="barcode">物流信息：</label>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="14" :offset="6">
              <label for="transportWay">配送方式：</label>
              <el-select
                v-model="transportWay"
                id="transportWay"
                size="small"
                placeholder="请选择配送方式"
                style="width: 180px"
              >
                <el-option
                  v-for="item in transportWaylist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="14" :offset="6">
              <label for="transportNumber">物流单号：</label>
              <el-input
                v-model="transportNumber"
                placeholder="请输入物流单号"
                id="transportNumber"
                size="small"
                style="width: 240px"
              />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="14" :offset="6">
              <label for="transportExpense">运输费用：</label>
              <el-input-number
                v-model="transportExpense"
                :min="0"
                placeholder="运输费用"
                id="transportExpense"
                size="small"
                style="width: 140px"
              />
              <span> 元</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <!-- 支付方式/合同状态 -->
          <el-row>
            <el-col :span="14" :offset="6">
              <label for="payment">支付方式：</label>
              <el-select
                v-model="payment"
                id="payment"
                size="small"
                placeholder="请选择支付方式"
                style="width: 180px"
              >
                <el-option
                  v-for="item in paymentlist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="6">
              <label for="status">合同状态：</label>
              <el-select
                v-model="status"
                id="status"
                size="small"
                placeholder="请选择合同状态"
                style="width: 180px"
              >
                <el-option
                  v-for="item in statuslist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <!-- 备注信息 -->
          <el-row>
            <el-col :span="14" :offset="1">
              <label for="status">备注信息：</label>
            </el-col>
            <el-col :span="16" :offset="4">
              <el-input
                v-model="remark"
                :rows="5"
                type="textarea"
                placeholder="请输入备注信息"
              />
            </el-col>
          </el-row>

          <el-row style="margin-top: 30px">
            <el-col :span="6" :offset="6">
              <el-button size="medium" @click="stepActive--"
                >上一步，填写商品信息</el-button
              >
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button
                type="primary"
                size="medium"
                @click="confirmAddContract"
                >完成，提交合同</el-button
              >
            </el-col>
          </el-row>
        </div>

        <div v-if="stepActive === 2">
          <el-row>
            <el-col :span="2" :offset="10">
              <el-button
                type="primary"
                size="medium"
                style="width: 120px"
                round
                @click="stepActive = 0"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>

        <!-- 零售商选择弹出框 -->
        <el-dialog
          v-model="retailerSelectDialogVisable"
          title="零售商关联"
          width="42%"
        >
          <el-row>
            <el-col :span="10" :offset="6">
              <el-input
                v-model="retailerSearchInfo"
                id="retailerSearchInfo"
                placeholder="姓名/电话号码/地址"
                size="small"
                style="width: 220px"
              />
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small">查询</el-button>
              <el-button type="primary" size="small" plain>显示全部</el-button>
            </el-col>
          </el-row>

          <el-divider />
          <el-row>
            <el-col :span="20" :offset="2">
              <el-table
                ref="multipleTable"
                :data="retailerSelectData"
                style="width: 100%"
                :row-style="{ height: '54px' }"
                :cell-style="{ padding: '0' }"
                @selection-change="handleRetailerSelectionChange"
              >
                <el-table-column type="selection" width="40" />
                <el-table-column
                  property="name"
                  label="姓名"
                  width="100"
                  align="center"
                />
                <el-table-column
                  property="telephone"
                  label="电话号码"
                  width="160"
                  align="center"
                />
                <el-table-column
                  property="address"
                  label="地址"
                  show-overflow-tooltip
                  align="center"
                />
              </el-table>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :offset="9">
              <el-button type="primary" size="small" style="width: 120px"
                >确定</el-button
              >
            </el-col>
          </el-row>
        </el-dialog>

        <!-- 商品选择弹出框 -->
        <el-dialog
          v-model="productSelectDialogVisable"
          title="商品选择"
          width="42%"
        >
          <el-row>
            <el-col :span="10" :offset="6">
              <el-input
                v-model="productSearchInfo"
                id="productSearchInfo"
                placeholder="名称/价格/产地"
                size="small"
                style="width: 220px"
              />
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small">查询</el-button>
              <el-button type="primary" size="small" plain>显示全部</el-button>
            </el-col>
          </el-row>

          <el-divider />
          <el-row>
            <el-col :span="20" :offset="2">
              <el-table
                ref="multipleTable"
                :data="productSelectData"
                style="width: 100%"
                :row-style="{ height: '54px' }"
                :cell-style="{ padding: '0' }"
                border
                @selection-change="handleProductSelectionChange"
              >
                <el-table-column type="selection" width="40" />
                <el-table-column
                  property="name"
                  label="名称"
                  width="100"
                  align="center"
                />
                <el-table-column
                  property="price"
                  label="价格"
                  width="80"
                  align="center"
                />
                <el-table-column
                  property="locality"
                  label="产地"
                  show-overflow-tooltip
                  align="center"
                />
              </el-table>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :offset="9">
              <el-button type="primary" size="small" style="width: 120px"
                >确定</el-button
              >
            </el-col>
          </el-row>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "@vue/reactivity";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  name: "ContractAdd",
  components: {},
  setup() {
    /* 步骤条 */
    let stepActive = ref(0);

    function stepNext() {
      if (stepActive.value++ > 1) stepActive.value = 0;
    }

    /* 合同信息 */
    let barcode = ref("");
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
    let money = ref("");

    /* 零售商信息 */
    let retailerName = ref("");
    let retailerTelephone = ref("");
    let retailerAddress = ref("");

    /* 商品信息 */
    let productData = [
      {
        name: "Tom",
        price: "2016-05-03",
        locality: "No. 189, Grove St, Los Angeles",
        accessory: [],
        quantity: 10,
      },
      {
        name: "Tom",
        price: "2016-05-03",
        locality: "No. 189, Grove St, Los Angeles",
        accessory: [],
        quantity: 10,
      },
      {
        name: "Tom",
        price: "2016-05-03",
        locality: "No. 189, Grove St, Los Angeles",
        accessory: [],
        quantity: 10,
      },
      {
        name: "Tom",
        price: "2016-05-03",
        locality: "No. 189, Grove St, Los Angeles",
        accessory: [],
        quantity: 10,
      },
    ];
    const handleQuantityChange = (value) => {
      console.log(value);
    };

    /* 零售商选择弹框 */
    let retailerSelectDialogVisable = ref(false);
    let retailerSearchInfo = ref("");
    let retailerSelectData = [
      {
        name: "小李",
        telephone: "15966666666",
        address: "浙江省-金华市",
      },
      {
        name: "小李",
        telephone: "1.5",
        address: "2016-05-03",
      },
      {
        name: "小李",
        telephone: "1.5",
        address: "2016-05-03",
      },
    ];

    const retailerSelection = [];
    function handleRetailerSelectionChange(val) {
      this.retailerSelection = val;
    }

    /* 商品选择弹框 */
    let productSelectDialogVisable = ref(false);
    let productSearchInfo = ref("");
    let productSelectData = [
      {
        name: "苹果",
        price: "6.6",
        locality: "浙江省-金华市",
      },
      {
        name: "苹果",
        price: "6.6",
        locality: "浙江省-金华市",
      },
      {
        name: "苹果",
        price: "6.6",
        locality: "浙江省-金华市",
      },
    ];

    const productSelection = [];
    function handleProductSelectionChange(val) {
      this.productSelection = val;
    }

    /* 配送方式选择框 */
    let transportWaylist = ref([
      {
        value: "顺丰速运",
        label: "顺丰速运",
      },
      {
        value: "申通速运",
        label: "申通速运",
      },
      {
        value: "圆通速运",
        label: "圆通速运",
      },
      {
        value: "韵达快递",
        label: "韵达快递",
      },
    ]);
    let transportWay = ref("");

    let transportNumber = ref("");
    let transportExpense = ref();

    /* 支付方式 */
    const paymentlist = ref([
      {
        value: "nonPayment",
        label: "未支付",
      },
      {
        value: "weChatPay",
        label: "微信",
      },
      {
        value: "alipay",
        label: "支付宝",
      },
    ]);

    let payment = ref("");
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

    let remark = ref("");

    function confirmAddContract() {
      ElMessageBox.confirm("确认要添加合同吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          stepNext();
          ElMessage({
            type: "success",
            message: "添加合同成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消添加合同",
          });
        });
    }

    return {
      /* 步骤条 */
      stepActive,
      stepNext,

      typelist,
      type,
      money,

      /* 零售商信息 */
      retailerName,
      retailerTelephone,
      retailerAddress,

      /* 商品信息 */
      productData,

      /* 水果斤数 */
      handleQuantityChange,

      /* 零售商选择弹出框 */
      retailerSelectDialogVisable,
      retailerSearchInfo,
      retailerSelectData,
      retailerSelection,
      handleRetailerSelectionChange,

      /* 商品选择弹出框 */
      productSelectDialogVisable,
      productSearchInfo,
      productSelectData,
      productSelection,
      handleProductSelectionChange,

      /* 运输方式弹出框 */
      transportWaylist,
      transportWay,
      transportNumber,
      transportExpense,

      /* 支付方式 */
      paymentlist,
      payment,
      /* 合同状态 */
      statuslist,
      status,
      /* 备注信息 */
      remark,
      /* 添加合同 */
      confirmAddContract,
    };
  },
};
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  .el-row {
    margin-top: 20px;
  }
}
</style>
