<template>
  <div class="m-tab" ref="tabs">
    <slot></slot>
    <span class="m-tab-link-highlight" ref="highlight" :class="lineClass" style="transition:all .3s"></span>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'm-tabs',
  props: {
    lineClass: {
      type: [String, Object, Array]
    },
    value: {}
  },
  data () {
    return {
      tabLightStyle: {
        transform: 'translate3d(0, 0, 0)'
      }
    }
  },
  updated () {
    this.setTabLightStyle()
  },
  methods: {
    handleTabClick (value, tab) {
      if (this.value !== value) {
        this.$emit('change', value);
      }
    },
    getActiveIndex () {
      if (!this.$children || this.$children.length === 0) return -1
      let activeIndex = -1
      this.$children.forEach((tab, i) => {
        if (tab.value === this.value) {
          activeIndex = i;
          return false
        }
      })
      return activeIndex
    },
    setTabLightStyle () {
      let x ;
      // let x = Math.abs(parseInt(this.getActiveIndex()+1) * 20)-10;
      //let x = Math.abs(parseInt(this.getActiveIndex()+1) * 33.33)-16.665;
      let len = this.$children.length;
      if(len == 2)
      {

        if(parseInt(this.getActiveIndex()+1) == len)
        {
          x = Math.abs(parseInt(this.getActiveIndex()+1) * 33.33)+8;
        }else{
          x = Math.abs(parseInt(this.getActiveIndex()+1) * 33.33)-10;
        }
      }
      if(len == 3 )
      {
        x = Math.abs(parseInt(this.getActiveIndex()+1) * 33.33)-16.665;
      }
      if(len == 5)
      {
        x = Math.abs(parseInt(this.getActiveIndex()+1) * 20)-10;
      }
      let el = this.$refs.highlight;
      el.style.left = x+'%';
    }
  },
  mounted () {
    this.setTabLightStyle()
  }
}
</script>

<style lang="less">
.m-tab{
  color: #FFF;
  position: relative;
  z-index: 100;
  width: 100%;
}

.m-tab-link-highlight {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 16px;
  height: 2px;
  margin-left: -8px;
  background: #fe3864;
  border-radius: 2px;
  backface-visibility: hidden;
}

</style>
