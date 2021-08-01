<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.name' size='mini' placeholder='请输入分类名' clearable />
        <el-button size='mini' type='primary' style='margin-left: 10px' icon='el-icon-search' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加分类</el-button>
      </div>
    </div>

    <el-table
      size='mini'
      :data='pageResult.records'
      style='width: 100%;'
      height='650'
      :header-cell-style="{background: '#F6F8FB'}"
    >
      <el-table-column
        prop='id'
        label='ID'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='name'
        label='分类名'
        align='center'
      />
      <el-table-column
        label='控制协议内容'
        width='300'
      >
        <template slot-scope='scope'>
          <json-viewer :value='scope.row.controlDataFormat' style='line-height: 18px;'></json-viewer>
        </template>
      </el-table-column>
      <el-table-column
        label='响应协议内容'
        width='300'
      >
        <template slot-scope='scope'>
          <json-viewer :value='scope.row.responseDataFormat' style='line-height: 18px;'></json-viewer>
        </template>
      </el-table-column>
      <el-table-column
        prop='deviceCount'
        label='包含设备数'
        align='center'
      />
      <el-table-column
        width='180'
        label='操作'
        align='center'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button
              size='mini'
              type='danger'
              @click='deleteCategory(scope.row)'
              :disabled='scope.row.deviceCount!==0'>删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if='pageResult.pages>1' class='pagination-box'>
      <el-pagination
        background
        layout='prev, pager, next'
        :total='pageResult.total'
        @current-change='pageNumberChange'
      />
    </div>

    <el-dialog title='新增/修改分类' :visible.sync='addDialogFormVisible'>
      <el-form
        ref='addForm'
        :model='newObj'
        status-icon
        :rules='rules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='分类名' prop='name'>
          <el-input v-model='newObj.name' autocomplete='off' />
        </el-form-item>
        <el-form-item label='是否可控' prop='canControl'>
          <el-col :span='24'>
            <el-select v-model='newObj.canControl' placeholder='请选择' style='width: 100%' :disabled='newObj.id'>
              <el-option
                label='可控'
                :value='true'>
              </el-option>
              <el-option
                label='不可控'
                :value='false'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label='控制协议' v-show='newObj.canControl'>
          <vue-json-editor
            v-model='newObj.controlDataFormat'
            :showBtns='false'
            :mode="'code'"
            lang='zh'
          />
        </el-form-item>
        <el-form-item label='响应协议'>
          <vue-json-editor
            v-model='newObj.responseDataFormat'
            :showBtns='false'
            :mode="'code'"
            lang='zh'
          />
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { categoryAddOrUpdateApi, categoryPageApi, delCategoryApi } from '@/api/DeviceManage'
import vueJsonEditor from 'vue-json-editor'

export default {
  name: 'CategoryManage',
  data() {
    return {
      pageResult: {},
      pageParam: {},
      newObj: {},
      addDialogFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入分类名',
            trigger: 'blur'
          }
        ],
        canControl: [
          {
            required: true,
            message: '请选择是否可控',
            trigger: 'blur'
          }
        ],
        controlDataFormat: [
          {
            required: true,
            message: '请输入响应协议',
            trigger: 'blur'
          }
        ],
        responseDataFormat: [
          {
            required: true,
            message: '请输入响应协议',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    vueJsonEditor
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
          this.newObj.dataFormat = JSON.stringify(this.newObj.dataFormat)
          categoryAddOrUpdateApi(this.newObj).then(res => {
            this.$notify.success('删除分类成功')
            this.addDialogFormVisible = false
            this.doPageQuery()
          })
        }
      })
    },
    showUpdate(rowData) {
      console.log(rowData)
      this.newObj = rowData
      this.addDialogFormVisible = true
    },
    deleteCategory(rowData) {
      this.$confirm('是否确认删除设备分类', '提示', { type: 'warning' }).then(() => {
        delCategoryApi(rowData.id).then(res => {
          this.$notify.success('删除分类成功')
          this.doPageQuery()
        })
      })
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
