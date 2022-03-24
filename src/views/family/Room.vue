<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-select v-model="pageParam.floorId" clearable placeholder="请选择楼层" size="mini">
          <el-option
            v-for="item in floorList"
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
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='dialogVisible=true'>添加房间</el-button>
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
        label='房间ID'
        prop='id'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='房间名'
        prop='name'
      />
      <el-table-column
        align='center'
        label='所属楼层'
        prop='floorName'
      />
      <el-table-column
        align='center'
        label='房间下设备数'
        prop='deviceCount'
      />
      <el-table-column
        align='center'
        label='定位基站数量'
        prop='anchorCount'
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
              @click='deleteRoom(scope.row)'>删除
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

    <el-dialog :visible.sync='dialogVisible' title='新增/修改房间' width="600px">
      <el-form
        ref='addForm'
        :model='newObj'
        :rules="rules"
        label-width='200px'
        status-icon
      >
        <el-form-item label='所属楼层' prop='floorId'>
          <el-col :span="16">
            <el-select
              v-model="newObj.floorId"
              :disabled="newObj.id&&newObj.id!==''"
              placeholder="请选择楼层"
              style="width: 100%">
              <el-option
                v-for="item in floorList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='房间名' prop='name'>
          <el-col :span="16">
            <el-input v-model='newObj.name' autocomplete='off'/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false '>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUpdateApi, deleteRoomApi, roomPageApi } from '@/api/Room'
import { floorListApi } from '@/api/Floor'

export default {
  name: 'Room',
  data() {
    return {
      pageParam: {
        pageSize: 14
      },
      pageResult: {},
      newObj: {},
      floorList: [],
      dialogVisible: false,
      rules: {
        floorId: [
          {
            required: true,
            message: '楼层必须选择',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入房间名',
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
    pageNumberChange(data) {
      this.pageParam.pageNumber = data
      this.doPageQuery()
    },
    doPageQuery() {
      roomPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    doGetFloorList() {
      floorListApi().then(res => {
        this.floorList = res.data
      })
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(r => {
        if (r) {
          addUpdateApi(this.newObj).then(res => {
            if (res.status) {
              this.$notify.success('操作成功')
              this.newObj = {}
              this.dialogVisible = false
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
    deleteRoom(rowData) {
      this.$confirm('确认删除数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoomApi(rowData.id).then(res => {
          if (res.status) {
            this.doPageQuery()
          }
        })
      })
    },
    showUpdate(rowData) {
      this.newObj.id = rowData.id
      this.newObj.floorId = rowData.floorId
      this.newObj.name = rowData.name
      this.dialogVisible = true
    }

  },
  mounted() {
    this.doPageQuery()
    this.doGetFloorList()
  }
}
</script>

<style scoped>

</style>
