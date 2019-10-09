<template>
    <div class="m-search-box" :class="{'m-search-fixed':isFixed}">
        <div class="m-search-bar" :class="{'m-search-bar-focusing': !isCancel || currentValue}">
            <form method="get" autocomplete="no" action="." @submit.prevent="onSubmit">
                <div class="m-search-mask" @click="touch" v-show="!isFixed && autoFixed"></div>
                <div class="m-search-bar-box">
                    <i class="icon-bangzhu"></i>
                    <input type="search" class="m-search-bar-input" :id="`search_input`" v-model="currentValue" ref="input" @focus="onFocus" @blur="onBlur" />
                </div>
                <label :for="`search_input`" class="m-search-bar-label" v-show="!isFocus && !value">
                    <i class="icon-bangzhu"></i>
                    <span>查找</span>
                </label>
            </form>
    
            <a href="javascript:" class="m-search-bar-cancel-btn" @click="cancel">取消</a>
        </div>
        <div class="m-search-list">
    
        </div>
    </div>
</template>
<style>
.m-search-fixed {
    position: fixed;
    left: 0;
    top: 50;
    z-index: 5;
    background: rgba(255, 255, 255, 1);
    backdrop-filter: blur(5px);
}

.m-search-bar-box i {
    position: absolute;
    left: 10px;
    top: 0;
    line-height: 28px;
}

.m-search-box {
    width: 100%;
}

.m-search-bar {
    position: relative;
    padding: 8px 10px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    background-color: #EFEFF4;
}

.m-search-bar-box {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
}

.m-search-bar::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D7D6DC;
    color: #D7D6DC;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}

.m-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 90%;
    height: 100%;
    z-index: 5;
}

.m-search-bar-focusing .m-search-bar-label {
    display: none;
}

.m-search-bar-label {
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    z-index: 2;
    border-radius: 3px;
    text-align: center;
    color: #9B9B9B;
    background: #FFFFFF;
}

.m-search-bar-label span {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
}

.m-search-box input {
    padding: 4px 0;
    width: 100%;
    height: 1.42857143em;
    border: 0;
    font-size: 14px;
    line-height: 1.42857143em;
    box-sizing: content-box;
    background: transparent;
}

.m-search-box form {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    flex: auto;
    background-color: #EFEFF4;
}

.m-search-box form::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 10px;
    border: 1px solid #E6E6EA;
    box-sizing: border-box;
    background: #FFFFFF;
}

.m-search-bar-cancel-btn {
    display: none;
    margin-left: 10px;
    line-height: 28px;
    color: #FF9900;
    white-space: nowrap;
}

.m-search-bar-focusing .m-search-bar-cancel-btn {
    display: block;
}
</style>

<script>

export default {
    props: {
        autoFixed: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            currentValue: '',
            isCancel: true,
            isFocus: false,
            isFixed: false
        };
    },
    created() {
        if (this.value) {
            this.currentValue = this.value
        }
    },
    methods: {
        onSubmit(e) {

        },
        cancel() {
            this.isCancel = true
            this.currentValue = ''
            this.isFixed = false
            this.$emit('cancel')
        },
        touch() {
            this.isCancel = false
            if (this.autoFixed) {
                this.isFixed = true
            }
            this.$emit('touch')
        },
        setFocus() {
            this.$refs.input.focus()
        },
        setBlur() {
            this.$refs.input.blur()
        },
        onFocus() {
            this.isFocus = true
            this.$emit('focus')
            this.touch()
        },
        onBlur() {
            this.isFocus = false
        }
    },
    watch: {
        isFixed(val) {
            if (val === true) {
                this.setFocus()
                this.isFocus = true
            }
        },
        value(val) {
            this.currentValue = val
        },
        currentValue(val) {
            this.$emit('input', val)
            this.$emit('change', val)
        }
    }
};
</script>
