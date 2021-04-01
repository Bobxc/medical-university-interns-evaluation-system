/* 带教端 */
module.exports = [
    /* {
            path: '/teacher/welcome',
            component: () =>
                import ('@/components/teacher/welcome/index'),
            meta: {
                title: '欢迎首页',
                img: '',
            }
        }, */


    {
        path: '/teacher/stutrain',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/StudentPracticeTraining'),
        meta: {
            title: '学生实习培训',
            img: require("../assets/image/Group 89.png"),
            name: '学生实习培训',
            falg: 1,
            keepAlive: 'StudentPracticeTraining'
        }
    },
    //个人中心
    {
        path: '/teacher/profile',
        meta: {
            title: '个人中心',
            img: require("../assets/image/Shape (1).png"),
        },
        component: () =>
            import ('@/components/teacher/profile/Index'),
        children: [{
                path: '/teacher/information/index',
                component: () =>
                    import ('@/components/teacher/profile/personInformation/index'),
                meta: {
                    title: '基本信息',
                    img: '',
                    name: '基本信息',
                    flag: 1,
                    keepAlive: 'PersonInformation'
                },
            },
            {
                path: '/teacher/notice/index',
                component: () =>
                    import ('@/components/teacher/profile/notice/index'),
                meta: {
                    title: '消息通知',
                    img: '',
                    name: '消息通知',
                    flag: 1,
                    keepAlive: 'Notice'
                },
            },
            {
                path: '/teacher/account/index',
                component: () =>
                    import ('@/components/teacher/profile/account/index'),
                meta: {
                    title: '账号设置',
                    img: '',
                    name: '账号设置',
                    flag: 1,
                    keepAlive: 'Account'
                }
            },
        ]
    },

    {
        path: '/teacher/detaillist',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/detailList'),
        meta: {
            name: '学生基本操作',
            img: '',
            flag: 0,
            keepAlive: 'DetailList'
        }
    },
    {
        path: '/teacher/sugtoteacher',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/suggestionsToTeacher'),
        meta: {
            name: '学生对带教的建议',
            img: '',
            flag: 0,
            keepAlive: 'SuggestionsToTeacher'
        }
    },
    {
        path: '/teacher/studentdetail',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/studentDetail'),
        meta: {
            name: '学生基本信息',
            img: '',
            flag: 0,
            keepAlive: 'StudentDetail'
        }
    },
    {
        path: '/teacher/stucomtea',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/studentCommentTeacher'),
        meta: {
            name: '临床实习学生评教',
            img: '',
            flag: 0,
            keepAlive: 'EvaluationTeachingDetail'
        }
    },
    {
        path: '/teacher/assessment',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/assessment'),
        meta: {
            name: '出科评定',
            img: '',
            flag: 0,
            keepAlive: 'Assessment'
        }
    },
    {
        path: '/teacher/assessmentedit',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/assessmentEdit'),
        meta: {
            name: '临床实习出科评定',
            img: '',
            flag: 0,
            keepAlive: 'AssessmentEdit'
        }
    },
    {
        path: '/teacher/assessmentdetail',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/assessmentDetail'),
        meta: {
            name: '临床实习出科评定详情',
            img: '',
            flag: 0,
            keepAlive: 'AssessmentDetail'
        }
    },

    {
        path: '/teacher/training',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/training'),
        meta: {
            name: '学生培训活动',
            img: '',
            flag: 0,
            keepAlive: 'Train'
        }
    },
    {
        path: '/teacher/basicope',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/baseicOperation'),
        meta: {
            name: '学生基础操作实习记录',
            img: '',
            flag: 0,
            keepAlive: 'BasicOperation'
        }
    },
    {
        path: '/teacher/specope',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/specialistOperation'),
        meta: {
            name: '学生各科室专科操作实习记录',
            img: '',
            flag: 0,
            keepAlive: 'SpecialistOperation'
        }
    },
    {
        path: '/teacher/disease',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/disease'),
        meta: {
            name: '学生轮转期间学习病种及其例数记录',
            img: '',
            flag: 0,
            keepAlive: 'Disease'
        }
    },
    {
        path: '/teacher/diagnosis',
        component: () =>
            import ('@/components/teacher/studentPracticeTraining/diagnosisTreat'),
        meta: {
            name: '学生各科室诊疗操作实习记录',
            img: '',
            flag: 0,
            keepAlive: 'DiagnosisTreat'
        }
    },
]