<template>
  <div class="page-container">
    <el-row :gutter="20" style="padding-top: 30px">
      <el-col :lg="8" :push="6" :sm="12">
        <el-form ref="familyForm" :model="familyObject" :rules="rules" label-width="150px">
          <el-form-item :label="$t('family.name')" prop="name">
            <el-input v-model="familyObject.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('family.createTime')" prop="createTime">
            <el-input v-model="familyObject.createTime" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('family.updateTime')" prop="updateTime">
            <el-input v-model="familyObject.updateTime" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="天气APPID" prop="appId">
            <el-input v-model="familyObject.appId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="天气secret" prop="appSecret">
            <el-input v-model="familyObject.appSecret" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('family.floorCount')">
            <el-input v-model="familyObject.floorCount" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('family.roomCount')">
            <el-input v-model.number="familyObject.roomCount" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('family.deviceCount')">
            <el-input v-model.number="familyObject.deviceCount" disabled></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-top: 40px">
          <el-button style="width: 100%" type="primary" @click="updateFamily">{{$t('family.updateButton')}}</el-button>
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import { addUpdateFamilyInfoApi, familyInfoApi } from '@/api/FamilyApi'

export default {
  name: 'Family',
  data() {
    return {
      familyObject: {},
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
    doGetFamilyInfo() {
      familyInfoApi().then(res => {
        this.familyObject = res.data
      })
    },
    updateFamily() {
      this.$refs.familyForm.validate((validate) => {
        if (validate) {
          addUpdateFamilyInfoApi({
            id: this.familyObject.id,
            name: this.familyObject.name,
            appId: this.familyObject.appId,
            appSecret: this.familyObject.appSecret
          }).then(res => {
            if (res.status) {
              this.$notify.success('更新家庭信息成功')
              this.doGetFamilyInfo()
            }
          })
        } else {
          this.$notify.warning('请检查信息是否填写正确')
        }
      })
    }
  },
  mounted() {
    this.doGetFamilyInfo()
  }
}
</script>

<style lang="scss" scoped>

</style>
