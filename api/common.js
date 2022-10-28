import {
	get
} from './http/index'
import apis from '@/apis'

export const getDict = groupNos => get(apis._dict_getDictByGroupNos, {
	groupNos
})
// 获取省市区
export const getlocation = () => get(apis._operation_location_location)


