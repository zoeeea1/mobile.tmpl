<template>
  <div class="m-swipe-item">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  export default {
    mounted() {
      this.$parent && this.$parent.swipeItemCreated(this);
    },

    destroyed() {
      this.$parent && this.$parent.swipeItemDestroyed(this);
    }
  };
</script>

<style lang="less" scoped>
  .m-swipe-item{
    img{
      width:100%;
    }
  }
</style>
