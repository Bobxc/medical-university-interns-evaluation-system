import request from "utils/request"

export function getInformationList(params) {
    return request({
        url: 'Api/NoticeApi/GetPageList',
        method: 'get',
        params
    })
}

export function postSaveInformation(data) {
    return request({
        url: 'Api/NoticeApi/SaveForm',
        method: 'post',
        data
    })
}

export function postDeleteInformation(params) {
    return request({
        url: 'Api/NoticeApi/DeleteForm',
        method: 'post',
        params
    })
}