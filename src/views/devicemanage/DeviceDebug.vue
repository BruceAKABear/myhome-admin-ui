<template>
  <div>
    <el-row class='search-box'>
      <el-col :span='24'>
        <div class='table-header-box'>
          <div style='display: flex;align-items: center'>
            <el-row :gutter='10'>
              <el-col :span='6'>
                <el-input v-model='pageParam.name' size='mini' placeholder='请输入设备名' clearable />
              </el-col>
              <el-col :span='6'>
                <el-select v-model='pageParam.online' placeholder='请选择在线状态' size='mini' clearable>
                  <el-option label='在线' :value='true'></el-option>
                  <el-option label='离线' :value='false' disabled></el-option>
                </el-select>
              </el-col>
              <el-col :span='6'>
                <el-select v-model='pageParam.publish' placeholder='请选择发布状态' size='mini' clearable>
                  <el-option label='已发布' :value='true' disabled></el-option>
                  <el-option label='未发布' :value='false'></el-option>
                </el-select>
              </el-col>
              <el-col :span='6'>
                <el-button
                  size='mini'
                  type='primary'
                  style='margin-left: 10px'
                  icon='el-icon-search'
                  @click='doPageQuery'>
                  搜索
                </el-button>
              </el-col>
            </el-row>

          </div>
        </div>
        <el-table
          ref='singleTable'
          :data='pageResult.records'
          style='width: 100%;'
          :header-cell-style="{background: '#F6F8FB'}"
          size='mini'
          height='300'
          highlight-current-row
          @row-click='handRowClick'
        >
          <el-table-column
            prop='id'
            label='ID'
            width='180'
            align='center'
            show-overflow-tooltip
          />
          <el-table-column
            prop='categoryName'
            label='分类名'
            align='center'
          />
          <el-table-column
            label='在线'
            align='center'
            show-overflow-tooltip
          >
            <template slot-scope='scope'>
              <el-tag :type="scope.row.online?'success':'warning' " effect='dark'>{{ scope.row.online ? '在线' : '离线' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop='deviceSecret'
            label='secret'
            align='center'
            width='250'
            show-overflow-tooltip
          />
          <el-table-column
            prop='createTime'
            label='是否发布'
            align='center'
            show-overflow-tooltip
          >
            <template slot-scope='scope'>
              <el-tag :type="scope.row.publish?'success':'warning' " effect='dark'>{{
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
        </el-table>
        <div v-if='pageResult.pages>1' class='pagination-box'>
          <el-pagination
            background
            :page-size='5'
            layout='prev, pager, next'
            :total='pageResult.total'
            @current-change='pageNumberChange'
          />
        </div>
      </el-col>
    </el-row>
    <div class='debug-box'>
      <el-row :gutter='20'>
        <el-col :span='8'>
          <div class='one-side-box'></div>
          <div class='title-box'>
            <span>标准命令</span>
          </div>
          <div class='sample-box'>
            <json-viewer
              :value='clickRowData.controlDataFormat?clickRowData.controlDataFormat:{}'
              style='line-height: 18px;'></json-viewer>
          </div>
          <div class='btn-box'>
            <el-button type='primary' @click='doStartDebug'>{{ startDebug ? '停止调试' : '开始调试' }}</el-button>
          </div>
        </el-col>
        <transition name='el-zoom-in-top' mode='out-in'>
          <el-col :span='8' v-show='startDebug'>
            <div class='one-side-box'></div>
            <div class='title-box'>
              <span>设备响应</span>
            </div>
            <div class='sample-box'>
              <json-viewer
                :value='deviceReport'
                style='line-height: 18px;'></json-viewer>
            </div>
          </el-col>
        </transition>

        <transition name='el-zoom-in-top' mode='out-in'>
          <el-col :span='8' v-show='startDebug'>
            <div class='title-box'>
              <span>下发命令</span>
            </div>
            <div class='sample-box'>
              <vue-json-editor
                v-model='realCommand'
                :showBtns='false'
                :mode="'code'"
                lang='zh'
              />
            </div>
            <div class='btn-box'>
              <el-button type='success' style='background: #19be6b' @click='doDebugDevice'>下发命令</el-button>
            </div>
          </el-col>
        </transition>
      </el-row>
    </div>
  </div>
</template>

<script>
import { devicePageApi, sendCommandApi } from '@/api/DeviceManage'
import vueJsonEditor from 'vue-json-editor'

export default {
  name: 'DeviceDebug',
  data() {
    return {
      pageResult: {},
      pageParam: {
        pageSize: 5
      },
      newObj: {},
      addDialogFormVisible: false,
      rules: {},
      clickRowData: {},
      deviceReport: {},
      realCommand: {},
      startDebug: false
    }
  },
  created() {
    this.doPageQuery()
  },
  components: {
    vueJsonEditor
  },
  methods: {
    doPageQuery() {
      devicePageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    pageNumberChange(e) {
      this.pageParam.pageNumber = e
      this.doPageQuery()
    },
    handRowClick(rowData) {
      this.clickRowData = rowData
      this.realCommand = rowData.controlDataFormat
    },
    doStartDebug() {
      if (this.clickRowData.controlDataFormat) {
        this.startDebug = !this.startDebug
      } else {
        this.$notify({
          title: '提示',
          message: '请选中一行设备再进行调试',
          type: 'warning',
          duration: 1500
        })
      }
    },
    doDebugDevice() {
      this.$confirm('是否确认下发控制命令？', '提示', { type: 'warning' }).then(() => {
        // 组装控制命令内容
        const commandObj = {}
        commandObj.controlDataFormat = JSON.stringify(this.realCommand)
        commandObj.categoryId = this.clickRowData.categoryId
        commandObj.deviceId = this.clickRowData.id
        sendCommandApi(commandObj).then(res => {
          if (res.status) {
            this.$notify({
              title: '提示',
              message: '控制命令下发成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '提示',
              message: res.message,
              type: 'success',
              duration: 2000
            })
          }
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>

.search-box {
  background-color: #FFFFFF;
  padding: 0 10px;
}

.pagination-box {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

.debug-box {
  margin-top: 30px;

  .title-box {
    background-color: #409EFF;
    padding: 10px 10px;
    font-size: 14px;
    color: #FFFFFF;
    border-bottom: solid 1px #c8c9cc;
  }

  .sample-box {
    background-color: #FFFFFF;
    height: 200px;
  }

  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}

</style>
