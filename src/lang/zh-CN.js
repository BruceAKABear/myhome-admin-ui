import elementZhCNLocale from 'element-ui/lib/locale/lang/zh-CN'

const zhCN = {
  permMenu: {
    '/dashboard': '首页',
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
  familyPage: {
    search: {
      info: '请输入家庭名',
      button: '新增'
    },
    table: {
      header: {
        familyId: '家庭ID',
        familyName: '家庭名称',
        lat: '纬度',
        long: '经度',
        floorCount: '楼层数',
        roomCount: '楼层数',
        deviceCount: '设备数',
        createTime: '创建时间',
        updateTime: '更新时间',
        operation: '操作',
        operationModify: '修改',
        operationDelete: '删除'

      }
    },
    dialog: {
      add: '新增家庭',
      update: '修改家庭',
      familyName: '家庭名',
      lat: '纬度',
      long: '经度',
      cancel: '取消',
      confirm: '确认'
    }

  },
  floorPage: {
    search: {
      familySelect: '请选择家庭',
      floorName: '请输入楼层名',
      button: '新增'
    },
    table: {
      header: {
        familyName: '家庭',
        floorName: '楼层',
        roomCount: '房间数',
        deviceCount: '设备数',
        createTime: '创建时间',
        updateTime: '创建时间',
        operation: '操作',
        operationModify: '修改',
        operationDelete: '删除'

      }
    },
    dialog: {
      add: '新增',
      update: '修改',
      family: '所属家庭',
      floorName: '楼层名'
    }
  },
  roomPage: {
    search: {
      familySelect: '请选择家庭',
      floorSelect: '请选择楼层',
      roomName: '请输入房间名',
      button: '新增'
    },
    table: {
      header: {
        roomName: '房间',
        floorName: '楼层',
        familyName: '家庭',
        deviceCount: '设备数',
        beacon: '信标',
        createTime: '创建时间',
        updateTime: '创建时间',
        operation: '操作',
        operationModify: '修改',
        operationDelete: '删除'

      }
    },
    dialog: {
      add: '新增',
      update: '修改',
      family: '所属家庭',
      floorName: '楼层名'
    }
  },
  ...elementZhCNLocale
}

export default zhCN
