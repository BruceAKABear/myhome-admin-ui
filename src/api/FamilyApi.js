import { createAPI } from '@/utils/request'

export const familyInfoApi = data => createAPI('/family/info', 'get', data)
export const addUpdateFamilyInfoApi = data => createAPI('/family/addUpdate', 'post', data)
