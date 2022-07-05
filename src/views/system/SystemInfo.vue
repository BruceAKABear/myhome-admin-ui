<template>
  <div class="page-container">
    <el-row :gutter="12">
      <el-col :span="8" class="hidden-md-and-down">
        <el-card shadow="always" header="基础信息" :body-style="{ padding: '10px' }">
          <div style='width: 100%;height:300px;'>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统名:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.name : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统版本:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.version : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统架构:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.arch : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">CPU核心数:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.availableProcessors : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统内存(MB):</el-col>
              <el-col :span="12">
                {{ systemData.osmxb ? (systemData.osmxb.totalPhysicalMemorySize / 1024 / 1024).toFixed(0) : 0 }}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">可用内存(MB):</el-col>
              <el-col :span="12">
                {{ systemData.osmxb ? (systemData.osmxb.freePhysicalMemorySize / 1024 / 1024).toFixed(0) : 0 }}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">Jvm版本:</el-col>
              <el-col :span="12">
                {{ systemData.jvmVersion }}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">Java版本:</el-col>
              <el-col :span="12">
                {{ systemData.javaVersion }}
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card shadow="always" header="CPU使用率" :body-style="{ padding: '10px' }">
          <div id="cpuload" style='width: 100%;height:300px;'></div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card shadow="always" :body-style="{ padding: '10px' }" header="内存使用率">
          <div id="ramload" style='width: 100%;height:300px;'></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="8" class="hidden-md-and-down">
        <el-card shadow="always" header="EMQX信息" :body-style="{ padding: '10px' }">
          <div style='width: 100%;height:300px;'>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统名:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.name : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统版本:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.version : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统架构:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.arch : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">CPU核心数:</el-col>
              <el-col :span="12">{{ systemData.osmxb ? systemData.osmxb.availableProcessors : '' }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">系统内存(MB):</el-col>
              <el-col :span="12">
                {{ systemData.osmxb ? (systemData.osmxb.totalPhysicalMemorySize / 1024 / 1024).toFixed(0) : 0 }}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">可用内存(MB):</el-col>
              <el-col :span="12">
                {{ systemData.osmxb ? (systemData.osmxb.freePhysicalMemorySize / 1024 / 1024).toFixed(0) : 0 }}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">Jvm版本:</el-col>
              <el-col :span="12">
                {{ systemData.jvmVersion }}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="item-padding">
              <el-col :span="12">Java版本:</el-col>
              <el-col :span="12">
                {{ systemData.javaVersion }}
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card shadow="always" header="设备在离线" :body-style="{ padding: '10px' }">
          <div id="deviceData" style='width: 100%;height:300px;'></div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card shadow="always" :body-style="{ padding: '10px' }" header="内存使用率">
          <div id="ramload" style='width: 100%;height:300px;'></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { basicSystemInfoApi } from '@/api/SystemApi'

export default {
  name: 'SystemInfo',
  data() {
    return {
      systemData: {}
    }
  },
  created() {
    this.doGetSystemInfo()
  },
  mounted() {
  },
  methods: {
    doGetSystemInfo() {
      basicSystemInfoApi().then(res => {
        this.systemData = res.data
        console.log(res.data)
        this.$nextTick(() => {
          var cpuloadDom = document.getElementById('cpuload')
          var cpuloadDomChart = this.$echarts.init(cpuloadDom)
          const cpuload = (this.systemData.osmxb.systemCpuLoad * 100).toFixed(0)
          const option = {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: '使用率',
                type: 'gauge',
                progress: {
                  show: true
                },
                detail: {
                  valueAnimation: true,
                  formatter: '{value}'
                },
                data: [
                  {
                    value: cpuload,
                    name: 'CPU使用'
                  }
                ]
              }
            ]
          }
          window.onresize = cpuloadDomChart.resize
          // 使用刚指定的配置项和数据显示图表。
          cpuloadDomChart.setOption(option)

          var ramloadDom = document.getElementById('ramload')
          var ramloadDomChart = this.$echarts.init(ramloadDom)
          const ramload = (100 - (this.systemData.osmxb.freePhysicalMemorySize / this.systemData.osmxb.totalPhysicalMemorySize) * 100).toFixed(0)
          const ramoption = {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: '使用率',
                type: 'gauge',
                progress: {
                  show: true
                },
                detail: {
                  valueAnimation: true,
                  formatter: '{value}'
                },
                data: [
                  {
                    value: ramload,
                    name: '内存使用'
                  }
                ]
              }
            ]
          }
          window.onresize = ramloadDomChart.resize
          // 使用刚指定的配置项和数据显示图表。
          ramloadDomChart.setOption(ramoption)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-padding {
  padding-bottom: 10px;
}

</style>
