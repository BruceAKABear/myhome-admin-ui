import { createAPI } from '@/utils/request'

export const roomPageApi = data => createAPI('/room/page', 'get', data)
export const deleteRoomApi = data => createAPI('/room/delete', 'delete', data)
export const addUpdateApi = data => createAPI('/room/addUpdate', 'post', data)
export const roomListApi = data => createAPI('/room/roomList', 'get', data)
