<template>
  <div class='page-container'>
    <el-row :gutter='20'>
      <el-col :span='4'>
        <div class=' basic-info-box'>
          <div class='basic-info-box-header'>
            <div style='display: flex;flex-direction: column;align-items: center'>
              <i class='el-icon-user-solid'></i>
              <span class='name-class'>用户总数</span>
            </div>
          </div>
          <div class='basic-info-box-body'>{{ indexDataObject.userCount }}</div>
        </div>
      </el-col>
      <el-col :span='4'>
        <div class=' basic-info-box'>
          <div class='basic-info-box-header' style='background-color: #FF9900'>
            <div style='display: flex;flex-direction: column;align-items: center'>
              <i class='el-icon-user'></i>
              <span class='name-class'>开发者数</span>
            </div>
          </div>
          <div class='basic-info-box-body'>{{ indexDataObject.developerCount }}</div>
        </div>
      </el-col>
      <el-col :span='4'>
        <div class=' basic-info-box'>
          <div class='basic-info-box-header' style='background-color: #909399'>
            <div style='display: flex;flex-direction: column;align-items: center'>
              <i class='el-icon-school'></i>
              <span class='name-class'>家庭总数</span>
            </div>
          </div>
          <div class='basic-info-box-body'>{{ indexDataObject.familyCount }}</div>
        </div>
      </el-col>
      <el-col :span='4'>
        <div class=' basic-info-box'>
          <div class='basic-info-box-header' style='background-color: #F29100'>
            <div style='display: flex;flex-direction: column;align-items: center'>
              <i class='el-icon-cpu'></i>
              <span class='name-class'>设备总数</span>
            </div>
          </div>
          <div class='basic-info-box-body'>{{ indexDataObject.deviceCount }}</div>
        </div>
      </el-col>
      <el-col :span='4'>
        <div class=' basic-info-box'>
          <div class='basic-info-box-header' style='background-color: #18B566'>
            <div style='display: flex;flex-direction: column;align-items: center'>
              <i class='el-icon-cpu'></i>
              <span class='name-class'>在线设备数</span>
            </div>
          </div>
          <div class='basic-info-box-body'>{{ indexDataObject.onlineDeviceCount }}</div>
        </div>
      </el-col>
      <el-col :span='4'>
        <div class='item-box basic-info-box'>
          <div class='basic-info-box-header' style='background-color: #C8C9CC'>
            <div style='display: flex;flex-direction: column;align-items: center'>
              <i class='el-icon-chat-square'></i>
              <span class='name-class'>用户反馈数</span>
            </div>
          </div>
          <div class='basic-info-box-body'>{{ indexDataObject.feedBackCount }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter='20'>
      <el-col :span='12'>
        <div class='graphic-box'>
          <div id='main' style='width: 100%;height:350px;'></div>
        </div>
      </el-col>
      <el-col :span='12'>
        <div id='main2' style='width: 100%;height:400px;' class='item-box'></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { indexDataApi } from '@/api'

export default {
  name: 'Index',
  data() {
    return {
      indexDataObject: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      indexDataApi().then(res => {
        this.indexDataObject = res.data
        console.log('ddddddd', res.data)
      })
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style lang='scss' scoped>

.page-container {
  width: 100%;
  background-color: #f6f8f9;
}

.el-row {
  padding: 10px 0;

  .basic-info-box {
    height: 100px;
    background: #FFFFFF;
    display: flex;
    border-radius: 15px;
    overflow: hidden;

    .basic-info-box-header {
      width: 40%;
      background-color: #19be6b;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      font-size: 50px;
      font-weight: bold;

      .name-class {
        font-size: 14px;
      }
    }

    .basic-info-box-body {
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      color: #9999CC;
    }

  }

  .graphic-box {
    background-color: #FFFFFF;
    padding: 15px;
  }
}

</style>
