import request from 'utils/request';

export function getOrganziation(params) {
    return request({
        url: 'api/company/GetCompany',
        method: 'get',
        params
    })
}

export function getRole(params) {
    return request({
        url: 'api/user/getuserlist',
        method: 'get',
        params
    })
}

export function postAddOrganziation(data) {
    return request({
        url: 'api/company/SaveEntity',
        method: 'post',
        data
    })
}

export function postDeleteOrganziation(data) {
    return request({
        url: 'api/company/DelEntity',
        method: 'post',
        data
    })
}

export function postDeleteRole(data) {
    return request({
        url: 'api/user/DelUser',
        method: 'post',
        data
    })
}

/* 获取科室列表 */
export function getDepartment(params) {
    return request({
        url: 'api/Record/KsMap',
        method: 'get',
        params
    })
}

/* 科室新增、编辑、删除 */
export function postKsSave(data) {
    return request({
        url: 'api/Record/KsSave',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data
    })
}