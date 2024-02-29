<template>
  <div class="page-container">
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.name' clearable :placeholder="$t('familyPage.search.info')" size='mini'/>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' size='mini' type='warning' @click='showAddDia'>{{ $t('familyPage.search.button') }}
        </el-button>
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
        :label="$t('familyPage.table.header.familyId')"
        prop='id'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.familyName')"
        prop='name'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.long')"
        prop='longitude'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.lat')"
        prop='latitude'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.floorCount')"
        prop='floorCount'
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.roomCount')"
        prop='roomCount'
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.deviceCount')"
        prop='deviceCount'
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.createTime')"
        prop='createTime'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.updateTime')"
        prop='updateTime'
        show-overflow-tooltip
      />
      <el-table-column
        align='center'
        :label="$t('familyPage.table.header.operation')"
        width='180'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>
              {{ $t('familyPage.table.header.operationModify') }}
            </el-button>
            <el-button
              :disabled='scope.row.roomCount!==0'
              size='mini'
              type='danger'
              @click='deleteFamily(scope.row)'>{{ $t('familyPage.table.header.operationDelete') }}
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

    <el-dialog
      :before-close="closeDia"
      :visible.sync='dialogVisible'
      :title="newObj.id?$t('familyPage.dialog.update'):$t('familyPage.dialog.add')"
      width="30%"
    >
      <el-form
        ref='addForm'
        :model='newObj'
        :rules="rules"
        label-width='30%'
        status-icon
      >
        <el-form-item :label="$t('familyPage.dialog.familyName')" prop='name'>
          <el-col :span="16">
            <el-input v-model='newObj.name' autocomplete='off' clearable/>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('familyPage.dialog.long')" prop='longitude'>
          <el-col :span="16">
            <el-input v-model='newObj.longitude' autocomplete='off' clearable/>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('familyPage.dialog.lat')" prop='latitude'>
          <el-col :span="16">
            <el-input v-model='newObj.latitude' autocomplete='off' clearable/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='closeDia'>{{ $t('familyPage.dialog.cancel') }}</el-button>
        <el-button type='primary' @click='saveOrUpdate'>{{ $t('familyPage.dialog.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { familyAddUpdateApi, familyDeleteApi, familyInfoApi, familyPageApi } from '@/api/FamilyApi'

export default {
  name: 'Family',
  data() {
    return {
      pageParam: {
        size: 14
      },
      pageResult: {},
      dialogVisible: false,
      familyObject: {},
      newObj: {
        id: '',
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入家庭名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        longitude: [
          {
            required: true,
            message: '请输入经度',
            trigger: 'blur'
          }
        ],
        latitude: [
          {
            required: true,
            message: '请输入纬度',
            trigger: 'blur'
          }
        ],
        appId: [
          {
            required: false,
            message: '请输入天气appId',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 15,
            message: '长度在 8 到 15 个字符',
            trigger: 'blur'
          }
        ],
        appSecret: [
          {
            required: false,
            message: '请输入天气appSecret',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 15,
            message: '长度在 8 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }

    }
  },
  methods: {
    doPageQuery() {
      familyPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    pageNumberChange(data) {
      this.pageParam.page = data
      this.doPageQuery()
    },
    showAddDia() {
      this.dialogVisible = true
      this.$refs.addForm.clearValidate()
    },
    closeDia() {
      this.newObj = {}
      this.dialogVisible = false
    },
    doGetFamilyInfo() {
      familyInfoApi().then(res => {
        this.familyObject = res.data
      })
    },
    showUpdate(rowData) {
      this.newObj = rowData
      this.dialogVisible = true
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(r => {
        if (r) {
          familyAddUpdateApi(this.newObj).then(res => {
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
    deleteFamily(rowdata) {
      this.$confirm('是否确认删除家庭' + rowdata.name).then(() => {
        familyDeleteApi(rowdata.id).then((res) => {
          if (res.status) {
            this.$notify.success('操作成功')
            this.doPageQuery()
          } else {
            this.$notify.warning(res.message)
          }
        })
      })
    }

  },
  mounted() {
    this.doPageQuery()
  },
  watch: {
    'pageParam.name'(nv, ov) {
      this.doPageQuery()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
