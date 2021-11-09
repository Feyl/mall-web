<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <el-card class="box-card" shadow="never">
        <el-row class="contarct-title">
          <el-col :span="6" class="cur-contarct-detail-title">
            <el-icon :size="20"><info-filled /></el-icon>
            <span>当前订单状态：</span>
            <span>已发货</span>
          </el-col>
          <el-col :span="5" :offset="13">
            <el-button size="small" @click="deleteContract">删除合同</el-button>
            <el-button size="small" @click="remarkContractDialogVisible = true"
              >备注合同</el-button
            >
          </el-col>
        </el-row>

        <!-- 基本信息 -->
        <el-row style="margin-top: 40px" class="info-title">
          <el-icon :size="20"><list /></el-icon>
          <span>基本信息</span>
        </el-row>

        <el-row>
          <el-col :span="22" :offset="1">
            <el-table
              :data="contractBasicData"
              style="width: 100%"
              border
              :header-cell-style="{ background: '#f2f6fc' }"
              :cell-style="{background:'#fff'}"
            >
              <el-table-column
                prop="barcode"
                label="合同编号"
                width="180"
                align="center"
              />
              <el-table-column
                prop="type"
                label="类型"
                width="60"
                align="center"
              />
              <el-table-column
                prop="payment"
                label="支付方式"
                width="80"
                align="center"
              />
              <el-table-column
                prop="transportWay"
                label="配送方式"
                width="100"
                align="center"
              />
              <el-table-column
                prop="transportNumber"
                label="物流单号"
                width="180"
                align="center"
              />
              <el-table-column
                prop="createTime"
                label="创建时间"
                align="center"
              />
            </el-table>
          </el-col>
        </el-row>

        <!-- 零售商信息 -->
        <el-row class="info-title">
          <el-icon :size="20"><avatar /></el-icon>
          <span>零售商信息</span>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-table
              :data="retailerData"
              style="width: 100%"
              border
              :header-cell-style="{ background: '#f2f6fc' }"
              :cell-style="{background:'#fff'}"
            >
              <el-table-column
                prop="name"
                label="姓名"
                width="120"
                align="center"
              />
              <el-table-column
                prop="telephone"
                label="电话号码"
                width="180"
                align="center"
              />
              <el-table-column
                prop="postalCode"
                label="邮政编码"
                width="100"
                align="center"
              />
              <el-table-column prop="address" label="地址" align="center" />
            </el-table>
          </el-col>
        </el-row>

        <!-- 商品信息 -->
        <el-row class="info-title">
          <el-icon :size="20"><goods-filled /></el-icon>
          <span>商品信息</span>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-table :data="productData" style="width: 100%" border>
              <el-table-column
                prop="name"
                label="名称"
                width="120"
                align="center"
              />
              <el-table-column label="商品图片" width="160" align="center">
                <template #default="scope">
                  <el-image
                    style="width: 120px; height: 120px; margin-top: 7px"
                    :src="scope.row.image"
                    :alt="scope.row.image"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格"
                width="80"
                align="center"
              />
              <el-table-column prop="locality" label="产地" align="center" />
            </el-table>
          </el-col>
        </el-row>

        <!-- 费用信息 -->
        <el-row style="margin-top: 40px" class="info-title">
          <el-icon :size="20"><coin /></el-icon>
          <span>费用信息</span>
        </el-row>

        <el-row>
          <el-col :span="22" :offset="1">
            <el-table
              :data="expenseData"
              style="width: 50%"
              border
              :header-cell-style="{ background: '#f2f6fc' }"
              :cell-style="{background:'#fff'}"
            >
              <el-table-column
                prop="productMoney"
                label="商品金额"
                width="120"
                align="center"
              />
              <el-table-column
                prop="transportExpense"
                label="运费"
                width="120"
                align="center"
              />
              <el-table-column
                prop="totalExpense"
                label="总金额"
                align="center"
              />
            </el-table>
          </el-col>
        </el-row>

        <!-- 备注合同弹框 -->
        <el-dialog
          v-model="remarkContractDialogVisible"
          title="备注合同"
          width="32%"
        >
          <el-input
            v-model="remark"
            :rows="4"
            type="textarea"
            placeholder="请输入备注信息"
          />
          <template #footer>
            <span class="dialog-footer">
              <el-button
                size="small"
                @click="remarkContractDialogVisible = false"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="remarkContractDialogVisible = false"
                >确认</el-button
              >
            </span>
          </template>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessageBox, ElMessage } from "element-plus";
import {
  /* el */
  InfoFilled,
  List,
  Avatar,
  GoodsFilled,
  Coin,
} from "@element-plus/icons";
import { ref } from "vue-demi";
export default {
  name: "ContractDetail",
  components: {
    InfoFilled,
    List,
    Avatar,
    GoodsFilled,
    Coin,
  },
  setup() {
    /* 基本信息 */
    let contractBasicData = [
      {
        barcode: "201809130101000001",
        type: "省内",
        payment: "支付宝",
        transportWay: "顺丰快递",
        transportNumber: "201707196398345",
        createTime: "2021-11-1: 08:00:00",
      },
    ];

    /* 零售商信息 */
    let retailerData = [
      {
        name: "小李",
        telephone: "18033441849",
        postalCode: "518000",
        address: "广东省 深圳市 福田区 东晓街道",
      },
    ];

    /* 商品信息 */
    let productData = [
      {
        name: "火龙果",
        image:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        price: 6.6,
        locality: "浙江省 金华市",
      },
      {
        name: "火龙果",
        image:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        price: 6.6,
        locality: "浙江省 金华市",
      },
      {
        name: "火龙果",
        image:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        price: 6.6,
        locality: "浙江省 金华市",
      },
      {
        name: "火龙果",
        image:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        price: 6.6,
        locality: "浙江省 金华市",
      },
    ];

    /* 费用信息 */
    let expenseData = [
      {
        productMoney: 1800,
        transportExpense: 20,
        totalExpense: 1800 + 20,
      },
    ];

    /* 删除合同 */
    const deleteContract = () => {
      ElMessageBox.confirm("确定要删除该合同吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除合同成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除合同操作",
          });
        });
    };

    /* 备注合同 */
    let remarkContractDialogVisible = ref(false);
    let remark = ref("");

    return {
      /* 基本信息 */
      contractBasicData,
      /* 收货人信息 */
      retailerData,
      /* 商品信息 */
      productData,
      /* 费用信息 */
      expenseData,
      /* 删除合同 */
      deleteContract,
      /* 备注合同 */
      remarkContractDialogVisible,
      remark,
    };
  },
};
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
}
.contarct-title {
  height: 80px;
  line-height: 80px;
  margin: -20px;
  background: #f2f6fc;
}
.cur-contarct-detail-title {
  color: #f56c6c;
  .el-icon {
    margin-left: 20px;
    position: relative;
    top: 4px;
  }
  span {
    margin-left: 4px;
    line-height: 30px;
  }
}
.info-title {
  margin: 24px 0 20px;
  span {
    margin-left: 6px;
  }
}
</style>
