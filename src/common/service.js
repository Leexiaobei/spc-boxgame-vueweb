import axios from 'axios';
axios.defaults.headers.common['token'] = localStorage.getItem('token');

var HOST = "http://202.107.245.45:3002";

var service = {

    HOST: HOST,
    //用户列表信息接口
    selectUser: HOST + '/box_game/selectUser',
	//查询一条用户基本信息
	ReadBaseById: HOST + '/box_game/ReadBaseById',
    //数据字典添加数据接口
    saveCfgDict: HOST + '/box_game/saveCfgDict',
    //数据字典树形列表接口
    getDictTree: HOST + '/box_game/getDictTree',
	//根据id展示右侧列表
	getDictListById: HOST + '/box_game/getDictListById',
	//根据id查询一条字段数据的基本信息
	selectById: HOST + '/box_game/selectById',
    //数据字典列表删除接口
    deleteById: HOST + '/box_game/deleteById',
    //菜单接口
    getMenuList: HOST + '/box_game/getMenuList',
    //菜单接口
    saveSysUser: HOST + '/box_game/saveSysUser',
    //查询用户权限接口
    getRolelist: HOST + '/box_game/getRolelist',
    

    get: function (url, params, callback) {
        params.Token = localStorage.getItem('token');
        var req = {
            url: url,
            method: "get",
            params: params
        }
        axios.request(req).then(res => {
            //判断登录
            if(res.data.resultcode == -2){
                window.location.href = '/login';
            } else {
                return callback(res.data);
            }
    });
    },
    post: function (url, params, callback) {
        // url += '?Token=' + localStorage.getItem('token');
        params.token = localStorage.getItem('token');
        axios.request({
            url: url,
            method: "post",
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params,
        }).then(res => {
            //判断登录
            if(res.data.resultcode == -2){
                window.location.href = '/login';
            } else {
                return callback(res.data);
            }
        });
    }
}

export default service;
