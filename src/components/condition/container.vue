<template>
<transition>
    <div class="m-condition-container" v-if="open">
      <div :class="types">
        <div class="p-left">
          <m-scroller>
            <slot name="left"></slot>
          </m-scroller>
         </div>
         <div class="p-right">
           <m-scroller>
              <slot name="right"></slot>
           </m-scroller>
         </div>
      </div>
       
    </div>
</transition>
</template>
<script type="text/babel">
export default {
  data(){
    return {
      changeAreaIndex:100
    }
  },
  props: {
    types:{
      type:String,
      default:'area'
    },
    open:Boolean,
    items:{}
  },
  mounted(){
    console.log(this.types)
  },
  methods:{
    
  },
  watch:{
    types(val,oldVal){
        if(val!=oldVal)
        {
          
        }
    }
  }
}
</script>
<style lang="less" scoped>
  .m-condition-container{
    position:absolute;
    width: 100%;
    height: calc(100vh - 1.1rem - 0.25rem);
    left: 0;
    top:0.88rem;
    z-index: 8;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
  .area,.project{
    width:100%;
    display: flex;
    display:-webkit-flex;
    justify-content:space-between;
  }
  .p-left {
	width: 35%;
	height: 100%;
	overflow: hidden;
}

.p-right {
	width: 65%;
	height: 100%;
	overflow: hidden;
}
.area-lists,.project-lists {
	width: 100%;
	height: 1rem;
}

.area-list,.project-list {
	right: 0;
	height: 100%;
	padding: 0;
	width: 100%;
	background: #fff;
	opacity: .9;
	z-index: 99999999;
}

.project-list {
	padding-top: 0;
	top: auto;
	border-top: 1px solid #f5f5f5;
	display: flex;
	flex-direction: column;
}

.project-list .all {
	margin-top: 0.3rem;
}
.project-list div.all {
	width: 100%;
	border: none;
	text-align: left;
}

.project-list span {
	background-color: #ffd7e2;
	color: #fe4075;
	line-height: 0.46rem;
	font-size: 2.88vw;
	border-radius: 12px;
	padding: 0 8px;
	display: inline-block;
}

.project-list {
	padding: 0 0.25rem;
}

.project-list div.checked {
	border: none;
	background-color: #ffd7e2;
	color: #fe4075;
}
.area-lists p,.project-lists p {
	display: block;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	text-align: center;
	font-size: 4.08vw;
	line-height: 1rem;
	color: #979797;
}

.area-list>div {
	color: #282828;
	height: 1rem;
	line-height: 1rem;
	border-bottom: 1px solid #f5f5f5;
	display: block;
	text-align: center;
}

.checked .area-list,.checked .project-list {
	display: block;
}

.checked p {
	border-left: 2px solid #fc496c;
	background: #fff;
	color: #ff335b;
}
</style>