//获得年月日时分秒
//传入日期//例：2020-10-27T14:36:23
export function timeFormatSeconds(type, time) {
    var d = time ? new Date(time) : new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var min = d.getMinutes();
    var seconds = d.getSeconds();

    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`
    if (hours < 0) hours = `0${hours}`
    if (min < 10) min = `0${min}`
    if (seconds < 10) seconds = `0${seconds}`

    return type == 1 ? `${year}-${month}-${day} ${hours}:${min}` : `${year}-${month}-${day}`;
}