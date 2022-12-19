<template>
  <div class="layout-demo" style="height: 100%;">
    <a-layout style="height: 100%;">
      <Header/>
      <a-layout-content>
        <div class="login-card">
          <a-card class="login-card" :style="{ width: '360px' }" title="Login"  v-if="this.isLogin">
            <a-col :span="24" style="margin-bottom: 15px" v-if="showTip">
              <a-alert type="error">{{tip}}</a-alert>
            </a-col>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="Email">
                <a-input v-model="email" />
              </a-form-item>
              <a-form-item label="Password">
                <a-input-password v-model="password" />
              </a-form-item>
              <a-form-item style="position: relative">
                <a-button type="primary" @click="login">
                  Login
                </a-button>

                <a-button class="secondary-button" type="primary" @click="changeRegister">
                  I'm new
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
          <a-card class="register-card" :style="{ width: '360px' }" title="register" v-else>
            <a-col :span="24" style="margin-bottom: 15px" v-if="showTip">
              <a-alert type="error">{{tip}}</a-alert>
            </a-col>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="Username">
                <a-input v-model="userName" />
              </a-form-item>
              <a-form-item label="Email">
                <a-input v-model="email" />
              </a-form-item>
              <a-form-item label="Password">
                <a-input-password v-model="password" />
              </a-form-item>
              <a-form-item wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" @click="register">
                  Register
                </a-button>
                <a-button class="secondary-button" type="primary" @click="changeLogin">
                  Login
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Header from '@/components/Header.vue'
import '../assets/font/font.css'
import { loginAPI, registerAPI } from '@/request/api'
import { RegisterParams } from '@/request/params/RegisterParams'
@Options({
  components: {
    HelloWorld,
    Header
  }
})
export default class HomeView extends Vue {
  isLogin = true
  userName = ''
  email = ''
  password = ''
  showTip = false
  tip = ''
  register () {
    console.log('register')
    this.showTip = false
    const registerParams = new RegisterParams(this.userName, this.email, this.password)
    registerAPI(registerParams).then((res) => {
      if (res.code === 200) {
        this.$message.success('register success')
        this.$router.push('/dashboard')
      } else {
        this.showTip = true
        this.tip = 'register failed'
        this.$message.error('register failed')
      }
      console.log(res)
    }).catch(error => {
      this.showTip = true
      this.tip = error.response.data.message
      console.log('register failed', error.response.data.message)
    })
  }

  login () {
    console.log('login')
    this.showTip = false
    const registerParams = new RegisterParams('', this.email, this.password)
    loginAPI(registerParams).then((res) => {
      if (res.code === 200) {
        this.$message.success('login success')
        localStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      } else {
        this.showTip = true
        this.tip = 'login failed'
        this.$message.error('login failed')
      }
      console.log(res.data)
    }).catch(error => {
      this.showTip = true
      this.tip = error
      console.log('login failed', error)
    })
  }

  changeLogin () {
    console.log('changeLogin')
    this.isLogin = true
  }

  changeRegister () {
    console.log('changeRegister')
    this.isLogin = false
  }
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

.login-card {
  display: inline-block;
  text-align: center;
  vertical-align:middle;
}

.register-card {
  display: inline-block;
  text-align: center;
  vertical-align:middle;
}

.secondary-button {
  display: inline-block;
  float: right;
  position:absolute;
  right:10px;
  text-align: center;
  vertical-align:middle;
}

</style>
