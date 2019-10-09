<template>
    <transition name="mint-toast-pop">
        <div class="mint-toast" v-show="visible">
            <span class="mint-toast-text">{{ message }}</span>
        </div>
    </transition>
</template>

<style lang="less">
@import url("../../../less/body.less");
@import url("../../../less/colors.less");
.mint-toast,
.is-placetop {
    max-width: 640px;
    position: fixed;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity 0.2s linear;
    min-width: 100%;
    min-height: @ToastHeight;
    line-height: @ToastHeight;
    background: @meb;
    color: #ffffff;
    padding: 0;
    border-radius: 0;
    transition: none;
    top: -@ToastHeight;
    -webkit-animation: toatsAnimation 2s 1;
    z-index: 888;
    font-size: @ToastFont;
}
@-webkit-keyframes toatsAnimation {
    0% {
        top: -@ToastHeight / 2;
    }
    10% {
        top: 0;
    }
    50% {
        top: 0;
    }
    80% {
        top: -@ToastHeight;
    }
    100% {
        top: -@ToastHeight;
    }
}
</style>

<script type="text/babel">
export default {
    props: {
        message: String,
    },

    data() {
        return {
            visible: false
        };
    },

    computed: {
    }
};
</script>