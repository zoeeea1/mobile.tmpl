<template>
  <div class="vux-sticky-box">
    <slot></slot>
  </div>
</template>

<script>
import sticky from './sticky'

export default {
  name: 'sticky',
  created() {
    this.$vux && this.$vux.bus && this.$vux.bus.$on('vux:after-view-enter', this.bindSticky)
  },
  mounted() {
    this.$nextTick(() => {
      this.bindSticky()
    })
  },
  beforeDestroy() {
    this.$vux && this.$vux.bus && this.$vux.bus.$off('vux:after-view-enter', this.bindSticky)
  },
  methods: {
    bindSticky() {
      this.$nextTick(() => {
        sticky(this.$el, {
          scrollBox: this.scrollBox,
          offset: this.offset,
          checkStickySupport: typeof this.checkStickySupport === 'undefined' ? true : this.checkStickySupport,
          top:this.top
        })
      })
    }
  },
  props:{
    scrollBox:String,
    offset:String,
    top:Number
  },
  watch: {
    top(value) {
      this.bindSticky();
    },
  }
}
</script>

<style scoped>
.vux-sticky-box {
  z-index: 1000;
}

.vux-sticky {
  width: 100%;  
  position: sticky;
  top: 0;
}

.vux-fixed {
  width: 100%;
  position: fixed;
  top: 0;
  transform: translate3d(0, 0, 0);
}
</style>
