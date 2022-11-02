<template>
  <view class="progress_box">
    <canvas class="progress_bg" canvas-id="cpbg"></canvas>
    <canvas class="progress_bar" canvas-id="cpbar"></canvas>
    <view class="progress_txt">
      <view class="progress_info">已抢{{ progress_txt }}%</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    progressTxt: {
      type: Number,
      default: 0,
    },
  },
  onReady: function () {
    this.drawProgressbg();
    this.drawCircle(this.progressTxt); //参数为1-100
  },
  methods: {
    drawProgressbg: function () {
      let width = uni.upx2px(62);
      let height = uni.upx2px(65);
      let r = uni.upx2px(50);
      // 自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/>
      var ctx = uni.createCanvasContext("cpbg", this);
      ctx.setLineWidth(9); // 设置圆环的宽度
      ctx.setStrokeStyle("#DE501F"); // 设置圆环的颜色
      ctx.setLineCap("round"); // 设置圆环端点的形状
      ctx.beginPath(); //开始一个新的路径
      ctx.arc(width, height, r, 0.75 * Math.PI, 0.25 * Math.PI, false);
      //设置一个原点(110,110)，半径为100的圆的路径到当前路径
      ctx.stroke(); //对当前路径进行描边
      ctx.draw();
    },
    drawCircle: function (step) {
      let width = uni.upx2px(62);
      let height = uni.upx2px(65);
      let r = uni.upx2px(50);
      var ctx = uni.createCanvasContext("cpbar", this);
      // 进度条的渐变(中心x坐标-半径-边宽，中心Y坐标，中心x坐标+半径+边宽，中心Y坐标)
      var gradient = ctx.createLinearGradient(28, 55, 192, 55);
      gradient.addColorStop("0", "#141D3D");
      gradient.addColorStop("1.0", "#141D3D");
      ctx.setLineWidth(9);
      ctx.setStrokeStyle(gradient);
      ctx.setLineCap("round");
      ctx.beginPath();
      // 参数step 为绘制的百分比
      step = 0.015 * step + 0.75;
      if (step >= 2) {
        step = step % 2;
      }
      ctx.arc(width, height, r, 0.75 * Math.PI, step * Math.PI, false);
      ctx.stroke();
      ctx.draw();
    },
  },
};
</script>

<style>
.progress_box {
  position: relative;
  width: 124rpx;
  height: 124rpx;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
}
.progress_bg {
  position: absolute;
  width: 124rpx;
  height: 124rpx;
}
.progress_bar {
  width: 124rpx;
  height: 124rpx;
}
.progress_txt {
  position: absolute;
  z-index: 999;
  bottom:-17rpx;
  width: 124rpx;
  height: 34rpx;
  background: #ffffff;
  border-radius: 8rpx;
  border: 2rpx solid #de501f;
  text-align: center;
}
.progress_info {
  font-size: 24rpx;
  font-family: SourceHanSansSC-Normal, SourceHanSansSC;
  font-weight: 400;
  color: #000000;
  line-height: 36rpx;
}
.progress_dot {
  width: 16upx;
  height: 16upx;
  border-radius: 50%;
  background-color: #141d3d;
}
</style>
