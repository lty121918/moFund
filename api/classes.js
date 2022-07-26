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
// 解散拼班(团长)
export const getDisbandClass = params => get(apis._wx_user_index_disband_class, params)
// 移出学员(退出拼班)
export const getRemoveClassStudent = params => post(apis._wx_user_index_remove_class_student, params)
// 拼班添加学员
export const indexAddStu = params => post(apis._wx_user_index_add_stu, params)
// 解散拼班(团长)
export const indexDisbandClass = params => post(apis._wx_user_index_disband_class, params)
// 移出学员(退出拼班)
export const indexRemoveClassStudent = params => post(apis._wx_user_index_remove_class_student, params)


// 班级模块 - 获取班级详情-会员端
export const getClassDetail = params => get(apis._wx_user_class_detail, params)
