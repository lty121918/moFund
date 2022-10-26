<template>
  <view class="class-detail">
    <class-item
      type="2"
      :data="data"
      :classStatus="classStatus"
      :isTeach="isTeach"
    ></class-item>
    <view class="class-detail-user">
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
      <view class="class-detail-head">
        <view class="class-detail-head-flex">
          <image
            class="class-detail-head-img"
            :src="data.avatar"
            mode="aspectFill"
          ></image>
          <text class="fwb fz32">{{ data.wxName || "微信昵称" }}</text>
          <image
            class="class-detail-head-icon"
            src="/static/class/head.png"
            mode="aspectFill"
          ></image>
        </view>
        <view
          class="class-detail-head-contact"
          @click="handlePhone(data.wxPhone)"
        >
          <image
            class="class-detail-head-liao"
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
      <view class="class-detail-stu">
        <view
          class="class-detail-stu-flex fz28"
          v-for="row in data.studentVOList"
          :key="row.id"
          @click="handleChangeStu(row)"
        >
          <view
            v-if="
              stuActive.indexOf(row.id) == -1 && isTeach == 2 && row.isChildren
            "
            class="class-detail-attendance-check"
          >
          </view>
          <image
            v-if="
              stuActive.indexOf(row.id) > -1 && isTeach == 2 && row.isChildren
            "
            class="class-detail-attendance-check"
            src="/static/checkbox.png"
            mode="widthFix"
          >
          </image>
          <image
            class="class-detail-stu-img"
            :src="row.headUrl"
            mode="aspectFill"
          ></image>
          <view class="fwb class-detail-stu-name">{{ row.studentName }}</view>
          <view class="class-detail-stu-sex">{{
            row.gender == 1 ? "男" : "女"
          }}</view>
          <view class="class-detail-stu-age">{{ row.age }}岁</view>
          <view class="class-detail-stu-tip">
            <text class="class-detail-stu-tip2" v-if="row.isShow">
              {{row.isSufficientTime}},余额不足
            </text>
          </view>
          <image
            class="class-detail-stu-icon"
            @click.stop="handleShow(row)"
            src="/static/edit.png"
            mode="widthFix"
          >
          </image>
        </view>
      </view>
    </view>
    <!-- 底部撑起 -->
    <view
      class="class-detail-footer2"
      :style="{ marginBottom: `${safeAreaHeight}px` }"
    ></view>
    <!-- 家长展示 -->
    <view
      class="class-detail-footer"
      :style="{ paddingBottom: `${safeAreaHeight}px` }"
      v-if="isTeach == 2"
    >
      <view
        v-if="'456'.indexOf(data.classStatus) == -1"
        class="class-detail-footer-button class-detail-footer-button2"
        @click="handleDismiss"
      >
        退出班级
        <!-- {{isHead?'解散班级':'退出班级'}} -->
      </view>
      <view
        class="class-detail-footer-button"
        :class="[
          '456'.indexOf(data.classStatus) == -1
            ? ''
            : 'class-detail-footer-button3',
        ]"
        @click="handleCheckTimetable"
      >
        查看课表
      </view>
      <view
        class="class-detail-footer-button"
        :class="[
          '456'.indexOf(data.classStatus) == -1
            ? ''
            : 'class-detail-footer-button3',
        ]"
        @click="$utils.router.navTo($page.Demeanour, { classId })"
      >
        班级风采
      </view>
      <view
        class="class-detail-footer-button"
        :class="[
          '456'.indexOf(data.classStatus) == -1
            ? ''
            : 'class-detail-footer-button3',
        ]"
        @click="handleRecharge"
      >
        去充值
      </view>
    </view>
    <!-- 教练展示 -->
    <view
      class="class-detail-footer"
      :style="{ paddingBottom: `${safeAreaHeight}px` }"
      v-if="isTeach == 1"
    >
      <view
        class="class-detail-footer-button class-detail-footer-button3"
        @click="handleCheckTimetable"
      >
        查看课表
      </view>
      <view
        class="class-detail-footer-button class-detail-footer-button3"
        @click="
          $utils.router.navTo($page.Demeanour, {
            classId,
            scheduleDetailId: data.courseScheduleDetailId,
          })
        "
      >
        班级风采
      </view>
      <view
        class="class-detail-footer-button class-detail-footer-button3"
        @click="handleAttendance"
      >
        班级考勤
      </view>
    </view>
    <!-- 充值 -->
    <recharge ref="recharge" />
    <!-- 课表弹窗 -->
    <popup-date ref="popupDate" @attendance="getAttendance"></popup-date>
    <!-- 教练评论弹窗 -->
    <popup-eval ref="popupEval" @change="getClassDetail" />
    <!-- 会员查看评论弹窗 -->
    <popup-eval2 ref="popupEval2" />
  </view>
