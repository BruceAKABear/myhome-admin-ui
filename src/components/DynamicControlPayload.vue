<template>
  <div>
    <div v-for="(item,index) in fields" :key="item.id" class="dynamic-item">
      <el-row :gutter="10" :style="{'margin-top':index===0?'-20px':''}">
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
    <div class="verify-button-box" v-show="fields.length!==0">
      <el-button size="mini" :type="verifyStatus?'success':'info'" @click="verifyPayload">
        {{ verifyStatus ? '验证通过' : '验证' }}
      </el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DynamicControlPaylocad',
  data() {
    return {
      fields: [],
      orderObject: {},
      verifyStatus: false
    }
  },
  props: {
    productFields: {
      type: Array,
      require: true
    },
    oldValue: {
      type: String,
      require: true
    }
  },
  methods: {
    verifyPayload() {
      const payload = JSON.stringify(this.orderObject)
      if (payload !== '{}') {
        this.verifyStatus = true
        this.$emit('callBack', payload)
      } else {
        this.$notify.warning('请正确选择控制数据')
      }
    }
  },
  watch: {
    productFields(newValue) {
      this.fields = newValue
    },
    oldValue(newValue) {
      if (newValue) {
        this.orderObject = JSON.parse(newValue)
      } else {
        this.orderObject = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-item {
  margin-top: 20px;

  .el-row {
    display: flex;
    align-items: center
  }
}

.verify-button-box {
  margin-top: 20px;

  .el-button {
    width: 100%;
  }

}

</style>
