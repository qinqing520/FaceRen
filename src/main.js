import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import "./assets/css/global.less"
// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
var areAdmin = JSON.parse(sessionStorage.getItem("isAdmin"))
router.beforeEach((to, from, next) => {
    console.log(to.path)
        // if (areAdmin == "0") {
        //     document.getElementsByClassName('el-submenu')[0].style.display = "none"
        //     document.getElementsByClassName('el-submenu')[1].style.display = "none"
        // }
    if (to.path == "/projectcomputeGeneral" && areAdmin == "0") {
        next()
    } else {
        // 在 request 拦截器中，展示进度条 NProgress.start()
        axios.interceptors.request.use(config => {
                NProgress.start()
                return config
            })
            // 在 response 拦截器中，隐藏进度条 NProgress.done()
        axios.interceptors.response.use(config => {
            NProgress.done()
            return config
        })
        next()
    }
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
window.onresize = function() {
    console.log(123)
}
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')