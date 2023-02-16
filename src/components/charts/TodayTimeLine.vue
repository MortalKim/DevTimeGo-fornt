<template>
    <div id="container" style="height: 350px;" ref="container"></div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts'
import * as echartsCore from 'echarts/core'
import { DataZoomComponent, GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { Duration } from '@/request/response/Duration'
import dayjs from 'dayjs'

export default class TodayTimeLine extends Vue {
  declare $refs: {
    container: HTMLDivElement
  }

  chatData: Duration[] = []
  startTime = +new Date()
  categories: string[]= []
  myChart: echarts.ECharts | undefined
  endTime: number | undefined
  mounted () {
    // this.renderChart()
  }

  renderChart () {
    echartsCore.use(CanvasRenderer)
    echartsCore.use([TooltipComponent, TitleComponent, DataZoomComponent, GridComponent])
    // const dom = document.getElementById('container')
    if (this.myChart === undefined) {
      this.myChart = echarts.init(this.$refs.container, '', {
        renderer: 'canvas',
        useDirtyRect: false
      })
    }
    const canvasWidth = this.$refs.container.offsetWidth
    this.myChart.resize({ width: canvasWidth })
    const startTime = this.startTime
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
    const data: { name: string; value: number[]; itemStyle: { normal: { color: string } } }[] = []

    this.chatData.forEach((cdata, index) => {
      console.log('cdata', cdata)
      const date = dayjs(cdata.time)
      const timestamp = date.unix()
      var number = Number(timestamp)
      const categoryIndex = this.categories.indexOf(cdata.project)
      data.push({
        name: types[0].name,
        value: [categoryIndex, number, (number + cdata.duration), cdata.duration],
        itemStyle: {
          normal: {
            color: types[0].color
          }
        }
      })
    })
    // this.categories.forEach(function (category, index) {
    //   var baseTime = startTime
    //   for (var i = 0; i < 10; i++) {
    //     var typeItem = types[Math.round(Math.random() * (types.length - 1))]
    //     var duration = Math.round(Math.random() * 10000)
    //     data.push({
    //       name: typeItem.name,
    //       value: [index, baseTime, (baseTime += duration), duration],
    //       itemStyle: {
    //         normal: {
    //           color: typeItem.color
    //         }
    //       }
    //     })
    //     baseTime += Math.round(Math.random() * 2000)
    //   }
    // })
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
        max: this.endTime,
        scale: true,
        axisLabel: {
          formatter: function (val: any) {
            const date = dayjs.unix(val)
            const formattedDate = date.format('HH:mm')
            return formattedDate
          }
        }
      },
      yAxis: {
        data: this.categories
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
      console.log('start: ', option, ' and ')
      this.myChart.clear()
      this.myChart.setOption(option, true)
    }
    // window.addEventListener('resize', myChart.resize);
  }

  loadData (projects: any, data:Duration[]) {
    this.categories.splice(0, this.categories.length)
    projects.forEach((project: any) => {
      this.categories.push(project.name)
    })
    const set = new Set<string>(this.categories)
    this.categories = Array.from(set)
    const start = dayjs().startOf('day')
    const end = dayjs().endOf('day')
    const startTimestamp = start.unix()
    const endTimestamp = end.unix()
    this.startTime = startTimestamp
    this.endTime = endTimestamp
    this.chatData = data
    this.renderChart()
  }
}

</script>

<style scoped>

</style>
