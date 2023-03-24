<template>
  <div class="pie-chart-container">
    <div ref="pieChartCanvas" class="pie-chart"></div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import * as echarts from 'echarts'
import * as echartsCore from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { DataZoomComponent, GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { Inject } from 'vue-property-decorator'

interface PieChartData {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  seconds: number;
  text: string;
  // eslint-disable-next-line camelcase
  total_seconds: number;
}

export default class PieEditorChart extends Vue {
  declare $refs: {
    pieChartCanvas: HTMLDivElement
  }

  private data: PieChartData[] = []
  pieChart: echarts.ECharts | undefined
  private refreshData (): void {
    echartsCore.use(CanvasRenderer)
    echartsCore.use([TooltipComponent, TitleComponent, DataZoomComponent, GridComponent])
    if (this.pieChart === undefined) {
      this.pieChart = echarts.init(this.$refs.pieChartCanvas, '', {
        renderer: 'canvas',
        useDirtyRect: false
      })
    }
    // const pieChart = echarts.init(this.$refs.pieChart as HTMLDivElement)

    const pieChartData = this.data.map(item => ({
      name: item.name,
      value: item.total_seconds
    }))

    const option = {
      tooltip: {
        formatter: function (params: any) {
          const totalSeconds = params.data.value
          const hours = Math.floor(totalSeconds / 3600)
          const minutes = Math.floor((totalSeconds - hours * 3600) / 60)
          const seconds = totalSeconds % 60
          return `${params.name}: ${hours} hrs ${minutes} mins ${seconds} secs`
        }
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: pieChartData,
          label: {
            opacity: 0.6,
            show: true,
            formatter: '{b}: {d}%'
          },
          itemStyle: {
            opacity: 0.8
          },
          labelLine: {
            lineStyle: {
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        }
      ]
    }

    this.pieChart.setOption(option)
  }

  loadData (editors: any[]) {
    this.data = editors
    this.refreshData()
  }
}
</script>

<style scoped>
.pie-chart-container {
  width: 400px;
  height: 400px;
}
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>
