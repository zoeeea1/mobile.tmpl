<template>
<transition name="m-range-animate">
  <div class="vux-range-input-box" style="position:relative;margin-top:10px">
    <input class="vux-range-input" v-model.number="currentValue">
  </div>
</transition>
</template>

<script>
import Powerange from './powerange'

export default {
  name: 'range',
  props: {
    decimal: Boolean,
    value: {
      default: 0,
      type: Number
    },
    min: {
      type: Number,
      default: 0
    },
    minHTML: String,
    maxHTML: String,
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: Boolean,
    disabledOpacity: Number,
    rangeBarHeight: {
      type: Number,
      default: 5
    },
    rangeHandleHeight: {
      type: Number,
      default: 30
    }
  },
  created () {
    this.currentValue = this.value
  },
  mounted () {
    const _this = this
    this.$nextTick(() => {
      let options = {
        callback: function (value) {
          _this.currentValue = value
        },
        decimal: this.decimal,
        start: this.currentValue,
        min: this.min,
        max: this.max,
        minHTML: this.minHTML,
        maxHTML: this.maxHTML,
        disable: this.disabled,
        disabledOpacity: this.disabledOpacity,
        initialBarWidth: window.getComputedStyle(this.$el.parentNode).width.replace('px', '') - 80
      }
      if (this.step !== 0) {
        options.step = this.step
      }
      this.range = new Powerange(this.$el.querySelector('.vux-range-input'), options)
      const handleTop = (this.rangeHandleHeight - this.rangeBarHeight) / 2
      this.$el.querySelector('.range-handle').style.top = `-${handleTop}px`
      this.$el.querySelector('.range-bar').style.height = `${this.rangeBarHeight}px`
      this.handleOrientationchange = () => {
        this.update()
      }
      window.addEventListener('orientationchange', this.handleOrientationchange, false)
    })
  },
  methods: {
    update () {
      console.log('update', this.currentValue)
      let value = this.currentValue
      if (value < this.min) {
        value = this.min
      }
      if (value > this.max) {
        value = this.max
      }
      this.range.reInit({
        min: this.min,
        max: this.max,
        step: this.step,
        value
      })
      this.currentValue = value
      this.range.setStart(this.currentValue)
      this.range.setStep()
    }
  },
  data () {
    return {
      currentValue: 0
    }
  },
  watch: {
    currentValue (val) {
      this.range && this.range.setStart(val)
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value (val) {
      this.currentValue = val
    },
    min () {
      this.update()
    },
    step () {
      this.update()
    },
    max () {
      this.update()
    }
  },
  beforeDestroy () {
    window.removeEventListener('orientationchange', this.handleOrientationchange, false)
  }
}
</script>

<style lang="less">
@import './powerange.less';
.vux-popup-animate-bottom-enter,
.vux-popup-animate-bottom-leave-active {
    transform: translate3d(0, 100%, 0);
}

.m-range-animate-enter,
.m-range-animate-leave-active {
    transform: translate3d(-100%, 0, 0);
}

.m-range-animate-enter,
.m-range-animate-leave-active {
    transform: translate3d(100%, 0, 0);
}

.m-range-animate-enter,
.m-range-animate-leave-active {
    transform: translate3d(0, -100%, 0);
}

</style>

