<template>
    <div class="condition" ref="condition">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
export default {
  name: 'm-conditions',
  props: {
    value: {}
  }
}
</script>

<style lang="less">
    .condition{
        position: fixed;
        top: 1.1rem;
        height: 0.88rem;
        left: 0;
        width: 100%;
        z-index: 9;
    }
</style>
