var parseNum2Num = function(num) {
    if(num < 10){
        return '0'+ num;
    }else{
         return num;
    }
}

var formatTimes = function(endTime,type) {
    //结束时间
    var endTime = new Date(endTime);
    //当前时间
    var nowTime = new Date();
    //时间差
    var leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000);
    //d = parseInt(leftTime/(24*60*60));
    var h = this.parseNum2Num(parseInt(leftTime/(60*60)));
    var m = this.parseNum2Num(parseInt(leftTime/60%60));
    var s = this.parseNum2Num(parseInt(leftTime%60));
    var dateText="";
   if(leftTime == 0) return 0; 
   else if(type == 1) return dateText =  h +'小时 ' + m +'分'+ s +'秒';
   else if(type == 2) return dateText =  h +':' + m +':'+ s;
   return dateText;
}

/**随机生成getIndexsLen个0~arrMaxIndex的下标全部存放到数组，最后返回该数组**/
var getRandomArrayIndexs = function(arrMaxIndex,getIndexsLen)
{
    var arrIndexs = [];
    var index = 0;
    for(var i = 0; i < getIndexsLen; i++)
    {
        if(i > arrMaxIndex) break;// 如果数组长度超过最大下标，则错误，跳过for循环
        index = this.getRandomNum(0, arrMaxIndex);
        if(arrIndexs.indexOf(index)==-1) {
            arrIndexs.push(index);
        } else {
             i--;
        }
    }
    return arrIndexs;
}

/**从目标数组arr,随机生成randomLen个不重复的结果存放到新数组，最后返回该新数组**/
var getRandomValueForArray = function(arr, randomLen)
{
    var resultArray = [];
    var arrIndexs = this.getRandomArrayIndexs(arr.length-1, randomLen);
    var index = 0;
    var len = arrIndexs.length;
    for(var i = 0; i < len; i++)
    {
        index = arrIndexs[i];
        resultArray[i] = arr[index];
    }
    return resultArray;
}

/**获得指定数字范围内的一个随机数**/
var getRandomNum = function(minNum, maxNum)
{
    return minNum + Math.floor((maxNum-minNum)*cc.random0To1());
}

/**
 * 方法描述：组合算法：
 * 排列组合算法 从n个不同元素中取出m个元素的组合数
 * 从四个球中选择任意两个组合共有4*3/2*1=6种
 * 从六个球中选择任意三个组合共有6*5*4/3*2*1=20种
 * @param rankTotalLen (N)
 * @param rankLen (M)
 * @return
 */
var numberOfPermutation = function(rankTotalLen, rankLen)
{
    var upIndex = 1;
    var downIndex = 1;
    for (var i = rankTotalLen; i > rankTotalLen - rankLen; i--) {
        upIndex *= i;
    }
    for (i = rankLen; i > 0; i--) {
        downIndex *= i;
    }
    return parseInt(upIndex/downIndex);
}

module.exports = {
    formatTimes: formatTimes,
    parseNum2Num: parseNum2Num,
    getRandomNum: getRandomNum,
    getRandomArrayIndexs:getRandomArrayIndexs,
    getRandomValueForArray:getRandomValueForArray,
    numberOfPermutation:numberOfPermutation
};
