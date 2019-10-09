export default {
    data() {
        return {
            iPhone: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1 ? false : true
        }
    },
    methods: {
        back() {
            this.$router.back();
        },
        myBrowser() {
            var browser = {
                versions: function () {
                    let u = navigator.userAgent,
                        app = navigator.appVersion;
                    return {
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        mobile: u.indexOf('Mobile') > -1,
                        isweixin: u.indexOf('MicroMessenger') > -1,
                        isQQ: u.indexOf('QQ') > -1,
                        isweibo: u.indexOf('Weibo') > -1
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            };
            return browser;
        },
        GetReferrer: function (e) {
            var ref = '';
            if (document.referrer.length > 0) {
                ref = document.referrer;
            }
            try {
                if (ref.length == 0 && opener.location.href.length > 0) {
                    ref = opener.location.href;
                }
            } catch (e) { }
            return escape(e);
        },
        prviewImage(e) {
            return new Promise(function (resolve, reject) {
                let file = e.target.files[0];
                let size = (file.size / 1024 / 1024).toFixed(2);
                if (!/image\/\w+/.test(file.type)) {
                    return reject('请选择图片文件');
                }
                if (size > 4) {
                    return reject('文件过大,不超过4MB');
                };
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    return resolve(this.result)
                }
            })
        },
        setStorage(key, model) {
            return new Promise(function (resolve, reject) {

                if (!model || !(model instanceof Array))
                    return reject();

                model = JSON.stringify(model);

                localStorage.setItem(key, model);

                resolve();
            });
        },
        getStorage(key) {
            return new Promise(function (resolve, reject) {

                var json = localStorage.getItem(key);

                if (!json) {

                    return reject();
                }

                resolve(JSON.parse(json));

            });
        },

        //无限滚动 this.infinite(()=>{})
        infinite(done) {
            var self = this;
            var center = document.getElementsByClassName('m-center')[0];
            center.onscroll = function () {

                var scrollTop = center.scrollTop;

                var centerOffset = 0;
                if (center.currentStyle) {
                    centerOffset = center.currentStyle['borderTop'];
                }
                else {
                    centerOffset = document.defaultView.getComputedStyle(center, null)['borderTop'].split('px')[0];
                }


                var windowHeight = document.documentElement.clientHeight;


                var scrollHeight = center.scrollHeight + parseFloat(centerOffset) - 20;

                if ((scrollTop + windowHeight) >= scrollHeight) {
                    done.apply(self, arguments);
                }
            }
        },

        currentTime(num) {
            var date;
            var date1 = new Date();
            date = date1;
            if (num) {
                var date2 = new Date(date1);
                date2.setDate(date1.getDate() + num);
                date = date2;
            }

            var year = date.getFullYear();
            var mouth = date.getMonth() + 1;
            var day = date.getDate();
            var str = `${year}-${mouth < 10 ? '0' + mouth : mouth}-${day < 10 ? '0' + day : day}`;
            return str;
        }
    }
}