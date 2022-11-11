<template>
  <div class='page-container'>
    <el-row :gutter='30'>
      <el-col :span='4'>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 15px">
          <div class=' basic-info-box'>
            <div class='basic-info-box-header' style="background-color: #19be6b">
              <div style='display: flex;flex-direction: column;align-items: center;'>
                <i class='el-icon-user-solid'></i>
                <span class='name-class'>成员总数</span>
              </div>
            </div>
            <div class='basic-info-box-body'>{{ dashboardInfoObject.userCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span='4'>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 15px">
          <div class='item-box basic-info-box'>
            <div class='basic-info-box-header' style='background-color: #66b1ff'>
              <div style='display: flex;flex-direction: column;align-items: center'>
                <i class='el-icon-s-operation'></i>
                <span class='name-class'>楼层总数</span>
              </div>
            </div>
            <div class='basic-info-box-body'>{{ dashboardInfoObject.floorCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span='4'>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 15px">
          <div class='item-box basic-info-box'>
            <div class='basic-info-box-header' style='background-color: #409EFF'>
              <div style='display: flex;flex-direction: column;align-items: center'>
                <i class='el-icon-menu'></i>
                <span class='name-class'>房间总数</span>
              </div>
            </div>
            <div class='basic-info-box-body'>{{ dashboardInfoObject.roomCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span='4'>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 15px">
          <div class=' basic-info-box'>
            <div class='basic-info-box-header' style='background-color: #909399'>
              <div style='display: flex;flex-direction: column;align-items: center'>
                <i class='el-icon-cpu'></i>
                <span class='name-class'>设备总数</span>
              </div>
            </div>
            <div class='basic-info-box-body'>{{ dashboardInfoObject.deviceCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span='4'>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 15px">
          <div class=' basic-info-box'>
            <div class='basic-info-box-header' style='background-color: #67C23A'>
              <div style='display: flex;flex-direction: column;align-items: center'>
                <i class='el-icon-cpu'></i>
                <span class='name-class'>在线设备数</span>
              </div>
            </div>
            <div class='basic-info-box-body'>{{ dashboardInfoObject.onlineDeviceCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span='4'>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 15px">
          <div class=' basic-info-box'>
            <div class='basic-info-box-header' style='background-color: #c8c9cc'>
              <div style='display: flex;flex-direction: column;align-items: center'>
                <i class='el-icon-cpu'></i>
                <span class='name-class'>离线设备数</span>
              </div>
            </div>
            <div class='basic-info-box-body'>{{ dashboardInfoObject.offlineDeviceCount }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter='30'>
      <el-col :span='24'>
        <div style="background-color: #FFFFFF;height: 600px">
          <div style="position: absolute;top: 50px;left: 50px;">
            <el-tabs v-model="selectedFloor" type="card" tab-position="left">
              <el-tab-pane
                v-for="item in floorList"
                :key="item.id"
                :label="item.name"
                :name="item.id"
              >
                {{ item.content }}
              </el-tab-pane>
            </el-tabs>
          </div>
          <div ref="threeContainer" id="ThreeJS" style="height: 600px"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter='30'>
      <el-col :span='12'>
        <div class='graphic-box'>
          <div id='main' style='width: 100%;height:350px;'></div>
        </div>
      </el-col>
      <el-col :span='12'>
        <div id='main2' class='item-box' style='width: 100%;height:400px;'></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as echarts from 'echarts'
import { dashboardInfoApi } from '@/api/Dashboard'
import 'element-ui/lib/theme-chalk/display.css'
import { floorListApi } from '@/api/Floor'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Index',
  data() {
    return {
      dashboardInfoObject: {},
      floorList: [],
      selectedFloor: '',
      scene: null,
      camera: null,
      renderer: null,
      textloader: null,
      matArrayB: [],
      matArrayA: []
    }
  },
  created() {
    this.doGetFloorList()
    this.loadData()
    // this.initEngine()
  },
  watch: {
    selectedFloor(ov, nv) {
      console.log(nv)
    }
  },
  methods: {
    loadData() {
      dashboardInfoApi().then(res => {
        this.dashboardInfoObject = res.data
      })
    },
    doGetFloorList() {
      floorListApi().then(res => {
        this.floorList = res.data
        this.selectedFloor = this.floorList[0].id
      })
    },
    initThree() {
      const container = this.$refs.threeContainer
      const offsetHeight = container.offsetHeight
      const offsetWidth = container.offsetWidth

      this.scene = new THREE.Scene()
      this.scene.fog = new THREE.Fog(0x005577, 1, 2800)
      this.textloader = new THREE.TextureLoader()

      // 相机
      this.camera = new THREE.PerspectiveCamera(45, offsetWidth / offsetHeight, 0.01, 10000)
      this.camera.position.set(860, 470, 720)
      this.camera.lookAt(this.scene.position)
      this.scene.add(this.camera)

      const axisHelper = new THREE.AxesHelper(100, 100)
      this.scene.add(axisHelper)

      // 环境光
      const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
      this.scene.add(light)

      // // 平行光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(200, 600, 200)
      this.scene.add(directionalLight)

      this.createFloor()
      // const geometry = new THREE.BoxBufferGeometry(300, 300, 300)
      // const material = new THREE.MeshPhongMaterial({
      //   color: 0xff0000
      // })
      // const mesh = new THREE.Mesh(geometry, material)
      // this.scene.add(mesh)

      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      })
      this.renderer.setClearColor('#4682B4', 1)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setSize(offsetWidth, offsetHeight)
      document.getElementById('ThreeJS').appendChild(this.renderer.domElement)

      // OrbitControls
      const aa = new OrbitControls(this.camera, this.renderer.domElement)
      console.log('aa', aa)
      this.renderer.render(this.scene, this.camera)
    },
    /**
     * threejs 渲染
     */
    threeJsRender() {
      this.renderer.render(this.scene, this.camera)
    },
    createFloor() {
      const loader = new THREE.TextureLoader()
      console.log('=========-------')
      loader.load('../assets/three/floor.jpg', function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10)
        const floorGeometry = new THREE.BoxGeometry(this.width, this.height, 1)
        const floorMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide
        })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        // floor.position.y = -0.5
        // floor.rotation.x = Math.PI / 2
        this.scene.add(floor)

        console.log('=========', floor)
      })

      // 茶色：0x58ACFA   透明玻璃色：0XECF1F3
      // const glass_material = new THREE.MeshBasicMaterial({
      //   color: 0XECF1F3
      // })
      // glass_material.opacity = 0.4
      // glass_material.transparent = true

      // var left_wall = returnWallObject(20, 200, 1100, 0, matArrayB, -801,
      //   100, 0)
      // var left_cube = returnWallObject(20, 110, 1100, 0, matArrayB, -801,
      //   100, 0)
      // createResultBsp(left_wall, left_cube, 1)
      // createCubeWall(1, 110, 1100, 0, glass_material, -801, 100, 0)
      //
      // var right_wall = returnWallObject(20, 200, 1100, 1, matArrayB, 801,
      //   100, 0)
      // var right_cube = returnWallObject(20, 110, 1100, 0, matArrayB, 801,
      //   100, 0)
      // createResultBsp(right_wall, right_cube, 1)
      // createCubeWall(1, 110, 1100, 0, glass_material, 801, 100, 0)
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

    this.initThree()
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
    height: 90px;
    background: #FFFFFF;
    display: flex;
    overflow: hidden;

    .basic-info-box-header {
      width: 40%;
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
      font-size: 40px;
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
