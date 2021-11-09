<template>
  <el-row>
    <el-col :span="14" :offset="4">
      <el-card class="box-card" shadow="never">
        <el-row>
          <el-col :span="14" :offset="5">
            <el-steps :active="stepActive" finish-status="success" align-center>
              <el-step title="填写商品信息"></el-step>
              <el-step title="填写附属商品信息"></el-step>
            </el-steps>
          </el-col>
        </el-row>

        <div v-if="stepActive === 0">
          <el-row class="product-info">
            <el-col :span="14" :offset="5">
              <label for="name">名称：</label>
              <el-input
                v-model="productInfo.name"
                id="name"
                size="medium"
                placeholder="请输入姓名"
              />
            </el-col>
            <el-col :span="14" :offset="5">
              <label for="image">图片：</label>
              <el-upload
                action="http://localhost:8081/product/add"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <el-icon><plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-col>
            <el-col :span="14" :offset="5">
              <label for="price">价格：</label>
              <el-input
                v-model="productInfo.price"
                id="price"
                size="medium"
                placeholder="请输入价格"
                style="width: 160px"
              />
            </el-col>

            <el-col :span="14" :offset="5">
              <label for="locality">产地：</label>
              <el-input
                v-model="productInfo.locality"
                id="locality"
                :rows="3"
                type="textarea"
                placeholder="请输入产地"
              />
            </el-col>
            <el-col :span="14" :offset="5">
              <label for="status" id="">状态：</label>
              <el-select
                v-model="productInfo.status"
                id="status"
                size="medium"
                placeholder="请选择状态"
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
          <el-row>
            <el-col :span="6" :offset="9">
              <el-button type="primary" size="medium" @click="stepNext"
                >下一步，填写附属品信息</el-button
              >
            </el-col>
          </el-row>
        </div>

        <div v-if="stepActive === 1" class="accessory-info-div">
          <el-row class="accessory-dialog-row">
            <el-col :span="10" :offset="2">
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
              <el-button type="primary" size="small" @click="addAccessory"
                >添加</el-button
              >
            </el-col>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :span="20" :offset="2">
              <el-table
                ref="multipleTable"
                :data="accessoryInfo"
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
          <el-row style="margin-top: 16px">
            <el-col :span="4" :offset="2">
              <b>总价格：</b>
            </el-col>
            <el-col :span="2" :offset="14">
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定要批量删除附属商品吗?"
              >
                <template #reference>
                  <el-button type="danger" size="small">批量删除</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="6">
              <el-button size="medium" @click="stepActive--"
                >上一步，填写商品信息</el-button
              >
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button type="primary" size="medium" @click="confirmAddProduct"
                >完成，提交商品</el-button
              >
            </el-col>
          </el-row>
          <el-dialog
            v-model="editAccessoryDialogVisible"
            title="编辑附属商品"
            width="20%"
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
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { Plus } from "@element-plus/icons";
import { ElMessageBox, ElMessage } from "element-plus";
import { dateFormat } from "@/utils/dateFormat";
import product from "@/api/product";

export default {
  name: "ProductAdd",
  components: {
    Plus,
  },
  setup() {
    /* 步骤条 */
    let stepActive = ref(0);

    function stepNext() {
      if (stepActive.value++ > 1) stepActive.value = 0;
    }

    const statuslist = ref([
      {
        value: 0,
        label: "上架",
      },
      {
        value: 1,
        label: "下架",
      },
    ]);

    /* 商品图片上传 */
    let dialogImageUrl = ref("");
    let dialogVisible = ref(false);

    /* 商品信息 */
    const productInfo = reactive({
      name: "",
      image: dialogImageUrl.value,
      price: "",
      locality: "",
      status: "",
    });

    function handleRemove(file, fileList) {
      console.log(file, fileList);
    }
    function handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }

    /* 附属商品信息 */
    let addAssessoryName = ref("");
    let addAssessoryPrice = ref("");

    /* 前端添加附属商品 */
    function addAccessory() {
      let accessory = {
        name: addAssessoryName.value,
        price: addAssessoryPrice.value,
        createDate: dateFormat("yyyy-MM-dd HH:mm:ss", new Date()),
      };
      accessoryInfo.push(accessory);
    }

    let accessoryInfo = reactive([
      /* {
        name: "捆绳",
        price: "1.5",
        createDate: dateFormat("yyyy-MM-dd HH:mm:ss",new Date()),
      },
      {
        name: "捆绳",
        price: "1.5",
        createDate: dateFormat("yyyy-MM-dd HH:mm:ss",new Date()),
      } 
       */
    ]);

    const accessorySelection = [];

    function handleAccessorySelectionChange(val) {
      this.multipleSelection = val;
    }

    function addProduct(productInfo, accessoryInfo) {
      let data = {
        product: productInfo,
        accessories: accessoryInfo,
      };
      product.add(data).then((res) => {
        
      });
    }

    function confirmAddProduct() {
      ElMessageBox.confirm("确认要添加商品吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          stepNext();
          addProduct(productInfo, accessoryInfo);
          ElMessage({
            type: "success",
            message: "添加商品成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消添加商品",
          });
        });
    }

    /* 编辑附属商品 */
    let editAccessoryDialogVisible = ref(false);
    let editAssessoryName = ref("");
    let editAssessoryPrice = ref("");

    return {
      /* 步骤条 */
      stepActive,
      stepNext,
      /* 商品信息 */
      productInfo,
      statuslist,
      /* 商品图片上传 */
      dialogImageUrl,
      dialogVisible,
      handleRemove,
      handlePictureCardPreview,

      /* 附属商品信息 */
      addAssessoryName,
      addAssessoryPrice,
      accessoryInfo,
      accessorySelection,
      handleAccessorySelectionChange,
      addAccessory,

      confirmAddProduct,

      /* 编辑附属商品 */
      editAccessoryDialogVisible,
      editAssessoryName,
      editAssessoryPrice,
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
.product-info {
  .el-col {
    margin-top: 20px;
    display: flex;
    label {
      line-height: 36px;
      width: 70px;
    }
  }
}
.accessory-info-div {
  margin-top: 30px;
}

/* 编辑附属商品弹框 */
.edit-accessory-dialog .el-row {
  margin: 12px 16px;
}
</style>
