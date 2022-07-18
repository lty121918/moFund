import {
	get
} from './http/index'
import apis from '@/apis'
// 当前登录用户学生集合
export const getUserInfo = params => get(apis._wx_user_center_detail, params)
