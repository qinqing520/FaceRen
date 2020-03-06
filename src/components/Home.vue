<template>
  <div style="height：100%">
    <el-container class="home-container"
                  direction="vertical"
                  style="height: 100%;">
      <!-- 头部区域 -->
      <el-header style="height:0.98rem;">
        <div class="home_left">
          <div class="home-logo">
            <div class="home-logo_title">人脸测温云系统</div>
            <img src="../assets/img/lefttoplogo.png"
                 style="width:2.2rem;height: 1.13rem;">
          </div>
          <div class="home-explain"
               style="margin-left: 0.18rem">
            <i><img src="../assets/img/userface.png"></i>
            Hi,<span style="font-weight:900 ">{{isName}}</span>
            <span style="font-weight:900 "
                  v-if="isAuth[0].authority_description">({{isAuth[0].authority_description}})</span>
          </div>
        </div>
        <!-- 退出按钮 -->
        <div class="home_right"
             @click="logout">
          <img src="../assets/img/logout_but1.png" />
          <!-- <img src="../assets/img/logout_but1.png"
               v-if="isMoust" /> -->
          <!-- <img src="../assets/img/logout_but0.png"
               v-else-if="!isMoust" /> -->
        </div>
        <!-- 面包屑导航 -->
        <div class="home_breadcrumb"
             v-if="isRouteName=='/welcome'">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>welcome!</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="home_breadcrumb"
             v-else-if="isRouteName=='/manmanagemessage' ">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人事管理</el-breadcrumb-item>
            <el-breadcrumb-item>人员信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="home_breadcrumb"
             v-else-if="isRouteName=='/manmanageroles'">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人事管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="home_breadcrumb"
             v-else-if="isRouteName=='/projectcomputeinstance'">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>虚拟机管理</el-breadcrumb-item>
            <el-breadcrumb-item>虚拟机</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="home_breadcrumb"
             v-else-if="isRouteName=='/projectNetworkNetwork'">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>网络管理</el-breadcrumb-item>
            <el-breadcrumb-item>网络</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-container>
        <el-aside width="2.21rem"
                  style="border-right: 0.01rem solid hsl(0, 0%, 90%);margin-top: 0.12rem;"
                  class="isAside">
          <el-menu class="el-menu-vertical-demo"
                   unique-opened
                   style="border-right: 0"
                   background-color="#062a4b"
                   text-color="#d7dcec">
            <!-- <el-menu-item v-for="subItem in menulist"
                          :key="subItem.id"
                          :index="subItem.id +''"
                          @click="triggermain(subItem.url)">
              <i>
                <img src="../assets/img/menuico02.png">
              </i>
              <span slot="title">{{subItem.name}}</span>
            </el-menu-item> -->
            <el-submenu :index="item.id +''"
                        v-for="item in menulist"
                        :key="item.id">
              <template slot="title">
                <i v-if="item.name=='视频预览'"><img src="../assets/img/menuico01.png"></i>
                <i v-else-if="item.name=='实时数据'"><img src="../assets/img/menuico02.png"></i>
                <i v-else-if="item.name=='异常报警'"><img src="../assets/img/menuico03.png"></i>
                <i v-else-if="item.name=='人事管理'"><img src="../assets/img/menuico04.png"></i>
                <i v-else-if="item.name=='设备管理'"><img src="../assets/img/menuico05.png"></i>
                <i v-else-if="item.name=='设备配置'"><img src="../assets/img/menuico06.png"></i>
                <i v-else-if="item.name=='数据管理'"><img src="../assets/img/menuico07.png"></i>
                <span style="margin-left:0.05rem;">{{item.name}}</span>
              </template>
              <el-menu-item-group v-if="!subItem.submenu"
                                  :index="subItem.id+''"
                                  v-for="subItem in item.submenu"
                                  :key="subItem.id">
                <el-menu-item :index="subItem.id +''"
                              @click="triggermain(subItem.url)">{{subItem.name}}</el-menu-item>
              </el-menu-item-group>
              <el-submenu :index="subItem.id+''"
                          v-for="subItem in item.submenu"
                          :key="subItem.id"
                          v-if="subItem.submenu">
                <template slot="title">{{subItem.name}}</template>
                <el-menu-item :index="menuItem.id+''"
                              @click="triggermain(menuItem.url)"
                              v-for="menuItem in subItem.submenu"
                              :key="menuItem.id">{{menuItem.name}}</el-menu-item>
              </el-submenu>

            </el-submenu>

          </el-menu>
        </el-aside>
        <el-container>
          <el-main style="padding-top:0; background-color: #eaedf2; ">
            <router-view></router-view>
          </el-main>
          <!-- 版权区域 -->
          <el-footer style="background-color: #fff; font-size：0.10rem; color:#909cc3;height:0.40rem;line-height:0.40rem">蓝普金睛(北京)科技有限公司</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menu from "./menu.json"
// var data = menu
export default {
  data () {
    return {
      menulist: [],
      isToken: "",
      isName: "",
      isRouteName: "",
      isAuth: ""
    }
  },
  created () {
    this.isToken = JSON.parse(sessionStorage.getItem("token"))
    this.isName = JSON.parse(sessionStorage.getItem("usermessage"))
    this.isAuth = JSON.parse(sessionStorage.getItem("auth"))

  },
  mounted () {
    this.menulist = menu;
    this.isRouteName = this.$route.path
  },
  destroyed () {
    this.isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"))
    this.userMessage = JSON.parse(sessionStorage.getItem("userMessage"))
  },
  methods: {
    logout () {
      console.log("退出按钮")
      this.$http.get('/api' + "/user/signOut", {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      })
    },
    isapi () {
      this.$router.push("/api")
    },

    triggermain (url) {
      this.$router.push(url)
      // 点击切换的时候跳转.自动刷新
      // this.$router.go(0)
    },
    enter () {
      this.isMoust = true
    },
    leave () {
      this.isMoust = false
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
img {
  vertical-align: middle;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
// 头部样式
.el-header {
  position: relative;
  background-image: url('../assets/img/topbarbg.png');
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #fff;
  font-size: 0.2rem;
  height: 0.45rem;
  // 左边区域的
  .home_left {
    .home-logo,
    .home-explain {
      float: left;
    }
    .home-explain {
      margin-top: 0.1rem;
      margin-left: 0.1rem;
      line-height: 0.45rem;
      font-size: 0.22rem;
      color: #3c4e86;
      img {
        width: 0.25rem;
        height: 0.25rem;
      }
    }
  }
  .home-logo {
    position: relative;
    .home-logo_title {
      position: absolute;
      font-size: 0.23rem;
      top: 0.75rem;
      left: 0.25rem;
    }
  }
  // 右边区域的
  .home_right {
    img {
      margin-top: 0.1rem;
      width: 0.87rem;
      height: 0.42rem;
    }
  }
  // 面包屑导航
  .home_breadcrumb {
    position: absolute;
    left: 2.25rem;
    top: 0.85rem;
  }
}
.isAside {
  font-size: 0.15rem;
  background-color: #0d3962;
}
.main_breadcrumb {
  height: 0.5rem;
  line-height: 0.5rem;
  padding-left: 0.1rem;
  background-color: #eee;
  font-size: 0.16rem;
}
.el-menu {
  border-right: 0 !important;
}
.el-aside {
  border-right: 0.01rem solid hsl(0, 0%, 90%) !important;
}
.el-menu-vertical-demo {
  img {
    width: 0.22rem;
  }
}
</style>
