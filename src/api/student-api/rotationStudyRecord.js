import request from 'utils/request'

export function getRotationStudyRecordList() {
    return request({
        url: 'Api/RotationStudyRecordApi/GetAssessmentTable',
        method: 'get'
    })
}

export function getSxList(params) {
    return request({
        url: 'api/Record/GetSxList',
        method: 'get',
        params
    })
}

export function getListContentByStuAndInternship(params) {
    return request({
        url: 'Api/RotationStudyRecordApi/GetListContentByStuAndInternship',
        method: 'get',
        params
    })
}

export function postSaveList(data) {
    return request({
        url: 'Api/RotationStudyRecordApi/SaveList',
        method: 'post',
        data
    })
}

export function postSaveForm(data) {
    return request({
        url: 'Api/RotationStudyRecordApi/SaveForm',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data
    })
}

/* 获取考核表根节点列表 */
export function getAssessmentTableRoot(params) {
    return request({
        url: 'Api/RotationStudyRecordApi/GetAssessmentTableRoot',
        method: 'get',
        params
    })
}

export function getAssessmentTable(params) {
    return request({
        url: 'Api/RotationStudyRecordApi/GetAssessmentTable',
        method: 'get',
        params
    })
}

/* 获取考核表中已填报的根节点 */
export function getHasContentRoot(params) {
    return request({
        url: 'Api/RotationStudyRecordApi/GetHasContentRoot',
        method: 'get',
        params
    })
}

export function getRotationStudyRecordHasContentRoot(params) {
    return request({
        url: 'Api/RotationStudyRecordApi/GetHasContentRoot',
        method: 'get',
        params
    })
}

/* 获取根节点下考核项 */
export function getAllChildAssessmentByParent(params) {
    return request({
        url: 'Api/RotationStudyRecordApi/GetAllChildAssessmentByParent',
        method: 'get',
        params
    })
}
/* 获取当前实习记录id */
export function getCurrentId(params) {
    return request({
        url: 'api/Record/GetCurrent',
        method: 'get',
        params
    })
}