<template>
	<div>
		<div class="bg">
			<div class="bg-top">
				<h3>项目管理系统后台</h3>
			</div>
			<div class="login" v-loading="loading">
				<div class="head">
					<h3>管理员登录</h3>
				</div>
                <div class="cont">
                    <div class="input">
                        <label>
                            <strong>用户名</strong>
                            <el-input v-model="username" placeholder="请输入内容"></el-input>
                        </label>
                        <label>
                            <strong>密码</strong>
                            <el-input type="password" v-model="password" placeholder="请输入内容"></el-input>
                        </label>
                        <label>
                            <el-button type="primary" style="width: 80%" @click="_fnLogin">登录</el-button>
                        </label>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'

export default {
	data(){
		return{
            value: '1',
			username:'',
            password:'',
            user:'',
            checked:'',
            pass:'',
            loading: false
		}
	},
    watch: {
        collapsed(val) {
            console.log(val);
        },
    },
    methods: {
		_fnLogin() {
			var username = this.username;
            var password = this.password;
            if(username == 0){
                this.$message.warning('用户名不能为空');
                return false;
            }
            if(password == 0){
                this.$message.warning('密码不能为空');
                return false;
            }
            this.loading = true;
			axios.post('http://localhost:3002/box_game/login', {
				userName:username,
				password:password
			})
			.then((res)=>{
                console.log(res);
                if(res.data.resultcode == 0){
                    localStorage.setItem('token',res.data.resultdata.Token);
					localStorage.setItem('reModel',JSON.stringify(res.data.resultdata.reModel))
					window.location.href = '/';
                }else{
                    this.$message.warning('账号密码错误');
                    this.loading = false;
                }
			})
		}
    }
}
</script>


<style lang="scss">
*{
	margin:0;
	padding:0;
}
.bg{
	width:100%;
	height:100%;
	background: url("../../assets/background.jpeg");
	/*background:#15569a;*/
	position:absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	.bg-top{
		height: 80px;
		font-size: 20px;
		color: #FFFFFF;
		margin-left: 30px;
		margin-top: 30px;
	}
	.login{
		width:520px;
		height:320px;
		background:#fff;
		position:absolute;
		top:0;
		right:0;
		bottom:0;
		left:0;
		margin:auto;
        border-radius: 5px;
        .head{
            width:100%;
            height:70px;
            border-bottom:1px solid #ccc;
            h3{
                /*float:left;*/
				text-align: center;
                line-height:70px;
                /*margin-left:20px;*/
                font-size:18px;
            }
            .ant-select{
                margin-top:22px;
                margin-right:20px;
                float:right;
            }
        }
        .cont{
            padding-top:30px;
            .logo{
                margin-left:64px;
                float:left;
                overflow:hidden;
                margin-right:30px;
            }
            .input{
                margin:0 auto;
                width:305px;
                label{
                    margin-bottom:20px;
                    display:block;
                    span{
                        text-align:left;
                    }
                    .el-button{
                        float:left;
                        margin-left:62px;
                    }
                    strong{
                        display:block;
                        float:left;
                        width:50px;
                        text-align:right;
                        margin-right:10px;
                        font-size:16px;
                        font-weight:500;
                        line-height:40px;
                    }
                    .el-input{
                        width:80%;
                    }
                    .checkbox{
                        width:20px;
                        margin-left:58px;
                        font-size:14px;
                        margin-top:4px;
                        display:block;
                        float:left;
                    }
                    .ant-btn-lg{
                        margin-left:60px;
                        span{
                            margin:0;
                            padding:0;
                            width:33px;
                        }
                    }
                }
            }
        }
	}
}
.alert{
    width:100px;
}


</style>
