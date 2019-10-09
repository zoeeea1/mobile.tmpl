<template>
    <div ref="container" class="scroller-container" style="width:100%;height:100%">
        <div ref="wrapper" class="scroller-wrapper">
            <div ref="header" class="scroller-header">
                <slot name="header">
                    <div v-if="useReset" class="reset-container">
                        <spinner v-if=" state=='pull' && loadText=='spinner' "></spinner>
                        <span v-if="loadText=='resetText'" class="resetText" style="font-size:3.12vw">下拉返回商品介绍</span>
                    </div>
                </slot>
            </div>
            <div class="scroller-body">
                <slot></slot>
            </div>
            <div class="scroller-footer scroller-infininte">
                <slot name="infinite-spinner">
                    <div v-if="useMore">加载更多...</div>
                </slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.scroller-infininte {
  font-size: 0.24rem;
}
.reset-container {
    height: 60px;
    text-align: center;
}

.resetText {
    line-height: 60px;
    text-align: center;
    color: #a4a4a4;
}

.scroller-infininte {
    width: 100%;
    padding: .3rem;
    text-align: center;
    color: #a4a4a4;
}
</style>

<script>
import './src/iscroll';

import spinner from 'components/mSpinner';

export default {
    name: 'scroller',

    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        },
        useReset: {
            type: Boolean,
            default: false
        },
        useMore: {
            type: Boolean,
            default: false
        },
        loadText: {
            type: String,
            default: 'spinner'
        }
    },
    data() {
        return {
            isReset: false,
            isMore: false,
            state: null,
        };
    },
    components: {
        'spinner': spinner
    },
    created() {
        this.isReset = this.useReset;
        this.isMore = this.useMore;
    },
    mounted() {
        let that = this;
        let
            onScrollEnd = function () {
                let y = this.y;
                if (that.isReset && y >= 0) {
                    //刷新
                    that.isReset = false;
                    that.$emit('reset', () => {
                        this.refresh();
                        that.isReset = true;
                        that.state = 'off';
                    });
                } else if (that.isMore && y + this.distY <= this.maxScrollY + (-this.options.bottomOffset || 0)) {
                    //上拉
                    that.isMore = false;
                    that.$emit('more', () => {
                        this.refresh();
                        that.isMore = true;
                    });
                }
            },
            onScrollMove = function () {
                let y = this.y;
                if (!that.isReset) return;

                if (y > 0) {
                    this.minScrollY = 0;
                    that.state = 'pull';
                } else {
                    this.minScrollY = -this.options.topOffset || 0;
                }
            },
            onRefresh = function () {

                console.log('refresh');
                // if (that.state == 'pull') {
                //     that.state = 'drop';
                // }
                // if (that.usePullUp && that.pullUpIconClass.match('loading')) {
                //     that.pullUpIconClass = 'pullUpIcon';
                //     that.usePullUpIcon = false;
                //     that.usePullLabel = true;
                // }
            };

        let exceptions = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ };

        var events = {
            'onBeforeScrollStart': (e) => {
                for (var i in exceptions) {
                    if (!exceptions[i].test(e.target[i])) {
                        e.preventDefault();
                    }
                }

                that.$nextTick(() => { that.$emit('beforeScrollStart', that.iscroll, e) });
            },
            'onScrollStart': (e) => {
                that.$nextTick(() => { that.$emit('scrollStart', that.iscroll, e) });
            },
            'onBeforeScrollEnd': (e) => {
                for (var i in exceptions) {
                    if (!exceptions[i].test(e.target[i])) {
                        e.preventDefault();
                    }
                }
                onScrollEnd.call(that.iscroll);
                // that.$nextTick(() => { that.$emit('scrollEnd', that.iscroll, e) });
            },
            'onBeforeScrollMove': (e) => {
                that.$nextTick(() => { that.$emit('beforeScroll', that.iscroll, e) });
            },
            'onScrollEnd': () => {

                that.$nextTick(() => {
                    that.$emit('scrollEnd', that.iscroll)
                });
            },
            'onScrollMove': (e) => {
                onScrollMove.call(that.iscroll, e);
                that.$nextTick(() => {
                    that.$emit('scroll', that.iscroll)
                });
            },
            // 'flick': function () { that.$nextTick(() => { that.$emit('onBeforeScrollStart', this) }); },
            'onZoomStart': () => { that.$nextTick(() => { that.$emit('zoomStart', that.iscroll) }); },

            'onZoom': () => { that.$nextTick(() => { that.$emit('zoom', that.iscroll) }); },

            'onZoomEnd': () => { that.$nextTick(() => { that.$emit('zoomEnd', that.iscroll) }); },
            'onRefresh': () => { that.$nextTick(() => { that.$emit('refresh', that.iscroll) }); },
            'onDestroy': () => { that.$nextTick(() => { that.$emit('destroy', that.iscroll) }); },
            // 'scrollCancel': function () { that.$nextTick(() => { that.$emit('onTouchEnd', this) }); },
        }

        var options = Object.assign({
            hScrollbar: false,
            vScrollbar: false,
            checkDOMChanges: !this.useReset && !this.useMore,
            topOffset: that.$refs.header.offsetHeight || 0,
            ...events
        }, this.options);
        that.iscroll = new iScroll(that.$refs.container, options);

    },
    beforeDestroy() {
        this.iscroll && this.iscroll.destroy()
        this.iscroll = null
    },
    methods: {
        zoom() {
            this.$nextTick(() => this.iscroll.zoom.apply(this.iscroll, arguments))
        },
        goToPage() {
            this.$nextTick(() => this.iscroll.goToPage.apply(this.iscroll, arguments))
        },
        next() {
            this.$nextTick(() => this.iscroll.next.apply(this.iscroll, arguments))
        },
        prev() {
            this.$nextTick(() => this.iscroll.prev.apply(this.iscroll, arguments))
        },
        scrollToElement() {
            this.$nextTick(() => this.iscroll.scrollToElement.apply(this.iscroll, arguments))
        },
        scrollBy() {
            this.$nextTick(() => this.iscroll.scrollBy.apply(this.iscroll, arguments))
        },
        scrollTo() {
            this.$nextTick(() => this.iscroll.scrollTo.apply(this.iscroll, arguments));
        },
        refresh() {
            this.$nextTick(() => this.iscroll.refresh.apply(this.iscroll, arguments))
        }
    }
}
</script>