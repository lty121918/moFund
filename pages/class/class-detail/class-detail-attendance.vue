<template>
  <view class="class-detail">
    <class-item
      type="2"
      :data="data"
      :classStatus="classStatus"
      :isTeach="isTeach"
    ></class-item>
    <!-- 考勤 -->
    <view class="class-detail-user class-detail-attendance">
      <view class="class-detail-attendance-item fz28 flex-bc">
        <text class="color4">考勤</text>
        <text class="color2">
          {{ statusList[studentVOList.status] }}
          <!-- {{studentVOList.isSign?'教练已签到':'教练未签到'}} -->
        </text>
      </view>
      <view class="class-detail-attendance-title flex-bc">
        <view class="flex-sc">
          <image
            class="class-detail-attendance-img"
            src="/static/attendance.png"
            mode="widthFix"
          ></image>
          <text class="color4">考勤名单</text>
        </view>
        <text class="color2">
          <text>{{ studentVOList.courseDate }}</text>
          <text class="ml12">
            {{ studentVOList.startTime }}~{{ studentVOList.endTime }}
          </text>
        </text>
      </view>
      <view class="class-detail-stu">
        <view
          class="class-detail-stu-flex fz28"
          v-for="(item, index) in studentVOList.data"
          :key="index"
          @click="changeBox(item)"
        >
          <view
            v-if="boxActive.indexOf(item.id) == -1 && studentVOList.isSign"
            class="class-detail-attendance-check"
          ></view>
          <image
            v-if="boxActive.indexOf(item.id) > -1 && studentVOList.isSign"
            class="class-detail-attendance-check"
            src="/static/checkbox.png"
            mode="widthFix"
          ></image>
          <image
            class="class-detail-stu-img"
            :src="avatar"
            mode="aspectFill"
          ></image>
          <view class="fwb class-detail-stu-name">{{ item.studentName }}</view>
          <view class="class-detail-stu-sex">
            {{ item.gender == 1 ? "男" : "女" }}
          </view>
          <view class="class-detail-stu-age">{{ item.age }}岁</view>
          <view
            class="color256 text-r class-detail-stu-status"
            v-if="item.attendanceStatus == 1"
          >
            已出勤
          </view>
          <view
            class="color2 text-r class-detail-stu-status"
            v-if="item.attendanceStatus == 2"
          >
            学员请假
          </view>
          <view
            class="color text-r class-detail-stu-status"
            v-if="item.attendanceStatus == 3"
          >
            学员未到
          </view>
        </view>
      </view>
    </view>

    <view
      class="class-detail-footer2"
      :style="{ marginBottom: `${safeAreaHeight}px` }"
    ></view>
    <!-- 考勤展示 -->
    <view
      class="class-detail-footer"
      :style="{ paddingBottom: `${safeAreaHeight}px` }"
    >
      <view
        class="class-detail-footer-button class-detail-footer-button3"
        :class="[studentVOList.IsStatus ? '' : 'class-detail-footer-button4']"
        @click="handleStatus(1, '签到')"
      >
        教练签到
      </view>
      <view
        class="class-detail-footer-button class-detail-footer-button3"
        :class="[
          studentVOList.isSign && studentVOList.IsStatus
            ? ''
            : 'class-detail-footer-button4',
        ]"
        @click="handleStatus(2, '请假')"
      >
        学员请假
      </view>
      <view
        class="class-detail-footer-button class-detail-footer-button3"
        :class="[
          studentVOList.isSign && studentVOList.IsStatus
            ? ''
            : 'class-detail-footer-button4',
        ]"
        @click="handleStatus(3, '未到')"
      >
        学员未到
      </view>
    </view>
  </view>
