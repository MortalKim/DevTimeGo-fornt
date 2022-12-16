<template>
  <div class="layout-demo" style="height: 100%;">
    <a-layout style="height: 100%;">
      <a-layout-header>
        <!--Horizontal layout-->
        <div class="layout-header" style="display: flex;">
          <div class="logo" >DevTime2Go</div>
          <div class="login" >
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
        </div>
      </a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import '../assets/font/font.css'
@Options({
  components: {
    HelloWorld
  }
})
export default class HomeView extends Vue {
}
document.body.setAttribute('arco-theme', 'dark')
</script>

<style scoped>
.layout-demo :deep(.arco-layout-header),
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

.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  height: 64px;
  background-color: var(--color-bg-1);
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--gray-1));
}

.layout-header {
  display: inline-block;
  max-width: 900px;
  width: 100%;
  position: relative;
  margin: auto;
  text-align: center;
  background: #42b983;
  vertical-align:middle;
  align-items:center;
}

.logo {
  display: inline-block;
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  color: #fff;
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

</style>
