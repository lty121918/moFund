<template>
  <view class="order-info">
    <share-canvas
      ref="shareCanvas"
      :data="data"
      @onSuccess="handleGetImg"
    ></share-canvas>
    <class-item
      :data="data"
      type="3"
      :classStatus="classStatus"
      :isTeach="isTeach"
    ></class-item>
    <view class="order-info-user">
      <view class="home-title">
        <view class="home-title-item">
          <image
            class="home-title-img"
            src="/static/home/icon.png"
            mode="aspectFill"
          ></image>
          <text>团长</text>
        </view>
      </view>
      <view class="order-info-head">
        <view class="order-info-head-flex">
          <image
            class="order-info-head-img"
            :src="data.avatar"
            mode="aspectFill"
          ></image>
          <text class="fwb fz32">{{ data.nickName || '微信昵称' }}</text>
          <image
            class="order-info-head-icon"
            src="/static/class/head.png"
            mode="aspectFill"
          ></image>
        </view>
        <image
          v-if="isHead"
          class="order-info-head-share"
          src="/static/class/share.png"
          mode="aspectFill"
          @click="handleShare"
        ></image>
        <view
          class="order-info-head-contact"
          v-if="!isHead"
          @click="handlePhone(data.phone)"
        >
          <image
            class="order-info-head-liao"
            src="/static/class/liao.png"
            mode="aspectFill"
          ></image>
          <text>联系团长</text>
        </view>
      </view>
      <view class="home-title">
        <view class="home-title-item">
          <image
            class="home-title-img"
            src="/static/home/icon.png"
            mode="aspectFill"
          ></image>
          <text>团员</text>
        </view>
      </view>
      <view class="order-info-stu">
        <view
          class="order-info-stu-flex fz28"
          v-for="item in data.weChatUserList"
          :key="item.classStudentId"
        >
          <image
            class="order-info-stu-img"
            :src="item.avatar"
            mode="aspectFill"
          ></image>
          <view class="fwb order-info-stu-name">{{ item.studentName }}</view>
          <view class="order-info-stu-sex">
            {{ item.gender == 1 ? '男' : '女' }}
          </view>
          <view class="order-info-stu-age">{{ item.age }}岁</view>
          <image
            class="order-info-stu-del"
            @click="handleDel(item)"
            src="/static/del.png"
            mode="aspectFill"
          ></image>
        </view>
      </view>
      <view class="order-info-adduser" @click="handleAdd">
        <image
          class="order-info-adduser-add"
          src="/static/class/add.png"
          mode="aspectFill"
        ></image>
        <text>添加学员</text>
      </view>
    </view>
    <view
      v-if="isHead && data.classStatus == '0'"
      class="order-info-footer2"
      :style="{ marginBottom: `${safeAreaHeight}px` }"
    ></view>
    <view
      v-if="isHead && data.classStatus == '0'"
      class="order-info-footer"
      :style="{ paddingBottom: `${safeAreaHeight}px` }"
    >
      <view
        class="order-info-footer-button order-info-footer-button2"
        @click="handleCancelClass"
      >
        取消拼班
      </view>
      <!-- <view class="order-info-footer-button order-info-footer-button2" @click="submit">
				确定
			</view> -->
    </view>
    <view style="height: 180rpx"></view>
    <!-- 	<view v-if="!isHead" class="order-info-footer" :style="{ paddingBottom: `${safeAreaHeight}px` }">
			<view>
			</view>
			<view class="order-info-footer-button order-info-footer-button2" @click="submit">
				确定
			</view>
		</view> -->
    <popup-share ref="popupShare"></popup-share>
    <popup-add-stu
      ref="popupAddStu"
      @change="getMineSpellClass"
    ></popup-add-stu>

    <!-- 画布分享 -->
    <!-- <share-canvas></share-canvas> -->
  </view>
