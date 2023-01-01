<template>
  <div>
    <el-header style="background: var(--color-bg-1)">
      <el-menu
        :default-active="0"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">DevTimeGo</el-menu-item>
        <div>
          <el-switch class="modeToggle" @change="onModeChange" v-model="isLightMode"></el-switch>
        </div>
        <div class="flex-grow" />
        <el-menu-item index="1">Dashboard</el-menu-item>
        <el-menu-item index="2" v-if="isNeedLogin">Login</el-menu-item>
        <el-sub-menu index="3" v-else>
          <template #title>{{userName}}</template>
          <el-menu-item index="3-1">Settings</el-menu-item>
          <el-menu-item index="3-2">Logout</el-menu-item>
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
  isNeedLogin!: boolean;
  userName = ''
  isLightMode = useDark()
  onModeChange (bool: boolean) {
    console.log(bool)
    const toggleDark = useToggle(!bool)
  }

  mounted () {
    console.log('mounted' + this.isNeedLogin)
    const userInfo = localStorage.getItem(Constant.KEY_USER_INFO)
    if (userInfo) {
      this.isNeedLogin = false
      this.userName = JSON.parse(userInfo).username
    } else {
      this.isNeedLogin = true
      this.userName = 'Null'
    }
  }

  handleSelect = (key: string, keyPath: string[]) => {
    switch (key) {
      case '0':
        this.$emit('menu-click', 'home')
        break
      case '1':
        this.$emit('menu-click', 'dashboard')
        break
      case '2':
        console.log(this)
        router.push({ path: '/login' })
        // this.$emit('menu-click', 'login')
        break
      case '3-1':
        this.$emit('menu-click', 'settings')
        break
      case '3-2':
        localStorage.clear()
        router.push({ path: '/' })
        this.$emit('menu-click', 'logout')
        break
      default:
        this.$emit('menu-click', 'home')
        break
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
