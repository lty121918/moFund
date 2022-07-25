
import {
	get
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



// 班级模块 - 获取班级详情-会员端
export const getClassDetail = params => get(apis._wx_user_class_detail, params)
