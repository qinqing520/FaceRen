import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
// 登录页
import Home from './components/Home.vue'
//异常报警
import Abnormal from './components/Abnormal/abnormal.vue'
// 实时数据
import Isdata from "./components/IsData/data.vue"
//数据管理数据存储
import DataManagedataSave from "./components/DataManage/dataSave.vue"
//数据管理数据报表
import DataManagedataFrom from "./components/DataManage/dataFrom.vue"
//设备配置门禁管理EqLayout
import EqLayoutDoor from "./components/EqLayout/door.vue"
//设备配置体温测量
import EqLayoutHeat from "./components/EqLayout/heat.vue"
//设备配置人员识别
import EqLayoutMan from "./components/EqLayout/man.vue"
//设备配置口罩检测
import EqLayoutMouth from "./components/EqLayout/mouth.vue"
//设备配置考勤管理
import EqLayoutwork from "./components/EqLayout/work.vue"
//设备管理设备日志
import EqManageLog from "./components/EqManage/log.vue"
//设备管理设备信息
import EqManageMessage from "./components/EqManage/message.vue"
//设备管理识别记录
import EqManageRecord from "./components/EqManage/record.vue"
//人事管理人员信息
import ManManageMessage from "./components/ManManage/message.vue"
//人事管理角色管理
import ManManageRoles from "./components/ManManage/roles.vue"
// 人事管理企业信息
import ManManageCompany from "./components/ManManage/company.vue"
// 视频预览
import isVideo from "./components/video/isVideo.vue"


Vue.use(Router)
const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: "/welcome",
            children: [{
                path: "/welcome"
            }, {
                path: "/abnormal",
                component: Abnormal
            }, {
                path: "/datamanagedatasave",
                component: DataManagedataSave
            }, {
                path: "/datamanagedatafrom",
                component: DataManagedataFrom
            }, {
                path: "/eqLayoutdoor",
                component: EqLayoutDoor
            }, {
                path: "/eqlayoutheat",
                component: EqLayoutHeat
            }, {
                path: "/eqlayoutman",
                component: EqLayoutMan
            }, {
                path: "/eqlayoutmouth",
                component: EqLayoutMouth
            }, {
                path: "/eqlayoutwork",
                component: EqLayoutwork
            }, {
                path: "/eqmanagelog",
                component: EqManageLog
            }, {
                path: "/eqmanagemessage",
                component: EqManageMessage
            }, {
                path: "/eqmanagerecord",
                component: EqManageRecord
            }, {
                path: "/manmanagemessage",
                component: ManManageMessage
            }, {
                path: "/manmanagecompany",
                component: ManManageCompany
            }, {
                path: "/manmanageroles",
                component: ManManageRoles
            }, {
                path: "/isvideo",
                component: isVideo
            }, {
                path: "/isdata",
                component: Isdata
            }]
        }
    ]
})

router.beforeEach((to, from, next) => {
    next()



})

export default router