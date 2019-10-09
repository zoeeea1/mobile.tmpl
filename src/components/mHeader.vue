<template>
    <header class="m-header">
        <div class="m-header-button header-is-left" @click="back">
            <slot name="left"></slot>
        </div>
        <div class="m-header-title">
            <slot name="title"></slot>
        </div>
        <div class="m-header-button header-is-right">
            <slot name="right"></slot>
        </div>
    </header>
</template>
<style lang="less">
    .m-header-button{
        img{
            width: .16rem;
        }
    }
</style>
<script>
/**
 * m-header
 * @module components/mContainer
 * @desc 顶部导航
 *
 * @example
    <m-header>
        <div slot="left">返回</div>
        <h1 slot="title" class="m-header-title">首页</h1>
        <div slot="right">分享</div> 
    </m-header>
 */
export default {
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>