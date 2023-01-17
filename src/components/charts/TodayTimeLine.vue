<template>
    <div id="container" style="height: 350px; width: 50%"></div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'
import { TooltipComponent, TitleComponent, DataZoomComponent, GridComponent } from 'echarts/components'

export default class TodayTimeLine extends Vue {
  mounted () {
    const dom = document.getElementById('container')
    echarts.use(CanvasRenderer)
    echarts.use([TooltipComponent, TitleComponent, DataZoomComponent, GridComponent])

    const myChart = echarts.init(dom!, '', {
      renderer: 'canvas',
      useDirtyRect: false
    })
    const canvasWidth = dom!.offsetWidth
    myChart.resize({ width: canvasWidth })
    const data: never[] = []
    const dataCount = 10
    const startTime = +new Date()
    const categories = ['categoryA', 'categoryB', 'categoryC', 'categoryD']
    const types = [
      {
        name: 'JS Heap',
        color: '#7b9ce1'
      },
      {
        name: 'Documents',
        color: '#bd6d6c'
      },
      {
        name: 'Nodes',
        color: '#75d874'
      },
      {
        name: 'Listeners',
        color: '#e0bc78'
      },
      {
        name: 'GPU Memory',
        color: '#dc77dc'
      },
      {
        name: 'GPU',
        color: '#72b362'
      }
    ]
    function renderItem (params: any, api: any) {
      const categoryIndex = api.value(0)
      const start = api.coord([api.value(1), categoryIndex])
      const end = api.coord([api.value(2), categoryIndex])
      const height = api.size([0, 1])[1] * 0.6
      const rectShape = echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        }
      )
      return (
        rectShape && {
          type: 'rect',
          transition: ['shape'],
          shape: rectShape,
          style: api.style()
        }
      )
    }

    const option = {
      tooltip: {
        formatter: function (params: any) {
          return params.marker + params.name + ': ' + params.value[3] + ' ms'
        }
      },
      title: {
        text: 'Your Projects Timeline Today',
        left: 'center'
      },
      dataZoom: [
        {
          type: 'slider',
          filterMode: 'weakFilter',
          showDataShadow: true,
          top: 300,
          labelFormatter: ''
        },
        {
          type: 'inside',
          filterMode: 'weakFilter'
        }
      ],
      // grid: {
      //   height: 100
      // },
      xAxis: {
        min: startTime,
        scale: true,
        axisLabel: {
          formatter: function (val: any) {
            return Math.max(0, val - startTime) + ' ms'
          }
        }
      },
      yAxis: {
        data: categories
      },
      series: [
        {
          type: 'custom',
          renderItem: renderItem,
          itemStyle: {
            opacity: 0.8
          },
          encode: {
            x: [1, 2],
            y: 0
          },
          data: data
        }
      ]
    }

    if (option && typeof option === 'object') {
      myChart.setOption(option)
    }
    // window.addEventListener('resize', myChart.resize);
  }
}

</script>

<style scoped>

</style>
