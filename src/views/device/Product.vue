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
        label='产品类型'
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.type===1?'success':'info' ">{{ scope.row.type === 1 ? '普通产品' : '网关产品' }}</el-tag>
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

    <el-dialog :before-close="closeDia" :visible.sync='addDialogFormVisible' :title="dynamicObject.id?'修改产品':'新增产品'">
      <el-form
        ref='addForm'
        :model='dynamicObject'
        :rules='rules'
        class='demo-ruleForm'
        label-width='100px'
        status-icon
      >
        <el-form-item label='产品名' prop='name'>
          <el-input v-model='dynamicObject.name' autocomplete='off' size="mini"/>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input
            v-model='dynamicObject.note'
            type="textarea"
            maxlength="250"
            show-word-limit
            placeholder="请输入描述"
            autocomplete='off'
          />
        </el-form-item>
        <el-form-item label='是否可控' prop='canControl' size="mini">
          <el-col :span='24'>
            <el-select
              v-model='dynamicObject.canControl'
              placeholder='请选择是否可以控制'
              style='width: 100%'>
              <el-option
                :value='true'
                label='平台可控'>
              </el-option>
              <el-option
                :value='false'
                label='平台不可控'>
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
                :value='1'
                label='普通产品'>
              </el-option>
              <el-option
                :value='2'
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
          <el-row :gutter="10">
            <el-col :span="6">
              <el-input v-model="item.label" size="mini" placeholder='显示值'></el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="item.field" size="mini" placeholder='字段值'></el-input>
            </el-col>
            <el-col :span="6">
              <el-select
                v-model='item.fieldType'
                placeholder='字段类型'
                size="mini"
                style='width: 100%'>
                <el-option
                  v-for="(fieldTypeItem,index) in fieldTypeList"
                  :key="index"
                  :label='fieldTypeItem.fieldType'
                  :value='fieldTypeItem.fieldType'>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <div style="">
                <el-button size="mini" type="danger" @click="deleteDynamicField(item)">删除</el-button>
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
            fieldType: '',
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
      fieldTypeList: [
        { fieldType: 'int' },
        { fieldType: 'boolean' },
        { fieldType: 'string' }
      ],
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
      this.dynamicObject.categoryFieldList.push({
        field: '',
        fieldType: '',
        key: Date.now()
      })
    },
    deleteDynamicField(item) {
      const index = this.dynamicObject.categoryFieldList.indexOf(item)
      if (index !== -1) {
        this.dynamicObject.categoryFieldList.splice(index, 1)
      }
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
