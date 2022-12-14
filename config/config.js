// let docUrl = 'http://172.20.1.25:8304/polar' //拉取api文档接口
let docUrl = "http://172.20.14.94:8081/polar"; //拉取api文档接口成林

let apiUrl = "http://172.20.3.47:8304/polar"; //测试
let imageUrl = "https://polar-light-dev.oss-cn-hangzhou.aliyuncs.com/"; //测试&开发环境
let environment = "dev";
if (environment == "pre") {
	//生产环境
	apiUrl = "https://polarlight.one-sports.com.cn/wx";
	imageUrl = "https://polar-light.oss-cn-hangzhou.aliyuncs.com/";
}

module.exports = {
	DEFAULT_SYSTEM_TITLE: "向日葵体育", // 系统默认的标题，如果到时候改从后端获取配置，会覆盖掉这个参数
	CACHE_PREFIX: "DONGAO_", //本地缓存前缀
	DOC_URL: docUrl,
	// BASE_URL_DEV: 'http://172.20.3.47:8302/polar', //本地接口
	// BASE_URL_DEV: 'http://172.20.1.25:8304/polar', // 1.0.1测试环境接口
	// BASE_URL_DEV: 'http://172.20.1.25:8302/polar', //开发接口1.1.1
	BASE_URL_DEV: "http://172.20.3.47:8304/polar", //测试接口1.1.1    这个
	// BASE_URL_DEV: 'https://polarlight.one-sports.com.cn/wx', //生产体验版接口
	// BASE_URL_DEV: 'http://172.20.14.187:8181/polar', //鹏辉本地接口
	// BASE_URL_DEV: 'http://172.20.13.149:8082/polar', //吴诗怡本地接口
	// BASE_URL_DEV: 'http://172.20.13.171:8181/polar', //金杰本地接口
	// BASE_URL_DEV: 'http://172.20.14.94:8181/polar', // 成霖
	// BASE_URL: 'http://172.20.3.47:8302/polar', //本地接口
	BASE_URL: apiUrl, // 1.0.1测试环境接口
	IMAGE_URL: imageUrl, //测试&开发环境
	IS_VERIFICATION: true, //是否打开token校验 联调的时候需要
	ROUTER_LIST: {
		Login: "/pages/login/login", // 登录
		Home: "/pages/tab-bar/home/home", // 首页
		Class: "/pages/tab-bar/class/class", // 班级
		ClassDetail: "/pages/class/class-detail/class-detail", //班级详情
		ClassInfo: "/pages/class/class-detail/class-info", //通讯录
		ClassDetailAttendance: "/pages/class/class-detail/class-detail-attendance",
		Demeanour: "/pages/class/demeanour/demeanour", //班级风采
		Map: "/pages/tab-bar/map/map", // 地图
		Mine: "/pages/tab-bar/mine/mine", // 我的
		Order: "/pages/mine/order/order", //订单
		OrderDetail: "/pages/mine/order-detail/order-detail", //订单详情
		Coach: "/pages/mine/coach/coach", //成为教练
		AddCoach: "/pages/mine/coach/add-coach", // 申请成为教练
		Student: "/pages/mine/student/student", // 我的学员
		AddStudent: "/pages/mine/student/add-student", //添加学员
		Wallet: "/pages/mine/wallet/wallet", //我的钱包
		Course: "/pages/class/course-list/course-list", // 课程列表
		CourseDetail: "/pages/class/course-detail/course-detail", // 课程详情
		Evaluate: "/pages/class/evaluate/evaluate", // 更多评价
		Declare: "/pages/map/declare/declare", // 社区申报
		AddDeclare: "/pages/map/add-declare/add-declare", // 添加社区申报
		Search: "/pages/map/search/search", //搜索校区
		PieceList: "/pages/class/piece-list/piece-list", //社区拼班
		OrderInfo: "/pages/class/order-info/order-info", //当前拼单or加入拼单
		MyClass: "/pages/class/my-class/my-class", //我的拼班
		MyCoupon: "/pages/mine/my-coupon/my-coupon", //我的优惠券
		// 1,2
		Coupon: "/pages/coupon/index/index",
	},
};
