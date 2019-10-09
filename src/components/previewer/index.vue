<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp vux-previewer" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
           It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>
      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides.
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'
import objectAssign from 'object-assign'

export default {
  name: 'previewer',
  computed: {
    imgs () {
      let each = Array.prototype.forEach;
       each.call(this.list, (v, i) => {
          this.photo.push(v.src);
         
       });
      this.p=[];
      let sr=Array.from(new Set(this.photo));
      for(var i of sr)
      {
       this.p.push({src:i});
      }
      return this.p.map(one => {
        if (!one.msrc) {
          one.msrc = one.src
        }else{

        }
        if (typeof one.w === 'undefined') {
          one.w = 0
          one.h = 0
        }
        return one
      })
      
    }
  },
  methods: {
    init (index) {
      const self = this
      const showItem = this.imgs[index]
      if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
        const img = new Image()
        img.onload = function () {
          showItem.w = this.width
          showItem.h = this.height
          self.$init(index)
        }
        img.src = showItem.src
      } else {
        this.$init(index)
      }
    },
    $init (index) {
      const self = this
      let options = objectAssign({
        history: false,
        shareEl: false,
        tapToClose: true,
        index: index
      }, this.options)
      
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options)
      this.photoswipe.listen('gettingData', function (index, item) {
        if (!item.w || !item.h || item.w < 1 || item.h < 1) {
          const img = new Image()
          img.onload = function () {
            item.w = this.width
            item.h = this.height
            self.photoswipe.updateSize(true)
          }
          img.src = item.src
        }
      })
      this.photoswipe.init()
      this.photoswipe.listen('close', () => {
        this.photo=[];
        this.p=[];
        this.count--;
        this.$emit('on-close')
      })
    },
    show (index) {
      this.count++;
      if(this.count<2)
      {
      this.init(index)
      }else{
        this.count--;
      }
    },
    close () {
      this.photoswipe.close();
    },
    contains(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        },
        indexOf(arr, val) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == val) return i;
            }
            return -1;
        },
        remove(array, val) {
            let index = this.indexOf(array, val);
            array.splice(index, 1);
            return array;
        },
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data(){
    return {
      photo:[],
      p:[],
      count:0
    }
  }
}
</script>

<style>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';
.pswp__zoom-wrap {
  position: absolute;
  width: 100%;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  /* for open/close transition */
  -webkit-transition: -webkit-transform 1ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: transform 1ms cubic-bezier(0.4, 0, 0.22, 1); }
.pswp__bg {
  will-change: opacity;
  /* for open/close transition */
  -webkit-transition: opacity 1ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 1ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--animated-in .pswp__bg,
.pswp--animated-in .pswp__zoom-wrap {
  -webkit-transition: none;
  transition: none; 
  }
.pswp--open{
  display: block;
  height: 100%;
  position: fixed;
  width:100%;
  left:0;
  top:0;
}
.pswp--animate_opacity {
  /* 0.001, because opacity:0 doesn't trigger Paint action, which causes lag at start of transition */
  opacity: 0.001;
  will-change: opacity;
  /* for open/close transition */
  -webkit-transition: opacity 1ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 1ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--open{
  z-index:9999999;
}
</style>