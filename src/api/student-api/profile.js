import request from 'utils/request'

/* 获取地区 */
export function getArea(params) {
    return request({
        url: 'api/Main/GetArea',
        method: 'get',
        params
    })
}

/* 获取学校列表 */
export function getUniversity(params) {
    return request({
        url: 'api/Main/GetCompany',
        method: 'get',
        params
    })
}

/* 获取政治面貌 */
export function getZzmm(params) {
    return request({
        url: 'api/Main/GetItemDetail',
        method: 'get',
        params
    })
}

export function getUserInfo(params) {
    return request({
        url: 'api/Main/GetUserInfo',
        method: 'get',
        params
    })
}

/* 提交信息 */
export function postStudentInfo(data) {
    return request({
        url: 'api/Main/SaveStuInfo',
        method: 'post',
        data
    })
}

/* 提交修改的密码 */
export function submitResetPassword(data) {
    return request({
        url: 'api/User/SubmitResetPassword',
        method: 'post',
        data
    })
}