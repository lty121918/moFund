const APIS_LIST = {
  "_management": '/management', // links
  "_management_configprops": '/management/configprops', // handle
  "_management_env": '/management/env', // handle
  "_management_env_{toMatch}": '/management/env/{toMatch}', // handle
  "_management_health": '/management/health', // handle
  "_management_health_**": '/management/health/**', // handle
  "_management_info": '/management/info', // handle
  "_management_jhimetrics": '/management/jhimetrics', // handle
  "_management_logfile": '/management/logfile', // handle
  "_management_loggers": '/management/loggers', // handle
  "_management_loggers_{name}": '/management/loggers/{name}', // handle
  "_management_prometheus": '/management/prometheus', // handle
  "_management_threaddump": '/management/threaddump', // handle
  "_Sections": '/Sections', // 节次下拉
  "_account_relative_auth_menu_tree_platform": '/account-relative/auth-menu-tree-platform', // 用户系统菜单权限树
  "_account_relative_update_pwd": '/account-relative/update-pwd', // 首次登录更改密码
  "_auth_login": '/auth/login', // 用户密码登录
  "_auth_logout": '/auth/logout', // 登出
  "_auth_wx_login": '/auth/wx/login', // 微信授权登录
  "_campus": '/campus', // 校区下拉
  "_captcha_check": '/captcha/check', // check
  "_captcha_get": '/captcha/get', // get
  "_coach": '/coach', // 教练下拉
  "_common_download": '/common/download', // 通用下载请求
  "_course": '/course', // 课程下拉
  "_course_by_campusId": '/course-by-campusId', // 校区课程下拉
  "_error": '/error', // errorHtml
  "_location": '/location', // 获取省市区
  "_operation_banner_add": '/operation/banner/add', // 添加轮播图
  "_operation_banner_del": '/operation/banner/del', // 删除轮播图
  "_operation_banner_page": '/operation/banner/page', // 查询轮播图列表
  "_operation_banner_upd": '/operation/banner/upd', // 修改轮播图
  "_operation_pay_payNotify": '/operation/pay/payNotify', // 支付回调接口
  "_operation_sys_dict_add": '/operation/sys-dict/add', // 添加字典信息
  "_operation_sys_dict_delete": '/operation/sys-dict/delete', // 删除字典信息
  "_operation_sys_dict_select": '/operation/sys-dict/select', // 条件查询字典信息
  "_operation_sys_dict_select_pid": '/operation/sys-dict/select-pid', // 根据父id查询字典信息
  "_operation_sys_dict_update": '/operation/sys-dict/update', // 修改字典信息
  "_organization_campus": '/organization-campus', // 运营团队-校区联动下拉
  "_organization_student_list": '/organization/student/list', // 当前登录用户学生集合
  "_organization_student_remove": '/organization/student/remove', // 删除学生
  "_organization_student_save": '/organization/student/save', // 保存学生
  "_organization_wx_product_get_course": '/organization/wx-product/get-course', // 查询课程
  "_organization_wx_product_get_details": '/organization/wx-product/get-details', // 课程详情
  "_organization_wx_product_get_evaluate": '/organization/wx-product/get-evaluate', // 商品评价
  "_schedule_by_campusId": '/schedule-by-campusId', // 校区课表下拉
  "_schedule_template": '/schedule-template', // 上课时段列表
  "_wx_campus_apply": '/wx-campus/apply', // 社区申请
  "_wx_coach_apply": '/wx-coach/apply', // 教练申请
  "_wx_coach_get_apply": '/wx-coach/get-apply', // 我的申请
  "_wx_organization_class_student_detail": '/wx/organization/class-student/detail', // 获取班级详情
  "_wx_organization_class_student_evaluation": '/wx/organization/class-student/evaluation', // 教学评价
  "_wx_organization_class_student_mien": '/wx/organization/class-student/mien', // 班级风采
  "_wx_organization_class_student_page": '/wx/organization/class-student/page', // 班级列表分页
  "_wx_user_center_detail": '/wx/user/center/detail', // 当前登录用户学生集合
  "_wx_user_center_get_apply": '/wx/user/center/get-apply', // 我的申报
  "_wx_user_center_role_switching": '/wx/user/center/role-switching', // 切换角色
  "_wx_user_class_detail": '/wx/user/class/detail', // 获取班级详情
  "_wx_user_class_exit": '/wx/user/class/exit', // 退出班级
  "_wx_user_class_get_evaluate": '/wx/user/class/get-evaluate', // 获取教练对学员的评价
  "_wx_user_class_mien": '/wx/user/class/mien', // 班级详情
  "_wx_user_class_page": '/wx/user/class/page', // 获取班级分页
  "_wx_user_index_banner": '/wx/user/index/banner', // 小程序端首页获取轮播图
  "_wx_user_index_campus_search_list": '/wx/user/index/campus-search-list', // 校区搜索列表
  "_wx_user_index_course_details": '/wx/user/index/course-details', // 商品详情
  "_wx_user_index_disband_class": '/wx/user/index/disband-class', // 解散拼班(团长)
  "_wx_user_index_initiate_spell_class": '/wx/user/index/initiate-spell-class', // 发起拼班
  "_wx_user_index_mine_spell_class": '/wx/user/index/mine-spell-class', // 我的拼班
  "_wx_user_index_my_spell_class_list": '/wx/user/index/my-spell-class-list', // 我要拼班
  "_wx_user_index_near_spell_class_list": '/wx/user/index/near-spell-class-list', // 附近拼班列表
  "_wx_user_index_product_course_list": '/wx/user/index/product-course-list', // 社区课程列表
  "_wx_user_index_remove_class_student": '/wx/user/index/remove-class-student', // 移出学员(退出拼班)
  "_wx_user_map_area_campus_list": '/wx/user/map/area-campus-list', // 根据区域code查找校区位置和数量
  "_wx_user_map_campus_list": '/wx/user/map/campus-list', // 校区列表
  "_wx_user_purse_cash_out": '/wx/user/purse/cash-out', // 充值发起
  "_wx_user_purse_query_pay_status": '/wx/user/purse/query-pay-status', // 支付结果查询
  "_wx_user_purse_recharge": '/wx/user/purse/recharge', // 充值发起
  "_wx_user_purse_trade_list": '/wx/user/purse/trade-list', // 财务流水
  "_wx_user_spell_class_add_stu": '/wx/user/spell_class/add-stu', // 拼班添加学员
  "_wx_user_wx_course_schedule_attendance": '/wx/user/wx-course-schedule/attendance', // 学员考勤
  "_wx_user_wx_course_schedule_coach_schedule_stu_info": '/wx/user/wx-course-schedule/coach-schedule-stu-info', // 教练查看-班级详情-查看课表-学员信息
  "_wx_user_wx_course_schedule_view": '/wx/user/wx-course-schedule/view', // 班级详情-查看课表
  "_wx_user_wx_course_schedule_vip_schedule_stu_info": '/wx/user/wx-course-schedule/vip-schedule-stu-info', // 会员查看-班级详情-查看课表-学员信息
  "_wx_user_wx_order_get_order": '/wx/user/wx-order/get-order', // 根据用户id查询全部订单信息
  "_wx_user_wx_order_get_order_consume": '/wx/user/wx-order/get-order-consume', // 根据用户id查询消费订单信息
  "_wx_user_wx_order_get_order_invest": '/wx/user/wx-order/get-order-invest' // 根据用户id查询充值订单信息
}
export default APIS_LIST
