<template>
	<div>
		<section style='margin-top:20px' v-show='flag'>
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
	
				<el-form :inline="true" :model="filters">
					<span style="display:inline-block;font-size:12px;height:36px;line-height:36px">角色:</span>
					<el-form-item>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<!--<el-input v-model="filters.name" placeholder="姓名"></el-input>-->
						<el-input placeholder="请选择日期" icon="search" v-model="filters.name" :on-icon-click="handleIconClick">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleAdd">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item>
						<el-button type="primary" v-on:click="flag=false">添加人员</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleAdd">批量添加</el-button>
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
						<!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>																								<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
						<el-icon class="el-icon-edit" @click.native="flag=!flag"></el-icon>
						<el-icon class="el-icon-delete2" @click.native="handleDel(scope.$index, scope.row)"></el-icon>
						<el-icon class="el-icon-document" @click.native="handleEdit(scope.$index, scope.row)"></el-icon>
						<el-icon class="el-icon-message" @click.native="handleAuthorized(scope.$index, scope.row)"></el-icon>
	
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
			<!--已授权服务界面 弹窗-->
			<el-dialog title="已授权服务" v-model="authorizedVisible" :close-on-click-modal="false">
				<el-row>
					<el-col :span="2">
						<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:60px;height:60px;margin:0 auto">
					</el-col>
					<el-col :span="12">
						<div style="height:25ox;line-height:25px">用户名:
							<span>尼古拉斯</span>
						</div>
						<div style="height:45ox;line-height:45px">添加时间:
							<span>2017/6/12</span>
						</div>
					</el-col>
				</el-row>
			</el-dialog>
	
		</section>
		<section v-show="!flag" style="padding:10px">
			<el-row>
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<p>用户基本信息</p>
				</el-col>
			</el-row>
	
			<el-row style="margin-top:20px;height:200px;padding:25px 10px;position:relative">
				<el-row style="height:45%">
					<el-col :span="6">
						<el-col :span="4" style="font-size:12px;height:36px;line-height:36px">
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
						备注:
						<span style="color:skyblue">(150/150)</span>
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
			<el-row style="border-bottom: 1px solid rgb(209, 229, 229)">
				<el-tabs v-model="activeName">
					<el-tab-pane label="房建" name="first">
						<el-tabs type="card">
							<el-tab-pane label="系统客户端">
								<el-carousel arrow="always" :interval="5000000">
									<el-carousel-item v-for="item in 2" :key="item" style="padding:0 5%">
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
								<el-carousel arrow="always">
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
			<!--项目授权-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;">项目授权</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-checkbox>已授权</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--工程授权-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">工程授权</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info" @click="authority_m">授权</el-button>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--工作集授权-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">工作集授权</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info" @click="authority_n">授权</el-button>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--Govern组织结构授权-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">Govern组织结构授权</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">为用户工程点击许可操作</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info" @click="authority_o">授权</el-button>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--Luban Explorer可见级别-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">Luban Explorer可见级别</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-input placeholder="请输入内容" style="width:270px;height:36px"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info" @click="authority_p">授权</el-button>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--iBan可上传工程-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">iBan可上传工程</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-input placeholder="请输入内容" style="width:270px;height:36px"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info" @click="authority_q">授权</el-button>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>全部工程</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--原BW-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">原BW</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-input placeholder="请输入内容" style="width:270px;height:36px"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info">授权</el-button>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!--视频监控-->
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px">视频监控</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-checkbox>查看和编辑</el-checkbox>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<el-row style="border-bottom: 1px solid rgb(209, 229, 229)">
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-row>
							<el-col :span="4">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px"></div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
									<el-col :span="8">
										<el-checkbox>预览</el-checkbox>
									</el-col>
									<el-col :span="16">
										<el-input placeholder="请输入内容"></el-input>
									</el-col>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:20px">
									<el-button type="info" @click="authority_r">授权</el-button>
								</div>
							</el-col>
							<el-col :span="2">
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
					<el-button type="info" style="float:right" @click='flag=true'>确定</el-button>
				</el-col>
				<el-col :span="6">
					<el-button type="info">取消</el-button>
				</el-col>
			</el-row>
	
			<!--dialog弹框-->
			<!--项目授权（树结构）-->
			<!--授权工程-->
			<el-dialog title="授权工程" v-model="authority_1" :close-on-click-modal="false">
				<el-row>
					<el-col :span="8">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<el-col :span="18">
							<el-input placeholder="请选择日期" icon="search">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info" style="margin-left:10px">重置</el-button>
						</el-col>
					</el-col>
				</el-row>
				<!--表格-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top:20px">
					<el-table-column type="selection" width="130">
					</el-table-column>
					<el-table-column type="index" label="序号" width="130">
					</el-table-column>
					<el-table-column prop="name" label="BIM属性">
					</el-table-column>
					<el-table-column prop="sex" label="专业">
					</el-table-column>
					<el-table-column prop="age" label="工程名称">
					</el-table-column>
					<el-table-column prop="birth" label="所属项目部">
					</el-table-column>
				</el-table>
				<el-row style="margin-top:30px">
					<el-col :span="12">
						<el-checkbox>已授权节点新上传工程时,自动授权</el-checkbox>
					</el-col>
					<el-col :span="12">
						<span style="float:right">共搜索到1568个工程，已选中432个工程</span>
					</el-col>
				</el-row>
				<el-row :gutter="30" style="margin-top:30px">
					<el-col :span="6" :offset="6">
						<el-button type="info" style="float:right" @click='authority_1=false'>确定</el-button>
					</el-col>
					<el-col :span="6">
						<el-button type="info">取消</el-button>
					</el-col>
				</el-row>
			</el-dialog>
			<!--授权工作集-->
			<el-dialog title="授权工作集" v-model="authority_2" :close-on-click-modal="false">
				<el-row>
					<el-col :span="8" :offset='16'>
						<el-col :span="18">
							<el-input placeholder="请选择日期" icon="search">
							</el-input>
						</el-col>
						<el-col :span="2">
							<el-button type="info" style="margin-left:10px">重置</el-button>
						</el-col>
					</el-col>
				</el-row>
				<!--表格-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top:20px">
					<el-table-column type="selection" width="200">
					</el-table-column>
					<el-table-column type="index" label="序号" width="200">
					</el-table-column>
					<el-table-column prop="age" label="工作集名称">
					</el-table-column>
					<el-table-column prop="birth" label="所属项目部">
					</el-table-column>
				</el-table>
				<el-row style="margin-top:30px">
					<el-col :span="12">
						<el-checkbox>已授权节点新上传工程时,自动授权</el-checkbox>
					</el-col>
					<el-col :span="12">
						<span style="float:right">共搜索到1568个工程，已选中432个工程</span>
					</el-col>
				</el-row>
				<el-row :gutter="30" style="margin-top:30px">
					<el-col :span="6" :offset="6">
						<el-button type="info" style="float:right" @click='authority_2=false'>确定</el-button>
					</el-col>
					<el-col :span="6">
						<el-button type="info">取消</el-button>
					</el-col>
				</el-row>
	
			</el-dialog>
			<!--编辑govern工作权限(树形结构)-->
			<el-dialog v-model="authority_3" :close-on-click-modal="false" style="width:0%" top='18%'>
			</el-dialog>
			<div class="quality-dialog" v-show="authority_3" style="width:25%;margin-left: -233px">
				<div class="quality-dialog-header">
					<el-row>
						<el-col :span="24" style="padding:0px 0 20px;border-bottom:1px solid #ddd;">
							<span style="font-weight:bolder">编辑govern工作权限</span>
							<el-icon class="el-icon-close" style="float:right" @click.native="authority_3=false"></el-icon>
						</el-col>
					</el-row>
				</div>
				<ul class="ztree" id="lineTree"></ul>
				<el-row style="margin:30px 0 0 28px">
					<el-col :span="24">
						<el-checkbox>已授权节点新上传工程时,自动授权</el-checkbox>
					</el-col>
				</el-row>
				<div class="quality-dialog-footer" style="margin-top:30px">
					<el-button type="primary" @click="authority_3=false">确定</el-button>
					<el-button type="primary" @click="">取消</el-button>
				</div>
	
				<!--<ul class="ztree" id="lineTree"></ul>-->
			</div>
			<!--可见级别授权-->
			<el-dialog title="可见级别授权" v-model="authority_4" :close-on-click-modal="false">
				<el-row>
					<el-col :span="8">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<el-col :span="18">
							<el-input placeholder="请选择日期" icon="search">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info" style="margin-left:10px">重置</el-button>
						</el-col>
					</el-col>
				</el-row>
	
				<!--表格-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top:20px">
					<el-table-column type="index" width="180" label="单位工程名称">
					</el-table-column>
					<el-table-column prop="name" label="专业" width="120">
					</el-table-column>
					<el-table-column prop="sex" label="工程类型" width="150" :formatter="formatSex">
					</el-table-column>
					<el-table-column prop="age" label="所属项目部" width="180">
					</el-table-column>
					<el-table-column label="级别" width="280">
						<template scope="scope">
							<div style="padding-left:30px">
								<el-checkbox></el-checkbox>
								<el-checkbox></el-checkbox>
								<el-checkbox></el-checkbox>
								<el-checkbox></el-checkbox>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<el-row style="margin-top:30px">
					<el-col :span="12">
						<el-checkbox>已授权节点新上传工程时,自动授权</el-checkbox>
					</el-col>
					<el-col :span="12">
						<span style="float:right">共搜索到1568个工程，已选中432个工程</span>
					</el-col>
				</el-row>
				<el-row :gutter="30" style="margin-top:30px">
					<el-col :span="6" :offset="6">
						<el-button type="info" style="float:right" @click='authority_4=false'>确定</el-button>
					</el-col>
					<el-col :span="6">
						<el-button type="info">取消</el-button>
					</el-col>
				</el-row>
			</el-dialog>
			<!--授权IBM可上传工程-->
			<el-dialog title="授权IBM可上传工程" v-model="authority_5" :close-on-click-modal="false">
				<el-row>
					<el-col :span="8">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<el-col :span="18">
							<el-input placeholder="请选择日期" icon="search">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info" style="margin-left:10px">重置</el-button>
						</el-col>
					</el-col>
				</el-row>
				<!--表格-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top:20px">
					<el-table-column type="selection" width="130">
					</el-table-column>
					<el-table-column type="index" label="序号" width="130">
					</el-table-column>
					<el-table-column prop="name" label="BIM属性">
					</el-table-column>
					<el-table-column prop="sex" label="专业">
					</el-table-column>
					<el-table-column prop="age" label="工程名称">
					</el-table-column>
					<el-table-column prop="birth" label="所属项目部">
					</el-table-column>
				</el-table>
				<el-row style="margin-top:30px">
					<el-col :span="12">
						<el-checkbox>已授权节点新上传工程时,自动授权</el-checkbox>
					</el-col>
					<el-col :span="12">
						<span style="float:right">共搜索到1568个工程，已选中432个工程</span>
					</el-col>
				</el-row>
				<el-row :gutter="30" style="margin-top:30px">
					<el-col :span="6" :offset="6">
						<el-button type="info" style="float:right" @click='authority_5=false'>确定</el-button>
					</el-col>
					<el-col :span="6">
						<el-button type="info">取消</el-button>
					</el-col>
				</el-row>
			</el-dialog>
			<!--授权监控-->
			<el-dialog title="授权监控" v-model="authority_6" :close-on-click-modal="false">
				<el-row>
					<el-col :span="8">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<el-col :span="18">
							<el-input placeholder="请选择日期" icon="search">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info" style="margin-left:10px">重置</el-button>
						</el-col>
					</el-col>
				</el-row>
				<!--表格-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top:20px">
					<el-table-column type="selection" width="130">
					</el-table-column>
					<el-table-column type="index" label="序号" width="130">
					</el-table-column>
					<el-table-column prop="name" label="BIM属性">
					</el-table-column>
					<el-table-column prop="sex" label="专业">
					</el-table-column>
					<el-table-column prop="age" label="工程名称">
					</el-table-column>
					<el-table-column prop="birth" label="所属项目部">
					</el-table-column>
				</el-table>
				<el-row style="margin-top:30px">
					<el-col :span="12">
						<el-checkbox>已授权节点新上传工程时,自动授权</el-checkbox>
					</el-col>
					<el-col :span="12">
						<span style="float:right">共搜索到1568个工程，已选中432个工程</span>
					</el-col>
				</el-row>
				<el-row :gutter="30" style="margin-top:30px">
					<el-col :span="6" :offset="6">
						<el-button type="info" style="float:right" @click='authority_6=false'>确定</el-button>
					</el-col>
					<el-col :span="6">
						<el-button type="info">取消</el-button>
					</el-col>
				</el-row>
			</el-dialog>
	
		</section>
	</div>
