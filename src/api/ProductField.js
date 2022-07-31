import { createAPI } from '@/utils/request'

export const fieldListApi = data => createAPI('/productField/fieldList', 'get', data)
