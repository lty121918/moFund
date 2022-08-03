import {
	get,post
} from './http/index'
import apis from '@/apis'
// 用户数据
export const getUserInfo = params => get(apis._wx_user_center_detail, params)
// 
export const roleSwitching = params => get(apis._wx_user_center_role_switching, params)
// 当前登录用户学生集合
export const getStudent = params => get(apis._organization_student_list, params)
// 保存学生
export const setStudent = params => post(apis._organization_student_save, params)
// 删除学生
export const delStudent = id => post(apis._organization_student_remove+'?studentId='+id)
// 教练申请
export const setCoach = data => post(apis._wx_coach_apply, data)
// 我的申请
export const getCoach = params => get(apis._wx_coach_get_apply, params)
// 财务流水
export const getTrade = params => get(apis._wx_user_purse_trade_list, params)
// 充值发起
export const setRecharge = amount => get(apis._wx_user_purse_recharge, {amount})
// 提现发起
export const setCashOut = amount => get(apis._wx_user_purse_cash_out, {amount})
// 支付结果查询
export const getPayStatus = params => get(apis._wx_user_purse_query_pay_status, params)
// 全部订单
export const getOrder = params => get(apis._wx_user_wx_order_get_order, params)
// 查询消费订单信息
export const getOrderConsume = params => get(apis._wx_user_wx_order_get_order_consume, params)
// 查询充值订单信息
export const getOrderInvest = params => get(apis._wx_user_wx_order_get_order_invest, params)
// 加服务评价
export const insertServiceEvaluation = params => post(apis._wx_user_wx_order_insert_service_evaluation, params)

