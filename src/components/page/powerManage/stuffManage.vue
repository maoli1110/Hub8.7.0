<template>
	<div>
		<section style='margin-top:20px;' v-show='flag'>
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;height:60px;background:#ffffff;padding:10px 0;border-bottom:1px solid #e6e6e6;">
				<el-form :inline="true" :model="filters" style="padding-left:20px">
					<span style="display:inline-block;font-size:14px;height:36px;line-height:36px">角色: </span>
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
			<el-col :span="24" class="toolbar" style="background:#ffffff;padding-left:20px;">
				<el-form :inline="true" :model="filters" style="height:70px">
					<el-form-item style="padding: 20px 0;">
						<el-button type="primary" v-on:click="flag=false;sendRouterTitle()" style="width: 100px;height: 40px;">
							<span class="el-icon-plus"></span> 添加人员</el-button>
					</el-form-item>
					<el-form-item style="padding: 20px 0;">
						<el-button type="primary" @click="handleAdd" style="width: 100px;height: 40px;">
							<span class="el-icon-plus"></span> 批量添加</el-button>
					</el-form-item>
					<el-form-item style="padding: 20px 0;">
						<el-button type="primary" @click="handleAdd" style="width: 100px;height: 40px;">
							<span class="el-icon-delete"></span> 删除人员</el-button>
					</el-form-item>
					<el-form-item style="padding: 20px 0;">
						<el-button type="primary" @click="handlMemember" style="width: 100px;height: 40px;">
							<span class="el-icon-loading"></span> 成员管理</el-button>
					</el-form-item>
				</el-form>
				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top:10px;">
					<el-table-column type="selection" width="80">
					</el-table-column>
					<el-table-column type="index" width="100" label="序号">
					</el-table-column>
					<el-table-column prop="updateUser" label="用户名" width="100">
					</el-table-column>
					<el-table-column prop="sex" label="角色" width="120">
					</el-table-column>
					<el-table-column prop="processId" label="电话" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="邮箱" width="160">
					</el-table-column>
					<el-table-column prop="updateTime" label="更新时间" min-width="120" sortable :formatter="formatTime">
					</el-table-column>
					<el-table-column prop="remark" label="周活跃度" min-width="120" sortable>
					</el-table-column>
					<el-table-column prop="processName" label="备注" min-width="120">
					</el-table-column>
					<el-table-column label="操作" width="180">
						<template scope="scope">
							<!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>																								<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
							<el-icon class="el-icon-edit" style="color:#6595f2" @click.native="flag=!flag;sendRouterTitle()"></el-icon>
							<el-icon class="el-icon-message" style="color:#6595f2" @click.native="handleAuthorized(scope.$index, scope.row)"></el-icon>
							<el-icon class="el-icon-upload2" style="color:#6595f2" @click.native="handleEdit(scope.$index, scope.row)"></el-icon>
							<el-icon class="el-icon-document" style="color:#6595f2" @click.native="handleDetail(scope.$index, scope.row)"></el-icon>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
	
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination style='float:right' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[25, 50, 100, 150]" :page-size="25" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</el-col>
	
			<!--编辑界面-->
			<el-dialog title="设置电子签名" v-model="editFormVisible" :close-on-click-modal="false" size='tiny'>
	
				<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple style="width:359px;margin:0 auto">
	
					<div class="el-upload__text">
						<i class="el-icon-upload"></i>将文件拖到此处,或
						<em>点击上传</em>
					</div>
					<div class="el-upload__tip" slot="tip" style="color:red">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
	
				<div slot="footer" class="dialog-footer" style="text-align: center;">
					<el-button type="primary" @click.native="editFormVisible = false">确定</el-button>
					<el-button type="primary">取消</el-button>
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
			<!--成员管理-->
			<el-dialog title="查看服务详情" v-model="memberVisible" :close-on-click-modal="false" size='tiny'>
				<div style="height:20px;line-height:20px;border-top:1px solid #e6e6e6;text-align:center;padding-top:40px">设置
					<span style="color:#6595f2">“海南铺前大桥项目”
					</span>
				</div>
				<div style="height:40px;line-height:40px;text-align:center">项目成员职责
				</div>
				<el-row :gutter="30">
					<el-col :span="6" :offset='7'>
						<el-radio class="radio" v-model="radio" label="1">仅查看</el-radio>
					</el-col>
					<el-col :span="5">
						<el-radio class="radio" v-model="radio" label="2">管理</el-radio>
					</el-col>
				</el-row>
				<div slot="footer" class="dialog-footer" style="text-align: center;padding-bottom:40px">
					<el-button type="primary" @click.native="memberVisible = false">确定</el-button>
					<el-button type="primary">取消</el-button>
				</div>
			</el-dialog>
			<!-- 授权资料目录-->
			<el-dialog v-model="authorizedVisible" :close-on-click-modal="false" style="width:0">
			</el-dialog>
			<div class="quality-dialog" v-show="authorizedVisible" style="padding:0px 30px 30px 30px;width:465px;">
				<div class="quality-dialog-header">
					<el-row>
						<el-col :span="24" style="padding:20px 0px;border-bottom:1px solid #ddd;">
							<span style="font-weight:bolder">授权资料目录</span>
							<el-icon class="el-icon-close" style="float:right" @click.native="authorizedVisible=false"></el-icon>
						</el-col>
					</el-row>
				</div>
	
				<el-row :gutter="30" style="padding:20px 0;">
					<el-col :span="6">
						<el-radio class="radio" v-model="radio" label="1">手动分配</el-radio>
					</el-col>
					<el-col :span="6">
						<el-radio class="radio" v-model="radio" label="2">全部分配</el-radio>
					</el-col>
				</el-row>
	
				<el-row>
					<el-col :span="24">
						<el-input placeholder="请选择日期" icon="search">
						</el-input>
					</el-col>
	
				</el-row>
				<div style="overflow-y:auto;height:450px;margin-top:20px">
					<ul class="ztree" id="authorizedTree" style="margin-left:-9px"></ul>
				</div>
	
				<div slot="footer" class="dialog-footer" style="text-align: center;">
					<el-button @click.native="authorizedVisible=false">确定</el-button>
					<el-button type="primary">取消</el-button>
				</div>
	
				<!--<ul class="ztree" id="lineTree"></ul>-->
			</div>
	
			<!--服务详情-->
			<el-dialog title="查看服务详情" v-model="detailVisible" :close-on-click-modal="false">
				<div style="height:40px;line-height:40px;border-top:1px solid #e6e6e6">当前人员
					<span style="color:#6595f2">李俊珅</span>已分配以下服务</div>
				<el-table style="width: 100%">
					<el-table-column prop="date" label="套餐服务">
					</el-table-column>
					<el-table-column prop="name" label="服务内容">
					</el-table-column>
					<el-table-column prop="address" label="服务到期时间">
					</el-table-column>
				</el-table>
				<div slot="footer" class="dialog-footer" style="text-align: center;">
					<el-button type="primary" @click.native="detailVisible = false">确定</el-button>
				</div>
			</el-dialog>
	
		</section>
		<section v-show="!flag">
			<el-row>
				<el-col :span="24" class="toolbar" style="padding-left: 10px;height: 60px;background-color: #fff;box-shadow: 1px 0 6px #cccaca;">
					<p style="font-size: 18px;font-weight: 700;line-height: 60px">用户基本信息</p>
				</el-col>
			</el-row>
	
			<el-row style="margin-top:20px;padding:30px 10px;position:relative;background-color: #fff;box-shadow: 1px 0 6px #cccaca;">
				<el-col :span="16">
					<el-row style="">
						<el-col :span="10">
							<span style="margin-right:9px;font-size:12px">用户名:</span>
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
						<el-col :span="10">
							<span style="margin-right:21px;font-size:12px">角色名:</span>
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-row>
					<el-row style="margin-top:20px">
						<el-col :span="10">
							<span style="margin-right:20px;font-size:12px">密码:</span>
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
						<el-col :span="10">
							<span style="margin-right:9px;font-size:12px">确认密码:</span>
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-row>
					<el-row style="margin-top:20px">
						<el-col :span="10">
							<span style="margin-right:20px;font-size:12px">电话:</span>
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
						<el-col :span="10">
							<span style="margin-right:33px;font-size:12px">邮箱:</span>
							<el-input placeholder="请输入内容" class='inputStyle'></el-input>
						</el-col>
					</el-row>
				</el-col>
				<!--备注-->
				<el-col :span="6">
					<el-row>
						<el-col :span="2" style="font-size:12px">备注:
						</el-col>
						<el-col :span="12">
							<el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" placeholder="请输入内容" style="width:166%;height:148px" @change='change' v-model="textarea" :maxlength='150'>
							</el-input>
						</el-col>
					</el-row>
					<el-col>
						<span style="float:right;position:relative;top:-6px;left:-11%;font-size:12px">(
							<span style="color:#6595f2;">{{remainLength}}</span>/150)</span>
					</el-col>
				</el-col>
			</el-row>
	
			<el-row style="margin-top:20px;">
				<el-col :span="24" class="toolbar" style="padding-left: 10px;height: 60px;border-bottom:1px solid #e6e6e6;background-color: #fff;">
					<p style="font-size: 18px;font-weight: 700;line-height: 60px">功能节点授权</p>
				</el-col>
			</el-row>
			<!--表格切换-->
			<el-row style="background-color:#fff;">
				<el-tabs v-model="activeName">
					<el-tab-pane label="房建" name="first">
						<el-row style="background-color:#fff;padding-left:20px">
							<el-col :span="2" v-for='(item,index) in 5'>
								<div style="text-align: center;width:132px;height:40;line-height:40px" :class="{'check':index==currentIndex}" @click="currentIndex=index">
									<span style="font-size:16px">系统客户端</span>
								</div>
							</el-col>
						</el-row>
						<el-row style="margin-top:20px;padding-left:20px">
							<el-carousel arrow="always" :interval="5000000" v-for='(item,index) in 5' v-if="index==currentIndex">
								<el-carousel-item style="padding:0 5%">
									<div v-for="(o, index) in powerProduct" :key="o" :offset="0" style="width:9%;float:left;margin:35px 0 0 2%">
										<el-card :body-style="{ padding: '0px' }">
											<div style="height:20px;padding:2% 8px 23px 0 ">
												<el-button type="text" style="float:right">
													<span class="el-icon-star-on" style="float:right;color:#7fc977;" @click='setAuthoried(index)' v-show='o==1'> 已授权</span>
													<span class="el-icon-star-on" style="float:right;color:#d78387;" @click='setUnauthoried(index)' v-show='o==0'> 未授权</span>
												</el-button>
											</div>
											<div style="text-align: center;border-bottom: 1px solid #c8c8c8;">
												<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:64px;height:64px;margin:0 auto">
												<span style="margin:14px 0 14px 0;display:inline-block">Luban Explorer</span>
											</div>
											<div>
												<div class="bottom clearfix" style="padding:10px 0 ">
													<p class="time">全部授权数:
														<span>{{index}}</span>
													</p>
													<p class="time">可用授权数:
														<span>50</span>
													</p>
												</div>
											</div>
										</el-card>
									</div>
									<span>{{currentIndex}}</span>
								</el-carousel-item>
							</el-carousel>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="市政" name="second">
						<el-row style="background-color:#fff;padding-left:20px">
							<el-col :span="2" v-for='(item,index) in 5'>
								<div style="text-align: center;width:132px;height:40;line-height:40px" :class="{'check':index==currentIndex}" @click="currentIndex=index">
									<span style="font-size:16px">系统客户端</span>
								</div>
							</el-col>
						</el-row>
						<el-row style="margin-top:20px;padding-left:20px">
							<el-carousel arrow="always" :interval="5000000" v-for='(item,index) in 5' v-show="index==currentIndex">
								<el-carousel-item style="padding:0 5%">
									<div v-for="(o, index) in powerProduct" :key="o" :offset="0" style="width:9%;float:left;margin:35px 0 0 2%">
										<el-card :body-style="{ padding: '0px' }">
											<div style="height:20px;padding:2% 8px 23px 0 ">
												<el-button type="text" style="float:right">
													<span class="el-icon-star-on" style="float:right;color:#7fc977;" @click='setAuthoried(index)' v-show='o==1'> 已授权</span>
													<span class="el-icon-star-on" style="float:right;color:#d78387;" @click='setUnauthoried(index)' v-show='o==0'> 未授权</span>
												</el-button>
											</div>
											<div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
												<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:64px;height:64px;margin:0 auto">
												<span style="margin:14px 0 14px 0;display:inline-block">Luban Explorer</span>
											</div>
											<div>
												<div class="bottom clearfix" style="padding:10px 0 ">
													<p class="time">全部授权数:
														<span>{{index}}</span>
													</p>
													<p class="time">可用授权数:
														<span>50</span>
													</p>
												</div>
											</div>
										</el-card>
									</div>
									<span>{{currentIndex}}</span>
								</el-carousel-item>
							</el-carousel>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="精装" name="third">
						<el-row style="background-color:#fff;padding-left:20px">
							<el-col :span="2" v-for='(item,index) in 5'>
								<div style="text-align: center;width:132px;height:40;line-height:40px" :class="{'check':index==currentIndex}" @click="currentIndex=index">
									<span style="font-size:16px">系统客户端</span>
								</div>
							</el-col>
						</el-row>
						<el-row style="margin-top:20px;padding-left:20px">
							<el-carousel arrow="always" :interval="5000000" v-for='(item,index) in 5' v-show="index==currentIndex">
								<el-carousel-item style="padding:0 5%">
									<div v-for="(o, index) in powerProduct" :key="o" :offset="0" style="width:9%;float:left;margin:35px 0 0 2%">
										<el-card :body-style="{ padding: '0px' }">
											<div style="height:20px;padding:2% 8px 23px 0 ">
												<el-button type="text" style="float:right">
													<span class="el-icon-star-on" style="float:right;color:#7fc977;" @click='setAuthoried(index)' v-show='o==1'> 已授权</span>
													<span class="el-icon-star-on" style="float:right;color:#d78387;" @click='setUnauthoried(index)' v-show='o==0'> 未授权</span>
												</el-button>
											</div>
											<div style="text-align: center;border-bottom: 1px solid rgb(209, 229, 229);">
												<img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image" style="width:64px;height:64px;margin:0 auto">
												<span style="margin:14px 0 14px 0;display:inline-block">Luban Explorer</span>
											</div>
											<div>
												<div class="bottom clearfix" style="padding:10px 0 ">
													<p class="time">全部授权数:
														<span>{{index}}</span>
													</p>
													<p class="time">可用授权数:
														<span>50</span>
													</p>
												</div>
											</div>
										</el-card>
									</div>
									<span>{{currentIndex}}</span>
								</el-carousel-item>
							</el-carousel>
						</el-row>
					</el-tab-pane>
				</el-tabs>
				<el-row style="background-color:#fff;padding:20px 0 38px 20px;border-top: 1px solid #e6e6e6;">
					<!--项目授权-->
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple">
								<el-row>
									<el-col :span="4">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">项目授权</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程,已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" @click="authority_m" class="button_size">授权</el-button>
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
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">工程授权</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程,已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" @click="authority_m" v-if='!checked' class="button_size">授权</el-button>
											<el-button type="primary" :disabled="true" v-else='checked' class="button_size">授权</el-button>
										</div>
									</el-col>
									<el-col :span="1">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px;padding-left:20px">
											<el-checkbox v-model="checked">全部工程</el-checkbox>
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
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">工作集授权</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程,已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" @click="authority_n" v-if='!checked' class="button_size">授权</el-button>
											<el-button type="primary" :disabled="true" v-else='checked' class="button_size">授权</el-button>
										</div>
									</el-col>
									<el-col :span="1">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px;padding-left:20px">
											<el-checkbox v-model="checked">全部工程</el-checkbox>
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
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">Govern组织结构授权</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程,已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" @click="authority_o" v-if='!checked' class="button_size">授权</el-button>
											<el-button type="primary" :disabled="true" v-else='checked' class="button_size">授权</el-button>
										</div>
									</el-col>
									<el-col :span="1">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px;padding-left:20px">
											<el-checkbox v-model="checked">全部工程</el-checkbox>
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
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">Luban Explorer可见级别</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程,已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" @click="authority_p" v-if='!checked' class="button_size">授权</el-button>
											<el-button type="primary" :disabled="true" v-else='checked' class="button_size">授权</el-button>
										</div>
									</el-col>
									<el-col :span="1">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px;padding-left:20px">
											<el-checkbox v-model="checked">全部工程</el-checkbox>
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
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">iBan可上传工程</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程,已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" @click="authority_q" v-if='!checked' class="button_size">授权</el-button>
											<el-button type="primary" :disabled="true" v-else='checked' class="button_size">授权</el-button>
										</div>
									</el-col>
									<el-col :span="1">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px;padding-left:20px">
											<el-checkbox v-model="checked">全部工程</el-checkbox>
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
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">原BW</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程,已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" class="button_size">授权</el-button>
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
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;font-weight:bold">视频监控</div>
									</el-col>
								</el-row>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple">
								<el-col :span="4">
									<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
										<el-checkbox>查看和编辑</el-checkbox>
									</div>
								</el-col>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple">
								<el-row>
									<el-col :span="4">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px">
											<el-checkbox>预览</el-checkbox>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px">
											共
											<span style="color:#6595f2">123</span>个工程，已授权
											<span style="color:#6595f2">31</span>个工程
										</div>
									</el-col>
									<el-col :span="2">
										<div class="grid-content bg-purple" style="height:45px;line-height:45px;padding-left:30px">
											<el-button type="info" @click="authority_r" v-if='!checked' class="button_size">授权</el-button>
											<el-button type="primary" :disabled="true" v-else='checked' class="button_size">授权</el-button>
										</div>
									</el-col>
									<el-col :span="1">
										<div class="grid-content bg-purple-light" style="height:45px;line-height:45px;padding-left:20px">
											<el-checkbox v-model="checked">全部工程</el-checkbox>
										</div>
									</el-col>
								</el-row>
							</div>
						</el-col>
					</el-row>
					<!--确定取消-->
				</el-row>
				<el-row style="background-color:#fff;padding:40px 0;border-top: 1px solid #e6e6e6;maigin-top:20px">
					<el-col :span="24" style="text-align:center">
						<el-button type="info" @click='flag=true;sendRouterTitle()'>确定</el-button>
						<el-button type="info">取消</el-button>
					</el-col>
				</el-row>
	
			</el-row>
	
			<!--dialog弹框-->
			<!--项目授权（树结构）-->
			<!--授权工程-->
			<el-dialog title="授权工程" v-model="authority_1" :close-on-click-modal="false">
				<el-row>
					<el-col :span="5">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="12">
						<el-col :span="12">
							<el-input placeholder="请选择日期" icon="search" style="width:93%;">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info">重置</el-button>
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
					<el-col :span="24">
						<el-col :span="6">
							<el-input placeholder="请选择日期" icon="search" style="width:93%;">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info">重置</el-button>
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
			<div class="quality-dialog" v-show="authority_3" style="padding:20px;width:485px;height:658px">
				<div class="quality-dialog-header">
					<el-row>
						<el-col :span="24" style="padding:0px 0 20px;border-bottom:1px solid #ddd;">
							<span style="font-weight:bolder">编辑govern工作权限</span>
							<el-icon class="el-icon-close" style="float:right" @click.native="authority_3=false"></el-icon>
						</el-col>
					</el-row>
				</div>
				<div style="overflow-y:auto;height:450px;margin-top:20px">
					<ul class="ztree" id="lineTree" style="margin-left:-9px"></ul>
				</div>
				<el-row style="margin:30px 0 40px 0px">
					<el-col :span="24">
						<el-checkbox>已授权节点新上传工程时,自动授权</el-checkbox>
					</el-col>
				</el-row>
				<div slot="footer" class="dialog-footer" style="text-align: center;">
					<el-button type="primary" @click.native="authority_3=false">确定</el-button>
					<el-button type="primary">取消</el-button>
				</div>
	
				<!--<ul class="ztree" id="lineTree"></ul>-->
			</div>
			<!--可见级别授权-->
			<el-dialog title="可见级别授权" v-model="authority_4" :close-on-click-modal="false">
				<el-row>
					<el-col :span="5">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="12">
						<el-col :span="12">
							<el-input placeholder="请选择日期" icon="search" style="width:93%;">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info">重置</el-button>
						</el-col>
					</el-col>
				</el-row>
				<!--<div style="position:absolute;right:64px;top:135px;z-index:10">
																<el-radio-group v-model="radio2">
																	<el-radio :label="0" style="">默认</el-radio>
																	<el-radio :label="1" style="">I级</el-radio>
																	<el-radio :label="2" style="">II级</el-radio>
																	<el-radio :label="3" style="">III级</el-radio>
																</el-radio-group>
															</div>-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top:20px">
					<el-table-column type="index" width="180" label="单位工程名称">
					</el-table-column>
					<el-table-column prop="name" label="专业" width="100">
					</el-table-column>
					<el-table-column prop="sex" label="工程类型" width="150">
					</el-table-column>
					<el-table-column prop="age" label="所属项目部" width="120">
					</el-table-column>
					<el-table-column label="级别" width="360">
						<template scope="scope">
							<div style="padding-left:70px">
								<el-radio-group v-model="radio2">
									<el-radio :label="0" style="color:#fff">默认</el-radio>
									<el-radio :label="1" style="color:#fff">I级</el-radio>
									<el-radio :label="2" style="color:#fff">II级</el-radio>
									<el-radio :label="3" style="color:#fff">III级</el-radio>
								</el-radio-group>
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
					<el-col :span="5">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="12">
						<el-col :span="12">
							<el-input placeholder="请选择日期" icon="search" style="width:93%;">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info">重置</el-button>
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
					<el-col :span="5">
						<span>工程专业:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<span>BIM属性:</span>
						<el-select v-model="value" placeholder="请选择" style="width:94px;height:20px">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="12">
						<el-col :span="12">
							<el-input placeholder="请选择日期" icon="search" style="width:93%;">
							</el-input>
						</el-col>
						<el-col :span="6">
							<el-button type="info">重置</el-button>
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
import { getUserListPage } from '../../../api/getData.js';
const cityOptions = ['0', '1', '2', '3'];
export default {
	data() {
		return {
			radio: '1',
			radio2: 3,
			checked: true,
			powerProduct: [1, 0, 1, 1, 1, 1, 1, 0],
			checkedCities1: ['0'],
			currentIndex: 0,
			cities: cityOptions,
			textarea: '',
			remainLength: '150',
			disabled: false,
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
			users: [],
			total: 0,
			page: 1,
			pageSize: 0,
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
			detailVisible: false,
			memberVisible: false,
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

		// 触发父级的路由标题是否隐藏
		sendRouterTitle() {
			this.$emit('connect');
		},
		change() {
			let txtVal = this.textarea.length;
			this.remainLength = 150 - txtVal;
		},
		// 设置授权
		setAuthoried(index) {
			this.$set(this.powerProduct, index, 0);
			console.log(this.powerProduct)
		},
		// 设置未授权
		setUnauthoried(index) {
			this.$set(this.powerProduct, index, 1);
			console.log(this.powerProduct)
		},
		formatter(row, column) {
			return row.address;
		},
		filterTag(value, row) {
			return row.tag === value;
		},
		//时间戳转换;
		formatTime: function (row, column) {
			const now = new Date(row.updateTime),
				year = now.getFullYear(),
				month = now.getMonth() + 1 > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
				date = now.getDate(),
				hour = now.getHours(),
				minute = now.getMinutes() > 10 ? now.getMinutes() : '0' + now.getMinutes();
			return year + "-" + month + "-" + date + " " + hour + ":" + minute
		},
		handleCurrentChange(val) {
			this.page = val;
			console.log(this.page);
			this.getUsers();
		},
		handleSizeChange(val) {
			this.page = val;
			this.getUsers();
		},
		handleIconClick() {
			this.getUsers();
		},
		//获取用户列表
		getUsers() {
			let para = {
				page: this.page,
				// name: this.filters.name
			};
			this.listLoading = true;
			//NProgress.start();
			getUserListPage(para).then((res) => {				
				this.listLoading = false;
				this.users = res.data.result;
				this.total = res.data.pageInfo.totalNumber;
				this.pageSize = res.data.pageInfo.pageSize;

			})
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
		handleAuthorized: function (index, row) {
			this.authorizedVisible = true;
			console.log(row.remark);


		},
		// 显示授权资料目录
		handleDetail: function () {
			this.detailVisible = true;
		},
		handlMemember: function () {
			this.memberVisible = true;
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
		this.getUsers();

		$.fn.zTree.init($("#lineTree"), this.setting, this.zNodes);
		$.fn.zTree.init($("#authorizedTree"), this.setting, this.zNodes);
	},
}

</script>

<style scoped>
.inputStyle {
	width: 71%;
	min-width: 163px;
	height: 36px;
}

.bg-purple-light {
	font-size: 14px;
	color: grey;
}

.time {
	font-size: 13px;
	color: #263047;
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

.quality-dialog {
	height: 668px;
	position: fixed;
	left: 50%;
	top: 50%;
	margin-left: -312px;
	margin-top: -332px;
	background: #fff;
	z-index: 9999;
	border-radius: 5px;
}

.check {
	background-color: #e6e6e6;
	border-radius: 4px;
	color: #6595f2;
	font-weight: 700;
}

.button_size {
	width: 90px;
	height: 36px;
}
</style>
