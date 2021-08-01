<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-row :gutter='10'>
          <el-col :span='4'>
            <el-input size='mini' v-model='pageParam.province' placeholder='省份' />
          </el-col>
          <el-col :span='4'>
            <el-input size='mini' v-model='pageParam.city' placeholder='市' />
          </el-col>
          <el-col :span='4'>
            <el-input size='mini' v-model='pageParam.district' placeholder='区' />
          </el-col>
          <el-col :span='4'>
            <el-input size='mini' v-model='pageParam.street' placeholder='街道' />
          </el-col>
          <el-col :span='4'>
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
        label='家庭名称'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='province'
        label='省'
        align='center'
      />
      <el-table-column
        prop='city'
        label='市'
        align='center'
      />
      <el-table-column
        prop='district'
        label='区'
        align='center'
      />
      <el-table-column
        prop='street'
        label='街道'
        align='center'
      />
      <el-table-column
        prop='floorCount'
        label='楼层数'
        align='center'
      />
      <el-table-column
        prop='roomCount'
        label='房间数'
        align='center'
      />
      <el-table-column
        prop='deviceCount'
        label='设备数'
        align='center'
      />
      <el-table-column
        prop='memberCount'
        label='成员数'
        align='center'
      />
      <el-table-column
        prop='createTime'
        label='创建时间'
        align='center'
        show-overflow-tooltip
      />
    </el-table>

  </div>
</template>

<script>
import { familyPageApi } from '@/api/OperationManage'

export default {
  name: 'FamilyList',
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
      familyPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
