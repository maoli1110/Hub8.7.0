<template>
	<div>
		<section style='margin-top:20px' v-show='flag'>
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item>
						<el-input v-model="filters.name" placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getUsers">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleAdd">新增</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item>
						<el-button type="primary" v-on:click="getUsers">添加人员</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleAdd">删除人员</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<!--列表-->
			<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column type="selection" width="100">
				</el-table-column>
				<el-table-column type="index" width="100" label="序号">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="120" :formatter="formatSex" sortable>
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="120" sortable>
				</el-table-column>
				<el-table-column prop="birth" label="生日" width="180" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="地址" min-width="120" sortable>
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template scope="scope">
						<!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
						<el-icon class="el-icon-edit"     @click.native="flag=!flag"></el-icon>
						<el-icon class="el-icon-delete2"  @click.native="handleDel(scope.$index, scope.row)"></el-icon>
						<el-icon class="el-icon-document" @click.native="handleEdit(scope.$index, scope.row)"></el-icon>
						<el-icon class="el-icon-menu" @click.native="handleEdit(scope.$index, scope.row)"></el-icon>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination style='float:right' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
				</el-pagination>
			</el-col>

			<!--编辑界面-->
			<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="editForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-radio-group v-model="editForm.sex">
							<el-radio class="radio" :label="1">男</el-radio>
							<el-radio class="radio" :label="0">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="年龄">
						<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
					</el-form-item>
					<el-form-item label="生日">
						<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
					</el-form-item>
					<el-form-item label="地址">
						<el-input type="textarea" v-model="editForm.addr"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog>

			<!--新增界面-->
			<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="addForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-radio-group v-model="addForm.sex">
							<el-radio class="radio" :label="1">男</el-radio>
							<el-radio class="radio" :label="0">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="年龄">
						<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
					</el-form-item>
					<el-form-item label="生日">
						<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
					</el-form-item>
					<el-form-item label="地址">
						<el-input type="textarea" v-model="addForm.addr"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>
		</section>
		<section v-show='!flag'  style="padding:10px">
			<!--工具条-->
			<el-row>
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<p>用户基本信息</p>
				</el-col>
			</el-row>

			<el-row style="margin-top:20px;height:200px;padding:25px 10px;position:relative">
				<el-row style="height:45%">
					<el-col :span="6">
						<el-col :span="4">
							用户名
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容"></el-input>
						</el-col>
					</el-col>
					<el-col :span="6">
						<el-col :span="4">
							角色名
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容"></el-input>
						</el-col>
					</el-col>
				</el-row>
				<el-row style="height:45%">
					<el-col :span="6">
						<el-col :span="4">
							密码
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容"></el-input>
						</el-col>
					</el-col>
					<el-col :span="6">
						<el-col :span="4">
							确认密码
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容"></el-input>
						</el-col>
					</el-col>
				</el-row>
				<el-row style="height:45%">
					<el-col :span="6">
						<el-col :span="4">
							电话
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容"></el-input>
						</el-col>
					</el-col>
					<el-col :span="6">
						<el-col :span="4">
							邮箱
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容"></el-input>
						</el-col>
					</el-col>
				</el-row>
				<!--备注-->
				<el-row style="position:absolute;right:25%;top:25px;">
					<el-col :span="4">
						备注 (150/150)
					</el-col>
					<el-col :span="12" style="margin-left:10px">
						<el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" placeholder="请输入内容" style="width:300px">
						</el-input>
					</el-col>
				</el-row>
			</el-row>

			<el-row style="margin-top:40px">
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<p>功能节点授权</p>
				</el-col>
			</el-row>
			<!--表格切换-->
			<el-row style="border-bottom: 1px solid rgb(209, 229, 229)">
				<el-tabs v-model="activeName">
					<el-tab-pane label="房建" name="first">
						<el-tabs type="card">
							<el-tab-pane label="系统客户端">
								<el-carousel  arrow="always" :interval="5000000" >
									<el-carousel-item v-for="item in 2" :key="item"  style="padding:0 5%">
										<div v-for="(o, index) in 8" :key="o" :offset="0" style="width:9%;float:left;margin:35px 0 0 2%">
											<el-card :body-style="{ padding: '0px' }">
												<div style="height:20px;color:#00d1b2;padding:10% 5px">
													<span class="el-icon-star-on" style="float:right;color:">授权</span>
												</div>
												<div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
													<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:60px;height:60px;margin:0 auto">
													<span style="margin:14px 0 14px 0;display:inline-block">Luban Explorer</span>
												</div>
												<div>
													<div class="bottom clearfix" style="padding:10px 0 ">
														<p class="time">全部授权数:
															<span>100</span>
														</p>
														<p class="time">可用授权数:
															<span>50</span>
														</p>
													</div>
												</div>
											</el-card>
										</div>
									</el-carousel-item>
								</el-carousel>
							</el-tab-pane>
							<el-tab-pane label="算量云功能">
								<el-carousel  arrow="always">
									<el-carousel-item v-for="item in 2" :key="item">
									</el-carousel-item>
								</el-carousel>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="市政" name="second">
						<el-tabs type="card">
							<el-tab-pane label="系统客户端1">用户管理</el-tab-pane>
							<el-tab-pane label="算量云功能1">配置管理</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="精装" name="third">
						<el-tabs type="card">
							<el-tab-pane label="系统客户端2">用户管理</el-tab-pane>
							<el-tab-pane label="算量云功能2">配置管理</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
				</el-tabs>
			</el-row>
			<!--三栏线-->

			<!--项目授权-->
			<!--类型1-->
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">项目授权</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-checkbox>已授权</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--类型2-->
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">项目授权</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info">授权</el-button>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--类型3-->
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">项目授权</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-input placeholder="请输入内容"></el-input>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info">授权</el-button>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--类型4-->
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">项目授权</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info">授权</el-button>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--类型5-->
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">项目授权</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info">授权</el-button>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--类型6-->
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">项目授权</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>查看和编辑</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<el-row style="border-bottom: 1px solid rgb(209, 229, 229)">
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="6">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px"></div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-col :span="8">
										<el-checkbox>预览</el-checkbox>
									</el-col>
									<el-col :span="16">
										<el-input placeholder="请输入内容"></el-input>
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info">授权</el-button>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--确定取消-->
			<el-row :gutter="30" style="margin-top:30px">
				<el-col :span="6" :offset="6">
					<el-button type="info" style="float:right" @click='back'>确定</el-button>
				</el-col>
				<el-col :span="6">
					<el-button type="info">取消</el-button>
				</el-col>
			</el-row>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			filters: {
				name: ''
			},
			activeName: 'first',
			users: [{
				addr: "吉林省 白山市 临江市",
				age: 42,
				birth: "1979-120-22",
				id: "76CB27d3-547F-6E6D-270E-32B7ED396b32",
				name: "姜敏1",
				sex: 0
			},
			{
				addr: "吉林省 白山市 临江市",
				age: 43,
				birth: "1979-120-22",
				id: "76CB27d3-547F-6E6D-270E-32B7ED396b32",
				name: "姜敏2",
				sex: 0
			},
			{
				addr: "吉林省 白山市 临江市",
				age: 44,
				birth: "1979-110-22",
				id: "76CB27d3-547F-6E6D-270E-32B7ED396b32",
				name: "姜敏3",
				sex: 0
			}
			],
			total: 0,
			page: 1,
			flag: true,
			listLoading: false,
			sels: [],//列表选中列

			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				id: 0,
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			},

			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			}

		}
	},
	methods: {
		//性别显示转换
		formatSex: function (row, column) {
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getUsers();
		},
		handleSizeChange(val) {
			this.page = val;
			this.getUsers();
		},
		//获取用户列表
		getUsers() {
			this.flag = false;
			// let para = {
			// 	page: this.page,
			// 	name: this.filters.name
			// };
			// this.listLoading = true;
			// //NProgress.start();
			// getUserListPage(para).then((res) => {
			// 	this.total = res.data.total;
			// 	// this.users = res.data.users;
			// 	this.listLoading = false;
			// 	//NProgress.done();
			// });
		},
		back() {
			this.flag = true;
		},
		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { id: row.id };
				removeUser(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch(() => {

			});
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			console.log(row)
			this.editFormVisible = true;
			this.editForm = Object.assign({}, row);
		},
		//显示新增界面
		handleAdd: function () {
			this.addFormVisible = true;
			this.addForm = {
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			};
		},
		//编辑
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.editForm);
						para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
						editUser(para).then((res) => {
							this.editLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.addForm);
						para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
						addUser(para).then((res) => {
							this.addLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
		//批量删除
		batchRemove: function () {
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { ids: ids };
				batchRemoveUser(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch(() => {

			});
		}
	},
	mounted() {
		// this.getUsers();
	}
}

</script>

<style scoped>
.time {
	font-size: 13px;
	color: #999;
	height: 20px;
	line-height: 20px;
	padding: 0 20px;
}

.bottom {
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
	text-align: center
}

.clearfix:after {
	clear: both
}
</style>
