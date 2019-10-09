<template>
    <section class="m-center">
        <div class="cover" v-if="pageStatus == 0" v-cloak>
            <div class="loadinging">
                <img src="../images/loading.gif">
            </div>
        </div>
        <div class="cover" v-if="pageStatus == 1" v-cloak>
            <div class="noData">
                <slot name="empty">
                    暂时没有数据
                </slot>
            </div>
        </div>
        <slot></slot>
    </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
    props: {
        pageStatus: {
            type: Number,
            default: 0
        }
    },
}
</script>