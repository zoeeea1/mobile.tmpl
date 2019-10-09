<template>
     <div class="item hoverList" @click="toDetail(id)">
        <!-- 角标 如没有就不传beginIndex -->
        <div class="item-superscript" v-if="beginIndex!=null" v-cloak>
            <span>TOP.{{index+beginIndex}}</span>
        </div>
        <div class="item-inner">
            <div class="item-photo">
                <img v-lazy="Image" :style="{background:''+defBackgorund()+''}">
            </div>
            <div class="item-desc">
                <p class="item-name ellipsis">{{Name}}</p>
                <div class="item-top-desc ellipsis" style="margin-bottom: .1rem">{{HospitalName}}</div>
                <div class="item-top-spec ellipsis">
                    <span v-for="spec in Characteristic" :key="spec.id" class="spec-item">{{spec}}</span>
                </div>
                <div class="item-top-price flex-between">
                    <div class="price">{{Price}}</div>

                    <div style="display:flex; align-items: center;">
                        <div class="sale-num">已售:{{SaleNumber}}</div>
                        <div class="pingf">{{AppraiseStar}}分</div>
                    </div>

                </div>
            </div>
        </div>
    </div> 
</template>
<style lang="less" scoped>
@import url('../../less/font.less');
.pingf {
    background: #ffcc49;
    width: .8rem;
    height: .4rem;
    color: #fff;
    text-align: center;
    line-height: .4rem;
    font-size: @font-26;
    border-radius: 3px;
    margin-left: .3rem;
}
.top-superscript {
    width: 1.15rem!important;
    height: auto;
    position: absolute;
    left: .2rem;
    top: -.15rem;
}
.item-top-info {
    padding: .3rem .2rem;
}

.spec-item::after {
    content: '、';
}

.spec-item:last-child::after {
    content: '';
}

.item-name {
    font-size: 4vw;
    font-weight: bold;
    margin-bottom: .1rem;
}

.item-top-desc {
    font-size: @font-24;
    margin-bottom: .1rem;
    color: #999;
}

.item-top-spec {
    font-size: @font-24;
    margin-bottom: .2rem;
    color: #a9773b;
}

.price {
    font-size: @font-30;
    color: rgb(255, 76, 114);
    font-weight: 600;
}

.sale-num {
    font-size: @font-26;
    color: #999;
}

.item {
    position: relative;
    margin-top: .2rem;
    background: #fff;
}

.item-inner {
    padding: .3rem .2rem .3rem .3rem;
    border-radius: 8px;
    font-size: 0;
}

.item-inner>div {
    display: inline-block;
    vertical-align: middle;
}

.item-top-name {
    font-weight: 600;
}

.item-superscript {
    width: 1.06rem;
    height: 1.06rem;
    line-height: 1.06rem;
    background-image: url(../../images/item-superscript.png);
    background-size: 100% 100%;
    position: absolute;
    top: -2px;
    left: -.3rem;
    color: #ffffff;
    font-size: @font-24;
    font-weight: bold;
    display: flex;
    justify-content: center;
    padding-right: .15rem;
}

.item-photo {
    width: 2rem;
    height: 2rem;
    font-size: 0;
    margin-right: .4rem;
}

.item-photo img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.item-desc {
    width: 4rem;
}
</style>

<script type="text/babel"> 
export default {
    name: 'prod-item',
    components: {
    },
    data() {
        return {

        }
    },
    mounted() {
    },
    activated() {
    },
    deactivated() {

    },
    computed: {},
    props: {
        id:null,
        index:null,//渲染下标
        beginIndex:null,//开始计数下标
        Image:null,//商品图片
        Name:null,//商品名称
        HospitalName:null,//医院名称
        Characteristic:null,//特色
        Price:null,//价格
        SaleNumber:null,//已售数量        
        AppraiseStar:0//评分
    },
    created() {

    },
    methods: {
        toDetail(id){
            this.$router.push({name:'prod.details',query:{'id':id}})
        }
    }

}
</script>
