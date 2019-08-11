<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>数据管理</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script>
    export default {
        data(){
            return {
                value1: 1,
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">

</style>
