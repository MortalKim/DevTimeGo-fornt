<template>
  <div class="layout-demo" style="height: 100%;">
    <el-container style="height: 100%;">
      <Header/>
      <el-main>
        <div >
          <el-card class="login-card" :style="{ width: '360px' }" title="Login"  v-if="this.isLogin" hoverable>
            <el-col :span="24" style="margin-bottom: 15px" v-if="showTip">
              <el-alert type="error" show-icon>{{tip}}</el-alert>
            </el-col>
            <el-form :label-position="labelPosition"
                     label-width="70px"
                     :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <el-form-item label="Email">
                <el-input v-model="email" />
              </el-form-item>
              <el-form-item label="Password">
                <el-input v-model="password" type="password"
                          placeholder="Please input password"
                          show-password/>
              </el-form-item>
              <el-form-item style="position: relative">
                <el-button type="primary" @click="login">
                  Login
                </el-button>

                <el-button class="secondary-button" type="primary" @click="changeRegister">
                  I'm new
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="register-card" :style="{ width: '360px' }" title="register" v-else>
            <el-col :span="24" style="margin-bottom: 15px" v-if="showTip">
              <el-alert type="error" show-icon>{{tip}}</el-alert>
            </el-col>
            <el-form :label-position="labelPosition"
                     label-width="70px" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <el-form-item label="Username">
                <el-input v-model="userName" />
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="email" />
              </el-form-item>
              <el-form-item label="Password">
                <el-input v-model="password" type="password"
                          placeholder="Please input password"
                          show-password/>
              </el-form-item>
              <el-form-item wrapper-col="{ span: 12, offset: 5 }">
                <el-button type="primary" @click="register">
                  Register
                </el-button>
                <el-button class="secondary-button" type="primary" @click="changeLogin">
                  Login
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
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
import { loginAPI, registerAPI } from '@/request/api'
import { RegisterParams } from '@/request/params/RegisterParams'
import { Constant } from '@/constant/constant'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
@Options({
  components: {
    HelloWorld,
    Header
  }
})
export default class HomeView extends Vue {
  labelPosition = ref('left')
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
        ElMessage({
          message: 'Register success',
          type: 'success'
        })
        this.$router.push('/dashboard')
      } else {
        this.showTip = true
        this.tip = 'register failed'
        ElMessage.error('Register failed')
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
        ElMessage({
          message: 'Login success',
          type: 'success'
        })
        localStorage.setItem(Constant.KEY_TOKEN, res.data.token)
        this.$router.push('/dashboard')
      } else {
        this.showTip = true
        this.tip = 'login failed'
        ElMessage.error('Login failed')
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
.layout-demo :deep(.el-header),
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

.layout-demo :deep(.el-header),
.layout-demo :deep(.el-footer) {
  height: 64px;
  background-color: var(--color-bg-1);
}

.layout-demo :deep(.el-main) {
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
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
