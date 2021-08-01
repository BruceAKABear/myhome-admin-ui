<template>
  <div class='page-container'>
    <div class='echarts-box'>
      <div id='main' style='width: 100%;height:400px;'></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { familyAnalyseApi } from '@/api/OperationManage'

export default {
  name: 'FamilyAnalyse',
  data() {
    return {
      dataList: [],
      familyCountList: [],
      newFamilyCountList: []
    }
  },
  created() {
    this.doGetData()
  },
  mounted() {
    this.initStatisticsCharts()
  },
  methods: {
    initStatisticsCharts() {
      var myChart = echarts.init(document.getElementById('main'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.statisticsOption)
    },
    doGetData() {
      familyAnalyseApi().then(res => {
        res.data.forEach(item => {
          this.statisticsOption.xAxis.data.push(item.date)
          this.statisticsOption.series[0].data.push(item.familyCount)
          this.statisticsOption.series[1].data.push(item.newCreateFamilyCount)
          // this.initStatisticsCharts()
        })
        this.initStatisticsCharts()
      })
    }
  },
  computed: {
    statisticsOption() {
      var option =
        {
          title: {
            text: '日家庭统统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['家庭总数', '日新增家庭数']
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
            name: '家庭总数',
            type: 'line',
            data: []
          }, {
            name: '日新增家庭数',
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
  }
}
</script>

<style lang='scss' scoped>

.echarts-box {
  padding: 15px 0;
}

</style>
