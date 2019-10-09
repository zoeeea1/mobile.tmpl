/**
 * 提取数组对象
 * @param {*} n 
 * @param {*} offset 
 */
function limitBy(n, offset) {
    offset = offset ? parseInt(offset, 10)  : 0;
    n = parseInt(n);
    return typeof n === 'number' ? this.slice(offset, offset + n) : this;
}

/**
 * 跳过数组N个，取之后所有
 * @param {*} n 
 */
function skipBy(n) {
    n = parseInt(n);
    return typeof n === 'number' ? this.slice(n) : this;
}


Array.prototype.skip = skipBy;
Array.prototype.limit = limitBy;