
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
