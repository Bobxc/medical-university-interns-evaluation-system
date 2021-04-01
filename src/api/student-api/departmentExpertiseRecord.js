import request from 'utils/request'

export function getDepartmentExpertiseRecordList() {
    return request({
        url: 'Api/DepartmentExpertiseRecordApi/GetAssessmentTable',
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
        url: 'Api/DepartmentExpertiseRecordApi/GetListContentByStuAndInternship',
        method: 'get',
        params
    })
}

export function postSaveList(data) {
    return request({
        url: 'Api/DepartmentExpertiseRecordApi/SaveList',
        method: 'post',
        data
    })
}

export function postSaveForm(data) {
    return request({
        url: 'Api/DepartmentExpertiseRecordApi/SaveForm',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data
    })
}

/* 获取实习生当前的实习记录id */
export function getCurrentRecordeId(params) {
    return request({
        url: 'api/Record/GetCurrent',
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

/* 获取考核表中已填报的根节点 */
export function getHasContentRoot(params) {
    return request({
        url: 'Api/DepartmentExpertiseRecordApi/GetHasContentRoot',
        method: 'get',
        params
    })
}

export function getDepartmentExpertiseRecordHasContentRoot(params) {
    return request({
        url: 'Api/DepartmentExpertiseRecordApi/GetHasContentRoot',
        method: 'get',
        params
    })
}