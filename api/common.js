import {
	get
} from './http/index'
import apis from '@/apis'

export const getDict = groupNos => get(apis._dict_getDictByGroupNos, {
	groupNos
})

// 获取校区下拉
export const getCampus = groupNos => get(apis._drop_down_campus_list)
// 获取学生概况
export const getWorkbench = params => get(apis._wx_organization_home_workbench, params)
// 获取学生概况
export const getClass = params => get(apis._drop_down_class_info_list, params)
// 上课老师/班主任下拉
export const getStaff = params => get(apis._drop_down_staff_list, params)
// 教学评价模板下拉
export const getEvaluateTemplat = params => get(apis._drop_down_teaching_evaluate_template_list, params)
// 意向学员下拉
export const getProspective = params => get(apis._drop_down_prospective_customer_list, params)
// 菜单下拉
export const getPackage = params => get(apis._drop_down_package_list, params)

// 课程下拉
export const getCourse = params => get(apis._drop_down_course_list, params)
// 标签下拉
export const getTag = params => get(apis._drop_down_tag_list, params)
