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
						<el-button type="primary" @click="flag=false">添加人员</el-button>
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
						<el-icon class="el-icon-edit" @click.native="flag=!flag"></el-icon>
						<el-icon class="el-icon-delete2" @click.native="handleDel(scope.$index, scope.row)"></el-icon>
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
		<section v-show='!flag' style="padding:10px">
			<!--工具条-->
			<el-row>
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<p>用户基本信息</p>
				</el-col>
			</el-row>
	
			<el-row style="margin-top:20px;height:200px;padding:25px 10px;position:relative">
				<el-row style="height:45%">
					<el-col :span="6">
						<el-col :span="4" style="font-size:12px;height:36px;line-height:36px" >
							用户名:
						</el-col>
						<el-col :span="12" style="font-size:12px;height:36px;line-height:36px">
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-col>
					<el-col :span="6">
						<el-col :span="4" style="font-size:12px;height:36px;line-height:36px">
							角色名:
						</el-col>
						<el-col :span="12" style="font-size:12px;height:36px;line-height:36px">
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-col>
				</el-row>
				<el-row style="height:45%">
					<el-col :span="6">
						<el-col :span="4" style="font-size:12px;height:36px;line-height:36px">
							密码:
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-col>
					<el-col :span="6">
						<el-col :span="4" style="font-size:12px;height:36px;line-height:36px">
							确认密码:
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-col>
				</el-row>
				<el-row style="height:45%">
					<el-col :span="6">
						<el-col :span="4" style="font-size:12px;height:36px;line-height:36px">
							电话:
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-col>
					<el-col :span="6">
						<el-col :span="4" style="font-size:12px;height:36px;line-height:36px">
							邮箱:
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-col>
				</el-row>
				<!--备注-->
				<el-row style="position:absolute;right:23%;top:25px;">
					<el-col :span="4" style="font-size:12px">
						备注:<span style="color:skyblue">(150/150)</span>
					</el-col>
					<el-col :span="12" style="margin-left:10px">
						<el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" placeholder="请输入内容" style="width:318px;height:148px">
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
			<el-row>
				<el-tabs v-model="activeName">
					<el-tab-pane label="房建" name="first">
						<el-row>
							<el-col :span="2">
								<div style="text-align: center">
									<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:80px;height:80px;margin:0 auto">
									<span style="margin:14px 0 14px 0;display:inline-block;font-size:8px">Explorer</span>
								</div>
							</el-col>
							<el-col :span="2">
								<div style="text-align: center">
									<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:80px;height:80px;margin:0 auto">
									<span style="margin:14px 0 14px 0;display:inline-block;font-size:8px">Explorer</span>
								</div>
							</el-col>
							<el-col :span="2">
								<div style="text-align: center">
									<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:80px;height:80px;margin:0 auto">
									<span style="margin:14px 0 14px 0;display:inline-block;font-size:8px">Explorer</span>
								</div>
							</el-col>
							<el-col :span="2">
								<div style="text-align: center">
									<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:80px;height:80px;margin:0 auto">
									<span style="margin:14px 0 14px 0;display:inline-block;font-size:8px">Explorer</span>
								</div>
							</el-col>
							<el-col :span="2">
								<div style="text-align: center">
									<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:80px;height:80px;margin:0 auto">
									<span style="margin:14px 0 14px 0;display:inline-block;font-size:8px">Explorer</span>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-table :data="tableData" border style="width: 100%">
								<el-table-column label="全部" width="180">
									<template scope="scope">
										<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">工程</el-checkbox>
									</template>
								</el-table-column>
								<el-table-column label="权限列表" header-align='center'>
									<template scope="scope">
										<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
											<el-checkbox v-for="city in cities" :label="city" :key="city" style="margin-left:50px">{{city}}</el-checkbox>
										</el-checkbox-group>
									</template>
								</el-table-column>
							</el-table>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="市政" name="second">
	
					</el-tab-pane>
					<el-tab-pane label="精装" name="third">
	
					</el-tab-pane>
					<el-tab-pane label="装配式" name="">
	
					</el-tab-pane>
					<el-tab-pane label="CIM" name="">
	
					</el-tab-pane>
					<el-tab-pane label="鲁班通" name="">
	
					</el-tab-pane>
					<el-tab-pane label="管理后台" name="">
	
					</el-tab-pane>
				</el-tabs>
			</el-row>
			<!--确定取消-->
			<el-row :gutter="30" style="margin-top:30px">
				<el-col :span="6" :offset="6">
					<el-button type="info" style="float:right" @click='flag=true'>确定</el-button>
				</el-col>
				<el-col :span="6">
					<el-button type="info">取消</el-button>
				</el-col>
			</el-row>
			<!--三栏线-->
		</section>
	</div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
	data() {
		return {
			//  表格中的多个checkbox
			checkAll: true,
			checkedCities: ['上海'],
			cities: cityOptions,
			isIndeterminate: true,
			tableData: [{
				date: '2016-05-02',
				name: '王小虎1',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎2',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎3',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎4',
				address: '上海市普陀区金沙江路 1516 弄'
			}],
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
		handleCheckAllChange(event) {
			this.checkedCities = event.target.checked ? cityOptions : [];
			this.isIndeterminate = false;
			// console.log(event.target.checked);
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.cities.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			// console.log(value);
		},
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
			let para = {
				page: this.page,
				name: this.filters.name
			};
			this.listLoading = true;
			//NProgress.start();
			getUserListPage(para).then((res) => {
				this.total = res.data.total;
				// this.users = res.data.users;
				this.listLoading = false;
				//NProgress.done();
			});
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
.inputStyle{
	width: 304px !important;
	height: 36px;
}
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
