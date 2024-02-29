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
<!--        <el-card shadow="always" header="EMQX信息" :body-style="{ padding: '10px' }">-->
<!--          <div style='width: 100%;height:300px;'>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">Erlang/OTP 版本:</el-col>-->
<!--              <el-col :span="12">{{ systemData.emqxInfo.otp_release ? systemData.emqxInfo.otp_release : '' }}</el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">可用进程数:</el-col>-->
<!--              <el-col :span="12">{{-->
<!--                  systemData.emqxInfo.process_available ? systemData.emqxInfo.process_available : ''-->
<!--                }}-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">已用程数:</el-col>-->
<!--              <el-col :span="12">{{ systemData.emqxInfo.process_used ? systemData.emqxInfo.process_used : '' }}</el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">EMQX版本:</el-col>-->
<!--              <el-col :span="12">{{ systemData.emqxInfo.version ? systemData.emqxInfo.version : '' }}</el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">EMQX 运行时间:</el-col>-->
<!--              <el-col :span="12">{{-->
<!--                  systemData.emqxInfo.uptime ? formatDuring(systemData.emqxInfo.uptime) : ''-->
<!--                }}-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">系统内存:</el-col>-->
<!--              <el-col :span="12">-->
<!--                {{ systemData.emqxInfo.memory_total ? systemData.emqxInfo.memory_total : 0 }}-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">已用内存:</el-col>-->
<!--              <el-col :span="12">-->
<!--                {{ systemData.emqxInfo.memory_used ? systemData.emqxInfo.memory_used : 0 }}-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">1分钟平均负载:</el-col>-->
<!--              <el-col :span="12">-->
<!--                {{ systemData.emqxInfo.load1 ? systemData.emqxInfo.load1 : 0 }}-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">5分钟平均负载:</el-col>-->
<!--              <el-col :span="12">-->
<!--                {{ systemData.emqxInfo.load5 ? systemData.emqxInfo.load5 : 0 }}-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row :gutter="20" class="item-padding">-->
<!--              <el-col :span="12">15分钟平均负载:</el-col>-->
<!--              <el-col :span="12">-->
<!--                {{ systemData.emqxInfo.load15 ? systemData.emqxInfo.load15 : 0 }}-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </el-card>-->
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card shadow="always" header="设备在离线" :body-style="{ padding: '10px' }">
          <div id="deviceData" style='width: 100%;height:300px;'>
            <div id="emqxOnlineStatus" style='width: 100%;height:300px;'></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card shadow="always" :body-style="{ padding: '10px' }" header="EMQX内存使用率">
          <div id="emqxRamRate" style='width: 100%;height:300px;'></div>
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

          this.initEmqxOnlineStatus()
          this.initEmqxRamRate()
        })
      })
    },
    formatDuring(millisecond) {
      var days = parseInt(millisecond / (1000 * 60 * 60 * 24))
      var hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60))
      return days + ' D ' + hours + ' H ' + minutes + ' M '
    },
    initEmqxOnlineStatus() {
      var cpuloadDom = document.getElementById('emqxOnlineStatus')
      var cpuloadDomChart = this.$echarts.init(cpuloadDom)
      const offline = this.systemData.emqxStatus['live_connections.max'] - this.systemData.emqxStatus['live_connections.count']
      const online = this.systemData.emqxStatus['live_connections.count']
      const option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            name: '连接数',
            type: 'pie',
            radius: '50%',
            progress: {
              show: true
            },
            data: [
              {
                value: offline,
                name: 'offline'
              },
              {
                value: online,
                name: 'online'
              }
            ]
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
      window.onresize = cpuloadDomChart.resize
      // 使用刚指定的配置项和数据显示图表。
      cpuloadDomChart.setOption(option)
    },
    initEmqxRamRate() {
      var cpuloadDom = document.getElementById('emqxRamRate')
      var cpuloadDomChart = this.$echarts.init(cpuloadDom)
      const ramload = ((this.systemData.emqxInfo.memory_used.split('G')[0] / this.systemData.emqxInfo.memory_total.split('G')[0]) * 100).toFixed(0)
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
      window.onresize = cpuloadDomChart.resize
      // 使用刚指定的配置项和数据显示图表。
      cpuloadDomChart.setOption(ramoption)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-padding {
  padding-bottom: 10px;
}

</style>
