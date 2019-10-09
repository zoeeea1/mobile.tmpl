<template>
    <div class="m-actionsheet-cell" @click="emitEvent(value)">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
export default {
    created() {
    },
    mounted() {

    },
    props: {
        value: {
            type: String,
            default: ""
        },
        checked: {
            type: Function,
            default: null
        }
    },
    data() {
        return {

        }
    },
    methods: {
        emitEvent(menu) {
            this.$emit('checked', menu);
        }
    },
    watch: {
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
.weui_fade_toggle {
    background: rgba(0, 0, 0, 0.3);
}

.weui_actionsheet {
    background-color: inherit;
}

.m-actionsheet-menu {
    background-color: inherit;
}

.m-actionsheet-item {
    background-color: #fff;
    padding: 15px 0;
}

.m-actionsheet-container {
    margin: 0;
    overflow: hidden;
}
</style>
