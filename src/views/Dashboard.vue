<template>
  <div class="layout-demo" style="height: 100%;">
    <el-container style="height: 100%;">
      <Header/>
      <el-main>
        <div
            class="radius" :style="{boxShadow: `var(--el-box-shadow)`,borderRadius: `var(--el-border-radius-round)`}">
            <div class="card-title" style="color: var(--el-text-color-primary);">
              Today {{todayGrandTotal}}
            </div>
            <div class="card-content">
              <TodayTimeLine style="flex-grow: 1;" ref="todayTimeLine"/>
            </div>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import { getTodayDurationAPI, getTodayInfoAPI } from '@/request/api'
import { ElContainer, ElMain, ElFooter } from 'element-plus'
import { Options, Vue } from 'vue-class-component'
import TodayTimeLine from '@/components/charts/TodayTimeLine.vue'
import { ref } from 'vue'
import { TodayInfo } from '@/request/response/TodayInfo'
@Options({
  components: {
    Header,
    TodayTimeLine
  }
})
export default class Dashboard extends Vue {
  // eslint-disable-next-line no-undef
  declare $refs: {
    todayTimeLine: TodayTimeLine
  }

  name= 'page_Dashboard'
  todayGrandTotal= ''
  todayInfo:TodayInfo | undefined
  mounted () {
    getTodayInfoAPI().then((res) => {
      this.todayInfo = res
      this.todayGrandTotal = res.data.grand_total.text
    })
    this.getTodayDuration()
  }

  getTodayDuration () {
    getTodayDurationAPI().then((res) => {
      this.$refs.todayTimeLine.loadData(this.todayInfo?.data.projects, res)
    })
  }
}
</script>
<style scoped>
.radius {
  width: calc(100% - 50px);
  padding: 10px 24px 24px;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  position: relative;
  text-align:left;
  margin-top: 20px;
  overflow: auto;
}
.card-content{
  height: 100%;
  width: 50%;
  position: relative;
  flex-wrap: wrap;
  top: 18px;
  bottom: 10px;
  overflow: clip;
}
.card-title{
  position: relative;
  top: 10px;
  left: 10px;
  font-size: 26px;
}
</style>
