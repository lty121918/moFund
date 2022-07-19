import {
	get
} from './http/index'
import apis from '@/apis'
// 校区列表
export const getCampus = params => get(apis._wx_user_map_campus_list, params)

// 校区搜索列表
export const getSearchList = params => get(apis._wx_user_index_campus_search_list, params)
