<template>
  <view class="search">
    <view class="search-content">
      <uni-easyinput
        @blur="search"
        v-model="campusName"
        placeholder="搜索校区"
        suffixIcon="search"
      />
      <view class="pt16">
        <view
          class="search-content-item"
          v-for="(item, index) in campusList"
          :key="index"
          @click="back(item)"
        >
          <view class="search-content-name">
            <text class="search-content-name2">{{ item.campusName }}</text>
            <image
              class="search-content-img"
              src="/static/home/location2.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="search-content-city">
            {{ item.areaName || "-" }}
          </view>
          <view class="search-content-distance dis-color">
            距离{{ item.distance2 }}
          </view>
        </view>
        <view class="search-more" @click="handleMore" v-if="!isShowMore">
          <text>查看更多</text>
          <image
            class="search-more-img"
            src="/static/class/more.png"
            mode=""
          ></image>
        </view>
        <view class="not-search" @click="$utils.router.navTo($page.AddDeclare)">
          找不到小区？试试校区申请？
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from "@/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      campusName: "", //搜索社区名称
      campusList: [], //校区列表
      productId: "",
      isShowMore: false, //是否展示全部校区
	  type:null
    };
  },
  onShow(){
  },
  onLoad(e) {
    this.type = e.type || "y"; //判断是否要进入缓存
    this.productId = e.productId || "";
    this.isShowMore = false;
	this.getSearch()
    
  },
  created() {},
  methods: {
	getSearch() {
      const self = this
	  this.SET_STORAGE({
			str: 'location'
		})
      if (!this.location.latitude) {
        self.getLocation().then(()=>{
			this.search();
        })
        return false
      }
      this.getSettingLocal().then(res => {
        console.log('res',res)
        if (res == 3) {
			self.search();
        } else {
          uni.showModal({
            title: '提示',
            content: '您拒绝了定位权限，将无法使用社区定位功能',
            success: res => {
              if (res.confirm) {
                // 跳转设置页面
                uni.openSetting({
                  success: res => {
                    if (res.authSetting['scope.userLocation']) {
						self.search();
                    } else {
                      uni.showToast({
                        title: '您拒绝了定位权限，将无法使用社区定位功能',
                        icon: 'none'
                      })
                      // 没有允许定位权限
                    }
                  }
                })
				
              } else {
                self.search();
              }
            }
          })
        }
      })
    },
    Ginit() {
      uni.hideShareMenu();
    },
    search() {
      // 获取社区
      const self = this;
      this.onLaunch().then((res) => {
        self.getLocation(false).then(async (res) => {
          self.latitude = res.latitude;
          self.longitude = res.longitude;
          let res2 = await this.$http["map"].getSearchList({
            lat:  res.latitude,
            lng: res.longitude,
            productId: this.productId,
            campusName: this.campusName,
          });
          if (res2.code == 200) {
            let list = res2.data;
            list.forEach((item) => {
              // 处理距离显示
              if (item.distance > 1000) {
                item.distance2 = `${(item.distance / 1000).toFixed(1)}Km`;
              } else {
                item.distance2 = `${item.distance}m`;
              }
            });
            // 限制是否展示全部社区列表
            if (this.isShowMore || list.length <= 5) {
              this.isShowMore = true;
              this.campusList = list;
            } else {
              this.campusList = list.slice(0, 5);
            }
          }
        });
      });
    },
    // 确认返回 如果不存才则带参数返回上一页
    back(data) {
      if (this.type == "no") {
        this.$utils.router.navBackData({
          campusOther: data,
        });
      } else {
        this.SET_STORAGE({
          str: "campus",
          data,
        });
        this.$utils.router.navBackData();
      }
    },
    // 查看更多
    handleMore() {
      this.isShowMore = true;
      // uni.showToast({
      // 	title: '查看更多'
      // })
      this.search();
    },
  },
};
</script>

<style scoped lang="scss">
.not-search {
  margin-top: 22rpx;
  text-align: right;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #de501f;
}

.search {
  padding: 32rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background: #eef1fa;

  &-content {
    padding: 32rpx 30rpx;
    width: 686rpx;

    min-height: calc(100vh - 64rpx);
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 16rpx;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 106rpx;
      border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #141d3d;
    }

    &-name {
      display: flex;
      width: 332rpx;
    }
    &-name2 {
      word-break: break-all;
    }

    &-img {
      flex-shrink: 0;
      margin-left: 12rpx;
      width: 28rpx;
      height: 28rpx;
    }

    &-city {
      text-align: center;
      width: 130rpx;
    }

    &-distance {
      text-align: right;
      width: 160rpx;
    }
  }

  &-more {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
    height: 56rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #838899;

    &-img {
      margin-left: 8rpx;
      height: 20rpx;
      width: 22rpx;
    }
  }
}

/deep/.uni-icons {
  color: #de501f !important;
}

/deep/.is-input-border {
  border-radius: 8rpx !important;
  border: 2rpx solid #f3f3f5 !important;
}
</style>
