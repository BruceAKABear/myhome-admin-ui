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
        <el-select v-model="pageParam.roomId" clearable placeholder="请选择房间" size="mini" style="margin-left: 10px">
          <el-option
            v-for="item in roomList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select
          v-model="pageParam.productId"
          clearable
          placeholder="请选择产品"
          size="mini"
          style="margin-left: 10px">
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
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>添加设备</el-button>
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
        width="160"
      />
      <el-table-column
        align='center'
        label='所属产品'
        prop='productName'
      />
      <el-table-column
        align='center'
        label='芯片ID'
        prop='chipId'
      />
      <el-table-column
        align='center'
        label='固件版本'
        prop='framewareVersion'
      />
      <el-table-column
        align='center'
        label='所在楼层'
        prop='floorName'
      />
      <el-table-column
        align='center'
        label='所在房间'
        prop='roomName'
      />
      <el-table-column
        align='center'
        label='在线状态'
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.online?'success':'info' ">{{ scope.row.online ? '在线' : '离线' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label='是否启用'
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.enable?'success':'info' ">{{ scope.row.enable ? '启用' : '停用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label='仅户主可见'
        prop='onlyHolderCanSee'
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.onlyHolderCanSee?'success':'info' ">{{
              scope.row.onlyHolderCanSee ? '是' : '否'
            }}
          </el-tag>
        </template>
      </el-table-column>
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
        width='190'
        fixed="right"
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button
              size='mini'
              type='primary'
              :disabled="!(scope.row.canUpdateFirmware&&scope.row.online)"
              @click='deviceFirmwareUpdate(scope.row)'>
              升级
            </el-button>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button
              size='mini'
              type='danger'
              @click='deleteDevice(scope.row)'>删除
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

    <el-dialog :visible.sync='dialogVisible' :title="newObj.id?'修改设备':'新增设备'" width="600px">
      <el-form
        ref='addForm'
        :model='newObj'
        :rules="rules"
        label-width='120px'
        status-icon
      >
        <el-form-item label='所属楼层' prop='floorId'>
          <el-col :span="24">
            <el-select
              @change="floorSelect"
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
        <el-form-item label='所属房间' prop='roomId'>
          <el-col :span="24">
            <el-select v-model="newObj.roomId" clearable placeholder="请选择房间" style="width: 100%">
              <el-option
                v-for="item in roomList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='所属产品' prop='productId'>
          <el-col :span="24">
            <el-select v-model="newObj.productId" clearable placeholder="请选择所属产品" style="width: 100%">
              <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='设备名' prop='nickName'>
          <el-col :span="24">
            <el-input v-model='newObj.nickName' autocomplete='off'/>
          </el-col>
        </el-form-item>
        <el-form-item label='芯片ID'>
          <el-col :span="24">
            <el-input v-model='newObj.chipId' autocomplete='off'/>
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
import { addUpdateApi, deleteDeviceApi, devicePageApi, singleDeviceFirmwareUpdateApi } from '@/api/Device'
import { floorListApi } from '@/api/Floor'
import { productListApi } from '@/api/DeviceManage'
import { roomListByFloorIdApi } from '@/api/Room'

export default {
  name: 'Device',
  data() {
    return {
      pageParam: {
        pageSize: 14
      },
      pageResult: {},
      floorList: [],
      roomList: [],
      productList: [],
      dialogVisible: false,
      newObj: {},
      rules: {
        floorId: [
          {
            required: true,
            message: '楼层必须选择',
            trigger: 'change'
          }
        ],
        roomId: [
          {
            required: true,
            message: '房间必须选择',
            trigger: 'change'
          }
        ],
        productId: [
          {
            required: true,
            message: '所属产品必须选择',
            trigger: 'change'
          }
        ],
        onlyHolderCanSee: [
          {
            required: true,
            message: '可见状态必须选择',
            trigger: 'change'
          }
        ],
        nickName: [
          {
            required: true,
            message: '请输入设备名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    doPageQuery() {
      devicePageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    doGetFloorList() {
      floorListApi().then(res => {
        this.floorList = res.data
      })
    },
    doGetProductList() {
      productListApi().then(res => {
        this.productList = res.data
      })
    },
    showAddDia() {
      this.dialogVisible = true
      this.newObj = {}
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
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
    deviceFirmwareUpdate(rowData) {
      this.$confirm('是否确定升级设备固件', '提示', { type: 'warning' }).then(() => {
        singleDeviceFirmwareUpdateApi(rowData).then(res => {
          this.$notify.success('设备固件更新命名下发成功')
          this.doPageQuery()
        })
      })
    },
    showUpdate(rowData) {
      this.newObj = rowData
      this.dialogVisible = true
    },
    deleteDevice(rowData) {
      this.$confirm('是否确认删除设备设备', '提示', { type: 'warning' }).then(() => {
        deleteDeviceApi(rowData.id).then(res => {
          this.$notify.success('删除分类成功')
          this.doPageQuery()
        })
      })
    },
    floorSelect(data) {
      roomListByFloorIdApi({ floorId: data }).then(res => {
        this.roomList = res.data
      })
    }
  },
  created() {
    this.doPageQuery()
    this.doGetFloorList()
    this.doGetProductList()
  }
}
</script>

<style scoped>

</style>
