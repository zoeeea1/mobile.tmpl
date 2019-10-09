<template>
    <div class="vux-actionsheet">
        <div class="m-mask-transition" :class="{'m-fade-toggle': propsShow}" :style="{display: propsShow ? 'block' : 'none'}" @click="emitEvent(`${cancelText}`)"></div>
        <div class="m-actionsheet" :class="{'m-actionsheet-toggle': propsShow}">
            <div class="m-actionsheet-menu">
                <div class="m-actionsheet-container">
                    <slot></slot>
                </div>
                <div class="m-actionsheet-cell m-actionsheet-cancel" @click="emitEvent(`${cancelText}`)" v-if="showCancel">{{cancelText}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    created() {
        this.propsShow = this.show
        if (this.value) this.propsShow = this.value
    },
    mounted() {
        this.$tabbar = document.querySelector('.weui_tabbar')
    },
    props: {
        show: Boolean,
        value: {
            type: Boolean,
            default: false
        },
        showCancel: Boolean,
        cancelText: String,
        onChange: {
            type: Function,
            default: null
        },
        menus: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            propsShow: false
        }
    },
    methods: {
        emitEvent(menu) {
            if (!/.noop/.test(menu)) {
                this.$emit('onChange', menu);
                this.propsShow = false;
            }
        },
        fixIos(zIndex) {
            if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
                this.$tabbar.style.zIndex = zIndex
            }
        }
    },
    watch: {
        value(val) {
            this.propsShow = val;
        },
        propsShow(val) {
            if (val) {
                this.fixIos(-1);
            } else {
                setTimeout(() => {
                    this.fixIos(100);
                }, 200)
            }
            this.$emit('input', val);
        },
        show(val) {
            this.propsShow = val;
        }
    },
    beforeDestroy() {
        this.fixIos(100);
    }
}
</script>

<style lang="less">
@import "../../less/mask.less";
@import "../../less/actionsheet.less";

.vux-actionsheet-gap {
    height: 8px;
    width: 100%;
    background-color: #eee;
}

.m-actionsheet-cancel {
    border-radius: 15px;
    margin: 0px 15px;
    margin-bottom: 13px;
}

.m-actionsheet-cancel:before {
    border-top: none;
}

// css hack
.m-fade-toggle {
    background: rgba(0, 0, 0, 0.3);
    max-width: 414px;
    left: 50% !important;
    margin-left: -3.75rem;
}

.m-actionsheet {
    background-color: inherit;
    max-width: 414px;
    left: 50% !important;
    margin-left: -3.75rem;
}

.m-actionsheet-menu {
    background-color: inherit;
}

.m-actionsheet-cell {
    background-color: #fff;
    padding: 15px 0;
}

.m-actionsheet-container {
    margin: 0;
    overflow: hidden;
}
</style>
