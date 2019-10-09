<template>
    <div class="m-condition" @click="tapEvent(value)">
        <div class="m-condition-text" v-if="title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script type="text/babel">
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: String
        },
        toggle: {
            type: Function,
            default: null
        }
    },
    methods: {
        tapEvent(moudle) {
            this.$emit('toggle', moudle)
        }
    }
}
</script>

<style lang="less" scoped>
.m-condition {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    
}
.active {
        .m-condition-text {
            color: #ff335b;
        }
    }
.m-condition-text {
    color: rgba(0, 0, 0, 0.87);
}
</style>
