<template>
  <div class="page-container">

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never" header="个人信息">
          <el-image style="width: 100px; height: 100px" :src="url" fit="fill"></el-image>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          从不显示
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          从不显示
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          从不显示
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
