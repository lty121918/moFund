import {
	get
} from './http/index'
import apis from '@/apis'

export const getDict = groupNos => get(apis._dict_getDictByGroupNos, {
	groupNos
})

