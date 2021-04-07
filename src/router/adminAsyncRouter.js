/* 管理端 */
module.exports = [{
        path: '/admin/welcome',
        component: () =>
            import ('@/components/admin/welcome/index'),
        meta: {
            title: '欢迎首页',
            img: require("../assets/image/Group 171.png"),
            name: '欢迎首页',
            flag: 1,
            keepAlive: 'AdminWelcome'
        }
    },
    /* 培训实习概况 */
    {
        path: '/admin/trainingpractice',
        meta: {
            title: '培训实习概况',
            img: require("../assets/image/Group 89.png"),
        },
        component: () =>
            import ('@/components/admin/trainingPractice/Index'),
        children: [{
                path: '/admin/stutrain',
                component: () =>
                    import ('@/components/admin/trainingPractice/studentTraining'),
                meta: {
                    title: '学生实习培训概况',
                    img: '',
                    name: '学生实习培训概况',
                    flag: 1,
                }
            },
            {
                path: '/admin/teacherinfo',
                component: () =>
                    import ('@/components/admin/trainingPractice/teacherInfo'),
                meta: {
                    title: '带教概况',
                    img: '',
                    name: '带教概况',
                    flag: 1,
                }
            },
            {
                path: '/admin/checkinfo',
                component: () =>
                    import ('@/components/admin/trainingPractice/checkInfo'),
                meta: {
                    title: '考核内容设置',
                    img: '',
                    name: '考核内容设置',
                    flag: 1,
                }
            },
        ]
    },

    /* 信息发布 */
    {
        path: '/admin/infolist',
        component: () =>
            import ('@/components/admin/informationRelease/index'),
        meta: {
            title: '信息发布',
            img: require("../assets/image/flag-旗子.png"),
            name: '信息发布',
            flag: 1,
            keepAlive: 'InformationReleaseList'
        }
    },
    /* 个人中心 */

    {
        path: '/admin/profile',
        meta: {
            title: '个人中心',
            img: require("../assets/image/Shape (1).png"),
        },
        component: () =>
            import ('@/components/admin/profile/Index'),
        children: [{
                path: '/admin/baseinfo',
                component: () =>
                    import ('@/components/admin/profile/baseInfo'),
                meta: {
                    title: '账号设置',
                    name: '账号设置',
                    flag: 1,
                }
            },
            {
                path: '/admin/department',
                component: () =>
                    import ('@/components/admin/profile/department'),
                meta: {
                    title: '科室管理',
                    name: '科室管理',
                    flag: 1,
                }
            },
            // {
            //     path: '/admin/authority',
            //     component: () =>
            //         import ('@/components/admin/profile/authority'),
            //     meta: {
            //         title: '权限设置'
            //     }
            // },
            {
                path: '/admin/organziation',
                component: () =>
                    import ('@/components/admin/profile/organziation'),
                meta: {
                    title: '机构管理',
                    name: '机构管理',
                    flag: 1,
                    keepAlive: 'AdminProfile'
                }
            },
            {
                path: '/admin/role',
                component: () =>
                    import ('@/components/admin/profile/role'),
                meta: {
                    title: '用户管理',
                    name: '用户管理',
                    flag: 1,
                    keepAlive: 'AdminProfile'
                }
            },
        ]
    },

    {
        path: '/admin/detaillist',
        component: () =>
            import ('@/components/admin/trainingPractice/detailList'),
        meta: {
            name: '学生操作列表',
            flag: 0,
        }
    },
    {
        path: '/admin/studentdetail',
        component: () =>
            import ('@/components/admin/trainingPractice/studentDetail'),
        meta: {
            name: '学生信息',
            flag: 0,
        }

    },
    {
        path: '/admin/sugtoteacher',
        component: () =>
            import ('@/components/admin/trainingPractice/suggestionsToTeacher'),
        meta: {
            name: '学生对带教的建议',
            flag: 0,
        }
    },
    {
        path: '/admin/assessment',
        component: () =>
            import ('@/components/admin/trainingPractice/assessment'),
        meta: {
            name: '出科评定列表',
            flag: 0,
        }
    },
    {
        path: '/admin/assessmentdetail',
        component: () =>
            import ('@/components/admin/trainingPractice/assessmentDetail'),
        meta: {
            name: '临床实习出科评定',
            flag: 0,
        }
    },
    {
        path: '/admin/teacherinfo',
        component: () =>
            import ('@/components/admin/trainingPractice/teacherInfo'),
        meta: {
            name: '带教列表',
            flag: 0,
        }
    },
    {
        path: '/admin/teacherdetail',
        component: () =>
            import ('@/components/admin/trainingPractice/teacherDetail'),
        meta: {
            name: '带教详情',
            flag: 0,
        }
    },
    {
        path: '/admin/checkinfo',
        component: () =>
            import ('@/components/admin/trainingPractice/checkInfo'),
        meta: {
            name: '考核内容列表',
            flag: 0,
        }
    },
    {
        path: '/admin/addcheckinfo',
        component: () =>
            import ('@/components/admin/trainingPractice/addCheckInfo')
    },
    {
        path: '/admin/practicerecord',
        component: () =>
            import ('@/components/admin/trainingPractice/practiceRecord'),
        meta: {
            name: '考核内容设置',
            flag: 0,
        }
    },
    {
        path: '/admin/diseaseset',
        component: () =>
            import ('@/components/admin/trainingPractice/diseaseSet'),
        meta: {
            name: '考核内容设置',
            flag: 0,
        }
    },
    {
        path: '/admin/infolist',
        component: () =>
            import ('@/components/admin/informationRelease/index'),
        meta: {
            name: '信息发布列表',
            flag: 0,
        }
    },


    {
        path: '/admin/infodetail',
        component: () =>
            import ('@/components/admin/informationRelease/detail'),
        meta: {
            name: '信息详情',
            flag: 0,
        }
    },

    {
        path: '/admin/training',
        component: () =>
            import ('@/components/admin/trainingPractice/training'),
        meta: {
            name: '学生培训活动列表',
            flag: 0,
        }
    },

    {
        path: '/admin/basicope',
        component: () =>
            import ('@/components/admin/trainingPractice/baseicOperation'),
        meta: {
            name: '学生基础操作实习记录列表',
            flag: 0,
        }
    },
    {
        path: '/admin/specope',
        component: () =>
            import ('@/components/admin/trainingPractice/specialistOperation'),
        meta: {
            name: '学生各科室专科操作实习记录列表',
            flag: 0,
        }
    },
    {
        path: '/admin/disease',
        component: () =>
            import ('@/components/admin/trainingPractice/disease'),
        meta: {
            name: '学生轮转期间学习病种及其例数记录列表',
            flag: 0,
        }
    },
    {
        path: '/admin/diagnosis',
        component: () =>
            import ('@/components/admin/trainingPractice/diagnosisTreat'),
        meta: {
            name: '学生各科室诊疗操作实习记录列表',
            flag: 0,
        }
    },
    {
        path: '/admin/sucomtea',
        component: () =>
            import ('@/components/admin/trainingPractice/studentCommentTeacher'),
        meta: {
            name: '学生评教列表',
            flag: 0,
        }
    },
    {
        path: '/admin/sucomteadetail',
        component: () =>
            import ('@/components/admin/trainingPractice/studentCommentTeacherDetail'),
        meta: {
            name: '临床实习学生评教',
            flag: 0,
        }
    },
    {
        path: '/admin/editstu',
        component: () =>
            import ('@/components/admin/profile/editStudent'),
        meta: {
            name: '学生基本信息',
            flag: 0
        }
    },
    {
        path: '/admin/edittea',
        component: () =>
            import ('@/components/admin/profile/editTeacher'),
        meta: {
            name: '带教基本信息',
            flag: 0
        }
    },

]