import map from 'array-map'
import find from 'array-find'

export default function (name, list, delimiter) {
    if (name && !list.length) {
        return ''
    }
    if (!delimiter) {
        delimiter = ' '
    }

    let rs = map(name, (one, index) => {
        if (list.length && Object.prototype.toString.call(list[0]) === '[object Array]') {
            return find(list[index], item => {
                return item.Name === one
            })
        } else {
            return find(list, item => {
                return item.Name === one
            })
        }
    })
    rs = rs.filter(one => {
        return typeof one !== 'undefined'
    })
    return map(rs, one => {
        return one.Name
    }).join(delimiter).replace('--', '')
}
