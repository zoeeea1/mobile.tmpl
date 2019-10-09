<template>
    <m-container>
        <m-header>
            <div slot="left">返回</div>
            <div slot="title">标题</div>
        </m-header>

        <m-center :pageStatus="pageStatus">
            <div class="list">
                <button @click="openToast">Toast</button>
                <button @click="openActionsheet">actionsheet</button>
                <button @click="openLoading">loading</button>
            </div>

            <!-- sheet -->
            <m-actionsheet v-model="actionsheetShow" :propsShow="actionsheetShow" :showCancel="false">
                <div class="actionsheet flex-center">actionsheet内容区域</div>
            </m-actionsheet>

            <m-swipeout>
                <m-swipeoutItem @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" ref="swipeoutItem">
                    <div slot="right-menu">
                        <m-swipeoutButton type="warn">
                            删除
                        </m-swipeoutButton>
                    </div>
                    <div slot="content">
                        滑动删除
                    </div>
                </m-swipeoutItem>

            </m-swipeout>

            <p>checker</p>
            <m-checker v-model="checkeds" type="checkbox" default-item-class="check" selected-item-class="checked">
                <m-checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</m-checker-item>
            </m-checker>
            <span>chekeds: {{checkeds}}</span>
        </m-center>
        <m-footer>

        </m-footer>
    </m-container>

</template>
<style lang="less" scoped>
.actionsheet {
    width: 100%;
    height: 3rem;
    background: #fff;
}
</style>

<script>
import api from '../plus/api';
import loading from "components/loadings";
import Toast from "components/toast";
import { Actionsheet, mActionItem } from 'components/actionsheet';
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'components/swipeout';
import { Checker, CheckerItem } from 'components/checker';
export default {
    data() {
        return {
            pageStatus: 2, //0:loading,1:异常，2：正常
            actionsheetShow: false,
            checkeds: [],
            items1: [{
                key: '1',
                value: 'A'
            }, {
                key: '2',
                value: 'B'
            }, {
                key: '3',
                value: 'C'
            }]
        }
    },
    activated(){

    },
    deactivated(){

    },
    components: {
        'm-actionsheet': Actionsheet,
        'm-swipeout': Swipeout,
        'm-swipeoutItem': SwipeoutItem,
        'm-swipeoutButton': SwipeoutButton,
        'm-checker': Checker,
        'm-checker-item': CheckerItem,
    },
    methods: {
        openActionsheet() {
            this.actionsheetShow = true;
        },
        openToast() {
            Toast('hello');
        },
        openLoading() {
            loading.show('正在提交');
            setTimeout(one => {
                loading.hide();
            }, 2000)
        },
        handleEvents(evType) {

        }
    }
}

</script>