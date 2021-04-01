import request from 'utils/request'

export function postRegister(data) {
    return request({
        url: 'api/main/SaveUserInfo',
        method: 'post',
        data
    })
}

export function postLogin(data) {
    return request({
        url: 'api/Main/checklogin',
        method: 'post',
        data
    })
}