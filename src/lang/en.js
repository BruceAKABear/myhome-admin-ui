import elementZhCNLocale from 'element-ui/lib/locale/lang/en'

const en = {
  permMenu: {
    '/dashboard': 'Dashboard',
    '/family': 'Family',
    '/family/family': 'Family',
    '/family/floor': 'Floor',
    '/family/room': 'Room',
    '/family/members': 'Members',
    '/device': 'Device',
    '/device/product': 'Product',
    '/device/firmware': 'Firmware',
    '/device/device': 'Device',
    '/device/debug': 'Debug',
    '/automation': 'Automation',
    '/automation/scheduleJob': '定时任务',
    '/automation/countDown': '倒计时任务',
    '/automation/condition': '条件任务',
    '/system': 'System',
    '/system/rtls': '室内定位',
    '/system/systeminfo': 'SystemInfo',
    '/system/personal': '个人信息',
    '/system/rolemanage': '角色管理'
  },
  firstMenu: {
    options: {
      onlineDoc: 'Documents',
      myInfo: 'My Info',
      exit: 'Exit'
    }
  },
  family: {
    name: 'Family Name',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    floorCount: 'Floor Count',
    roomCount: 'Room Count',
    deviceCount: 'Device Count',
    updateButton: '更新'
  },
  familyPage: {
    search: {
      info: 'please enter family name',
      button: 'Search'
    },
    addButton: 'Add Family',
    table: {
      header: {
        familyId: 'Family Id',
        familyName: 'Family Name',
        lat: 'Latitude',
        long: 'Longitude',
        floorCount: 'Floor Count',
        roomCount: 'Room Count',
        deviceCount: 'Device Count',
        createTime: 'Create Time',
        updateTime: 'Update Time',
        operation: 'Operation',
        operationModify: 'Modify',
        operationDelete: 'Delete'

      }
    },
    dialog: {
      add: 'Add Family',
      update: 'Modify Family',
      familyName: 'Family Name',
      lat: 'Latitude',
      long: 'Longitude',
      cancel: 'Cancel',
      confirm: 'Confirm'
    }

  },
  ...elementZhCNLocale
}

export default en
