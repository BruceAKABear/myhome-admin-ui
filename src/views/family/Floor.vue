<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.floorName' clearable placeholder='请输入楼层名' size='mini'/>
        <el-button icon='el-icon-search' size='mini' style='margin-left: 10px' type='primary' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>添加楼层</el-button>
      </div>
    </div>

    <el-table
      :data='pageResult.records'
      :header-cell-style="{background: '#F6F8FB'}"
      height='630'
      size='mini'
      style='width: 100%;'
    >
      <el-table-column
        align='center'
        label='楼层ID'
        prop='id'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='楼层名'
        prop='name'
      />
      <el-table-column
        align='center'
        label='楼层下房间数'
        prop='deviceCount'
      />
      <el-table-column
        align='center'
        label='楼层下设备数'
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
              :disabled='scope.row.roomCount!==0'
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

    <el-dialog :before-close="closeDia" :visible.sync='dialogVisible' title='新增/修改楼层' width="600px">
      <el-form
        ref='addForm'
        :model='newObj'
        :rules="rules"
        label-width='200px'
        status-icon
      >
        <el-form-item label='楼层名' prop='name'>
          <el-col :span="16">
            <el-input v-model='newObj.name' autocomplete='off' clearable/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='closeDia'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUpdateApi, deleteFloorApi, floorPageApi } from '@/api/Floor'

export default {
  name: 'Floor',
  data() {
    return {
      pageParam: {
        pageSize: 14
      },
      pageResult: {},
      dialogVisible: false,
      newObj: {
        id: '',
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入楼层名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    doPageQuery() {
      floorPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    deleteCategory(rowData) {
      this.$confirm('确认删除数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFloorApi(rowData.id).then(res => {
          if (res.status) {
            this.doPageQuery()
          }
        })
      })
    },
    showAddDia() {
      this.dialogVisible = true
      // this.$refs.addForm.clearValidate()
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(r => {
        if (r) {
          addUpdateApi(this.newObj).then(res => {
            if (res.status) {
              this.$notify.success('操作成功')
              this.dialogVisible = false
              this.newObj = {}
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
      this.newObj.id = rowData.id
      this.newObj.name = rowData.name
      this.dialogVisible = true
    },
    closeDia() {
      this.newObj.id = ''
      this.newObj.name = ''
      this.dialogVisible = false
    },
    pageNumberChange(data) {
      this.pageParam.pageNumber = data
      this.doPageQuery()
    }
  },
  mounted() {
    this.doPageQuery()
  }
}
</script>

<style scoped>

</style>
