<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-row :gutter='10'>
          <el-col :span='14'>
            <el-select v-model='pageParam.replay' placeholder='请选择性别' size='mini' clearable>
              <el-option label='男' :value='1'></el-option>
              <el-option label='女' :value='0'></el-option>
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
        <!--        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加设备</el-button>-->
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
        width='180'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        label='反馈类型'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          {{ scope.row.type === 1 ? 'App相关' : '设备相关' }}
        </template>
      </el-table-column>
      <el-table-column
        label='是否回复'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.reply?'':'danger'">
            {{ scope.row.reply ? '已回复' : '未回复' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop='createTime'
        label='反馈时间'
        align='center'
      />
      <el-table-column
        prop='replyTime'
        label='回复时间'
        align='center'
      />
      <el-table-column
        label='操作'
        align='center'
      >
        <template slot-scope='scope'>
          <el-button
            size='mini'
            style='background-color: #19be6b;border: none;color: #FFFFFF'
            v-if='!scope.row.reply'
            @click='showReplyDia(scope.row)'
          >
            回复
          </el-button>
          <el-button
            type='warning'
            size='mini'
            @click='showReplyDia(scope.row)'
            v-else>详情
          </el-button>
          <el-button type='danger' size='mini' @click='doDel(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="rowData.reply?'详情':'回复'"
      :visible.sync='dialogVisible'
      width='50%'
    >
      <div>反馈类型：{{ rowData.type === 1 ? 'APP相关' : '设备相关' }}</div>
      <div>反馈内容：
        <el-input
          :readonly='true'
          type='textarea'
          :rows='10'
          placeholder='请输入回复内容'
          v-model='rowData.content'>
        </el-input>
      </div>
      <div>
        回复内容:
        <el-input
          :readonly='rowData.reply'
          type='textarea'
          :rows='10'
          placeholder='请输入回复内容'
          v-model='rowData.replyContent'
          maxlength='400'
          show-word-limit
        >
        </el-input>
      </div>
      <div v-if='!rowData.reply'>
        <el-button type='primary' @click='doReply'>保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addReplyApi, feedbackDeleteApi, feedbackPageApi } from '@/api/OperationManage'

export default {
  name: 'UserList',
  data() {
    return {
      pageParam: {},
      pageResult: {},
      rowData: {},
      dialogVisible: false
    }
  },
  created() {
    this.doPageQuery()
  },
  methods: {
    doPageQuery() {
      feedbackPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    showReplyDia(rowData) {
      this.rowData = rowData
      this.dialogVisible = true
    },
    doDel(id) {
      this.$confirm('是否确认删除', '提示', { type: 'error' }).then(res => {
        feedbackDeleteApi(id).then(res2 => {
          this.doPageQuery()
        })
      })
    },
    doReply() {
      addReplyApi(this.rowData).then(res => {
        this.doPageQuery()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
