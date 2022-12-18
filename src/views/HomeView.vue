<template>
  <div class="layout-demo" style="height: 100%;">
    <a-layout style="height: 100%;">
      <Header/>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
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
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text-1);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.arco-layout-footer) {
  height: 64px;
  background-color: var(--color-bg-1);
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--gray-1));
}
</style>