</template>
<script>
import mixin from "@/mixin.js";
import ClassItem from "@/components/class-item/class-item.vue";
import Recharge from "@/components/Recharge/Recharge.vue";
import PopupDate from "../components/PopupDate/PopupDate";
import PopupEval from "../components/PopupEval/PopupEval.vue";
import PopupEval2 from "../components/PopupEval/PopupEval2.vue";
export default {
  name:'class-detail',
  components: {
    ClassItem,
    Recharge,
    PopupDate,
    PopupEval,
    PopupEval2,
  },
  mixins: [mixin],
  data() {
    return {
      isHead: true, //是否 是团长进入该页面
      data: {
        avatar: "",
        campusId: "",
        campusName: "",
        classId: "",
        className: "",
        classStatus: "",
        coachId: "",
        courseId: "",
        courseName: "",
        courseScheduleDetailId: "",
        courseType: "",
        coverImage: "",
        endDate: "",
        endPeriod: "",
        isBoss: true,
        isSufficient: true,
        nextCLassTime: "",
        price: 0,
        scheduleDetailId: "",
        scheduleId: "",
        staffName: "",
        startDate: "",
        startPeriod: "",
        studentVOList: [],
        typeName: "",
        weekCode: [],
        wxName: "",
        wxPhone: "",
      },
      classId: null,
      stuActive: [], //选择退出学员的id
    };
  },
  onLoad(e) {
    console.log("接收数据", e);
    this.getTeach();
    if (e.isClass && this.isTeach == 1) {
      this.setTeachApp();
      // 分享进来的
    }

    this.classId = e.classId; //|| '39fffa311d849b8719aa8293bd302397'
    this.getClassDetail();
  },
  // 分享给朋友
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: this.data.className, // this.data.productName,
      path: `${this.$page.ClassDetail}?classId=${this.classId}&isClass=true`,
    };
  },
  //分享到朋友圈
  onShareTimeline(res) {
    return {
      title: this.data.className, //this.share.title,
      path: `${this.$page.ClassDetail}?classId=${this.classId}&isClass=true`, //分享默认打开是小程序首页
    };
  },

  methods: {
    // 联系团长
    handlePhone(val) {
      wx.makePhoneCall({
        phoneNumber: val, //仅为示例，并非真实的电话号码
      });
    },
    /**
     * @function 打开评价评分方法
     * @param {Object} item
     */
    handleShow(item) {
      if (this.isTeach == 1) {
        // 教练评价
        let isCheck = false;
        if (item.isEvaluate) {
          isCheck = true;
        }
        this.$refs.popupEval.handleShow({
          ...item,
          ...this.data,
          isCheck,
        });
      } else {
        // 家长查看评价
        this.$refs.popupEval2.handleShow({
          ...item,
          ...this.data,
        });
      }
    },
    // 打开充值弹窗
    handleRecharge() {
      this.$refs.recharge.handleShow();
    },
    // 解散
    handleDismiss() {
      if (this.stuActive.length == 0) {
        uni.showToast({
          title: "请选择退出学员",
        });
        return false;
      }
      this.$http["classes"]
        .exitClass({
          classId: this.classId,
          studentList: this.stuActive,
        })
        .then((res) => {
          if (res.code == 200) {
            this.getClassDetail();
          }
        });
    },
    // 打开考勤课表
    handleAttendance() {
      this.$refs.popupDate.handleShow(
        false,
        {
          isTeach: this.isTeach,
          scheduleId: this.data.scheduleId,
          classId: this.classId,
        },
        true
      );
    },
    // 选择退出班级学员
    handleChangeStu(val) {
      if (this.isTeach == 1 || !val.isChildren) {
        return false;
      }
      let index = this.stuActive.indexOf(val.id);
      if (index > -1) {
        this.stuActive.splice(index, 1);
      } else {
        this.stuActive.push(val.id);
      }
    },
    // 查看课表
    handleCheckTimetable() {
      this.$refs.popupDate.handleShow(false, {
        isTeach: this.isTeach,
        scheduleId: this.data.scheduleId,
        classId: this.classId,
      });
    },
    // 获取班级详情数据
    getClassDetail() {
      const self = this;
      const { getClassStudenDetail, getClassDetail } = this.$http["classes"];
      let getData = "";
      console.log(this.isTeach);
      if (this.isTeach == 1) {
        // 教练
        getData = getClassStudenDetail;
      } else {
        // 家长
        getData = getClassDetail;
      }
      this.stuActive = [];
      getData({
        classId: this.classId,
      }).then(async (res) => {
        if (res.code == 200) {
          if (!res.data) {
            if (this.isTeach == 1) {
              // 教练
              this.$utils.router.swtTo(this.$page.Class);
            } else {
              // 家长
              this.$utils.router.swtTo(this.$page.Home);
            }
            return false;
          }
          const data = res.data;
          //   查看者是否与此班级相关
          if (!data.shareFlag) {
            if (data.joinClassFlag) {
              self.$utils.model.showMsgModal({
                content: "是否加入拼班",
                confirmText: "加入拼班",
                cancelText: "返回首页",
                showCancel: true,
                confirmCallback: function () {
                  self.$utils.router.redTo(self.$page.OrderInfo, {
                    classId: self.classId,
                  });
                },
                cancelCallback: function () {
                  self.$utils.router.swtTo(self.$page.Home);
                },
              });
              //   商品是否存在
            } else {
              self.$utils.model.showMsgModal({
                content: "无法加入拼班",
                confirmText: "返回首页",
                cancelText: "课程详情",
                showCancel: data.productFlag,
                confirmCallback: function () {
                  self.$utils.router.swtTo(self.$page.Home);
                },
                cancelCallback: function () {
                  self.$utils.router.navTo(self.$page.CourseDetail, {
                    productId: data.productId,
                    campusId: data.campusId,
                  });
                },
              });
            }
          }
          this.isHead = res.data.isBoss;
          res.data.startPeriod = this.$utils.dateTime.getLocalTime(
            `2022-01-01 ${res.data.startPeriod}`,
            "hh:mm"
          );
          res.data.endPeriod = this.$utils.dateTime.getLocalTime(
            `2022-01-01 ${res.data.endPeriod}`,
            "hh:mm"
          );
          if (
            res.data.classStatus != 0 &&
            res.data.classStatus != 1 &&
            res.data.classStatus != 3
          ) {
            res.data.nextCLassTime = -1;
          }
          if (
            res.data.coverImage &&
            res.data.coverImage.indexOf("http") == -1
          ) {
            res.data.coverImage = this.$url + res.data.coverImage;
          }
          if (res.data.avatar && res.data.avatar.indexOf("http") == -1) {
            res.data.avatar = this.$url + res.data.avatar;
          }
          if (!res.data.avatar) {
            res.data.avatar = this.avatar;
          }
          if (res.data.nextCLassTime && res.data.nextCLassTime != -1) {
            res.data.nextCLassTime = this.$utils.dateTime.getLocalTime(
              res.data.nextCLassTime,
              "yyyy-MM-dd hh:mm"
            );
          }
          res.data["weekCodeName"] = this.$utils.dateTime.filteDay(
            res.data.weekCode
          );
          res.data.studentVOList = res.data.studentVOList || [];
          res.data.studentVOList.forEach((item) => {
            if (item.headUrl) {
              if (item.headUrl.indexOf("http") == -1) {
                item.headUrl = this.$url + item.headUrl;
              }
            } else {
              item.headUrl = this.avatar;
            }
            if (!item.isSufficient) {
              item.isSufficientTime = this.$utils.dateTime.getLocalTime(
                item.nextClassDate,
                "MM月dd日"
              );
             
            }
            // item.isSufficientTime = "12月31日"
            item.isShow =
              !item.isSufficient && (item.isChildren || this.isTeach == 1);
          });
          let courseDateList = res.data.courseDate || [];
          let CourseDateName = this.$utils.dateTime.filteDate(
            courseDateList,
            res.data.startDate,
            res.data.endDate
          );

          this.data = res.data;
          this.data.CourseDateName = CourseDateName;
        }
      });
    },

    // 考勤按钮 跳转到考勤页面
    async getAttendance(dataObj) {
      this.$utils.router.navTo(this.$page.ClassDetailAttendance, {
        dataObj: JSON.stringify(dataObj),
        classId: this.classId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-title {
  padding-top: 32rpx !important;
}

.class-detail {
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

  &-attendance {
    &-check {
      margin-right: 24rpx;
      flex-shrink: 0;
      width: 36rpx;
      height: 36rpx;
      background: #ffffff;
      border-radius: 8rpx;
      border: 2rpx solid #e7e8eb;
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
      font-size: 24rpx;
    }

    &-name {
      width: 100rpx;
    }

    &-sex {
      text-align: center;
      width: 50rpx;
    }

    &-age {
      text-align: center;
      width: 80rpx;
    }

    &-tip {
      width: 230rpx;
    }

    &-tip2 {
      display: inline-block;
      width: 230rpx;
      // height: 40rpx;
      background: rgba(222, 80, 31, 0.1);
      border-radius: 6rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #de501f;
      text-align: center;
      line-height: 40rpx;
    }

    &-img {
      flex-shrink: 0;
      margin-right: 24rpx;
      width: 48rpx;
      height: 46rpx;
      border-radius: 50%;
    }

    &-icon {
      margin-left: 30rpx;
      flex-shrink: 0;
      width: 52rpx;
      height: 52rpx;
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
      width: 160rpx;
      height: 88rpx;
      background: #de501f;
      border-radius: 16rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 88rpx;
      text-align: center;
      border: 2rpx solid #de501f;
    }

    &-button2 {
      background: #ffffff;
      color: #de501f;
    }

    &-button3 {
      width: 218rpx;
    }

    &-button4 {
      background: #999999;
      color: #141d3d;
      border: 2rpx solid #999999;
    }
  }
}
</style>
