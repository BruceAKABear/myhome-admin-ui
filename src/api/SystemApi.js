import { createAPI } from '@/utils/request'

// 登录
export const login = data => createAPI('/user/login', 'post', data)

export const getPerm = data => createAPI('/permission/getPerm', 'get', data)

export const checkIsFirst = data => createAPI('/family/checkIsFirst', 'get', data)

// 获取用户信息
export const getUserInfo = data => createAPI('/user/info', 'get', data)
export const updateSelectLang = data => createAPI('/user/updateSelectLang', 'post', data)

export const updateUserInfoApi = data => createAPI('/sysUser/updateUserInfo', 'post', data)

export const basicSystemInfoApi = data => createAPI('/systemInfo/basicInfo', 'get', data)

// 权限
export const rolePageApi = data => createAPI('/permission/rolePage', 'get', data)
export const roleListApi = data => createAPI('/permission/roleList', 'get', data)
export const allPermTreeApi = data => createAPI('/permission/allPermTree', 'get', data)
export const roleAddApi = data => createAPI('/permission/roleAdd', 'post', data)
export const roleDelApi = data => createAPI(`/permission/roleDel/${data}`, 'delete', data)

// ---------------------用户相关----------------------------
// 用户分页查询
export const userPageApi = data => createAPI('/sysUser/page', 'get', data)
// 新增或修改系统用户
export const addOrUpdateUserApi = data => createAPI('/sysUser/addOrUpdateUser', 'post', data)
// 删除用户
export const delUserApi = data => createAPI('/sysUser/delUser', 'post', data)

// -----------------角色相关----------------------
// 条件分页查询
export const rolePageQueryApi = data => createAPI('/sysRole/page', 'get', data)
// 新增或修改角色
export const addOrUpdateRoleApi = data => createAPI('/sysRole/addOrUpdate', 'post', data)
// 删除角色
export const delRoleApi = data => createAPI('/sysRole/delete', 'delete', data)

// --------------权限相关-------------------
export const permPageQueryApi = data => createAPI('/sysPermission/page', 'get', data)
// 新增或修改权限
export const permAddOrUpdateApi = data => createAPI('/sysPermission/addOrUpdate', 'post', data)
// 根据父ID查询子树
export const permGetByParentIdApi = data => createAPI('/sysPermission/getByParentId', 'get', data)
// 查询包含按钮的完整权限树
export const totalPermissionTreeApi = data => createAPI('/sysPermission/totalPermissionTree', 'get', data)
