import { createAPI } from '@/utils/request'

export const dashboardInfoApi = data => createAPI('/dashboard/dashboardInfo', 'get', data)
