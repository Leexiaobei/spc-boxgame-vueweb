<template>
	<div class="data-list">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>数据字典</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="cont">
			<div class="head mar-tw">
				<h3>数据字典</h3>
			</div>
		</div>
		<el-container style="height: 100%; margin-top: 20px; border: 1px solid #eee">
			<el-aside width="20%" style="background-color: #FFFFFF">
				<el-menu>
					<el-submenu v-for="(MenuItem, key) of menuData" :index="key.toString()" :key="key">
						<template slot="title">
							<i :class="MenuItem.icon"></i>
							<span @click="getDictListById(MenuItem.id)">{{MenuItem.title}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="(nitem, nk) in MenuItem.children" :key="nk" @click="getDictListById(nitem.id)">{{nitem.title}}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-main>
					<div class="list">
						<el-button type="primary" @click="open">添加数据字典</el-button>
					</div>
					<div class="table mar-tw">
						<el-table :data="tableData2" border style="width: 800%">
							<el-table-column type="index" label="序号" width="100"></el-table-column>
							<el-table-column prop="title" label="名称" width="300"></el-table-column>
							<el-table-column prop="colour" label="颜色" width="180"></el-table-column>
							<el-table-column prop="sortId" label="排序" width="180"></el-table-column>
							<el-table-column label="操作" width="300">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-main>
			</el-container>
		</el-container>

		<el-dialog title="新增字典" :visible.sync="dialogSaveVisible" width="500px">
			<div style="padding-right:80px;">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item label="一级名称" :label-width="formLabelWidth" prop="couponSelected">
						<el-select v-model="ruleForm.couponSelected" clearable placeholder="请选择">
							<el-option v-for="item in couponList" :key="item.id" :label="item.title" :value="item.id">
							</el-option>
						</el-select>
						<br />
						<span style="color: red;font-size: 10px;">提示：若没有选择一级名称，将自动创建成一级。</span>
					</el-form-item>
					<el-form-item label="名称" :label-width="formLabelWidth" prop="title">
						<el-input v-model="ruleForm.title" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="是否启用" :label-width="formLabelWidth" prop="radio">
						<el-radio v-model="ruleForm.radio" label="1">开启</el-radio>
						<el-radio v-model="ruleForm.radio" label="2">关闭</el-radio>
					</el-form-item>
					<el-form-item label="颜色" :label-width="formLabelWidth" prop="colour">
						<el-color-picker v-model="ruleForm.colour"></el-color-picker>
					</el-form-item>
					<el-form-item label="序号" :label-width="formLabelWidth" prop="sortId">
						<el-input style="width: 60px;" v-model="ruleForm.sortId" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="Icon" :label-width="formLabelWidth" prop="icon">
						<el-upload class="upload" :action="UploadUrl()"
						:multiple="false"
						:show-file-list= "false"
						 :on-success="handleSuccess">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
						<el-image :src="src">
							<div slot="placeholder" class="image-slot">
								加载中<span class="dot">...</span>
							</div>
						</el-image>
					</el-form-item>
				</el-form>
			</div>
			<div class="dialog-footer">
				<el-button class="sure_button" type="primary" @click="saveCfgDict">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑字典" :visible.sync="dialogUpdateVisible" width="800px">
			<el-form :model="UpdateruleForm" :rules="uprules" ref="UpdateruleForm">
				<el-card>
					<el-row>
						<el-form-item label="名称" :label-width="formLabelWidth" prop="title">
							<el-input v-model="UpdateruleForm.title" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="是否启用" :label-width="formLabelWidth" prop="radio">
							<el-radio v-model="UpdateruleForm.radio" label="1">开启</el-radio>
							<el-radio v-model="UpdateruleForm.radio" label="2">关闭</el-radio>
						</el-form-item>
						<el-form-item label="颜色" :label-width="formLabelWidth" prop="colour">
							<el-color-picker v-model="UpdateruleForm.colour"></el-color-picker>
						</el-form-item>
						<el-form-item label="序号" :label-width="formLabelWidth" prop="sortId">
							<el-input style="width: 60px;" v-model="UpdateruleForm.sortId" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="Icon" :label-width="formLabelWidth" prop="icon">
							<el-upload class="upload" :action="UploadUrl()"
							:multiple="false"
							:show-file-list= "false"
							 :on-success="handleSuccess">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
							<el-image :src="src">
								<div slot="placeholder" class="image-slot">
									加载中<span class="dot">...</span>
								</div>
							</el-image>
						</el-form-item>

					</el-row>
					<div class="dialog-footer">
						<el-button class="sure_button" type="primary" @click="updateCfgDict">确 定</el-button>
					</div>
				</el-card>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import service from '../../common/service.js'
	import axios from 'axios'
	export default {
		data() {
			return {
				//新增弹出框
				dialogSaveVisible: false,
				//修改弹出框
				dialogUpdateVisible: false,
				formLabelWidth: '120px',
				//新增数据字典验证
				ruleForm: {
					title: '',
					couponSelected: null,
					radio: '1',
					colour: '',
					icon: '',
					sortId: '',
				},
				rules: {
					title: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					radio: [{
						required: true,
						message: '请选择是否启用',
						trigger: 'blur'
					}],
					colour: [{
						required: true,
						message: '请选择颜色',
						trigger: 'blur'
					}]
				},
				menuData: [],
				tableData2: [],
				id: '',
				//编辑表单验证
				UpdateruleForm: {
					title: '',
					radio: '',
					colour: '',
					icon: '',
					sortId: '',
				},
				uprules: {
					title: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					radio: [{
						required: true,
						message: '请选择是否启用',
						trigger: 'change'
					}],
					colour: [{
						required: true,
						message: '请选择颜色',
						trigger: 'blur'
					}]
				},
				src: '',
				token: '',
				couponList: [],
			}
		},
		created() {
			this.token = localStorage.getItem('token');
			this.getDictTree();
		},
		methods: {
			//查询左侧树
			getDictTree() {
				var params = {};
				service.post('http://202.107.245.45:3002/box_game/getDictTree?code=1', params, (res) => {
					var arr = res.resultdata;
					this.menuData = arr;
				})
			},
			//查询所有一级的字典
			getFirstDict() {
				var params = {};
				service.post('http://202.107.245.45:3002/box_game/getDictTree?code=0', params, (res) => {
					var arr = res.resultdata;
					this.couponList = arr;
				})
			},
			//根据id查询本级及子级的列表数据
			getDictListById(id) {
				var params = {
					id: id
				};
				service.get(service.getDictListById, params, (res) => {
					var arr = res.resultdata;
					this.tableData2 = arr;
				})
			},
			//新增一条字典
			saveCfgDict() {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						var status = false;
						if (this.ruleForm.radio == "1") {
							status = false;
						}
						var params = {
							children: {
								colour: this.ruleForm.colour,
								icon: this.ruleForm.icon,
								parentid: this.ruleForm.couponSelected,
								sortId: this.ruleForm.sortId,
								title: this.ruleForm.title,
								deleteStatus: status,
								target: null,
							}
						}
						if (this.id) {
							params.children.id = this.id
						}
						service.post(service.saveCfgDict, params, (res) => {
							this.dialogSaveVisible = false;
							this.getDictTree();
							this.getDictListById(this.id)
							this.ruleForm.title = '';
							this.id = '';
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//编辑一条字典
			updateCfgDict() {
				this.$refs['UpdateruleForm'].validate((valid) => {
					if (valid) {
						var status = false;
						if (this.ruleForm.radio == "1") {
							status = false;
						}
						var params = {
							children: {
								colour: this.UpdateruleForm.colour,
								icon: this.UpdateruleForm.icon,
								parentid: this.UpdateruleForm.parentid,
								sortId: this.UpdateruleForm.sortId,
								title: this.UpdateruleForm.title,
								deleteStatus: status,
								target: null,
							}
						}
						if (this.id) {
							params.children.id = this.id
						}
						service.post(service.saveCfgDict, params, (res) => {
							this.dialogUpdateVisible = false;
							this.getDictTree();
							this.getDictListById(this.id)
							this.ruleForm.title = '';
							this.id = '';
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//根据id查询一条字典明细
			selectById(id) {
				var params = {
					children: {
						id: id
					}
				};
				service.post(service.selectById, params, (res) => {
					var arr = res.resultdata;
					this.UpdateruleForm = arr;
					this.src = this.UpdateruleForm.icon;
					this.UpdateruleForm.radio == "2"
					// if(this.UpdateruleForm.deleteStatus)
					// {
					// 	this.UpdateruleForm.radio == "1"
					// }else
					// {
						// this.UpdateruleForm.radio == "2"
					// }
				})
			},
			handleEdit(row) {
				this.id = row.id;
				this.dialogUpdateVisible = true;
				this.selectById(this.id);
			},
			handleDelete(row) {
				this.$confirm('确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var rowId = row.id;
					var params = {
						children: {
							colour: null,
							icon: null,
							parentid: null,
							id: rowId,
							sortId: 0,
							title: this.UpdateruleForm.title,
							target: null,
						}
					}
					service.post(service.deleteById, params, (res) => {
						if (res.resultcode) {
							this.getDictTree();
							this.getDictListById(rowId);
						} else {
							this.$message('删除失败，请重试！');
						}
					})
				}).catch(() => {
					console.log('取消了')
				});

			},
			open() {
				this.id = '';
				this.ruleForm.title = '';
				this.ruleForm.colour = '';
				this.ruleForm.sortId = '';
				this.ruleForm.icon = '';
				this.src = '';
				this.ruleForm.deleteStatus = false;
				this.dialogSaveVisible = true;
				this.getFirstDict();
			},
			UploadUrl() {
				return "http://localhost:3002/box_game/postfile?Token=" + this.token;
			},
			// 附件上传成功返回
			handleSuccess(res, file) {
				if (res.code == 0) {
					this.$message("上传成功");
					this.ruleForm.icon = res.data;
					this.src = res.data;
				} else {
					this.$Message(res.message);
				}
			},
		}
	}
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}

	.data-list {
		.top {
			width: 100%;
			height: 50px;
			background: #ddd;
			overflow: hidden;

			h3 {
				height: 50px;
				font-weight: 500;
				line-height: 50px;
				text-align: left;
				padding-left: 20px;
			}
		}

		.cont {
			.head {
				width: 100%;
				height: 50px;
				border-bottom: 2px dashed #ccc;

				h3 {
					height: 50px;
					line-height: 50px;
					font-size: 20px;
					font-weight: 500;
					text-align: left;
				}
			}

			.list {
				text-align: left;
				width: 100%;
				margin-top: 20px;

				.list-cont {
					width: 100%;
					margin: 0 auto;
					padding-top: 20px;
					overflow: hidden;

					form {
						float: left;
						margin-right: 20px;
					}

					button {
						float: left;
					}
				}
			}
		}
	}

	.dialog-footer {
		text-align: center
	}

	.dialog-footer .sure_button {
		width: 350px;
		font-size: 20px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