</template>
<script>
import mixin from '@/mixin.js'
import ClassItem from '@/components/class-item/class-item.vue'
import PopupShare from '../components/PopupShare/PopupShare.vue'
import PopupAddStu from '../components/popup-add-stu/popup-add-stu.vue'
import ShareCanvas from '../components/ShareCanvas/ShareCanvas.vue'
export default {
  components: {
    ClassItem,
    PopupShare,
    PopupAddStu,
    ShareCanvas
  },
  mixins: [mixin],
  data() {
    return {
      isHead: false, //是否 是团长进入该页面
      data: {},
      classId: '',
      numData: 0,
      shareImg: null,
      campusOther: {},
      isPin:false
    }
  },
  onShow() {
    if (this.numData) {
      this.getMineSpellClass()
    }
    this.isPin = this.isPin==2?1:3
  },
  onLoad(e) {
    this.onLaunch().then(res => {
      console.log('返回的数据', e)
      this.classId = e.classId
      this.wxUserId = e.wxUserId
      this.isPin = e.isPin
      this.SET_STORAGE({
        str: 'shareInfo',
        data: e
      })
      this.getMineSpellClass()
    })
  },
  // 分享给朋友
  onShareAppMessage(res) {
    this.isPin = this.isPin==1?2:3
    if (res.from === 'button') {
      // 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: '快来和我一起运动吧!', // this.data.productName,
      imageUrl: this.shareImg,
      path: `${this.$page.OrderInfo}?classId=${this.classId}&wxUserId=${
        this.data.wxUserId
      }`
    }
  },
  onShareTimeline(res) {
    this.isPin = this.isPin==1?2:3
    //分享到朋友圈
    return {
      title: '快来和我一起运动吧!', //this.share.title,
      path: `${this.$page.OrderInfo}?classId=${this.classId}&wxUserId=${
        this.data.wxUserId
      }` //分享默认打开是小程序首页
    }
  },
  onUnload: function() {
    // wx.reLaunch({
    // 	url: this.$page.Home
    // })
    let pages = getCurrentPages() //页面对象
    let prevpage = pages[pages.length - 2] //上一个页面对象
    let prevpage2 = pages[pages.length - 3] //上一个页面对象
    let path = prevpage.route
    let path2 = prevpage2 == 'undefined' ? null : prevpage2.route
    console.log('上个页面', 'path:', path, prevpage2)
    if (
      path === 'pages/class/course-detail/course-detail' &&
      path2 &&
      path2 !== 'pages/class/order-info/order-info' &&
      path2 !== 'pages/tab-bar/map/map' && 
      this.isPin == 1
    ) {
      // this.$utils.router.navBack(2)、
      console.log('分享1',path2,path);
      this.$utils.router.swtTo(this.$page.Home)
    } else if (path2 && path2 === 'pages/class/order-info/order-info') {
      console.log('分享2',path2);
      this.$utils.router.swtTo(this.$page.Home)
    } else {
    }
  },
  methods: {
    // 取消拼班中的
    handleCancelClass() {
      const self = this
      self.$utils.model.showMsgModal({
        content: '是否确认取消拼班',
        showCancel: true,
        confirmCallback: function() {
          self.$http['classes']
            .cancelClass({
              classId: self.classId,
              IsFormData: true
            })
            .then(res => {
              if (res.code === 200) {
                setTimeout(() => {
                  self.$utils.router.swtTo(self.$page.Home)
                }, 1000)
              }
            })
        }
      })
    },

    // 联系团长
    handlePhone(phone) {
      const authorization = this.$utils.util.getCache('Authorization')
      if (!authorization) {
        this.$utils.userInfo.login('this')
        return false
      }
      wx.makePhoneCall({ phoneNumber: phone })
    },
    handleAdd() {
      const authorization = this.$utils.util.getCache('Authorization')
      if (!authorization) {
        this.$utils.userInfo.login('this')
        return false
      }
      this.data.weChatUserList = this.data.weChatUserList || []
      const ls = this.data.weChatUserList.map(item => item.studentId)
      console.log(this.classId)
      this.$refs.popupAddStu.handleShow(this.classId, ls, this.data)
      console.log('添加学员')
    },

    // 执行解散班级
    handleDisolution() {
      // const ls = this.data.weChatUserList.map(item => item.studentId)
      this.$http['classes']
        .indexDisbandClass({
          classId: this.classId
          // studentIds: ls
        })
        .then(res => {
          if (res.code === 200) {
            this.submit()
          }
        })
    },
    // 执行分享界面
    handleShare() {
      console.log(this.data)
      this.$refs.popupShare.handleShow({
        coverImage: this.data.coverImage,
        title: this.data.className,
        query: `classId=${this.classId}&wxUserId=${this.data.wxUserId}`,
        path: '/pages/class/order-info/order-info'
      })
    },
    // 删除学员
    handleDel(val) {
      const self = this
      const authorization = this.$utils.util.getCache('Authorization')
      if (!authorization) {
        this.$utils.userInfo.login('this')
        return false
      }
      self.$utils.model.showMsgModal({
        content: '确定要删除该团员',
        showCancel: true,
        confirmCallback: function() {
          self.$http['classes']
            .indexRemoveClassStudent({
              classInfoId: self.classId,
              classStudentId: val.classStudentId,
              studentId: val.studentId,
              courseScheduleId: self.data.courseScheduleId,
              spellClassDetailsId: self.data.spellClassDetailsId,
              courseScheduleDetailId: self.data.courseScheduleDetailId,
              wxUserId: val.wxUserId
            })
            .then(res => {
              if (res.code === 200) {
                self.getMineSpellClass()
              }
            })
        }
      })
    },
    handleGetImg(val) {
      this.shareImg = val
    },
    getMineSpellClass() {
      this.$http['classes']
        .getMineSpellClass({ classInfoId: this.classId })
        .then(async res => {
          if (res.code === 200) {
            console.log(res.data)
            this.isHead = res.data.regimentalCommander
            if (
              res.data.coverImage &&
              res.data.coverImage.indexOf('http') === -1
            ) {
              res.data.coverImage = this.$url + res.data.coverImage
            }
            if (res.data.avatar && res.data.avatar.indexOf('http') === -1) {
              res.data.avatar = this.$url + res.data.avatar
            }
            if (!res.data.avatar) {
              res.data.avatar = this.avatar
            }

            res.data['weekCodeName'] = this.$utils.dateTime.filteDay(
              res.data.weekCode
            )
            res.data.weChatUserList = res.data.weChatUserList || []
            res.data.weChatUserList.forEach(item => {
              if (item.avatar && item.avatar.indexOf('http') === -1) {
                item.avatar = this.$url + item.avatar
              }
              if (!item.avatar) {
                item.avatar = this.avatar
              }
            })
            let courseDateList = res.data.courseDate || []
            let CourseDateName = this.$utils.dateTime.filteDate(
              courseDateList,
              res.data.startDate,
              res.data.endDate
            )
            this.data = {...res.data,classId: this.classId}
            this.data.CourseDateName = CourseDateName
            uni.setNavigationBarTitle({ title: this.isHead ? '我的拼班' : '加入拼班' })
            this.SET_STORAGE({
              str: 'shareInfo',
              data: {}
            })
            this.numData++
            // if(res.data.classStatus!=0){
            // 	this.$utils.router.redTo(this.$page.ClassDetail,{classId: this.classId})
            // }
            this.$refs.shareCanvas.getData()
          }
        })
    },
    // 返回上一页
    submit() {
      this.$utils.router.navBackData()
    },
  
  }
}
</script>

