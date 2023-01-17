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
              <TodayTimeLine/>
<!--              <div style="width: 600px; background: white;flex-grow: 1;">Responsive</div>-->
<!--              <div style="width: 600px; background: #42b983; flex-grow: 1;">ss</div>-->
            </div>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import { getTodayInfoAPI } from '@/request/api'
import { ElContainer, ElMain, ElFooter } from 'element-plus'
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'
import TodayTimeLine from '@/components/charts/TodayTimeLine.vue'
@Options({
  components: {
    Header,
    TodayTimeLine
  }
})
export default class Dashboard extends Vue {
  name= 'page_Dashboard'
  todayGrandTotal= ''
  mounted () {
    getTodayInfoAPI().then((res) => {
      this.todayGrandTotal = res.data.grand_total.text
    })
  }
}
</script>
<style scoped>
.radius {
  width: 80%;
  height: auto;
  padding: 10%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  position: relative;
  text-align:left;
  margin-top: 20px;
}
.card-content{
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 68px;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.card-title{
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  font-size: 26px;
}
</style>
