<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-select v-model="pageParam.productId" clearable placeholder="请选择产品" size="mini" style="margin-left: 10px">
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button icon='el-icon-search' size='mini' style='margin-left: 10px' type='primary' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>新增固件</el-button>
      </div>
    </div>

    <el-table
      :data='pageResult.records'
      :header-cell-style="{background: '#F6F8FB'}"
      height='650'
      size='mini'
      style='width: 100%;'
    >
      <el-table-column
        align='center'
        label='ID'
        prop='id'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='所属产品'
        prop='productName'
      />
      <el-table-column
        align='center'
        label='固件描述'
        prop='note'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='版本'
        prop='version'
      />
      <el-table-column
        align='center'
        label='url'
        prop='url'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='创建时间'
        prop='createTime'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='更新时间'
        prop='updateTime'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='操作'
        width='180'
        fixed="right"
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button
              size='mini'
              type='danger'
              @click='deleteFrameware(scope.row)'>删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if='pageResult.pages>1' class='pagination-box'>
      <el-pagination
        :total='pageResult.total'
        background
        layout='prev, pager, next'
        @current-change='pageNumberChange'
      />
    </div>

    <el-dialog :before-close="closeDia" :visible.sync='addDialogFormVisible' :title="dynamicObject.id?'修改固件':'新增固件'">
      <el-form
        ref='addForm'
        :model='dynamicObject'
        :rules='rules'
        class='demo-ruleForm'
        label-width='100px'
        status-icon
      >
        <el-form-item label='所属产品' prop='productId' size="mini">
          <el-col :span='24'>
            <el-select
              v-model='dynamicObject.productId'
              placeholder='请选择产品'
              style='width: 100%'>
              <el-option
                v-for="product in productList"
                :key="product.id"
                :value='product.id'
                :label='product.name'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='固件描述' prop="note">
          <el-input
            v-model='dynamicObject.note'
            type="textarea"
            maxlength="250"
            show-word-limit
            placeholder="请输入描述"
            autocomplete='off'
          />
        </el-form-item>
        <el-form-item label='上传固件' prop='url' size="mini">
          <el-upload
            class="upload-demo"
            :action="fileUploadUrl"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="uploadSuccess"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button size="mini" @click='closeDia'>取 消</el-button>
        <el-button size="mini" type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { productListApi } from '@/api/DeviceManage'
import { deleteFramewareApi, framewareAddApi, framewarePageApi } from '@/api/Frameware'

export default {
  name: 'Firmware',
  data() {
    return {
      fileUploadUrl: process.env.VUE_APP_BASE_URL + '/file/uploadFile',
      fileList: [],
      productList: [],
      dynamicObject: {},
      pageResult: {},
      pageParam: {
        page: 1,
        size: 14
      },

      addDialogFormVisible: false,
      fieldTypeList: [
        { fieldType: 'int' },
        { fieldType: 'boolean' },
        { fieldType: 'string' }
      ],
      rules: {
        productId: [
          {
            required: true,
            message: '所属产品必选',
            trigger: 'change'
          }
        ],
        note: [
          {
            required: true,
            message: '固件描述不能为空',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '文件URL不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created() {
    this.doPageQuery()
    this.doGetProductList()
  },
  methods: {
    doPageQuery() {
      framewarePageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    doGetProductList() {
      productListApi().then(res => {
        this.productList = res.data
      })
    },
    showAddDia() {
      this.dynamicObject = {
        productFields: [
          {
            field: '',
            fieldType: '',
            key: Date.now()
          }
        ],
        name: ''
      }
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    pageNumberChange(e) {
      this.pageParam.page = e
      this.doPageQuery()
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          framewareAddApi(this.dynamicObject).then(res => {
            if (res.status) {
              this.$notify.success('操作成功')
              this.addDialogFormVisible = false
              this.doPageQuery()
            } else {
              this.$notify.warning(res.message)
            }
          })
        } else {
          this.$notify.warning('请检查信息是否填写正确')
        }
      })
    },
    showUpdate(rowData) {
      this.dynamicObject = rowData
      this.addDialogFormVisible = true
    },
    deleteFrameware(rowData) {
      this.$confirm('是否确定删除固件', '提示', { type: 'warning' }).then(() => {
        deleteFramewareApi(rowData.id).then(res => {
          this.$notify.success('删除分类成功')
          this.doPageQuery()
        })
      })
    },
    closeDia() {
      this.dynamicObject = {
        categoryFieldList: [
          {
            field: '',
            fieldType: '',
            key: Date.now()
          }
        ],
        name: ''
      }
      this.addDialogFormVisible = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$notify.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadSuccess(response, file, fileList) {
      if (response.status) {
        this.dynamicObject.url = response.data
      } else {
        this.$notify.error(response.message)
      }
    }
  }
}
</script>

<style lang='scss' scoped>

.pagination-box {
  padding-top: 30px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
