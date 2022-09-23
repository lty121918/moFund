<template>
  <view class="class" v-if="isShow">
    <!-- <YList :data="data" :isMore="isMore" @lower="lower"> -->
    <view v-for="(item, index) in data" :key="index">
      <class-item
        :data="item"
        :classStatus="classStatus"
        :isTeach="isTeach"
      ></class-item>
    </view>
    <view class="default-more" v-if="isMore && data.length != 0">
      暂无更多数据
    </view>
    <!-- </YList> -->
    <view class="default-empty" v-if="data.length === 0">
      <image
        class="default-empty-image"
        :src="require('@/static/notData.png')"
        mode="widthFix"
      ></image>
      <view class="">暂无数据</view>
    </view>
  </view>
</template>

<script>
import ClassItem from '@/components/ClassItem/ClassItem.vue'
import mixin from '@/mixin.js'
export default {
  mixins: [mixin],
  components: { ClassItem },
  data() {
    return {
      data: [],
      isShow: false
    }
  },
  computed: {},
  onReachBottom() {
    console.log('已触底')
    this.lower()
  },
  onLoad() {
    this.onLaunch().then(res => {
      const authorization = this.$utils.util.getCache('Authorization')
      if (!authorization) {
        return false
      }
      this.getMounted()
    })
  },
  created() {},
  mounted() {},
  methods: {
    getMounted() {
      setTimeout(async () => {
        this.getTeach()
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        this.queryParams.page = 1
        await this.search()
        uni.hideLoading()
        this.isShow = true
      }, 300)
    },
    // 模拟请求数据
    async search() {
      const self = this
      return new Promise(async (resolve, reject) => {
        console.log('class请求')
        self.$http['classes'].getClassList(self.queryParams).then(res => {
          let data = []
          if (res.code == 200) {
            data = res.data.records || []

            data.forEach(item => {
              if (
                item.classStatus != 0 &&
                item.classStatus != 1 &&
                item.classStatus != 3
              ) {
                item.nextCLassTime = -1
              }
              if (item.coverImage && item.coverImage.indexOf('http') == -1) {
                item.coverImage = self.$url + item.coverImage
              }
              item.startPeriod = self.$utils.dateTime.getLocalTime(
                `2022-01-01 ${item.startPeriod}`,
                'hh:mm'
              )
              item.endPeriod = self.$utils.dateTime.getLocalTime(
                `2022-01-01 ${item.endPeriod}`,
                'hh:mm'
              )
              item['weekCodeName'] = self.$utils.dateTime.filteDay(
                item.weekCode
              )
              if (item.nextCLassTime && item.nextCLassTime != -1) {
                item.nextCLassTime = self.$utils.dateTime.getLocalTime(
                  item.nextCLassTime,
                  'yyyy-MM-dd hh:mm'
                )
              }
              item.CourseDateName = self.$utils.dateTime.filteDate(
                item.courseDate,
                item.startDate,
                item.endDate
              )
            })
          }
          let tempList = self.data
          if (self.queryParams.page == 1) {
            tempList = data
          } else {
            tempList = tempList.concat(data)
          }
          self.queryParams.total = res.data.total
          self.data = tempList
          self.$forceUpdate() //二维数组，开启强制渲染
          resolve(tempList)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.class {
  padding: 32rpx 0;
  min-height: 100vh;
  box-sizing: border-box;
  background: #eef1fa;

  &-title {
    display: flex;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #141d3d;

    &-item {
      margin-right: 40rpx;
    }
  }
}

.home-title {
  padding-bottom: 0;
}
.default-more {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 28rpx;
  color: #6a6a6a;
}
</style>
