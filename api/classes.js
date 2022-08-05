import {
	get,post
} from './http/index'
import apis from '@/apis'
// 获取班级分页 - 会员端
export const getClassList = params => get(apis._wx_user_class_page, params)
// 社区课程列表
export const getCourseList = params => get(apis._wx_user_index_product_course_list, params)
// 附近拼班列表
export const getSpellClassList = params => get(apis._wx_user_index_near_spell_class_list, params)
// 商品详情
export const getCourseDetails = params => get(apis._wx_user_index_course_details, params)
// 课程详情
export const getProductDetails = params => get(apis._organization_wx_product_get_details, params)
// 商品评价
export const getProductEvaluate = params => get(apis._organization_wx_product_get_evaluate, params)
// 我要拼班
export const getSpellClass = params => get(apis._wx_user_index_my_spell_class_list, params)
// 发起拼班
export const getInitiateSpellClass = params => post(apis._wx_user_index_initiate_spell_class, params)
// 我的拼班
export const getMineSpellClass = params => get(apis._wx_user_index_mine_spell_class, params)
// 拼班添加学员
export const indexAddStu = params => post(apis._wx_user_index_add_stu, params)
// 解散拼班(团长)
export const indexDisbandClass = params => post(apis._wx_user_index_disband_class, params)
// 移出学员(退出拼班)
export const indexRemoveClassStudent = params => post(apis._wx_user_index_remove_class_student, params)


// 班级模块 - 获取班级详情-会员端
export const getClassDetail = params => get(apis._wx_user_class_detail, params)
// 获取教练对学员的评价
export const getEvaluate = params => get(apis._wx_user_class_get_evaluate, params)
// 班级风采 会员
export const getClassMien = params => get(apis._wx_user_class_mien, params)
// 班级风采 教练
export const getClassStuMien = params => get(apis._wx_organization_class_student_mien, params)

// 解散拼班(团长)
export const disbandClass = params => post(apis._wx_user_class_disband_class, params)
// 退出班级（家长）
export const exitClass = params => post(apis._wx_user_class_exit, params)
// 班级详情-查看课表
export const courseScheduleView = params => get(apis._wx_user_wx_course_schedule_view, params)
// 教练查看-班级详情-查看课表-学员信息 
export const coachScheduleStuInfo = params => get(apis._wx_user_wx_course_schedule_coach_schedule_stu_info, params)
// 会员查看-班级详情-查看课表-学员信息 
export const vipScheduleStuInfo = params => get(apis._wx_user_wx_course_schedule_vip_schedule_stu_info, params)
// 班级模块 - 获取班级详情-教师端
export const getClassStudenDetail = params => get(apis._wx_organization_class_student_detail, params)
// 班级列表分页 -教练
export const getClassStudentPage = params => get(apis._wx_organization_class_student_page, params)
// 教学评价
export const studentEvaluation = params => post(apis._wx_organization_class_student_evaluation, params)
// 学员考勤
export const scheduleAttendance = params => post(apis._wx_user_wx_course_schedule_attendance, params)

// 分享
export const shareGenerateUrlLink = params => post(apis._wx_user_share_generate_url_link, params)
// 上传素材
export const ClassStudentUploadMien = params => post(apis._wx_organization_class_student_uploadMien, params)
