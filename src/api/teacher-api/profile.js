import request from 'utils/request'

export function getUserInformation(params) {
    return request({
        url: 'api/Main/GetUserInfo',
        method: 'get',
        params
    })
}

export function postUserEdit(data) {
    return request({
        url: 'api/Main/SaveTcInfo',
        method: 'post',
        data
    })
}

export function getItemDetail(params) {
    return request({
        url: 'api/Main/GetItemDetail',
        method: 'get',
        params
    })
}

export function getHospital(params) {
    return request({
        url: 'api/Main/GetCompany',
        method: 'get',
        params
    })
}

/* 获取通知 */
export function getNotice(params) {
    return request({
        url: 'Api/NoticeApi/GetPageList',
        method: 'get',
        params
    })
}