import { createAPI } from '@/utils/request'

// 查询首页6个统计数据接口
export const indexDataApi = data => createAPI('/index/indexData', 'get', data)