</template>
<script>
import mixin from "@/mixin.js";
import ClassItem from "@/components/class-item/class-item.vue";
export default {
  name:'class-detail-attendance',
  components: {
    ClassItem,
  },
  mixins: [mixin],
  data() {
    return {
      boxActive: [],
      studentVOList: [], // 教练考勤人员
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
      classId: "",

      stuActive: [], //选择退出学员的id
      statusList: {
        1: "未拼班",
        2: "待考勤",
        3: "考勤中",
        4: "已考勤",
        5: "作废",
        6: "已取消",
      },
    };
  },
  onLoad(e) {
    console.log("接收数据", e);
    this.getTeach();
    this.classId = e.classId; //|| '39fffa311d849b8719aa8293bd302397'
    this.getClassDetail();
    this.getAttendance(JSON.parse(e.dataObj));
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
  onShareTimeline(res) {
    //分享到朋友圈
    return {
      title: this.data.className, //this.share.title,
      path: `${this.$page.ClassDetail}?classId=${this.classId}&isClass=true`, //分享默认打开是小程序首页
    };
  },
  methods: {
    // 修改学员考勤状态
    handleStatus(val, type) {
      // uni.showToast({
      // 	title: type
      // })
      const self = this;
      let data = JSON.parse(JSON.stringify(self.studentVOList.data));
      //  判断IsStatus 如果是false就代表无法考勤
      if (!this.studentVOList.IsStatus) {
        return false;
      }
      // 判断val 不是教练 并且
      if (!this.studentVOList.isSign && val != 1) {
        return false;
      }
      if (self.boxActive.length == 0) {
        uni.showToast({ title: "请选择考勤学员" });
        return false;
      }
      data = data.filter((item) => {
        item.attendanceStatus = val;
        let index = self.boxActive.indexOf(item.id);
        return index > -1;
      });

      // this.studentVOList
      console.log("考勤数据：", {
        attendanceStatus: val,
        attendances: data,
        classId: self.classId,
        id: self.studentVOList.id,
      });
      self.$http["classes"]
        .scheduleAttendance({
          attendanceStatus: val,
          attendances: data,
          classId: self.classId,
          id: self.studentVOList.id,
          periodId: self.studentVOList.periodId, //1.0.1 新增
        })
        .then((res) => {
          if (res.code == 200) {
            self.getAttendance(self.studentVOList);
            self.getClassDetail();
            self.boxActive = [];
          }
        });
    },
    changeBox(val) {
      if (!this.studentVOList.isSign) {
        return false;
      }
      let index = this.boxActive.indexOf(val.id);
      if (index > -1) {
        this.boxActive.splice(index, 1);
      } else {
        this.boxActive.push(val.id);
      }
    },
    getClassDetail() {
      const getData = this.$http["classes"].getClassStudenDetail;
      this.stuActive = [];
      getData({ classId: this.classId }).then(async (res) => {
        if (res.code == 200) {
          if (!res.data) {
            this.$utils.router.swtTo(this.$page.Class);
            return false;
          }
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
    // 考勤按钮
    // TODO: 根据课表返回的状态status 显示教练是否签到和按钮置灰问题
    async getAttendance(dataObj) {
      const res = await this.$http["classes"]
        .coachStuAttendance({
          id: dataObj.id,
          classId: this.classId,
        })
        .then((res) => {
          if (res.code == 200) {
            let isSign = false;
            isSign =
              res.data.some((row) => row.attendanceStatus > 0) ||
              dataObj.status != 2;
            // isSign = dataObj.status != 2//dataObj.status!=3 && dataObj.status!=4
            const status =
              dataObj.status == 2 || dataObj.status == 3 || dataObj.status == 4;
            const boxActive = res.data.map((item) => item.id);
            if (!isSign) {
              this.boxActive = boxActive;
            }
            console.log(isSign, dataObj.status);
            // 状态1∶未拼班2∶待考勤―3∶考勤中4∶已考勤︰5∶作废6∶已取消(该状态不可对学员进行考勤)"
            this.studentVOList = {
              ...dataObj,
              isSign,
              data: res.data,
              // isCanOpt true的时候可操 是否可操作考勤 区分  当前教练的课有没被其他教练代上的s
              IsStatus: status && dataObj.isCanOpt,
            };
          }
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
    &-item {
      margin: 0 32rpx;
      padding: 32rpx 0;
      border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
    }

    &-check {
      margin-right: 24rpx;
      flex-shrink: 0;
      width: 36rpx;
      height: 36rpx;
      background: #ffffff;
      border-radius: 8rpx;
      border: 2rpx solid #e7e8eb;
    }

    &-title {
      margin-top: 30rpx;
      margin-left: 32rpx;
      padding: 0 32rpx;
      width: 622rpx;
      height: 64rpx;
      box-sizing: border-box;
      background: rgba(20, 29, 61, 0.05);
      border-radius: 12rpx;
      font-size: 24rpx;
    }

    &-img {
      margin-right: 10rpx;
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
      width: 200rpx;
    }

    &-sex {
      text-align: center;
      width: 80rpx;
    }

    &-age {
      text-align: center;
      width: 100rpx;
    }

    &-status {
      width: 120rpx;
      font-size: 28rpx;
    }

    &-tip {
      width: 116rpx;
    }

    &-tip2 {
      display: inline-block;
      width: 116rpx;
      height: 40rpx;
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
