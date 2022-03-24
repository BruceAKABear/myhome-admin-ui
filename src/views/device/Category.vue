<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.name' clearable placeholder='请输入分类名' size='mini'/>
        <el-button icon='el-icon-search' size='mini' style='margin-left: 10px' type='primary' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>添加分类</el-button>
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
        label='分类名'
        prop='name'
      />
      <el-table-column
        align='center'
        label='包含设备数'
        prop='deviceCount'
      />
      <el-table-column
        align='center'
        label='操作'
        width='180'
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

    <el-dialog :before-close="closeDia" :visible.sync='addDialogFormVisible' title='新增/修改分类'>
      <el-form
        ref='addForm'
        :model='dynamicObject'
        :rules='rules'
        class='demo-ruleForm'
        label-width='100px'
        status-icon
      >
        <el-form-item label='分类名' prop='name'>
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
                label='平台可控'>
              </el-option>
              <el-option
                :value='false'
                label='平台不可控'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item
          v-for="(item) in dynamicObject.categoryFieldList"
          :key="item.key"
          :rules="{
           required: true, message: '域名不能为空', trigger: 'blur'}"
          label='控制字段'
        >
          <el-row :gutter="5">
            <el-col :span="8">
              <el-input v-model="item.field" size="mini"></el-input>
            </el-col>
            <el-col :span="8">
              <el-select
                v-model='item.fieldType'
                placeholder='请选择字段类型'
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
            <el-col :span="6">
              <el-button size="mini" type="info" @click="deleteDynamicField(item)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button size="mini" @click='closeDia'>取 消</el-button>

        <el-button size="mini" @click="addField">新增控制字段</el-button>
        <el-button size="mini" type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { categoryAddOrUpdateApi, categoryPageApi, delCategoryApi } from '@/api/DeviceManage'

export default {
  name: 'Category',
  data() {
    return {
      dynamicObject: {
        categoryFieldList: [
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
        pageSize: 14
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
        ]
      }
    }
  },

  created() {
    this.doPageQuery()
  },
  methods: {
    doPageQuery() {
      categoryPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    showAddDia() {
      this.newObj = {}
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    pageNumberChange(e) {
      this.pageParam.pageNumber = e
      this.doPageQuery()
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          categoryAddOrUpdateApi(this.dynamicObject).then(res => {
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
      this.$confirm('是否确认删除设备分类', '提示', { type: 'warning' }).then(() => {
        delCategoryApi(rowData.id).then(res => {
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