<style lang="scss" scoped>
.home-title {
  padding-top: 32rpx !important;
}

.order-info {
  min-height: 100vh;
  background: #eef1fa;
  box-sizing: border-box;
  padding: 32rpx 0 0 0;

  &-user {
    margin-top: 30rpx;
    margin-left: 32rpx;
    padding-bottom: 32rpx;
    width: 686rpx;
    background: #ffffff;
    border-radius: 16rpx;
  }

  &-adduser {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32rpx 0 0 32rpx;
    width: 156rpx;
    height: 52rpx;
    background: #de501f;
    border-radius: 12rpx;
    font-size: 24rpx;
    font-family: SourceHanSansSC-Regular, SourceHanSansSC;
    font-weight: 400;
    color: #ffffff;

    &-add {
      margin-right: 8rpx;
      width: 24rpx;
      height: 26rpx;
    }
  }

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;

    &-flex {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
    }

    &-img {
      flex-shrink: 0;
      margin-right: 26rpx;
      width: 88rpx;
      height: 88rpx;
      background: #cecece;
      border-radius: 50%;
    }

    &-icon {
      position: absolute;
      left: 71rpx;
      bottom: -17rpx;
      width: 34rpx;
      height: 34rpx;
    }

    &-share {
      flex-shrink: 0;
      width: 60rpx;
      height: 60rpx;
    }

    &-contact {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 156rpx;
      height: 52rpx;
      background: #de501f;
      border-radius: 12rpx;
      font-size: 24rpx;
      font-family: SourceHanSansSC-Regular, SourceHanSansSC;
      font-weight: 400;
      color: #ffffff;
    }

    &-liao {
      margin-right: 8rpx;
      width: 24rpx;
      height: 24rpx;
    }
  }

  &-stu {
    padding: 0 32rpx;

    &-flex {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 32rpx 0;
      border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
    }

    &-name {
      width: 300rpx;
    }

    &-sex {
      width: 100rpx;
    }

    &-age {
      width: 150rpx;
    }

    &-img {
      flex-shrink: 0;
      margin-right: 24rpx;
      width: 48rpx;
      height: 46rpx;
      border-radius: 50%;
    }

    &-del {
      width: 64rpx;
      height: 64rpx;
    }
  }

  &-footer2 {
    height: 250rpx;
  }

  &-footer {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 750rpx;
    padding: 32rpx 30rpx;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 36rpx 36rpx 0rpx 0rpx;

    &-button {
      margin-bottom: 32rpx;
      width: 328rpx;
      height: 92rpx;
      border-radius: 16rpx;
      border: 2rpx solid #de501f;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #de501f;
      text-align: center;
      line-height: 92rpx;
    }

    &-button2 {
      background: #de501f;
      color: #ffffff;
    }
  }
}
</style>
