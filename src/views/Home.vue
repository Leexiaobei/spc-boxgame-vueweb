<template>
		<el-container>
			<el-header>
                <span class="logo">花项目管理系统</span>
				<el-button size="mini" @click="_quit" type="danger">退出</el-button>
            </el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						default-active="0"
						:router="true"
						background-color="#333"
						text-color="#fff"
						active-text-color="#ffd04b">
						<el-submenu v-for="(item, key) in menuData" :index="key.toString()" :key="key">
							<template slot="title">
								<i :class="item.navIcon"></i>
								<span>{{item.navTitle}}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item v-for="(nitem, nk) in item.children" :key="nk" :index="nitem.navUrl">{{nitem.navTitle}}</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view/>
				</el-main>
		</el-container>
		</el-container>
</template>

<script>
    export default {
		components:{},
        data() {
            return {
				collapsed: false,
				menuData: []
            }
		},
		created(){
			this.$service.post(this.$service.getMenuList, {}, (res)=>{
				console.log(res);
				if(!res.resultcode){
					this.menuData = res.resultdata;
				} else {
					this.$message('菜单获取错误');
				}
			})
		},
		methods: {
			_quit(){
				this.$confirm('确定要退出吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					localStorage.setItem('token', '');
					this.$router.push({path: '/login'});
				}).catch(() => {
					console.log('取消了')
				});
			}
		}
    }
</script>

<style lang="scss">
</style>
