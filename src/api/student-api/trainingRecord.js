import request from 'utils/request'

export function getTrainingPageList(params) {
    return request({
        url: 'Api/TrainingRecordApi/GetPageList',
        method: 'get',
        params
    })
}

export function postTrainingSave(data) {
    return request({
        url: 'Api/TrainingRecordApi/Save',
        method: 'post',
        data
    })

}