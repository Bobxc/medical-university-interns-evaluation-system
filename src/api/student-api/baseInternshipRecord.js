import request from 'utils/request'

/* 获取学生基础操作实习记录统计 */
export function getBaseInternshipStatistics(params) {
    return request({
        url: 'Api/StatisticsApi/GetBaseInternshipStatistics',
        method: 'get',
        params
    })
}

/* 获取学生基础操作实习记录详情 */
export function getAllChildAssessmentByParent(params) {
    return request({
        url: 'Api/BaseInternshipRecordApi/GetAllChildAssessmentByParent',
        method: 'get',
        params
    })
}

/* 获取科室实习安排 */
export function getArrangement(params) {
    return request({
        url: 'api/record/GetArrangement',
        method: 'get',
        params
    })
}

/* 保存操作记录表 */
export function postSaveList(data) {
    return request({
        url: 'Api/BaseInternshipRecordApi/SaveList',
        method: 'post',
        data
    })
}

/* 提交填写项目内容 */
export function postSaveForm(data) {
    return request({
        url: 'Api/BaseInternshipRecordApi/SaveForm',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data
    })
}