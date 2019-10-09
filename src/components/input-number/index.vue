<template>
    <div class="input-number">
        <span class="input-number-btn input-number-sub icon iconfont icon-jian" :class="{'is-disabled':minDisabled}" v-if="controls" @click="sub">
           
        </span>
        <input v-model.number="currentValue" class="input-number-text" :name="name" :readonly="!fillable" :disabled="disabled" pattern="[0-9]*" :max="max" :min="min" type="number" @blur="blur" />
        <span class="input-number-btn input-number-plus icon iconfont icon-jia" :class="{'is-disabled': maxDisabled}" v-if="controls" @click="add">
            
        </span>
    
    </div>
</template>
<style lang="less" scoped>
@import url('../../less/font.less');
.input-number {
    display: flex;
    display:-webkit-flex;
    justify-content: space-between;
    align-items: center;
}

.input-number-text {
    float: left;
    height: 0.5rem;
    line-height: 0.5rem;
    width:calc(2rem - 1.2rem);
    font-size:@font-30;
    color: #222;
    -webkit-appearance: none;
    appearance: none;
    border-style:solid;
    border-width: 1px 0;
    border-color:#aaa;
    text-align: center;
    border-radius: 1px;
}

.input-number-btn {
    float: left;
    display: block;
    height: 0.5rem;
    width:0.6rem;
    text-align: center;
    color: #222;
    border: 1px solid #aaa;
    font-size: @font-18;
    line-height: .5rem;
}

.input-number-btn svg {
    vertical-align: sub;
}

.input-number-plus {
//     background-image: url(../../images/plus.png);
//     background-repeat: no-repeat;
//     background-size: 60%;
//     background-position: center;
    border-radius: 0 15px 15px 0;
    right: 0;
}

.input-number-sub {
    left: 0;
    border-radius: 15px 0 0 15px;
}
.is-disabled{
    color: #999;
    background-color: #eee;
//    background-image: url(../../images/noSub.png);
}
</style>

<script>
export default {

    name: 'input-number',
    props: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        readonly: Boolean,

        step: { type: Number, default: 1 },
        value: {
            default: 0
        },
        name: String,
        disabled: Boolean,
        controls: {
            type: Boolean,
            default: true
        },
        fillable: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '50px'
        },
        buttonStyle: {
            type: String,
            default: 'square'
        },
        addNumber:{
            type: Function,
            default: null
        }
    },
    created() {
        this.currentValue = this.value
    },
    data() {
        return {
            currentValue: 0
        }
    },
    computed: {
        minDisabled() {
            return typeof this.min === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue <= this.min)
        },
        maxDisabled() {
            return typeof this.max === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue >= this.max)
        },
        precision() {
            const { value, step, getPrecision } = this;
            return Math.max(getPrecision(value), getPrecision(step));
        }
    },
    watch: {
        currentValue(newValue, old) {
            
            if (newValue !== '') {
                if (typeof this.min !== 'undefined' && this.currentValue < this.min) {
                    this.currentValue = this.min
                }
                if (this.max && this.currentValue > this.max) {
                    this.currentValue = this.max
                }
            }
            
            this.$emit('input', this.currentValue)
            this.$emit('on-change', this.currentValue)
            // this.$emit('input',{newValue:newValue,oldValue:old})
            // this.$emit('on-change', {newValue:newValue,oldValue:old})
        },
        value(newValue) {
            this.currentValue = newValue
        }
    },
    methods: {
        getPrecision(value) {
            const valueString = value.toString();
            const dotPosition = valueString.indexOf('.');
            let precision = 0;
            if (dotPosition !== -1) {
                precision = valueString.length - dotPosition - 1;
            }
            return precision;
        },
        toPrecision(num, precision) {
            if (precision === undefined) precision = this.precision;
            return parseFloat(parseFloat(Number(num).toFixed(precision)));
        },
        add(e) {
            e.stopPropagation();
           
            if (this.disabled || this.maxDisabled){
                this.$emit('tips')
                return;
            }else{
                 this.$emit('addNumber');
            } 
            const value = this.value || 0;
            const precisionFactor = Math.pow(10, this.precision);
            this.currentValue = this.toPrecision((precisionFactor * value + precisionFactor * this.step) / precisionFactor);
        },
        sub(e) {
            e.stopPropagation();
            if (this.disabled || this.minDisabled){ return;}
            else{
                 this.$emit('updateNumber');
            }
            const value = this.value || 0;
            const precisionFactor = Math.pow(10, this.precision);
            this.currentValue = this.toPrecision((precisionFactor * value - precisionFactor * this.step) / precisionFactor);
        },
        blur() {
            if (this.currentValue === '') {
                this.currentValue = 0
            }
        }
    }
}
</script>