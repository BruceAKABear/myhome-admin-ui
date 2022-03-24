import { createAPI } from '@/utils/request'

export const fieldListApi = data => createAPI('/categoryField/fieldList', 'get', data)
