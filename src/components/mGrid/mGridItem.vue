<template>
    <div :class="['m-list-grid',`col-${col}`]">
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
.m-list-grid {
    padding: .3rem;
    list-style: none;
    background: #fff;
    border:1px solid #eee;
}
.col-0{
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}
.col-1 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
}

.col-2 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 33.33333%;
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
}

.col-3 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 49.99999%;
    flex: 0 0 49.99999%;
    max-width: 49.99999%;
}
.col-4{
    -webkit-box-flex: 0;
    -ms-flex: 0 0 66.66667%;
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
}
.col-5{
    -webkit-box-flex: 0;
    -ms-flex: 0 0 83.33333%;
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
}
</style>
<script type="text/babel">
export default {
    props: {
        col: {
            type: Number,
            default: 0
        }
    },
    beforeCreate: function () {

    },
    created: function () {
        // debugger;

    },
    beforeMount: function () {

    },
    mounted: function () {

    },
    activated() {

    },
    deactivated() {

    },
    beforeUpdate: function () {

    },
    updated: function () {

    },
    beforeDestroy: function () {

    },
    destroyed: function () {

    },
    methods: {

    }
}
</script>
