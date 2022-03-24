import { createAPI } from '@/utils/request'

// -----------------设备分类------------------
// 设备分类分页查询
export const categoryPageApi = data => createAPI('/deviceCategory/page', 'get', data)
export const categoryListApi = data => createAPI('/deviceCategory/categoryList', 'get', data)
// 新增或修改
export const categoryAddOrUpdateApi = data => createAPI('/deviceCategory/addUpdate', 'post', data)
// 删除分类
export const delCategoryApi = data => createAPI(`/device/deviceCategory/delCategory/${data}`, 'delete')

// -------------设备管理-----------------
// 设备分页查询
export const devicePageApi = data => createAPI('/device/page', 'post', data)
// 新增或者修改设备
export const addOrUpdateDeviceApi = data => createAPI('/device/addOrUpdate', 'post', data)
export const delDeviceApi = data => createAPI('/device/delDevice', 'post', data)
export const sendCommandApi = data => createAPI(`/device/sendCommand`, 'post', data)

// 发布设备
export const publishDeviceApi = data => createAPI('/device/publishDevice', 'post', data)

// ---------------设备图标---------------
export const deviceIconPageApi = data => createAPI('/device/deviceIcon/page', 'post', data)
export const deleteIconPageApi = data => createAPI('/device/deviceIcon/delete', 'post', data)
export const addOrUpdateIconApi = data => createAPI('/device/deviceIcon/addOrUpdate', 'post', data)
export const getDeviceIconListApi = data => createAPI('/device/deviceIcon/getList', 'get', data)
