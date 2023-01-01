<template>
  <div class="layout-demo" style="height: 100%;">
    <el-container style="height: 100%;">
      <Header @menu-click="handleMenuClick"/>
      <el-main>
        <component :is="component"></component>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Header from '@/components/Header.vue'
import '../assets/font/font.css'
import HomeViewContent from '@/components/HomeViewContent.vue'
@Options({
  components: {
    HelloWorld,
    Header
  }
})
export default class HomeView extends Vue {
  component = HomeViewContent
  handleMenuClick (event: string) {
    switch (event) {
      case 'home':
        this.component = HomeViewContent
        break
      case 'dashboard':
        break
      case 'login':
        break
      default:
        this.component = HomeViewContent
        break
    }
  }
}
</script>

<style scoped>
.layout-demo :deep(.el-footer),
.layout-demo :deep(.el-main) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text-1);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.el-footer) {
  height: 64px;
  background-color: var(--color-bg-1);
}

.layout-demo :deep(.el-main) {
  background-color: rgb(var(--gray-1));
}
</style>
