import request from 'utils/request'

/* 获取学生实习培训列表 */
export function getTrainingList(params) {
    return request({
        url: 'api/Record/GetDjPageList',
        method: 'get',
        params
    })
}

/* 获取学生详细信息 */
export function getStudentInfo(params) {
    return request({
        url: 'api/Main/GetUserInfo',
        method: 'get',
        params
    })
}

/* 获取地区 */
export function getArea(params) {
    return request({
        url: 'api/Main/GetArea',
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

/* 获取学生对带教的建议 */
export function getJyInfo(params) {
    return request({
        url: 'api/Record/GetJyInfo',
        method: 'get',
        params
    })
}

/* 获取当前实习记录 */
export function getSxList(params) {
    return request({
        url: 'api/Record/GetSxList',
        method: 'get',
        params
    })
}

/*  获取出科考核记录 */
export function getCheckInfo(params) {
    return request({
        url: 'api/Record/GetCkkhInfo',
        method: 'get',
        params
    })
}

export function getCkPageList(params) {
    return request({
        url: 'api/Record/GetCkPageList',
        method: 'get',
        params
    })
}

/* 保存带教老师评分记录 */
export function postAddCheckData(data) {
    return request({
        url: 'api/Record/AddKhData',
        method: 'post',
        data
    })
}

/* 获取出库考核结果 */
export function getCheckData(params) {
    return request({
        url: 'api/Record/GetKhData',
        method: 'get',
        params
    })
}

/* 获取教师评分页面中的实习生基本信息 */
export function getPjStudentData(params) {
    return request({
        url: 'api/Record/GetPjBaseData',
        method: 'get',
        params
    })
}