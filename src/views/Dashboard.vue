<template>
  <a-layout style="height: 100%; width: 100%; background: var(--color-bg-1)">
    <Header is-need-login="false"/>
  </a-layout>
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
