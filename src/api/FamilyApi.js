import { createAPI } from '@/utils/request'

export const familyPageApi = data => createAPI('/family/page', 'get', data)
export const familyListApi = data => createAPI('/family/list', 'get', data)

export const familyAddUpdateApi = data => createAPI('/family/addUpdate', 'post', data)

export const familyInfoApi = data => createAPI('/family/info', 'get', data)
export const familyDeleteApi = data => createAPI('/family/delete', 'delete', data)