</template>

<script>
// 树结构
import "static/css/setting-qualityMeasure.css";
import "static/js/ztree/css/zTreeStyle_new.css";
import "static/js/ztree/js/jquery.ztree.core-3.5.js";
import "static/js/ztree/js/jquery.ztree.excheck-3.5.min.js";
const cityOptions = ['0', '1', '2', '3'];
export default {
	data() {
		return {
			checkedCities1: ['0'],
			cities: cityOptions,
			// 树结构数据
			setting: {
				view: {
					selectedMulti: false,
				},
				check: {
					enable: true
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					// beforeCheck: this.beforeCheck(),
					// onCheck: this.onCheck()
				}
			},
			zNodes: [
				{ id: 1, pId: 0, name: "随意勾选 1", open: true },
				{ id: 11, pId: 1, name: "随意勾选 1-1" },
				{ id: 12, pId: 1, name: "随意勾选 1-2", open: true },
				{ id: 121, pId: 12, name: "随意勾选 1-2-1" },
				{ id: 122, pId: 12, name: "随意勾选 1-2-2" },

				{ id: 2, pId: 0, name: "禁止勾选 2", open: true },
				{ id: 21, pId: 2, name: "禁止勾选 2-1" },
				{ id: 22, pId: 2, name: "禁止勾选 2-2" },
				{ id: 221, pId: 22, name: "禁止勾选 2-2-1" },
				{ id: 222, pId: 22, name: "禁止勾选 2-2-2" },
				{ id: 23, pId: 2, name: "禁止勾选 2-3" }
			],
			options: [{
				value: '选项1',
				label: '董事长'
			}, {
				value: '选项2',
				label: '项目经理'
			}, {
				value: '选项3',
				label: '商务经理'
			}, {
				value: '选项4',
				label: '生产经理'
			}, {
				value: '选项5',
				label: '总工'
			}],
			value: '全部',
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
			},
			{
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
			},
			{
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
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
				tag: '家'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄',
				tag: '公司'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄',
				tag: '家'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄',
				tag: '公司'
			}],
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
			},
			// 已授权服务界面
			authorizedVisible: false,
			// 授权工程
			authority_1: false,
			// 授权工作集
			authority_2: false,
			// 编辑govern工作权限
			authority_3: false,
			// 可见级别授权
			authority_4: false,
			// 授权IBM可上传工程
			authority_5: false,
			// 授权监控
			authority_6: false,

		}
	},
	methods: {
		formatter(row, column) {
			return row.address;
		},
		filterTag(value, row) {
			return row.tag === value;
		},
		//性别显示转换;
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
		handleIconClick(){
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
				this.total = 86;
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
			this.editFormVisible = true;
			// console.log(row);
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
		// 显示已授权页面
		handleAuthorized: function () {
			this.authorizedVisible = true;
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
		},
		// 添加人员的各种授权
		authority_m: function () {
			this.authority_1 = true;
		},
		authority_n: function () {
			this.authority_2 = true;
		},
		authority_o: function () {
			this.authority_3 = true;
		},
		authority_p: function () {
			this.authority_4 = true;
		},
		authority_q: function () {
			this.authority_5 = true;
		},
		authority_r: function () {
			this.authority_6 = true;
		},
		// ztree相关函数
		beforeCheck() {
		},
		onCheck() {
		},

	},
	mounted() {
		// this.getUsers();
		$.fn.zTree.init($("#lineTree"), this.setting, this.zNodes);
	},
}

</script>

<style scoped>
.inputStyle {
	width: 304px !important;
	height: 36px;
}

.bg-purple-light {
	font-size: 14px;
	color: grey;
}

.el-button {
	width: 90px;
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