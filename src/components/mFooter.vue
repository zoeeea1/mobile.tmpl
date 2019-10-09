<template>
    <footer class="m-footer">
        <router-link :to="{name:'home'}" replace>
            <div>
                <span>1</span>
            </div>
        </router-link>
        <router-link :to="{name:'college.index'}" replace>
            <div>
                <span>2</span>
            </div>
        </router-link>
        <router-link :to="{name:'center'}" replace>
            <div>
                <span>3</span>
            </div>
        </router-link>
    </footer>
</template>
<style lang="less" scope>
</style>
<script>
export default {
    props: {
        pageName: {
            type: String,
            default: 'home'
        }
    },
}
</script>
