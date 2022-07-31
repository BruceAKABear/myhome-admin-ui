import { createAPI } from '@/utils/request'

export const scheduleTaskPageApi = data => createAPI('/schedule/page', 'get', data)
export const scheduleTaskAddUpdateApi = data => createAPI('/schedule/addOrUpdate', 'post', data)
export const scheduleChangeStatusApi = data => createAPI('/schedule/changeStatus', 'get', data)
export const scheduleTriggerImmediatelyApi = data => createAPI('/schedule/triggerImmediately', 'get', data)
export const scheduleTaskDeleteApi = data => createAPI(`/schedule/delete/${data}`, 'delete')
