import { createAPI } from '@/utils/request'

// 用户分析
export const uerCardDataApi = data => createAPI('/operationManage/userAnalyse/cardData', 'get', data)
// 用户列表
export const userAnalyseApi = data => createAPI('/operationManage/userAnalyse', 'get', data)
// 用户列表
export const userPageApi = data => createAPI('/operationManage/userAnalyse/page', 'post', data)
// 家庭列表
export const familyAnalyseApi = data => createAPI('/operationManage/familyAnalyse', 'get', data)
// 家庭列表
export const familyPageApi = data => createAPI('/operationManage/familyAnalyse/page', 'post', data)
// 反馈列表
export const feedbackPageApi = data => createAPI('/operationManage/feedback/page', 'get', data)
// 删除反馈
export const feedbackDeleteApi = data => createAPI(`/operationManage/feedback/delete/${data}`, 'delete')
export const addReplyApi = data => createAPI('/operationManage/feedback/addReply', 'post', data)

