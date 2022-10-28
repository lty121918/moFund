<template>
  <view>
    <view
      id="_drag_button"
      class="drag"
      :style="'left: ' + left + 'px; top:' + top + 'px;'"
      @touchstart="touchstart"
      @touchmove.stop.prevent="touchmove"
      @touchend="touchend"
      @click.stop.prevent="click"
      :class="{ transition: isDock && !isMove }"
    >
      <image class="kefu" src="@/static/kefu.png" mode=""></image>
    </view>
    <uni-popup ref="popup" @change="change">
      <view class="warp">
        <view class="modal-bg">
          <view class="lt"></view>
          <view class="lb"></view>
          <view class="rt"></view>
          <view class="rb"></view>
          <image class="service-bg" src="@/static/modal-bg.png"></image>
          <image
            class="qr-code-cla"
            :src="img"
            :show-menu-by-longpress="true"
            @click="previewImage"
          ></image>
          <view class="modal-word">长按识别添加客服</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "drag-button",
  props: {
    isDock: {
      type: Boolean,
      default: false,
    },
    existTabBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      top: 456,
      left: 309,
      width: 0,
      height: 0,
      offsetWidth: 0,
      offsetHeight: 0,
      windowWidth: 0,
      windowHeight: 0,
      isMove: true,
      edge: 0,
      text: "按钮",
      img: null,
    };
  },
  mounted() {
    const sys = uni.getSystemInfoSync();

    this.windowWidth = sys.windowWidth;
    this.windowHeight = sys.windowHeight;

    // #ifdef APP-PLUS
    this.existTabBar && (this.windowHeight -= 50);
    // #endif
    if (sys.windowTop) {
      this.windowHeight += sys.windowTop;
    }
    console.log(sys);

    const query = uni.createSelectorQuery().in(this);
    query
      .select("#_drag_button")
      .boundingClientRect((data) => {
        this.width = data.width;
        this.height = data.height;
        this.offsetWidth = data.width / 2;
        this.offsetHeight = data.height / 2;
        this.left = this.windowWidth - this.width - this.edge;
        this.top = this.windowHeight - this.height - this.edge - 120;
      })
      .exec();
    this.$http["classes"].getCustomerWx().then((res) => {
      this.img = this.$url + res.data;
    });
  },
  methods: {
    change(e) {
      console.log("当前模式：" + e.type + ",状态：" + e.show);
    },
    click() {
      this.$refs.popup.open("center");
      this.$emit("btnClick");
    },
    touchstart(e) {
      this.$emit("btnTouchstart");
    },
    touchmove(e) {
      // 单指触摸
      if (e.touches.length !== 1) {
        return false;
      }

      this.isMove = true;

      this.left = e.touches[0].clientX - this.offsetWidth;

      let clientY = e.touches[0].clientY - this.offsetHeight;
      // #ifdef H5
      clientY += this.height;
      // #endif
      let edgeBottom = this.windowHeight - this.height - this.edge;

      // 上下触及边界
      if (clientY < this.edge) {
        this.top = this.edge;
      } else if (clientY > edgeBottom) {
        this.top = edgeBottom;
      } else {
        this.top = clientY;
      }
    },
    touchend(e) {
      if (this.isDock) {
        let edgeRigth = this.windowWidth - this.width - this.edge;

        if (this.left < this.windowWidth / 2 - this.offsetWidth) {
          this.left = this.edge;
        } else {
          this.left = edgeRigth;
        }
      }

      this.isMove = false;

      this.$emit("btnTouchend");
    },
    // 长按图片识别二维码
    previewImage(e) {
      console.log("e", e);
      uni.previewImage({
        // 需要预览的图片链接列表
        urls: [this.img],
        // 为当前显示图片的链接/索引值
        current: this.img,
        // 图片指示器样式
        indicator: "default",
        // 是否可循环预览
        loop: false,
        // 长按图片显示操作菜单，如不填默认为保存相册
        // longPressActions:{
        // 	itemList:[this.l('发送给朋友'),this.l]
        // },
        success: (res) => {
          console.log("res", res);
        },
        fail: (err) => {
          console.log("err", err);
        },
      });
    },
  },
};
</script>

<style lang="scss">
.drag {
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgba(0, 0, 0, 0.5);
  // box-shadow: 0 0 6upx rgba(0, 0, 0, 0.4);
  color: $uni-text-color-inverse;
  width: 132rpx;
  height: 132rpx;
  // border-radius: 50%;
  font-size: $uni-font-size-sm;
  position: fixed;
  z-index: 99999;

  &.transition {
    transition: left 0.3s ease, top 0.3s ease;
  }
}

.kefu {
  width: 132rpx;
  height: 132rpx;
}

.warp {
  width: 100%;
  // height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-bg {
  width: 686rpx;
  height: 780rpx;
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  line-height: 50rpx;
  position: relative;

  .service-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .lt {
    position: absolute;
    top: 90rpx;
    left: 88rpx;

    border-top: 2px solid #ff983b;
    border-left: 2px solid #ff983b;
    width: 44rpx;
    height: 43rpx;
    z-index: 99;
  }

  .lb {
    position: absolute;
    top: 574rpx;
    left: 88rpx;
    border-bottom: 2px solid #ff983b;
    border-left: 2px solid #ff983b;
    width: 44rpx;
    height: 43rpx;
    z-index: 99;
  }

  .rt {
    position: absolute;
    top: 90rpx;
    right: 73rpx;
    border-top: 2px solid #ff983b;
    border-right: 2px solid #ff983b;
    width: 44rpx;
    height: 43rpx;
    z-index: 99;
  }

  .rb {
    position: absolute;

    top: 574rpx;
    right: 73rpx;
    border-bottom: 2px solid #ff983b;
    border-right: 2px solid #ff983b;
    width: 44rpx;
    height: 43rpx;
    z-index: 99;
  }

  .qr-code-cla {
    position: absolute;
    top: 94rpx;
    left: 92rpx;
    width: 514rpx;
    height: 514rpx;
    padding: 2rpx;
    border: 2rpx solid rgba(255, 152, 59, 0.3);
  }

  .modal-word {
    position: absolute;
    bottom: 46rpx;
    left: 50%;
    font-size: 36rpx;
    transform: translate(-50%, 0);
    padding-top: 8rpx;
    width: 320rpx;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-weight: bold;
  }
}
</style>
