<template>
  <div class="layout-demo" style="height: 100%;">
    <el-container style="height: 100%;">
      <Header/>
      <el-main>
        Dashboard
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'page_Dashboard',
  components: { Header }
}
</script>
<style scoped>

</style>
