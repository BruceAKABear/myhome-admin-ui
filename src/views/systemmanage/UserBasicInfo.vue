<template>
  <div class='page-container'>
    <el-row :gutter='20'>
      <el-col :span='12'>
        <div class='avatar-box'>
          <div style='display: flex;flex-direction:column;align-items: center'>
            <el-image
              class='avatar-image'
              fit='cover'
              :src='$store.state.userInfo.avatar'
            />
            <div style='margin-top: 10px'>
              <el-upload
                class='avatar-uploader'
                :headers='uploadHeaders'
                :action='imageUploadUrl'
                :show-file-list='false'
                :on-success='handleAvatarSuccess'
                :before-upload='beforeAvatarUpload'>
                <el-button icon='plus' size='mini' style='color: #C8C9CC;border: dashed 1px #C8C9CC'>上传<i
                  class='el-icon-upload el-icon--right'></i></el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <div class='detail-box'>
          <el-form ref='form' label-width='80px'>
            <el-form-item label='用户ID'>
              <el-input v-model='$store.state.userInfo.id' :readonly='true' />
            </el-form-item>
            <el-form-item label='昵称'>
              <el-input v-model='$store.state.userInfo.name' type='text' maxlength='20' show-word-limit></el-input>
            </el-form-item>
            <el-form-item label='邮箱'>
              <el-input v-model='$store.state.userInfo.email' type='text' maxlength='40' show-word-limit></el-input>
            </el-form-item>
            <el-form-item label='手机号'>
              <el-input v-model='$store.state.userInfo.phone' type='text' maxlength='11' show-word-limit></el-input>
            </el-form-item>
            <el-form-item label='密码'>
              <el-input
                v-model='$store.state.userInfo.password'
                show-password
                autocomplete='off'
                placeholder='如果不修改密码保持为空即可'></el-input>
            </el-form-item>
          </el-form>
          <div class='button-box'>
            <el-button type='success' style='background-color: #19be6b;width: 100%' @click='doUpdateUserInfo'>更新信息
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span='12'>
        <div class='grid-content bg-purple'></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from '@/store'
import { updateUserInfoApi } from '@/api/SystemConfigApi'

export default {
  name: 'UserBasicInfo',
  data() {
    return {
      userinfo: {},
      imageUploadUrl: 'http://localhost:9000/backend/file/uploadImg',
      uploadHeaders: {
        token: store.state.userToken
      }
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt100k = file.size / 1024 < 100
      if (!isLt100k) {
        this.$message.error('上传头像图片大小不能超过100K')
      }
      return isLt100k
    },
    handleAvatarSuccess(res, file) {
      this.$set(this.$store.state.userInfo, 'avatar', res.data)
    },
    doUpdateUserInfo() {
      updateUserInfoApi(this.$store.state.userInfo).then(res => {
        this.$notify.success('修改成功')
      })
    }

  }

}
</script>

<style lang='scss' scoped>
.avatar-box {
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  padding: 10px;

  .avatar-image {
    height: 80px;
    width: 80px;
    border-radius: 50px;
  }
}

.detail-box {
  margin-top: 10px;
  background-color: #FFFFFF;
  padding: 10px;

  .el-form {
    padding: 0 20px;
  }

  .button-box {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 40px;
  }
}

</style>
<style>
.el-row {
  background-color: #f6f8f9;
}
</style>
