<template>
    <div class="tab-content" :disabled="disabled" :center-ripple="false" :class="{'tab-content-active': active}" v-show="active" 
        @touchstart="startDrag"
        @mousedown="startDrag"
        @touchmove="tabClick"
        @mousemove="tabClick"
    >
        <div class="m-tab-text">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'm-tab',
    data() {
        return {
            start: { x: 0, y: 0 },
            pageWidth: 0,
            index:parseInt(this.value.substring(this.value.length-1,this.value.length)),
            currentIndex:parseInt(this.value.substring(this.value.length-1,this.value.length)) - 1
        }
    },
    props: {
        icon: {
            type: String,
            default: ''
        },
        iconClass: {
            type: [String, Object, Array]
        },
        title: {
            type: String,
            default: ''
        },
        titleClass: {
            type: [String, Object, Array]
        },
        href: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        value: {
            type: String
        }
    },
    computed: {
        active() {
            return this.isNotNull(this.value) && this.$parent.value === this.value
        },
        textClass() {
            const { icon, titleClass } = this
            let classNames = []
            if (icon) classNames.push('has-icon')
            return classNames.concat(this.convertClass(titleClass))
        }
    },
    mounted(){
        
        this.pageWidth = this.$parent.$refs.wrap.clientWidth;
        this.limitWidth = this.pageWidth / 4;
    },
    updated(){
        this.index=parseInt(this.value.substring(this.value.length-1,this.value.length));
        this.currentIndex=this.index - 1;
    },
    methods: {
        startDrag(e) {
            return;
            if (!this.active) return;
            e = e.changedTouches ? e.changedTouches[0] : e;
            this.start.x =e.pageX;
            this.start.y = e.pageY;
        },
        tabClick(e) {
            return;
            if (!this.active) return;
             let swiping;
            let evt = e.changedTouches ? e.changedTouches[0] : e;
            let len = this.$parent.$children.length;
            let offsetTop = evt.pageY - this.start.y;
            let offsetLeft = evt.pageX - this.start.x;
            let currentPageOffset = this.currentIndex * this.pageWidth;
            let offset = offsetLeft - currentPageOffset;
            let y = Math.abs(offsetTop);
            let x = Math.abs(offsetLeft);
            let absOffset = Math.abs(offset);


            swiping = !((y < 5 && x > 1.73) || (x >= 5 && x >= y * 1.73));

            if (swiping) return;

            if (offsetLeft > 0) {
                
                 this.index=this.index - 1;
                this.currentIndex=this.currentIndex - 1;
                if (this.index <= 1 || this.currentIndex<=0) {
                     this.index = 1;
                     this.currentIndex = 0;
                }
            }else{
                this.index = this.index + 1;
                this.currentIndex = this.currentIndex + 1;
                if (this.index >= len || this.currentIndex >= (this.$parent.$children.length - 1)) {
                     this.index = len;
                     this.currentIndex = this.$parent.$children.length - 1;
                }
            }
            let value="tab"+this.index; 
            if (this.$parent.handleTabClick) this.$parent.handleTabClick(value, this.$parent.$children[this.currentIndex])
            this.$parent.$parent.$children[0].$children[this.currentIndex].tabClick();
        },
        convertClass(classes) {
            let newClasses = []
            if (!classes) return newClasses
            if (classes instanceof Array) {
                newClasses = newClasses.concat(classes)
            } else if (classes instanceof Object) {
                for (const name in classes) {
                    if (classes[name]) newClasses.push(name)
                }
            } else {
                newClasses = newClasses.concat(classes.split(' '))
            }
            return newClasses
        }
    },
    watch: {
        active(val, oldVal) {
            if (val === oldVal) return
            if (val) this.$emit('active')
        }
    },
}
</script>

<style lang="less">
.tab-content {
    flex-shrink: 0;
    width: 100%;
}
</style>
