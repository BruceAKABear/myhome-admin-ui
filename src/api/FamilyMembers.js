import { createAPI } from '@/utils/request'

export const membersPageApi = data => createAPI('/user/page', 'get', data)
export const membersEnableApi = data => createAPI('/user/enable', 'post', data)
export const membersAddApi = data => createAPI('/user/addOrUpdate', 'post', data)
export const membersDeleteApi = data => createAPI(`/user/delete/${data}`, 'delete')
