<template>
  <div>
    <a-layout-header style="background: var(--color-bg-1)">
      <!--Horizontal layout-->
      <div class="layout-header" style="display: flex;">
        <div class="logo" >DevTimeGo</div>
        <div class="modeToggle">
          <a-switch  type="line" @change="onModeChange" v-model="isLightMode">
            <template #checked-icon>
              <icon-sun-fill />
            </template>
            <template #unchecked-icon>
              <icon-moon-fill />
            </template>
          </a-switch>
        </div>
        <div class="login" v-if="isNeedLogin === true">
          <router-link to='/login'>
            <a-button type="primary">
              <template #icon>
                <icon-code />
              </template>

              <!-- Use the default slot to avoid extra spaces -->
              <template #default>Login</template>
            </a-button>
          </router-link>
        </div>
        <div class="login" style="color: var(--color-text-1);" v-else>
            {{userName}}
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator/lib/decorators/Prop'
import { Constant } from '@/constant/constant'
export default class Header extends Vue {
  @Prop({ default: true }) isNeedLogin!: boolean;
  userName = ''
  isLightMode = document.body.getAttribute('arco-theme') === 'light'
  onModeChange (bool: boolean) {
    console.log(bool)
    if (bool) {
      document.body.setAttribute('arco-theme', 'light')
    } else {
      document.body.setAttribute('arco-theme', 'dark')
    }
  }

  mounted () {
    console.log('mounted' + this.isNeedLogin)
    if (this.isNeedLogin) {
      const userInfo = localStorage.getItem(Constant.KEY_USER_INFO)
      if (userInfo) {
        this.userName = JSON.parse(userInfo).username
      } else {
        this.userName = ''
      }
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
  text-align: left;
  vertical-align:middle;
}
</style>
