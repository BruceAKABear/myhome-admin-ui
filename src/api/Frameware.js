import { createAPI } from '@/utils/request'

export const framewarePageApi = data => createAPI('/frameware/page', 'get', data)
export const framewareAddApi = data => createAPI('/frameware/add', 'post', data)
export const deleteFramewareApi = data => createAPI(`/frameware/delete/${data}`, 'delete')
