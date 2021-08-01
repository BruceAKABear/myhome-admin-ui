<template>
  <div class='page-container'>
    <el-row :gutter='20'>
      <el-col :span='6'>
        <div class='item-box'>
          <span style=''>用户总数</span>
          <span class='main-font'>{{ cardData.totalUserCount }}</span>
        </div>
      </el-col>
      <el-col :span='6'>
        <div class='item-box'>
          <span style=''>在线总数</span>
          <span class='main-font'>{{ cardData.onlineUserCount }}</span>
        </div>
      </el-col>
      <el-col :span='6'>
        <div class='item-box'>
          <span style=''>昨日新增用户</span>
          <span class='main-font'>{{ cardData.yesterdayNewUserCount }}</span>
        </div>
      </el-col>
      <el-col :span='6'>
        <div class='item-box'>
          <span style=''>昨日新增用户比例</span>
          <span class='main-font'>{{ ((cardData.yesterdayNewUserCount / cardData.yesterdayUserCount) * 100).toFixed(2)
            }}%</span>
        </div>
      </el-col>
    </el-row>
    <div class='echarts-box'>
      <div id='main' style='width: 100%;height:400px;'></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { uerCardDataApi, userAnalyseApi } from '@/api/OperationManage'

export default {
  name: 'UserAnalyse',
  data() {
    return {
      cardData: {}
    }
  },
  created() {
    this.doGetData()
    this.doCardData()
  },
  mounted() {
    this.initStatisticsCharts()
  },
  computed: {
    statisticConfig() {
      var option = {
        title: {
          text: '日用户统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['总用户数', '新增用户数']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '总用户数',
          type: 'line',
          data: []
        }, {
          name: '新增用户数',
          type: 'line',
          data: [],
          markPoint: {
            data: [
              {
                type: 'max',
                name: '最大值'
              },
              {
                type: 'min',
                name: '最小值'
              }
            ]
          }
        }]
      }
      return option
    }
  },
  methods: {
    initStatisticsCharts() {
      var myChart = echarts.init(document.getElementById('main'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.statisticConfig)
    },
    doGetData() {
      userAnalyseApi().then(res => {
        res.data.forEach(item => {
          this.statisticConfig.xAxis.data.push(item.date)
          this.statisticConfig.series[0].data.push(item.userCount)
          this.statisticConfig.series[1].data.push(item.newCreateUserCount)
          this.initStatisticsCharts()
        })
      })
    },
    doCardData() {
      uerCardDataApi().then(res => {
        this.cardData = res.data
      })
    }
  }
}
</script>

<style lang='scss' scoped>

.el-row {
  background: #f6f8f9;
  padding-bottom: 20px;
}

.item-box {
  height: 120px;
  background: #FFFFFF;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 14px;

  .main-font {
    font-size: 36px;
    font-weight: bold;
    color: #9999CC;
  }
}

.echarts-box {
  padding: 15px 0;
}

</style>
