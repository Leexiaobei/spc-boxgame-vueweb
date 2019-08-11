var add0 = function(m){
    return m<10?'0'+m:m
}
export default {
    dataTime: function(str) {
        if(str){
            return str.split(' ')[0];
        } else {
            return '';
        }
    },
    
    format(value){
        //value是整数，否则要parseInt转换
        var time = new Date(value);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    },
    
    checkNum(rule, value, callback){
        var age = parseInt(value, 10);
        if (!Number.isInteger(age)) {
            callback(new Error('请输入数字值'));
        } else {
            callback();
        }
    },

    checkId(rule, value, callback){
        if(value.length < 18) {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    },

    checkPhone(rule, value, callback){
        if(value.length < 11) {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    },
};
