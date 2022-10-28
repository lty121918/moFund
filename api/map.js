import {
	get,post
} from './http/index'
import apis from '@/apis'

// 小程序端首页获取轮播图
export const getBanner = params => get(apis._wx_user_index_banner, params)
// 校区列表
export const getCampus = params => get(apis._wx_user_map_campus_list, params)

// 校区搜索列表
export const getSearchList = params => get(apis._wx_user_index_campus_search_list, params)
// 社区申请
export const setCampusApply = data => post(apis._wx_campus_apply, data)
// 社区申请列表
export const getCampusApply = data => get(apis._wx_user_center_get_apply, data)
