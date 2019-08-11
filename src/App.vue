<template>
	<router-view/>
</template>

<script>
    export default {
		components:{},
        data() {
            return {
			}
		},
		created(){
		},
		methods: {
		}
    }
</script>

<style lang="scss">
	body, html{
		margin: 0;
		padding: 0;
		font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
		color: #333;
		font-size: 14px;
		height: 100%;
		background: #fff;
	}
	.el-container{
		height: 100%;
	}
    header.el-header{
        padding: 0;
    	.logo{
			float: left;
            width: 200px;
            color: #fff;
            opacity: .8;
		    line-height: 60px;
            display: block;
            font-size: 20px;
        }
		.el-button{
			margin-top: 15px;
			margin-right: 15px;
			float: right;
		}
    }
	.el-header, .el-footer {
		background-color: #222;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-aside {
        padding-top: 10px;
		background-color: #333;
		color: #333;
		line-height: 200px;
		.el-menu{
			border-right: 0;
		}
	}
	.el-main {
		background-color: #fff;
		color: #333;
	}
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
	.mar-tw{
		margin-top: 20px !important;
	}
	.mar-bw{
		margin-bottom: 20px !important;
	}
	.mar-lw{
		margin-left: 20px !important;
	}
	.mar-rw{
		margin-right: 20px !important;
	}
	.text-left{
		text-align: left;
	}
	.text-center{
		text-align: center;
	}
	.text-right{
		text-align: right;
	}
</style>
