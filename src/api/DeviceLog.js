import { createAPI } from '@/utils/request'

export const deviceLogPageApi = data => createAPI('/deviceLog/page', 'get', data)

