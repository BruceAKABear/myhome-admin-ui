<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-row :gutter='10'>
          <el-col :span='6'>
            <el-input v-model='pageParam.name' size='mini' placeholder='请输入设备名' clearable />
          </el-col>
          <el-col :span='6'>
            <el-select v-model='pageParam.online' placeholder='请选择在线状态' size='mini' clearable>
              <el-option label='在线' :value='true'></el-option>
              <el-option label='离线' :value='false'></el-option>
            </el-select>
          </el-col>
          <el-col :span='6'>
            <el-select v-model='pageParam.publish' placeholder='请选择发布状态' size='mini' clearable>
              <el-option label='已发布' :value='true'></el-option>
              <el-option label='未发布' :value='false'></el-option>
            </el-select>
          </el-col>
          <el-col :span='6'>
            <el-button size='mini' type='primary' style='margin-left: 10px' icon='el-icon-search' @click='doPageQuery'>
              搜索
            </el-button>
          </el-col>
        </el-row>

      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加设备</el-button>
      </div>

      <!--  分页表格    -->
    </div>

    <el-table
      :data='pageResult.records'
      style='width: 100%;'
      size='mini'
      height='650'
      :header-cell-style="{background: '#F6F8FB'}"
    >
      <el-table-column
        prop='id'
        label='ID'
        width='160'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='categoryName'
        label='分类名'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='icon'
        label='图标'
        align='center'
      >
        <template slot-scope='scope'>
          <el-image fit='fill' style='width: 40px; height: 40px' :src='scope.row.iconUrl' v-if='scope.row.iconUrl' />
        </template>
      </el-table-column>
      <el-table-column
        label='在线'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.online?'success':'warning' ">{{ scope.row.online ? '在线' : '离线' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop='deviceUserName'
        label='连接用户名'
        align='center'
        width='400'
        show-overflow-tooltip
      />
      <el-table-column
        prop='devicePassword'
        label='连接密码'
        align='center'
        width='240'
        show-overflow-tooltip
      />
      <el-table-column
        prop='createTime'
        label='是否发布'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.publish?'success':'warning' ">{{
              scope.row.publish ? '已发布' : '未发布'
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop='updateTime'
        label='更新时间'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        width='180'
        label='操作'
        align='center'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center' v-if='!scope.row.publish'>
            <el-button size='mini' type='warning' @click='publishDevice(scope.row)'>发布
            </el-button>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改
            </el-button>
            <el-button size='mini' type='danger' @click='delDevice(scope.row)'>删除
            </el-button>
          </div>
          <el-button size='mini' type='info' @click='showUpdate(scope.row)' v-if='scope.row.publish'>详情
          </el-button>
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

    <el-dialog :title="newObj.publish?'设备详情':'新增/修改设备'" :visible.sync='addDialogFormVisible'>
      <el-form
        ref='addForm'
        :model='newObj'
        status-icon
        :rules='rules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='设备分类' prop='categoryId'>
          <el-col :span='24'>
            <el-select v-model='newObj.categoryId' placeholder='请选择设备分类' style='width: 100%' @change='categoryChange'>
              <el-option
                v-for='category in categoryList'
                :label='category.name'
                :value='category.id'
                :key='category.id'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='设备图标' prop='iconId'>
          <el-col :span='24'>
            <el-select v-model='newObj.iconId' placeholder='请选择图标' style='width: 100%'>
              <el-option
                v-for='deviceIcon in deviceIconList'
                :label='deviceIcon.name'
                :value='deviceIcon.id'
                :key='deviceIcon.id'>
                <span style='float: left'>{{ deviceIcon.name }}</span>
                <el-image fit='fill' style='float: right;width: 40px; height: 40px' :src='deviceIcon.iconUrl' />
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label='控制协议' prop='roleDesc'>
          <json-viewer
            :value='controlDataFormat'
            style='line-height: 18px;'></json-viewer>
        </el-form-item>
        <el-form-item label='响应协议' prop='roleDesc'>
          <json-viewer
            :value='responseDataFormat'
            style='line-height: 18px;'></json-viewer>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate' v-if='!newObj.publish'>保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  addOrUpdateDeviceApi,
  categoryListApi,
  delDeviceApi,
  devicePageApi,
  getDeviceIconListApi,
  publishDeviceApi
} from '@/api/DeviceManage'

export default {
  name: 'DeviceList',
  data() {
    return {
      pageResult: {},
      pageParam: {},
      newObj: {},
      addDialogFormVisible: false,
      rules: {
        categoryId: [
          {
            required: true,
            message: '请选择设备分类',
            trigger: 'change'
          }
        ],
        iconId: [
          {
            required: true,
            message: '请选择图标',
            trigger: 'change'
          }
        ]
      },
      categoryList: [],
      deviceIconList: [],
      controlDataFormat: {},
      responseDataFormat: {}
    }
  },
  created() {
    this.doPageQuery()
    this.doGetCategoryLIst()
    this.doGetDeviceIconLIst()
  },
  methods: {
    doPageQuery() {
      devicePageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    doGetCategoryLIst() {
      categoryListApi().then(res => {
        if (res.status) {
          this.categoryList = res.data
        }
      })
    },
    doGetDeviceIconLIst() {
      getDeviceIconListApi().then(res => {
        this.deviceIconList = res.data
      })
    },
    showAddDia() {
      this.addDialogFormVisible = true
      this.newObj = {}
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    categoryChange(e) {
      this.categoryList.forEach(item => {
        if (item.id === e) {
          this.controlDataFormat = item.controlDataFormat
          this.responseDataFormat = item.responseDataFormat
        }
      })
    },
    pageNumberChange(e) {
      this.pageParam.pageNumber = e
      this.doPageQuery()
    },
    saveOrUpdate() {
      addOrUpdateDeviceApi(this.newObj).then(res => {
        this.$message.success('操作成功')
        this.addDialogFormVisible = false
        this.doPageQuery()
      })
    },
    showUpdate(rowData) {
      this.newObj = rowData
      this.categoryList.forEach(item => {
        if (item.id === rowData.categoryId) {
          this.controlDataFormat = item.controlDataFormat
          this.responseDataFormat = item.responseDataFormat
        }
      })
      this.addDialogFormVisible = true
    },
    publishDevice(rowData) {
      publishDeviceApi(rowData).then(res => {
        this.$message.success('发布设备成功')
        this.doPageQuery()
      })
    },
    delDevice(rowData) {
      this.$confirm('是否确认删除设备？', '提示', { type: 'warning' }).then(() => {
        delDeviceApi({ id: rowData.id }).then(res => {
          if (res.status) {
            this.$message.success('设备删除成功')
            this.doPageQuery()
          } else {
            this.$message.warning(res.message)
          }
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
