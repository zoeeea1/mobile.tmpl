<template>
  <div class="tab-container" ref="wrap">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'm-tab-container',
  props: {
    lineClass: {
      type: [String, Object, Array]
    },
    value: {}
  },
  data() {
    return {
      tabLightStyle: {
        width: '0%',
        transform: 'translate3d(0, 0, 0)'
      },
    }
  },
  updated() {

  },
  methods: {
    handleTabClick (value, tab) {
      if (this.value !== value) {
        this.$emit('change', value);
      }
    },
    getActiveIndex() {
      if (!this.$children || this.$children.length === 0) return -1
      let currentIndex = -1
      this.$children.forEach((tab, i) => {
        if (tab.value === this.value) {
          currentIndex = i;
          return false
        }
      })
      return currentIndex
    },

  },
  mounted() {

    
  }
}
</script>

<style lang="less">
.tab-container {
  flex-shrink: 0;
  width: 100%;
  color: #222;
}
.tab-container ~ .m-tab-link-highlight{
  display: none;
}
.m-tab ~ .tab-container{
  border-top:0.9rem solid transparent
}
</style>
