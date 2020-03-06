<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_bar">
        <img src="../assets/img/login_bar.png">
        <div class="login_form">
          <div class="login_form_title">人脸测温云系统</div>
          <div class="login_form_header"> <span class="iconfont .icon-ren"></span>请登录</div>
          <div class="login_form_username">
            <el-input v-model="loginForm.username"
                      :prefix-icon="loginForm.username ? 'iconfont icon-wo':'iconfont icon-ren'"
                      placeholder="请输入用户名"
                      @keyup.enter.native="login"
                      size="small"></el-input>
          </div>
          <div class="login_form_password">
            <el-input v-model="loginForm.password"
                      :prefix-icon="loginForm.password ? 'iconfont icon-suo1' :'iconfont icon-suo'"
                      @keyup.enter.native="login"
                      placeholder="请输入密码"
                      type="password"
                      size="small"></el-input>
          </div>
          <div class="login_form_button">
            <el-button style=" width: 100%;background-color: #004BFE;  font-size: 0.16rem; font-weight: 800; border: 0; color: #FFF; height:0.35rem; "
                       @click="login"><span style="line-height:0.15rem;">登 录</span></el-button>
          </div>
        </div>
        <p style="text-align: center; font-size:0.13rem; color:#909CC3">蓝普金睛(北京)科技有限公司</p>
      </div>

    </div>

  </div>
</template>

<script>
export default {

  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '秦清',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
        ]
      },
      screenHeight: document.body.clientTop
    }
  },
  mounted () {
  },
  methods: {
    login () {
      this.$http.post('/api' + '/user/login',
        {
          "username": this.loginForm.username,
          "password": this.loginForm.password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        },
      ).then(res => {
        var token = JSON.stringify(res.data.data.token)
        var auth = JSON.stringify(res.data.data.auths)
        var usermessage = JSON.stringify(this.loginForm.username)
        sessionStorage.setItem("auth", auth)
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("usermessage", usermessage)
        this.$router.push('/home')
      }).catch(err => {
        console.log(err)
      })
    },
  },
  watch: {
    screenHeight (val) {
      console.log(val)
      this.screenHeight = val
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  overflow: hidden;
  height: 100%;
  background-image: url('../assets/img/background.jpg');
}
.login_bar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8.2rem;
  img {
    width: 100%;
  }
}
.login_box {
  width: 100%;
  height: 100%;
  border-radius: 0.03rem;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  left: 50%;
  top: 56.5%;
  transform: translate(-50%, -50%);
  width: 2.8rem;
  .login_form_title {
    color: #fff;
    text-align: center;
    font-size: 30px;
  }
  .login_form_header {
    font-size: 0.22rem;
    color: #909cc3;
    text-align: center;
    padding: 0.4rem 0;
  }
  .login_form_username,
  .login_form_password {
    margin: 0 auto;
    padding-bottom: 0.2rem;
  }
  .login_form_button {
    font-size: 0.2rem;
    font-weight: 800;
  }
}
</style>
