import request from 'utils/request'

/* 专业数、班级数、实习生、带教老师 */
export function getBaseNumb(params) {
    return request({
        url: 'api/record/GetBaseNumb',
        method: 'get',
        params
    })
}

/* 历年各专业人数 */
export function getYearNumb(params) {
    return request({
        url: 'api/record/GetYearNumb',
        method: 'get',
        params
    })
}

/* 年级前50的人员信息 */
export function getCjpmList(params) {
    return request({
        url: 'api/record/GetCjpmList',
        method: 'get',
        params
    })
}

/* 各专业不同届别成绩对比 */
export function getClassYear(params) {
    return request({
        url: 'api/record/GetClassYear',
        method: 'get',
        params
    })
}

/* 本年度各专业平均成绩对比 */
export function getMajorAve(params) {
    return request({
        url: 'api/record/GetMajorAve',
        method: 'get',
        params
    })
}