<template>
    <transition name="loading-toast-pop">
        <div class="loading-toast" v-show="visible">
            <img src="../../../images/loading.gif" style="margin-bottom:.3rem" />
            <span class="mint-toast-text">{{ message }}</span>
        </div>
    </transition>
</template>

<style lang="less" scope>
@import url("../../../less/body.less");
@import url("../../../less/colors.less");
.loading-toast,
.is-placetop {
    position: fixed;
    color: #fff;
    transition: opacity 0.2s linear;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0;
    border-radius: 0;
    transition: none;
    z-index: 888;
    font-size: 0.3rem;
    top: 50%;
    left: 50%;
    margin-top: -1rem;
    margin-left: -1rem;
    border-radius: 0.1rem;
    flex-direction: column;
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