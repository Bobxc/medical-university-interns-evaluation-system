/* 学生端 */
module.exports = [{
        path: '/student/welcome',
        meta: {
            title: '欢迎首页',
            img: require("../assets/image/Group 171.png"),
            name: '欢迎首页',
            flag: 1
        },
        component: () =>
            import ('@/components/student/welcome/index'),
    },
    {
        path: '/student/train',
        meta: {
            title: '培训实习记录',
            img: require("../assets/image/Group 89.png"),
        },
        component: () =>
            import ('@/components/student/train/Index'),
        children: [{
                path: '/student/train/index',
                component: () =>
                    import ('@/components/student/train/Train'),
                meta: {
                    title: '培训活动',
                    name: '培训活动',
                    flag: 1
                },
            },
            {
                path: '/student/basicope/index',
                component: () =>
                    import ('@/components/student/train/BasicOperation'),
                meta: {
                    title: '基础操作实习记录',
                    name: '基础操作实习记录',
                    flag: 1
                },
            },
            {
                path: '/student/specope/index',
                component: () =>
                    import ('@/components/student/train/SpecialistOperation'),
                meta: {
                    title: '各科室专科操作实习记录',
                    name: '各科室专科操作实习记录',
                    flag: 1
                }
            },
            {
                path: '/student/disease/index',
                component: () =>
                    import ('@/components/student/train/Disease'),
                meta: {
                    title: '轮转期间学习病种及其例数记录',
                    name: '轮转期间学习病种及其例数记录',
                    flag: 1
                }
            },
            {
                path: '/student/diagtreat/index',
                component: () =>
                    import ('@/components/student/train/DiagnosisTreat'),
                meta: {
                    title: '各科室诊疗操作实习记录',
                    name: '各科室诊疗操作实习记录',
                    flag: 1
                }
            },
            {
                path: '/student/evateach/index',
                component: () =>
                    import ('@/components/student/train/EvaluationTeaching'),
                meta: {
                    title: '临床实习学生评教',
                    name: '临床实习学生评教',
                    flag: 1
                }
            },
            {
                path: '/student/reviews/index',
                component: () =>
                    import ('@/components/student/train/Reviews'),
                meta: {
                    title: '带教点评',
                    name: '带教点评',
                    flag: 1
                }
            },
        ]
    },

    {
        path: '/student/profile',
        meta: {
            title: '个人中心',
            img: require("../assets/image/Shape (1).png"),
        },
        component: () =>
            import ('@/components/student/profile/Index'),
        children: [{
                path: '/student/profile/index',
                component: () =>
                    import ('@/components/student/profile/detail'),
                meta: {
                    title: '个人信息',
                    name: '个人信息',
                    flag: 1
                },
            },
            {
                path: '/student/notice/index',
                component: () =>
                    import ('@/components/student/profile/Notice'),
                meta: {
                    title: '消息通知',
                    name: '消息通知',
                    flag: 1
                },
            },
            {
                path: '/student/account/index',
                component: () =>
                    import ('@/components/student/profile/Account'),
                meta: {
                    title: '账号设置',
                    name: '账号设置',
                    flag: 1
                },
            },

        ]
    },

    {
        path: '/specope/success',
        component: () =>
            import ('@/components/student/specialistOperation/success')
    },
    {
        path: '/specope/default',
        component: () =>
            import ('@/components/student/specialistOperation/default')
    },
    {
        path: '/student/specope/edit',
        component: () =>
            import ('@/components/student/specialistOperation/edit'),
        meta: {
            name: '各科室专科操作实习记录(编辑)',
            flag: 0
        }
    },
    {
        path: '/disease/edit',
        component: () =>
            import ('@/components/student/disease/edit'),
        meta: {
            name: '轮转期间学习病种及其例数记录(编辑)',
            flag: 0
        }
    },
    {
        path: '/disease/success',
        component: () =>
            import ('@/components/student/disease/success'),
        meta: {
            name: '各科室诊疗操作实习记录(编辑)',
            flag: 0
        }
    },
    {
        path: '/disease/default',
        component: () =>
            import ('@/components/student/disease/default')
    },
    {
        path: '/student/diagtreat/edit',
        component: () =>
            import ('@/components/student/diagnosisTreat/edit'),
        meta: {
            name: '各科室诊疗操作实习记录(编辑)',
            flag: 0
        }
    },
    {
        path: '/student/diagtreat/success',
        component: () =>
            import ('@/components/student/diagnosisTreat/success')
    },
    {
        path: '/student/diagtreat/default',
        component: () =>
            import ('@/components/student/diagnosisTreat/default')
    },


    {
        path: '/evateach/edit',
        component: () =>
            import ('@/components/student/evaluationTeaching/edit'),
        meta: {
            name: '临床实习学生评教(编辑)',
            flag: 0
        }
    },
    {
        path: '/evateach/detail',
        component: () =>
            import ('@/components/student/evaluationTeaching/detail'),
        meta: {
            name: '临床实习学生评教(详情)',
            flag: 0
        }
    },

    {
        path: '/student/review/detail',
        component: () =>
            import ('@/components/student/reviews/assessmentDetail'),
        meta: {
            name: '临床实习出科评定',
            flag: 0
        }
    },

    {
        path: '/student/profile/edit',
        component: () =>
            import ('@/components/student/profile/Profile'),
        meta: {
            name: '个人信息(编辑)',
            flag: 0
        }
    },
    {
        path: '/student/profile/detail',
        component: () =>
            import ('@/components/student/profile/detail')
    },

]