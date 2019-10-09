<template>

    <div v-show="options.visible">
        <div class="comfim-fadeBack"></div>
        <div class="comfim-inner">
            <div class="comfim-text">
                <p class="title">{{options.message}}</p>
                <div @click="cancel" class="btn btn-cancel">{{options.btn1}}</div>
                <div @click="comfim" class="btn btn-comfim">{{options.btn2}}</div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import "../../less/font.less";
.comfim-fadeBack {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.3);
}
.comfim-inner {
    width: 6.6rem;
    height: 5.2rem;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.6rem;
    margin-left: -3.3rem;
    background-image: url(../../images/comfimBg.png);
    background-size: 100% 100%;
    z-index: 1001;
    animation: modal-open 0.4s ease;
    -webkit-animation: modal-open 0.4s ease;
    visibility: visible;
}
.comfim-text {
    position: absolute;
    top: 1.6rem;
    left: 2.8rem;
    width: calc(6.6rem - 3rem);
    text-align: center;
}
.title {
    font-size: @font-34;
    color: #222;
}
.btn {
    border-radius: 36px;
    font-size: @font-30;
    padding: 0.15rem 0.5rem;
    width: 2.5rem;
    margin: 0 auto;
}
.btn-cancel {
    margin-top: 0.72rem;
    color: #666;
    background: #eeeeee;
}
.btn-comfim {
    margin-top: 0.36rem;
    background: #ff3a63;
    color: #fff;
}
@keyframes modal-open {
    0% {
        opacity: 0;
        transform: scale(1.2, 1.2);
        -webkit-transform: scale(1.2, 1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1, 1);
        -webkit-transform: scale(1, 1);
    }
}

@-webkit-keyframes modal-open {
    0% {
        opacity: 0;
        transform: scale(1.2, 1.2);
        -webkit-transform: scale(1.2, 1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1, 1);
        -webkit-transform: scale(1, 1);
    }
}
</style>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        options: {
            type: Object,
            default: {
                visible: false,
            }
        }
    },
    methods: {
        comfim() {
            this.$emit('clickBtn', true);
        },
        cancel() {
            this.$emit('clickBtn', false);
        }
    }
}
</script>

