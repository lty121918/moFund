
import {
	get
} from './http/index'
import apis from '@/apis'
// 社区课程列表
export const getCourseList = campusId => get(apis._wx_user_index_product_course_list, {campusId})
