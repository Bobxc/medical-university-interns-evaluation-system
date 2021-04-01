import request from 'utils/request'

/* 学生实习培训概况列表 */
export function getStudentTraining(params) {
    return request({
        url: 'api/Record/GetTsuList',
        method: 'get',
        params
    })
}

/* 学生信息 */
export function getStudentInfo(params) {
    return request({
        url: 'api/Main/GetUserInfo',
        method: 'get',
        params
    })
}

/* 获取实习生已出科考核信息 */
export function getAlready(params) {
    return request({
        url: 'api/Record/GetAlready',
        method: 'get',
        params
    })
}

/* 获取带教列表 */
export function getTeacherList(params) {
    return request({
        url: 'api/Record/GetTeachList',
        method: 'get',
        params
    })
}

/* 获取管理端查看带教老师的学生实习记录 */
export function getStudentList(params) {
    return request({
        url: 'api/Record/GetTsuList',
        method: 'get',
        params
    })
}

/* 获取字典数据 */
export function getItemList(params) {
    return request({
        url: 'api/Main/GetItemDetail',
        params
    })
}

/* 获取考核配置列表 */
export function getCheckInfoList(params) {
    return request({
        url: 'Api/AssessmentApi/GetAssessmentSettingsList',
        method: 'get',
        params
    })
}

/* 获取考核配置列表内容 */
export function getCheckInfoContent(params) {
    return request({
        url: 'Api/AssessmentApi/GetAssessmentContent',
        method: 'get',
        params
    })
}

/* 新增考核配置 */
export function postSaveAssessmentContent(data) {
    return request({
        url: 'Api/AssessmentApi/SaveAssessmentContent',
        method: 'post',
        data
    })
}

/* 删除考核项 */
export function postDeleteAssessmentContent(data) {
    return request({
        url: 'Api/AssessmentApi/DeleteAssessmentContent',
        method: 'post',
        data
    })
}

/* 新增考核表 */
export function postAddAssessmentSettings(data) {
    return request({
        url: 'Api/AssessmentApi/SaveAssessmentSettings',
        method: 'post',
        data
    })
}

/* 获取旧考核表 */
export function getOldAssessmentContent(params) {
    return request({
        url: 'Api/AssessmentApi/GetOldAssessmentContent',
        method: 'get',
        params
    })
}