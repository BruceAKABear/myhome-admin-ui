import { createAPI } from '@/utils/request'

export const floorPageApi = data => createAPI('/floor/page', 'get', data)
export const deleteFloorApi = data => createAPI('/floor/delete', 'delete', data)
export const addUpdateApi = data => createAPI('/floor/addUpdate', 'post', data)
export const floorListApi = data => createAPI('/floor/floorList', 'get', data)
