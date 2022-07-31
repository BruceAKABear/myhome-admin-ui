<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-select v-model="deviceId" clearable placeholder="请选择设备" size="mini" style="margin-left: 10px">
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.nickName"
            :value="item.id">
            <span style="float: left">{{ item.nickName }}</span>
            <span :style="{float: 'right', color: item.online?'#19BE6B':'#F56C6C', fontSize: '13px'}">{{
                item.online ? '在线' : '离线'
              }}</span>
          </el-option>
        </el-select>
        <el-button icon='el-icon-search' size='mini' style='margin-left: 10px' type='primary' @click='flashDevice'>
          刷新
        </el-button>
      </div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-alert
            :closable="false"
            description="设备调试只针对已在线的设备"
            show-icon
            title="提示"
            type="info">
          </el-alert>
          <div v-show="deviceId===''" class="info-box">
            <span>请先选择设备</span>
          </div>
          <div v-show="deviceId!==''">
            <div v-for="item in categoryFieldList" :key="item.id" style="margin-top: 30px">
              <el-row :gutter="10">
                <el-col :span="12" style="height: 28px;display: flex; align-items: center">
                  <span>控制字段：{{ item.field }}</span>
                </el-col>
                <el-col :span="12">
                  <el-row style="display: flex;align-items: center">
                    <el-col :span="8">
                      <div
                        style="display: flex;flex-direction: column;justify-content: center;align-items: center;height: 28px;">
                        <span>控制值：</span>
                      </div>
                    </el-col>
                    <el-col :span="16">
                      <el-select
                        size="mini"
                        v-model="orderObject[item.field]"
                        placeholder='请选择布尔值'
                        style='width: 100%'>
                        <el-option
                          :value='true'
                          label='true'>
                        </el-option>
                        <el-option
                          :value='false'
                          label='false'>
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div style="margin-top: 50px">
              <el-button style="width: 100%;background-color: #19be6b" type="success" @click="sendDebugOrder()">下发控制命令
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <el-table
            :data='pageResult.records'
            :header-cell-style="{background: '#F6F8FB'}"
            height='650'
            size='mini'
            style='width: 100%;'
          >
            <el-table-column
              align='center'
              label='消息ID'
              prop='id'
              show-overflow-tooltip
            />
            <el-table-column
              align='center'
              label='消息内容'
              prop='payload'
              show-overflow-tooltip
            />
            <el-table-column
              align='center'
              label='消息流向'
            >
              <template slot-scope='scope'>
                <el-tag :type="scope.row.direction===1?'success':'info' ">{{
                    scope.row.direction === 1 ? '下发' : '上报'
                  }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column
              align='center'
              label='创建时间'
              prop='createTime'
            />
          </el-table>

          <div v-if='pageResult.pages>1' class='pagination-box'>
            <el-pagination
              :total='pageResult.total'
              background
              layout='prev, pager, next'
              @current-change='pageNumberChange'
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { debugDeviceListApi, sendDebugApi } from '@/api/Device'
import { deviceLogPageApi } from '@/api/DeviceLog'
import { fieldListApi } from '@/api/ProductField'

export default {
  name: 'Debug',
  data() {
    return {
      deviceId: '',
      deviceList: [],
      pageResult: {},
      newObj: {},
      orderObject: {},
      categoryFieldList: [],
      pageParam: {},
      intervalId: ''
    }
  },
  methods: {
    flashDevice() {
      this.doGetDebugDeviceList()
    },
    doGetDebugDeviceList() {
      debugDeviceListApi().then(res => {
        this.deviceList = res.data
      })
    },
    doGetFieldList() {
      fieldListApi({ deviceId: this.deviceId }).then(res => {
        this.categoryFieldList = res.data
      })
    },
    doGetDeviceLogPage() {
      this.pageParam.deviceId = this.deviceId
      deviceLogPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    pageNumberChange(v) {
      this.pageParam.page = v
      this.doGetDeviceLogPage()
    },
    sendDebugOrder() {
      console.log(this.orderObject)
      var flag = true
      if (JSON.stringify(this.orderObject) === '{}') {
        flag = false
      }
      if (flag) {
        this.orderObject.deviceId = this.deviceId
        sendDebugApi(this.orderObject).then(res => {
          if (res.status) {
            this.$notify.success('操作成功')
          }
        })
      } else {
        this.$notify.warning('请将参数填写完整')
      }
    }
  },
  mounted() {
    this.doGetDebugDeviceList()
    const that = this
    this.intervalId = setInterval(() => {
      that.doGetDeviceLogPage()
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  watch: {
    deviceId(v) {
      this.pageParam.deviceId = v
      this.doGetDeviceLogPage()
      if (v !== '') {
        this.doGetFieldList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-box {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-size: 25px;
  color: #909399;
}

</style>
