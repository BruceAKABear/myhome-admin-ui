<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.name' clearable placeholder='请输入产品名' size='mini'/>
        <el-button icon='el-icon-search' size='mini' style='margin-left: 10px' type='primary' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>新增产品</el-button>
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
        label='产品名'
        prop='name'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='是否可控'
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.canControl?'success':'info' ">{{ scope.row.canControl ? '可控' : '不可控' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align='center'
        label='包含详情页'
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.detailPage?'success':'info' ">{{ scope.row.detailPage ? '包含' : '不包含' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label='产品类型'
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.type==='normal'?'success':'info' ">
            {{ scope.row.type === 'normal' ? '普通产品' : '网关产品' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label='包含设备数'
        prop='deviceCount'
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
        hidden="x"
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
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button
              :disabled='scope.row.deviceCount!==0'
              size='mini'
              type='danger'
              @click='deleteCategory(scope.row)'>删除
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

    <el-dialog
      :before-close="closeDia"
      :visible.sync='addDialogFormVisible'
      width="40%"
      :title="dynamicObject.id?'修改产品':'新增产品'">
      <el-form
        ref='addForm'
        :model='dynamicObject'
        :rules='rules'
        class='demo-ruleForm'
        label-width='25%'
        status-icon
      >
        <el-form-item label='产品名' prop='name'>
          <el-input v-model='dynamicObject.name' autocomplete='off' size="mini"/>
        </el-form-item>
        <el-form-item label='是否可控' prop='canControl' size="mini">
          <el-col :span='24'>
            <el-select
              v-model='dynamicObject.canControl'
              placeholder='请选择是否可以控制'
              style='width: 100%'>
              <el-option
                :value='true'
                label='可控'>
              </el-option>
              <el-option
                :value='false'
                label='不可控'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='包含详情' prop='canControl' size="mini">
          <el-col :span='24'>
            <el-select
              v-model='dynamicObject.detailPage'
              placeholder='请选择是否含详情页'
              style='width: 100%'>
              <el-option
                :value='true'
                label='包含'>
              </el-option>
              <el-option
                :value='false'
                label='不包含'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label='产品类型' prop='type' size="mini">
          <el-col :span='24'>
            <el-select
              v-model='dynamicObject.type'
              placeholder='请选择产品类型'
              style='width: 100%'>
              <el-option
                value='normal'
                label='普通产品'>
              </el-option>
              <el-option
                value='gateway'
                label='网关产品'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          v-for="(item,index) in dynamicObject.productFields"
          :key="index"
          :rules="{
           required: true, message: '控制字段', trigger: 'blur'}"
          label='字段信息'
        >
          <el-row :gutter="0">
            <el-col :span="8">
              <div style="padding-left: 8px">
                <el-input v-model="item.label" size="mini" placeholder='显示值'></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="padding-left: 8px">
                <el-input v-model="item.field" size="mini" placeholder='字段值'></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="padding-left: 8px">
                <el-button size="mini" type="danger" @click="deleteDynamicField(item)" style="width: 100%">删除
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button size="mini" @click="addField" type="warning">新增控制字段</el-button>
        <el-button size="mini" @click='closeDia'>取 消</el-button>
        <el-button size="mini" type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { deleteProductApi, productAddOrUpdateApi, productPageApi } from '@/api/DeviceManage'

export default {
  name: 'Product',
  data() {
    return {
      dynamicObject: {
        productFields: [
          {
            field: '',
            key: Date.now()
          }
        ],
        name: ''
      },
      pageResult: {},
      pageParam: {
        page: 1,
        size: 14
      },

      addDialogFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入分类名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur'
          }
        ],
        canControl: [
          {
            required: true,
            message: '请选择平台是否可控',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '设备类型必选',
            trigger: 'change'
          }
        ]
      }
    }
  },

  created() {
    this.doPageQuery()
  },
  methods: {
    doPageQuery() {
      productPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    showAddDia() {
      this.dynamicObject = {
        productFields: [
          {
            field: '',
            key: Date.now()
          }
        ],
        name: '',
        detailPage: true
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
          productAddOrUpdateApi(this.dynamicObject).then(res => {
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
    deleteCategory(rowData) {
      this.$confirm('是否确定删除产品', '提示', { type: 'warning' }).then(() => {
        deleteProductApi(rowData.id).then(res => {
          this.$notify.success('删除分类成功')
          this.doPageQuery()
        })
      })
    },
    addField() {
      this.dynamicObject.productFields.push({
        field: '',
        key: Date.now()
      })
    },
    deleteDynamicField(item) {
      const index = this.dynamicObject.productFields.indexOf(item)
      if (index !== -1) {
        this.dynamicObject.productFields.splice(index, 1)
      }
    },
    closeDia() {
      this.dynamicObject = {
        categoryFieldList: [
          {
            field: '',
            key: Date.now()
          }
        ],
        name: ''
      }
      this.addDialogFormVisible = false
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
