import request from 'utils/request'

export function getDepartmentTreatmentRecordList() {
    return request({
        url: 'Api/DepartmentTreatmentRecordApi/GetAssessmentTable',
        method: 'get',
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
        url: 'Api/DepartmentTreatmentRecordApi/GetListContentByStuAndInternship',
        method: 'get',
        params
    })
}

export function postSaveList(data) {
    return request({
        url: 'Api/DepartmentTreatmentRecordApi/SaveList',
        method: 'post',
        data
    })
}

export function postSaveForm(data) {
    return request({
        url: 'Api/DepartmentTreatmentRecordApi/SaveForm',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data
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


/* 获取考核表中已填报的根节点 */
export function getHasContentRoot(params) {
    return request({
        url: 'Api/DepartmentTreatmentRecordApi/GetHasContentRoot',
        method: 'get',
        params
    })
}

export function getDepartmentTreatmentRecordHasContentRoot(params) {
    return request({
        url: 'Api/DepartmentTreatmentRecordApi/GetHasContentRoot',
        method: 'get',
        params
    })
}