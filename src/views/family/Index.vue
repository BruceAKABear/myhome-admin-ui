<template>
  <div class="page-container" style="width: 100%">

  </div>

</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      data: 'demo',
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>

.center-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step-container {
  position: absolute;
  width: 100%;
  bottom: 0;
}

</style>
