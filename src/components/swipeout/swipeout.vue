<template>
    <div class="vux-swipeout">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'swipeout'
}
</script>

<style lang="less">
// @import '../../styles/variable.less';

.vux-swipeout {
    width: 100%;
    overflow: hidden;
}
.vux-swipeout-item {
    position: relative;
}
.vux-swipeout-button-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
    text-align: right;
}
.vux-swipeout-button-box-left {
    text-align: left;
}
.vux-swipeout-button-box > div {
    height: 100%;
}
.vux-swipeout-button {
    height: 100%;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border: none;
}
.vux-swipeout-content {
    position: relative;
    background: #fff;
}
.vux-swipeout-content.vux-swipeout-content-animated {
    transition: transform 0.2s;
}
.vux-swipeout-button-primary {
    background-color: grey;
}
.vux-swipeout-button-warn {
    background-color: #ff4769;
}
.vux-swipeout-button-default {
    background-color: #eee;
}
</style>