<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
import config from "./config/config.json"
export default {
  name: 'app',
  data () {
    return {
      configlist: null
    }
  },
  created () {
    this.configlist = JSON.stringify(config)
    sessionStorage.setItem("configlist", this.configlist)
  }

}
</script>

<style lang="less" scoped>
#app {
  font-size: 16px;
}
</style>

