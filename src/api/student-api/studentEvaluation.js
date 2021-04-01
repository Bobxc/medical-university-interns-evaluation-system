import request from 'utils/request'

/* 获取实习评价或待评价记录 */
export function getSxList(params) {
    return request({
        url: 'api/Record/GetSxList',
        method: 'get',
        params
    })
}
/* 获取实习评价或待评价记录 (分页)*/
export function getStuDpjList(params) {
    return request({
        url: 'api/Record/GetStuDpjList',
        method: 'get',
        params
    })
}

/* 新增评教记录 */
export function addSxRecord(data) {
    return request({
        url: 'api/Record/AddSxRecord',
        method: 'post',
        data
    })
}

/* 获取学校、医院列表信息 */
export function getCompany(params) {
    return request({
        url: 'api/Main/GetCompany',
        method: 'get',
        params
    })
}

/* 获取字典数据 */
export function getItemDetail(params) {
    return request({
        url: 'api/Main/GetItemDetail',
        method: 'get',
        params
    })
}

/* 获取老师列表 */
export function getUserList(params) {
    return request({
        url: 'api/Main/GetUserList',
        method: 'get',
        params
    })
}

/* 获取已评教数据 */
export function getPjData(params) {
    return request({
        url: 'api/Record/GetPjData',
        method: 'get',
        params
    })
}

/* 学生评教(新增与修改) */
export function postAddPjData(data) {
    return request({
        url: 'api/Record/AddPjData',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data
    })
}