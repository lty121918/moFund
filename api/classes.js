
import {
	get
} from './http/index'
import apis from '@/apis'
// 获取班级分页 - 会员端
export const getClassList = params => get(apis._wx_user_class_page, params)
