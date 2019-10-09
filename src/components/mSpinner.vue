<template>
    <div class="refresh-container">
        <div class="refreshImage" ref="refreshDom"></div>
        <span class="sysTime">{{sysTime}}</span>
    </div>
</template>
<script>
export default {
    props: {
        status: '',
    },
    mounted() {
        this.refreshAnimation();
        this.sysTime = this.formatHourT012();
    },
    destroyed() {
        this.refreshAnimationEnd();
    },
    data() {
        return {
            sysTime: '',
            Animation: null,
        }
    },
    methods: {
        formatHourT012() {
            var d = new Date();
            var H = (d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours());
            if (H - 12 <= 0) {
                H = 'AM ' + H;
            } else if (H - 12 > 0 && H - 24 < 0) {
                H = H - 12;
                H = 'PM ' + H;
            } else if (H - 24 == 0) {
                H = 'PM ' + '00';
            }
            var m = (d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes());
            return H + ':' + m;
        },
        refreshAnimation() {
            var that = this;
            var refreshImage = this.$refs.refreshDom;
            this.translateY = 0;
            this.Animation = requestAnimationFrame(function fn() {
                if (that.translateY >= 1650) {
                    that.translateY = 50;
                } else {
                    that.translateY += 50;
                }
                refreshImage.style.webkitTransform = "translateY(-" + that.translateY + "px)";
                that.Animation = setTimeout(fn, 50);
            });
        },
        refreshAnimationEnd() {
            var that = this;
            var refreshImage = this.$refs.refreshDom;
            if (refreshImage) {
                clearInterval(that.Animation);
                refreshImage.style.webkitTransform = "translateY(0px)";
            }

        },
    },
}
</script>
<style scoped>
.refresh-container {
    width: 100%;
    height: 60px;
    overflow: hidden;
    position: relative;
}

.margin60 {
    margin-top: -60px;
}

.margin0 {
    margin-top: 0px;
}

.sysTime {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 2px;
    left: 0;
    font-size: 13px;
    color: #333;
}

.refreshImage {
    width: 50px;
    /* background-image: url(../images/refresh_sp.png); */
    background-repeat: no-repeat;
    margin: 0 auto;
    height: calc(50px * 33);
    transform: translateY(0px);
    background-size: 50px auto;
}
</style>
