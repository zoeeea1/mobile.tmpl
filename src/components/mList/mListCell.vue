<template>
    <div class="m-list-cell">
        <div v-if="icon" class="m-icon" :class="'m-' + icon">
            <slot name="icon"></slot>
            <slot name="title">
                <span v-if="label" :class="['m-cell-label',`m-cell-${margin}`]" v-text="label"></span>
            </slot>
        </div>
        <div class="m-cell-left">
            <slot name="left"></slot>
        </div>
        <div class="m-cell-wrap" v-if="content">
            <div :class="['m-cell-text',`m-cell-${margin}`]">
                <slot name="content"></slot>
            </div>
        </div>
        <slot name="right"></slot>
        <slot></slot>
    </div>
</template>
<script type="text/babel">
export default {
    props: {
        icon: String,
        title: String,
        label: String,
        content: String,
        margin: {
            type: Number,
            default: 0
        },
        tapEvent:{
            type: Function,
            default: null
        }
    },
    methods:{
    }
}
</script>

<style lang="less" scoped>
.m-list-cell {
    padding: .2rem;
    margin-bottom: -1px;
    border: 1px solid #e6e6e6;
    border-width: 1px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    // justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    overflow: hidden;

    .m-cell-left {
        margin-right: 0.3rem;
        display: flex;
        flex-direction: column;
        margin: 0;
        font-weight: 500;
    }
    .m-icon{
        //  -webkit-box-flex: 1;
        // -ms-flex: 1;
        // flex: 1;
    }
    .m-cell-wrap {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    img {
        vertical-align: middle;
    }
    .m-cell-text {
        vertical-align: middle;
    }
    .m-cell-0 {
        margin-left: 0;
    }
    .m-cell-1 {
        margin-left: 0.1rem;
    }
    .m-cell-2 {
        margin-left: 0.2rem;
    }
    .m-cell-3 {
        margin-left: 0.3rem;
    }
}
</style>