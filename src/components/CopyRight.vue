<template>
  <div class='main-box' :style="'width:'+realWidth+'px'"><span>{{ footText }}</span></div>
</template>

<script>
export default {
  name: 'CopyRight',
  computed: {
    footText() {
      return `©2020-${new Date().getFullYear()} BLab大熊实验室 `
    },
    realWidth() {
      let rWidth
      if (this.$store.state.collapse) {
        rWidth = this.$store.state.screenWidth - 64 - 20
      } else {
        rWidth = this.$store.state.screenWidth - 200 - 20
      }
      return rWidth
    }
  }
}
</script>

<style lang='scss' scoped>
.main-box {
  position: absolute;
  bottom: 10px;
  text-align: center;

  span {
    color: #c8c9cc;
    width: 100%;
    font-size: 14px;
  }
}

</style>
