import elementZhCNLocale from 'element-ui/lib/locale/lang/zh-CN'

const zhCN = {
  permMenu: {
    '/dashboard': '控制台',
    '/family': '家庭管理',
    '/family/family': '家庭管理',
    '/family/floor': '楼层管理',
    '/family/room': '房间管理',
    '/family/members': '成员管理',
    '/device': '设备管理',
    '/device/product': '产品管理',
    '/device/firmware': '固件管理',
    '/device/device': '设备管理',
    '/device/debug': '设备调试',
    '/automation': '自动化',
    '/automation/scheduleJob': '定时任务',
    '/automation/countDown': '倒计时任务',
    '/automation/condition': '条件任务',
    '/system': '系统设置',
    '/system/rtls': '室内定位',
    '/system/systeminfo': '系统信息',
    '/system/personal': '个人信息',
    '/system/rolemanage': '角色管理'
  },
  firstMenu: {
    options: {
      onlineDoc: '文档',
      myInfo: '我的',
      exit: '退出'
    }
  },
  family: {
    name: '家庭名称',
    createTime: '创建时间',
    updateTime: '更新时间',
    floorCount: '楼层数',
    roomCount: '房间数',
    deviceCount: '设备数',
    updateButton: '更新'
  },
  ...elementZhCNLocale
}

export default zhCN
