<template>
    <button class="vux-swipeout-button" :class="{'vux-swipeout-button-primary': type === 'primary', 'vux-swipeout-button-warn': type === 'warn', 'vux-swipeout-button-default': type === 'default'}" :style="{width: `${width}`, backgroundColor: backgroundColor}" @click="onButtonClick" type="button">
        <slot>{{text}}</slot>
    </button>
</template>

<script>
export default {
    name: 'swipeout-button',
    props: {
        text: String,
        backgroundColor: String,
        type: String,
        width: {
            type: String,
            default: '1.1rem'
        }
    },
    methods: {
        onButtonClick() {
            if (this.$parent.$options._componentTag === 'swipeout-item') {
                this.$parent.onItemClick(this.text)
            }
        }
    }
}
</script>