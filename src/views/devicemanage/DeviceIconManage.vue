<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.name' size='mini' placeholder='请输入分类名' clearable />
        <el-button size='mini' type='primary' style='margin-left: 10px' icon='el-icon-search' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加图标</el-button>
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
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='name'
        label='图标名'
        align='center'
      />
      <el-table-column
        label='图标'
        align='center'
      >
        <template slot-scope='scope'>
          <el-image fit='fill' style='width: 50px; height: 50px' :src='scope.row.iconUrl' />
        </template>
      </el-table-column>
      <el-table-column
        prop='deviceCount'
        label='包含设备数'
        align='center'
      />
      <el-table-column
        width='180'
        label='操作'
        align='center'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button
              size='mini'
              type='danger'
              @click='deleteIcon(scope.row)'
              :disabled='scope.row.deviceCount!==0'>删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if='pageResult.pages>1' class='pagination-box'>
      <el-pagination
        background
        layout='prev, pager, next'
        :total='pageResult.total'
        @current-change='pageNumberChange'
      />
    </div>

    <el-dialog :title="newObj.id?'修改图标':'新增图标'" :visible.sync='addDialogFormVisible'>
      <el-form
        ref='addForm'
        :model='newObj'
        status-icon
        :rules='rules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='图标名' prop='name'>
          <el-input v-model='newObj.name' autocomplete='off' />
        </el-form-item>
        <el-form-item label='图标' prop='iconUrl'>
          <el-upload
            :limit='1'
            class='avatar-uploader'
            :headers='uploadHeaders'
            :action='imageUploadUrl'
            :show-file-list='false'
            :on-success='handleAvatarSuccess'
            :before-upload='beforeAvatarUpload'>
            <img v-if='newObj.iconUrl' :src='newObj.iconUrl' class='avatar'>
            <i v-else class='el-icon-plus avatar-uploader-icon'></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrUpdateIconApi, categoryListApi, deleteIconPageApi, deviceIconPageApi } from '@/api/DeviceManage'
import store from '@/store'

export default {
  name: 'DeviceIconManage',
  data() {
    return {
      pageResult: {},
      pageParam: {},
      newObj: {},
      addDialogFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入图标名',
            trigger: 'blur'
          }
        ],
        iconUrl: [
          {
            required: true,
            message: '请上传图标',
            trigger: 'blur'
          }
        ]
      },
      categoryList: [],
      controlDataFormat: {},
      responseDataFormat: {},
      imageUploadUrl: 'http://localhost:9000/backend/file/uploadImg',
      uploadHeaders: {
        token: store.state.userToken
      }
    }
  },
  created() {
    this.doPageQuery()
    this.doGetCategoryLIst()
  },
  methods: {
    doPageQuery() {
      deviceIconPageApi(this.pageParam).then(res => {
        this.pageResult = res.data
      })
    },
    doGetCategoryLIst() {
      categoryListApi().then(res => {
        if (res.status) {
          this.categoryList = res.data
        }
      })
    },
    showAddDia() {
      this.addDialogFormVisible = true
      this.newObj = {}
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    categoryChange(e) {
      this.categoryList.forEach(item => {
        if (item.id === e) {
          this.controlDataFormat = item.controlDataFormat
          this.responseDataFormat = item.responseDataFormat
        }
      })
    },
    pageNumberChange(e) {
      this.pageParam.pageNumber = e
      this.doPageQuery()
    },
    saveOrUpdate() {
      this.$refs.addForm.validate(res => {
        if (res) {
          addOrUpdateIconApi(this.newObj).then(res => {
            this.$notify.success(this.newObj.id ? '修改成功' : '新增成功')
            this.addDialogFormVisible = false
            this.doPageQuery()
          })
        }
      })
    },
    showUpdate(rowData) {
      this.newObj = rowData
      this.categoryList.forEach(item => {
        if (item.id === rowData.categoryId) {
          this.controlDataFormat = item.controlDataFormat
          this.responseDataFormat = item.responseDataFormat
        }
      })
      this.addDialogFormVisible = true
    },
    deleteIcon(rowData) {
      this.$confirm('是否确认删除图标？', '提示', { type: 'warning' }).then(() => {
        deleteIconPageApi({ id: rowData.id }).then(res => {
          if (res.status) {
            this.$notify.success('图标删除成功')
            this.doPageQuery()
          } else {
            this.$notify.warning(res.message)
          }
        })
      })
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/png'
      const isLt5k = file.size / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图标图片只能是 png 格式!')
      }
      if (!isLt5k) {
        this.$message.error('上传头像图片大小不能超过5K')
      }
      return isJPG && isLt5k
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.$set(this.newObj, 'iconUrl', res.data)
    }

  }
}
</script>

<style lang='scss' scoped>

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #C8C9CC;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #C8C9CC;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
