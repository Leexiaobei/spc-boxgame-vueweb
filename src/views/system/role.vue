<template>
	<div class="user">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="cont">
			<div class="head mar-tw">
				<h3>用户管理</h3>
			</div>
			<div class="list">
				<div class="list-cont">
					<el-row>
						<el-col :span="12">
							<el-button type="primary"  class="mar-lw" @click="openSysUser()">添加用户</el-button>
						</el-col>
						<el-col :span="12" class="text-right">
							<el-input v-model="selectParam" style="width: 200px;" placeholder="请输入查询条件"></el-input>
							<el-button type="success" class="mar-lw">查询</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="table mar-tw">
				<el-table style="width: 100%" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
					<el-table-column type="index" width="80px" label="序号"></el-table-column>
					<el-table-column prop="channelName" label="渠道名称"></el-table-column>
					<el-table-column prop="userName" label="用户名"></el-table-column>
					<el-table-column prop="channelLevel" label="渠道等级"></el-table-column>
					<el-table-column prop="channelContact" label="渠道联系人"></el-table-column>
					<el-table-column prop="installCity" label="渠道包安装量"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="float: right;">
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
						 :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>

		<!-- 添加用户 -->
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="1000px">
			<div style="margin: 0 auto;">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
					<el-form-item label="渠道名称：" prop="channelName">
						<el-input v-model="ruleForm.channelName" style="width:655px" placeholder="请输入" auto-complete="off"></el-input>
					</el-form-item>
					<div class="form_item_div">
						<el-form-item label="用 户 名：" prop="userName">
							<el-input v-model="ruleForm.userName" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="密  码：" prop="password">
							<el-input v-model="ruleForm.password" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					<div class="form_item_div">
						<el-form-item label="渠道联系人：" prop="channelContact">
							<el-input v-model="ruleForm.channelContact" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="联系人邮箱：" prop="contactEmail">
							<el-input v-model="ruleForm.contactEmail" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					<div class="form_item_div">
						<el-form-item label="联系人电话：" prop="contactPhone">
							<el-input maxlength="11" v-model="ruleForm.contactPhone" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="收款人姓名：" prop="receiverName">
							<el-input v-model="ruleForm.receiverName" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					<div class="form_item_div">
						<el-form-item label="收款方式：" prop="paymentType">
							<el-input v-model="ruleForm.paymentType" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="收款账号：" prop="paymentAccount">
							<el-input v-model="ruleForm.paymentAccount" placeholder="请输入" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					<el-form-item label="开户行：" prop="bankName">
						<el-input v-model="ruleForm.bankName" style="width:655px" placeholder="请输入" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div style="text-align: center;">
				<el-button class="btn_primary" @click="dialogFormVisible = false">取 消</el-button>
				<el-button class="btn_primary" type="primary" @click="saveSysUser">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加/修改用户 -->
	</div>
</template>
<script>
	import service from '../../common/service.js'
	import axios from 'axios'
	export default {
		data() {
			return {
				dialogFormVisible: false,
				// 总数据
				tableData: [],
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 0,
				// 个数选择器（可修改）
				currentPage: 1, //初始页
				pagesize: 10, //    每页的数据
				rules: {
					channelName: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					userName: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					channelContact: [{
						required: true,
						message: '请输入渠道联系人',
						trigger: 'blur'
					}],
					contactEmail: [{
						required: true,
						message: '请输入联系人邮箱',
						trigger: 'blur'
					}, {
						type: 'email',
						message: '不正确的电子邮件格式',
						trigger: 'blur'
					}],
					contactPhone: [{
						required: true,
						message: '请输入联系人电话',
						trigger: 'blur'
					}],
					receiverName: [{
						required: true,
						message: '请输入收款人姓名',
						trigger: 'blur'
					}],
					paymentType: [{
						required: true,
						message: '请输入收款方式',
						trigger: 'blur'
					}],
					paymentAccount: [{
						required: true,
						message: '请输入收款账号',
						trigger: 'blur'
					}],
					bankName: [{
						required: true,
						message: '请输入开户行',
						trigger: 'blur'
					}],
				},
				ruleForm: {
					"id": "",
					"bankName": null, //开户行
					"channelContact": null, //渠道联系人
					"channelLevel": 0, //渠道等级
					"channelName": null, //渠道名称
					"contactEmail": null, //联系人邮箱
					"contactPhone": null, //联系人手机号码
					"password": null, //密码
					"receiverName": null, //收款人姓名
					"paymentAccount": null, //收款账号
					"paymentType": null, //收款方式
					"userName": null, //用户名
					"userType": 0,
				},
				id: '',
				selectParam: '' //查询条件
			}
		},
		created() {
			this._fnData();
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			_fnData() {
				var params = {
					id: "",
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					realName: this.selectParamß,
				}
				service.post(service.selectUser, params, (res) => {
                    var arr = res.resultdata.records;
                    this.tableData = arr;
                    this.totalCount = res.resultdata.total;
				})
			},
			// 初始页currentPage、初始每页数据数pagesize和数据data
			handleSizeChange: function(size) {
				this.pagesize = size;
				// console.log(this.pagesize)  //每页下拉显示数据
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				// this._fnData();
				console.log(this.currentPage) //点击第几页
			},
			openSysUser() {
				this.dialogFormVisible = true;
				this.id = '';
				this.ruleForm.channelName = '';
				this.ruleForm.bankName = '';
				this.ruleForm.channelContact = '';
				this.ruleForm.channelLevel = '';
				this.ruleForm.contactEmail = '';
				this.ruleForm.contactPhone = '';
				this.ruleForm.password = '';
				this.ruleForm.receiverName = '';
				this.ruleForm.paymentAccount = '';
				this.ruleForm.paymentType = '';
				this.ruleForm.userName = '';
				this.ruleForm.userType = '';
			},
			handleEdit(row) {
				console.log(row)
				this.dialogFormVisible = true;
				this.ReadBaseById(row.id);
			},
			//查询一条基本信息
			ReadBaseById(id) {
				var params = {
					id: id
				};
				service.get(service.ReadBaseById, params, (res) => {
					var arr = res.resultdata;
					this.ruleForm = arr;
				})
			},
			saveSysUser() {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						var params = {}
						params.children = this.ruleForm;
						if (this.id) {
							params.children.id = this.id
						}
						service.post(service.saveSysUser, params, (res) => {
							this.$message(res.resultmessage);
							this.dialogFormVisible = false;
							this._fnData();
							this.id = '';
							this.ruleForm.channelName = '';
							this.ruleForm.bankName = '';
							this.ruleForm.channelContact = '';
							this.ruleForm.channelLevel = '';
							this.ruleForm.contactEmail = '';
							this.ruleForm.contactPhone = '';
							this.ruleForm.password = '';
							this.ruleForm.receiverName = '';
							this.ruleForm.paymentAccount = '';
							this.ruleForm.paymentType = '';
							this.ruleForm.userName = '';
							this.ruleForm.userType = '';
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}

	.user {
		width: 100%;

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
				.list-cont {
					margin: 0 auto;
					padding-top: 20px;
					overflow: hidden;
				}
			}

			.table {
				width: 100%;
				margin: 0 auto;
				margin-top: 20px;
				border-radius: 5px;
				overflow: hidden;
			}
		}
	}

	.form_item_div {
		display: inline-flex;
	}

	.btn_primary {
		width: 260px;
		height: 50px;
		font-size: 22px;
		font-weight: 400;

	}
	.mar-lw{
		width: 200px;
		margin-right: 40px
	}
</style>
