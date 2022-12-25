<template>
  <div class="layout-demo" style="height: 100%;">
    <el-container style="height: 100%;">
      <Header/>
      <el-main>
        <div style="display: flex; flex-wrap: wrap" >
          <div style="width: 600px; background: white;flex-grow: 1;">Responsive</div>
          <div style="width: 600px; background: #42b983; flex-grow: 1;">ss</div>
        </div>
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
@Options({
  components: {
    HelloWorld,
    Header
  }
})
export default class HomeView extends Vue {
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
