import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logintype: '',
        /* 学生导航栏 */
        menuListStudent: [{
                id: 124,
                authName: "欢迎首页",
                path: "welcome",
                img: require("../assets/image/Group 171.png"),
                children: [],
            },
            {
                id: 125,
                authName: "培训实习记录",
                path: "2",
                img: require("../assets/image/Group 89.png"),
                children: [{
                        id: 110,
                        authName: "培训活动",
                        path: "train",
                        children: [],
                    },
                    {
                        id: 111,
                        authName: "基础操作实习记录",
                        path: "basicope",
                        children: [],
                    },
                    {
                        id: 112,
                        authName: "各科室专科操作实习记录",
                        path: "specope",
                        children: [],
                    },
                    {
                        id: 113,
                        authName: "轮转期间学习病种及其例数记录",
                        path: "disease",
                        children: [],
                    },
                    {
                        id: 114,
                        authName: "各科室诊疗操作实习记录",
                        path: "diagtreat",
                        children: [],
                    },
                    {
                        id: 115,
                        authName: "临床实习学生评教",
                        path: "evateach",
                        children: [],
                    },
                    {
                        id: 116,
                        authName: "带教点评",
                        path: "reviews",
                        children: [],
                    },
                ],
            },
            {
                id: 126,
                authName: "个人中心",
                path: "3",
                img: require("../assets/image/Shape (1).png"),
                children: [{
                        id: 117,
                        authName: "个人信息",
                        path: "profile",
                        children: [],
                    },
                    {
                        id: 118,
                        authName: "账号设置",
                        path: "account",
                        children: [],
                    },
                ],
            },
        ],
        /* 教师导航栏 */
        menuListTeacher: [{
                id: 124,
                authName: "欢迎首页",
                path: "teacher/welcome",
                img: require("../assets/image/Group 171.png"),
                children: [],
            },
            {
                id: 125,
                authName: "学生实习培训",
                path: "teacher/stutrain",
                img: require("../assets/image/Group 89.png"),
            },
            {
                id: 126,
                authName: "个人中心",
                path: "3",
                img: require("../assets/image/Shape (1).png"),
                children: [{
                        id: 113,
                        authName: "个人信息",
                        path: "teacher/information",
                        children: [],
                    },
                    {
                        id: 114,
                        authName: "消息通知",
                        path: "teacher/notice",
                        children: [],
                    },
                ],
            },
        ],
        /* 管理员导航栏 */
    },
    mutations: {},
    actions: {},
    modules: {}
})