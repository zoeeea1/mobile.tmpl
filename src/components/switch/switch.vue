<template>
    <label class="m-switch">
        <input class="m-switch-input" :disabled="disabled" @change="$emit('change', currentValue)" type="checkbox" v-model="currentValue">
        <span class="m-switch-core"></span>
        <div class="m-switch-label">
            <slot></slot>
        </div>
    </label>
</template>

<script type="text/babel">
export default {
    name: 'm-switch',

    props: {
        value: Boolean,
        disabled: {
            type: Boolean,
            default: false
        },
         onChange: {
            type: Function,
            default: null
        }
    },
    created(){
    },
    computed: {
        currentValue: {
        get() {
            return this.value;
        },
        set(val) {
            this.$emit('input', val);
        }
        }
    }
};
</script>
<style lang="less">
@color-grey: #d9d9d9;
@color-white: #fff;
@color-blue: #EF3F49;
.m-switch {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;

    * {
        pointer-events: none;
    }

    .m-switch-label {
        // margin-left: 10px;
        display: inline-block;

        &:empty {
            margin-left: 0;
        }
    }

    .m-switch-core {
        display: inline-block;
        position: relative;
        width: 1rem;
        height: .5rem;
        border: 1px solid @color-grey;
        border-radius: 16px;
        box-sizing: border-box;
        background: @color-grey;

        &::after {
            content: " ";
            position: absolute;
            top: 0;
            -webkit-transition: -webkit-transform .3s;
            transition: -webkit-transform .3s;
            transition: transform .3s;
            transition: transform .3s, -webkit-transform .3s;
            border-radius: 15px;
            width: .45rem;
            height: .45rem;
            background-color: @color-white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        }

        &::before {
            content: " ";
            position: absolute;
            -webkit-transition: -webkit-transform .3s;
            transition: -webkit-transform .3s;
            transition: transform .3s;
            transition: transform .3s, -webkit-transform .3s;
            border-radius: 15px;
            // width: .99rem;
            // height: .5rem;
            background-color: #fdfdfd;
        }
    }

    .m-switch-input {
        display: none;

        &:checked {
            +.m-switch-core {
                border-color: @color-blue;
                background-color: @color-blue;

                &::before {
                    transform: scale(0);
                }

                &::after {
                    transform: translateX(.5rem);
                }
            }
        }
    }
}
</style>
