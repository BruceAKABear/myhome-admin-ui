import { createAPI } from '@/utils/request'

export const devicePageApi = data => createAPI('/device/page', 'get', data)
export const addUpdateApi = data => createAPI('/device/addUpdate', 'post', data)
export const deleteDeviceApi = data => createAPI(`/device/delete/${data}`, 'delete')
export const debugDeviceListApi = data => createAPI('/device/debugDeviceList', 'get', data)
export const sendDebugApi = data => createAPI('/device/sendDebug', 'post', data)
export const singleDeviceFirmwareUpdateApi = data => createAPI('/device/singleDeviceFirmwareUpdate', 'post', data)
export const roomDeviceTreeApi = data => createAPI('/device/roomDeviceTree', 'get', data)
