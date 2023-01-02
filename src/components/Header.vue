<template>
  <div>
    <el-header style="background: var(--color-bg-1)">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
      >
        <el-menu-item index="/">DevTimeGo</el-menu-item>
        <div>
          <el-switch class="modeToggle" @change="onModeChange" v-model="isLightMode"></el-switch>
        </div>
        <div class="flex-grow" />
        <el-menu-item index="/dashboard">Dashboard</el-menu-item>
        <el-menu-item index="/login" v-if="isNeedLogin">Login</el-menu-item>
        <el-sub-menu index="3" v-else>
          <template #title>{{userName}}</template>
          <el-menu-item index="settings">Settings</el-menu-item>
          <el-menu-item index="logout" click="logout">Logout</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Constant } from '@/constant/constant'
import { useDark, useToggle } from '@vueuse/core'
import router from '../router'
export default class Header extends Vue {
  self = this
  isNeedLogin = false
  userName = ''
  isLightMode = useDark()
  onModeChange (bool: boolean) {
    console.log(bool)
    const toggleDark = useToggle(!bool)
  }

  logout () {
    localStorage.clear()
    router.push({ path: '/' })
  }

  mounted () {
    console.log('mounted' + router.currentRoute.value.fullPath)
    const userInfo = localStorage.getItem(Constant.KEY_USER_INFO)
    if (userInfo) {
      this.isNeedLogin = false
      this.userName = JSON.parse(userInfo).username
    } else {
      this.isNeedLogin = true
      this.userName = 'Null'
    }
  }
}
document.body.setAttribute('arco-theme', 'dark')
</script>

<style scoped>
.layout-demo :deep(.arco-layout-header) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text-1);
  background: transparent;
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  background-color: var(--color-bg-1);
}

.layout-header {
  display: inline-block;
  width: 100%;
  position: relative;
  margin: auto;
  background: var(--color-bg-1);
  text-align: center;
  vertical-align:middle;
  align-items:center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

.logo {
  display: inline-block;
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  color: var(--color-text-1);
  font-size: 24px;
  font-weight: 500;
  font-stretch: condensed;
  text-align: center;
  font-family:"JetBrains Mono";
}

.login {
  display: inline-block;
  float: right;
  position:absolute;
  right:10px;
  text-align: center;
  vertical-align:middle;
}

.modeToggle {
  height: 58px;
  padding: 0 24px;
  color: var(--color-text-1);
}

.flex-grow {
  flex-grow: 1;
}
</style>
