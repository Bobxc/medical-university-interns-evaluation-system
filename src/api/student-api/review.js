import request from 'utils/request'

export function getDpinfo(params) {
    return request({
        url: '/api/Record/GetDpInfo',
        method: 'get',
        params
    })
}