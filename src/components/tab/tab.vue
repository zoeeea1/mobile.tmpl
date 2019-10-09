<template>
    <div class="m-tab-link" :href="href" :disabled="disabled" :center-ripple="false" :class="{'m-tab-active': active}" @click="tabClick">
        <div :class="iconClass" v-if="icon">
            <slot name="icon"></slot>
        </div>
        <div class="m-tab-text" :class="textClass" v-if="title">{{title}}</div>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'm-tab',
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
    methods: {
        tabClick(e) {
            if (this.$parent.handleTabClick) this.$parent.handleTabClick(this.value, this)
            this.$emit('click', e)
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
.m-tab-link {
    min-height: 48px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size:16px;
    background: none;
    appearance: none;
    text-decoration: none;
    border: none;
    outline: none;
    flex: 1;
    color: #000;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: normal;
    align-items: center;
    cursor: pointer;
}

.m-tab-active {
    color: #fe3864;
}

.m-tab-text {
    &.has-icon {
        margin-top: 8px;
    }
}
</style>
