<template>
  <div>
    <el-pagination
      :total='pageResult.total'
      background
      layout='prev, pager, next'
      @current-change='pageChange'
    />
  </div>
</template>

<script>
export default {
  name: 'Pagenator',
  data() {
    return {}
  },
  methods: {
    pageChange(page) {

    }
  }
}
</script>

<style scoped lang="scss">

</style>
