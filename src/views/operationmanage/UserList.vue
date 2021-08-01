<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-row :gutter='10'>
          <el-col :span='14'>
            <el-select v-model='pageParam.sex' placeholder='请选择性别' size='mini' clearable>
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
        prop='name'
        label='昵称'
        align='center'
      />
      <el-table-column
        label='头像'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          <el-image fit='fill' style='width: 40px; height: 40px' :src='scope.row.avatar' v-if='scope.row.avatar' />
        </template>
      </el-table-column>
      <el-table-column
        label='性别'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          {{ scope.row.sex === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column
        prop='phone'
        label='手机号'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='email'
        label='邮箱'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='createTime'
        label='注册日期'
        align='center'
      />
      <el-table-column
        prop='lastLoginTime'
        label='上次登录日期'
        align='center'
      />
    </el-table>

  </div>
</template>

<script>
import { userPageApi } from '@/api/OperationManage'

export default {
  name: 'UserList',
  data() {
    return {
      pageParam: {},
      pageResult: {}
    }
  },
  created() {
    this.doPageQuery()
  },
  methods: {
    doPageQuery() {
      userPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
