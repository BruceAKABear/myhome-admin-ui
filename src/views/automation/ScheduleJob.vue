<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.name' clearable placeholder='请输入任务名' size='mini'/>
        <el-button icon='el-icon-search' size='mini' style='margin-left: 10px' type='primary' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>添加任务</el-button>
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
        label='任务名'
        prop='name'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='表达式'
        prop='cron'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        label='包含设备数'
      >
        <template slot-scope="scope">
          {{ scope.row.targetDeviceIds.length }}
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
        width='180'
        fixed="right"
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <div style="margin-right: 10px">
              <el-dropdown @command="optionsClick">
                <el-button type="warning" size="mini">
                  更多
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{name:'modify',data:scope.row}">修改</el-dropdown-item>
                  <el-dropdown-item :command="{name:'changeStatus',data:scope.row}">{{
                      scope.row.enable ? '停用' : '启用'
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item :command="{name:'triggerImmediately',data:scope.row}">立即执行</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-button
              size='mini'
              type='danger'
              @click='deleteTask(scope.row)'>删除
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

    <el-dialog :visible.sync='dialogVisible' :title="newObj.id?'修改任务':'新增任务'" width="600px">
      <el-form
        ref='addForm'
        :model='newObj'
        :rules="{
          name:[
             {
            required: true,
            message: '任务名必填',
            trigger: 'blur'
          }
          ],
          targetDeviceIds:[
             {
            required: true,
            message: '被控设备必选',
            trigger: 'change'
          }
          ]
        }"
        label-width='120px'
        status-icon
      >
        <el-form-item label='任务名' prop='name'>
          <el-col :span="24">
            <el-input v-model='newObj.name' autocomplete='off'/>
          </el-col>
        </el-form-item>
        <el-form-item label='所属产品'>
          <el-col :span="24">
            <el-select
              v-model="selectProductId"
              placeholder="请选择产品"
              style="width: 100%">
              <el-option
                multiple
                v-for="item in productList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='被控设备' prop='targetDeviceIds'>
          <el-col :span="24">
            <el-select
              multiple
              v-model="newObj.targetDeviceIds"
              placeholder="请选择设备"
              style="width: 100%">
              <el-option
                multiple
                v-for="item in deviceList"
                :key="item.id"
                :label="item.nickName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='cron'>
          <el-col :span="24">
            <cron-input v-model="newObj.cron" @change="cornConfirm" @reset="cornReset"/>
            <!--            <el-popover v-model="cronPopover">-->
            <!--              <el-input-->
            <!--                slot="reference"-->
            <!--                @click="cronPopover=true"-->
            <!--                v-model="newObj.cron"-->
            <!--                placeholder="请输入定时策略"-->
            <!--                >-->
            <!--              </el-input>-->
            <!--              <vcrontab-->
            <!--                @hide="cronPopover=false"-->
            <!--                @fill="cornConfirm"-->
            <!--                :expression="newObj.cron"-->
            <!--                >-->
            <!--              </vcrontab>-->
            <!--            </el-popover>-->
          </el-col>
        </el-form-item>
        <el-form-item label='控制内容'>
          <el-col :span="24">
            <dynamic-control-payload
              :product-fields="productFieldList"
              @callBack="payloadCallBack"></dynamic-control-payload>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false '>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate' :disabled="forbidSubmit">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { debugDeviceListApi } from '@/api/Device'
import { fieldListApi } from '@/api/ProductField'
import {
  scheduleChangeStatusApi,
  scheduleTaskAddUpdateApi,
  scheduleTaskDeleteApi,
  scheduleTaskPageApi,
  scheduleTriggerImmediatelyApi
} from '@/api/Automation'
import { productListApi } from '@/api/DeviceManage'
import DynamicControlPayload from '@/components/DynamicControlPayload'
import CronInput from 'vue-cron-generator/src/components/cron-input'
import { DEFAULT_CRON_EXPRESSION } from 'vue-cron-generator/src/constant/filed'

export default {
  name: 'ScheduleJob',
  components: {
    CronInput,
    DynamicControlPayload
  },
  data() {
    return {
      pageParam: {},
      pageResult: {},
      dialogVisible: false,
      newObj: {},
      cronPopover: false,
      deviceList: [],
      productFieldList: [],
      productList: [],
      selectProductId: '',
      forbidSubmit: true
    }
  },
  methods: {
    doPageQuery() {
      scheduleTaskPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    pageNumberChange(v) {
      this.pageParam.page = v
      this.doPageQuery()
    },
    showAddDia() {
      this.newObj = {}
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    doGetDebugDeviceList() {
      debugDeviceListApi({ productId: this.selectProductId }).then(res => {
        this.deviceList = res.data
      })
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(r => {
        if (r) {
          scheduleTaskAddUpdateApi(this.newObj).then(res => {
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
    doGetFieldList(productId) {
      fieldListApi({ productId: productId }).then(res => {
        this.productFieldList = res.data
      })
    },
    deleteTask(rowData) {
      this.$confirm('是否确认删除定时任务', '提示', { type: 'warning' }).then(() => {
        scheduleTaskDeleteApi(rowData.id).then(res => {
          this.$notify.success('删除定时任务成功')
          this.doPageQuery()
        })
      })
    },
    cornConfirm(v) {
      this.newObj.cron = v
    },
    cornReset(v) {
      this.newObj.cron = DEFAULT_CRON_EXPRESSION
    },
    doGetProductList() {
      productListApi().then(res => {
        this.productList = res.data
      })
    },
    payloadCallBack(py) {
      this.newObj.controlPayload = py
      this.forbidSubmit = false
    },
    optionsClick(value) {
      const options = value.name
      const data = value.data
      switch (options) {
        case 'changeStatus':
          scheduleChangeStatusApi({ id: data.id }).then(res => {
            this.$notify.success('定时任务' + (data.enable ? '停用' : '启用') + '成功')
            this.doPageQuery()
          })
          break
        case 'triggerImmediately':
          scheduleTriggerImmediatelyApi({ id: data.id }).then(res => {
            this.$notify.success('触发定时任务成功')
          })
          break
        case 'modify':
          this.dialogVisible = true
          this.newObj = data
          this.selectProductId = data.productId
          break
      }
    }
  },
  created() {
    this.doPageQuery()
    this.doGetProductList()
    this.newObj.cron = DEFAULT_CRON_EXPRESSION
  },
  watch: {
    newObj(v) {
      console.log(v)
      // if (v.targetDeviceId && v.targetDeviceId !== '') {
      //   this.doGetFieldList()
      // }
    },
    selectProductId(newV) {
      if (newV && newV !== '') {
        this.doGetFieldList(newV)
        this.doGetDebugDeviceList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
