<template>
	<div class="data-list">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>礼包管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="cont">
			<div class="head mar-tw">
				<h3>数据字典</h3>
			</div>
		</div>
			<div class="nav_top_div">
				<div class="nav_left">
					<el-button class="add-btn" type="primary" @click="addGift">添加礼包</el-button>
					<div style="float: right">
						<el-input style="width: 200px;padding-right: 10px" v-model="searchParam" placeholder="请输入关键字搜素"></el-input>
						<el-button type="primary" icon="el-icon-search" @click="Search">查询</el-button>
					</div>
				</div>
			</div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column type="index" label="序号" width="80px"></el-table-column>
				<el-table-column prop="giftName" label="礼包名称"></el-table-column>
				<el-table-column prop="start_time" label="开始时间"></el-table-column>
				<el-table-column prop="end_time" label="结束时间"></el-table-column>
				<el-table-column prop="gameName" label="游戏名称" ></el-table-column>
				<el-table-column prop="giftType" label="礼包类型"></el-table-column>
				<el-table-column prop="consume_integral" label="消耗积分"></el-table-column>
				<el-table-column prop="count" label="剩余/总数"></el-table-column>
				<el-table-column label="操作" width="200px">
						<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</el-table-column>
			</el-table>
		<div style="float: right;height: 50px">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="40">
			</el-pagination>
		</div>

		<!-- 添加礼包 -->
		<el-dialog title="添加礼包" :visible.sync="dialogAddGiftVisible" width="1000px">
			<div style="margin: 0 auto;">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
					<el-form-item label="礼包类型：" prop="giftType">
						<el-select v-model="ruleForm.giftType" placeholder="请选择礼包类型">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<div class="form_item_div">
						<el-form-item label="游戏名称：" prop="applyName">
							<el-input v-model="ruleForm.applyName" placeholder="请输入" style="width: 220px" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="礼包名称：" prop="giftName">
							<el-input v-model="ruleForm.giftName" placeholder="请输入" style="width: 220px" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					<div class="form_item_div">
						<el-form-item label="系统选择：" prop="system">
							<el-checkbox-group v-model="ruleForm.system">
								<el-checkbox label="安卓"></el-checkbox>
								<el-checkbox label="IOS"></el-checkbox>
								<el-checkbox label="全平台"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</div>
					<div class="form_item_div">
						<el-form-item label="开始时间：" prop="startTime">
							<el-date-picker
								v-model="ruleForm.startTime"
								type="datetime"
								placeholder="选择日期时间"
								default-time="00:00:00">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="截止时间：" prop="endTime">
							<el-date-picker
								v-model="ruleForm.endTime"
								type="datetime"
								placeholder="选择日期时间"
								default-time="00:00:00">
							</el-date-picker>
						</el-form-item>
					</div>
					<div class="form_item_div">
						<el-form-item label="消耗积分值：" prop="consumeIntegral">
								<el-input v-model="ruleForm.consumeIntegral" placeholder="请输入" style="width: 220px" auto-complete="off"></el-input>
						</el-form-item>
					</div>
						<el-form-item label="内容：" prop="content">
							<el-input type="textarea" v-model="ruleForm.content" placeholder="请输入" style="width: 640px" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="游戏官网：" prop="gameWebsite">
							<el-input v-model="ruleForm.gameWebsite" placeholder="请输入" style="width: 400px" auto-complete="off"></el-input>  禁止广告链接，否则不予审核。（请以http://开头）
						</el-form-item>
						<el-form-item label="激活地址：" prop="address">
							<el-input v-model="ruleForm.address" placeholder="请输入" style="width: 400px" auto-complete="off"></el-input>  如游戏内激活则无需填写激活地址。（请以http://开头）
						</el-form-item>
				</el-form>
			</div>
			<div style="text-align: center;">
				<el-button class="btn_primary" @click="dialogAddGiftVisible = false">取 消</el-button>
				<el-button class="btn_primary" type="primary" @click="saveGameBag">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
    import service from '../../common/service.js'
    export default {
        data() {
            return {
                searchParam:'',//查询条件
                currentPage: 1,
                dialogAddGiftVisible: false,
                ruleForm:{
                    giftType:'',
                    applyName:'',
                    applyId:'',
                    giftName:'',
                    system:'',
                    startTime:'',
                    endTime:'',
                    consumeIntegral:'',
                    content:'',
                    gameWebsite:'',
                    address:'',

				},
                rules:{

				},
                options: [{
                    value: '礼包',
                    label: '礼包'
                }, {
                    value: '新手卡',
                    label: '新手卡'
                }, {
                    value: '激活卡',
                    label: '激活卡'
                }, {
                    value: '测试号',
                    label: '测试号'
                }],
                value: '',
                tableData:[
					{
					    "index": 1,
					    "giftName":"回归奖励",
						"start_time":"2019-08-10",
                        "end_time":"2019-11-10",
						"gameName":"王者荣耀",
						"giftType":"系统发放",
						"consume_integral":"200",
						"count":"1000",
					},
                    {
                        "index": 1,
                        "giftName":"回归奖励",
                        "start_time":"2019-08-10",
                        "end_time":"2019-11-10",
                        "gameName":"王者荣耀",
                        "giftType":"系统发放",
                        "consume_integral":"200",
                        "count":"1000",
                    },
                    {
                        "index": 1,
                        "giftName":"回归奖励",
                        "start_time":"2019-08-10",
                        "end_time":"2019-11-10",
                        "gameName":"王者荣耀",
                        "giftType":"系统发放",
                        "consume_integral":"200",
                        "count":"1000",
                    },
                    {
                        "index": 1,
                        "giftName":"回归奖励",
                        "start_time":"2019-08-10",
                        "end_time":"2019-11-10",
                        "gameName":"王者荣耀",
                        "giftType":"系统发放",
                        "consume_integral":"200",
                        "count":"1000",
                    },
                    {
                        "index": 1,
                        "giftName":"回归奖励",
                        "start_time":"2019-08-10",
                        "end_time":"2019-11-10",
                        "gameName":"王者荣耀",
                        "giftType":"系统发放",
                        "consume_integral":"200",
                        "count":"1000",
                    },
                    {
                        "index": 1,
                        "giftName":"回归奖励",
                        "start_time":"2019-08-10",
                        "end_time":"2019-11-10",
                        "gameName":"王者荣耀",
                        "giftType":"系统发放",
                        "consume_integral":"200",
                        "count":"1000",
                    }

				]
            }
        },
        created(){
            // this.getRolelist();
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //添加
            addGift()
			{
                this.dialogAddGiftVisible = true;
			},
			//搜素
            Search()
			{
			    if (this.searchParam == null || this.searchParam =="")
				{
				    this.$message.warning("请输入查询条件！")
				}else {

				}

			},

			//校验结束时间不能小于开始时间

			//新增
            saveGameBag()
			{

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
                    // service.post(service.deleteById, params, (res) => {
                    //     if (res.resultcode) {
                    //         this.getDictTree();
                    //         this.getDictListById(rowId);
                    //     } else {
                    //         this.$message('删除失败，请重试！');
                    //     }
                    // })
                }).catch(() => {
                    console.log('取消了')
                });

            },
            // getRolelist() {
            //     var params = {
			//
            //     }
            //     service.post(service.getRolelist, params, (res)=>{
            //         console.log(res);
            //         var arr = res.resultdata;
            //         this.tableData = arr;
            //     })
            // },
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
	.nav_top_div{
		height: 50px;
		margin-top: 10px;
	}
	.add-btn{
		width: 140px;
		font-size: 16px;
		font-weight: 400;
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
</style>
