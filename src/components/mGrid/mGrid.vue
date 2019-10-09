<template>
    <div class="m-grid">
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
    .m-grid{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    flex-wrap: wrap;
}
</style>