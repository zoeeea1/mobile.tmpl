/** 
 * 字符串的第一个字母大写 
 */
const capitalize = function(value) {
    if (!value && value !== 0) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
};

/** 
 * 将字符串全部转为大写字母 
 */
const uppercase = function(value) {
    return value || value === 0 ? value.toString().toUpperCase() : '';
};

/** 
 * 将字符串全部转为小写字母 
 */
const lowercase = function(value) {
    return value || value === 0 ? value.toString().toLowerCase() : '';
};

/**
 * 保留小数点后N位
 * @param {*} value 
 * @param {*} n 
 */
const fixed = function(value, n = 2) {
    var f = parseFloat(value);

    if (!f) return 0.0.toFixed(n);

    return f.toFixed(n);
};


/**
 * 格式化日期
 * @param {*} value 
 * @param {*} fmt 
 */
const dateTime = function(value, format = 'yyyy-MM-dd hh:mm:ss') {
    if (!value) return '';
    // var date = (typeof value === 'number') ? new Date(value) : new Date((value || '').replace(/-/g, '/'))
    var date = typeof value === 'number' ? new Date(value) : new Date(value.replace(/\./g, '/').replace(/-/g, '/'));
    var o = {
        "M+": date.getMonth() + 1, //月份           
        "d+": date.getDate(), //日           
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时           
        "H+": date.getHours(), //小时           
        "m+": date.getMinutes(), //分           
        "s+": date.getSeconds(), //秒           
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度           
        "S": date.getMilliseconds() //毫秒           
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}

const starsText = function(value) {
    let str = '';
    switch (value) {
        case 1:
            str = '很差';
            break;
        case 2:
            str = '差';
            break;
        case 3:
            str = '一般';
            break;
        case 4:
            str = '赞';
            break;
        case 5:
            str = '超赞';
            break
    }
    return str;
}

const array2string = function(arry) {
    return array.length === 1 ? array[0] : array.join(' ')
}
const priceT = function(value) {
    if (value.match('￥')) {
        value = value.split('￥')[1].split('.')[0];
    } else {
        value = value.split('.')[0];
    }

    return value;
}
const contentP = function(value) {
    return value.substring(0, 2);
}

export default {
    capitalize,
    uppercase,
    lowercase,
    fixed,
    dateTime,
    starsText,
    array2string,
    priceT,
    contentP,
};