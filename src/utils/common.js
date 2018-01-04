/**
 * 分页序号处理
 * params:data 要处理的对象
 * params:currentPage 当前页
 * params:pagesize    每页显示多少条
 * 公式（n-1）*pagesize+currentIndex
 */
function FormIndex(data, currentPage, pagesize) {
    console.log('序列累加');
    data.forEach(function (val, key) {
        val.index = (currentPage - 1) * pagesize + val.index;
    })
}

/**
 * 简要数据转换为标准JSON数组
 * @param  {obj} param          获取树结构需要的临时参数
 * @param  {obj} simpleOrgNode  原始数据
 * @return {obj}                返回生成树结构所需要的对象
 */
function transformToObjFormat(param, simpleOrgNodes) {
    var i,l;
    var key = param.orgNodeKey;
    var parentKey = param.orgNodeParentKey;
    if (!key || key=="" || !simpleOrgNodes) return [];

    if ($.isArray(simpleOrgNodes)) {
        var r = [];
        var tmpMap = [];
        for (i=0, l=simpleOrgNodes.length; i<l; i++) {
            tmpMap[simpleOrgNodes[i][key]] = simpleOrgNodes[i]; //引用赋值
        }
        for (i=0, l=simpleOrgNodes.length; i<l; i++) {
            if (tmpMap[simpleOrgNodes[i][parentKey]]) {
                if (!tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol]){
                    tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol] = [];
                }
                tmpMap[simpleOrgNodes[i][parentKey]][param.nodesCol].push(simpleOrgNodes[i]);
            } else {
                r.push(simpleOrgNodes[i]);
            }
        }
        return r;
    }else {
        return [simpleOrgNodes];
    }
}

/**
 *
 * @param localhost     分属模块
 * @returns {basePath}  分属模块对应的路径
 */
function dateFormat(date,type){
    date = new Date(date);
    let getYear = date.getFullYear();
    let getMonth = date.getMonth()+1;
    let getdate = date.getDate();
    let getHou = date.getHours();
    let getMin = date.getMinutes();
    date = `${getYear}.${getMonth}.${getdate}  ${getHou}:${getMin}`;
    if(type){
        return `${getYear}-${getMonth}-${getdate}`;
    }else{
        return date;
    }
}
export {
    FormIndex,
    transformToObjFormat,
    dateFormat
}
