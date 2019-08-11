<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
		</el-breadcrumb>
			<div class="cont">
				<div class="list">
					<el-button type="primary" @click="open">添加数据字典</el-button>
				</div>
            <el-table :data="tableData" border style="width: 20%">
                <el-table-column type="index" width="80px" label="序号"></el-table-column>
                <el-table-column prop="creatorName" label="用户名"></el-table-column>
            </el-table>
		</div>
	</div>
</template>
<script>
	import service from '../../common/service.js'
    export default {
    data() {
      return {
        tableData:[]
      }
    },
    created(){
        this.getRolelist();
    },
    methods: {
        getRolelist() {
            var params = {

            }
            service.post(service.getRolelist, params, (res)=>{
                console.log(res);
                var arr = res.resultdata;
		        this.tableData = arr;
            })
        },
    }
  }
</script>

<style lang="scss">
.cont{
    margin-top:50px;
}
</style>
