import request from 'utils/request'

export function getAttendance(params) {
    return request({
        url: 'api/record/GetAttendance',
        method: 'get',
        params
    })
}

export function getArrangment(params) {
    return request({
        url: 'api/record/GetArrangement',
        method: 'get',
        params
    })
}

/* 获取学生填报记录统计 */
export function getStudentStatistics(params) {
    return request({
        url: 'Api/StatisticsApi/GetStudentStatistics',
        method: 'get',
        params
    })
}