<template>
    <div class="main-shadow">
        <div style="margin-top: 20px;">
        	<div class="header">
        		<span>项目信息</span><span class="active">京能阳光海岸项目</span>
	            <el-input
	                placeholder="搜索鲁班通行证或人员姓名"
	                icon="search"
	                v-model="xx"
	                :on-icon-click="searchContent"
	                style="width: 280px; float: right;">
	            </el-input>
            </div>

           <div class="bims-container">
		        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
		            <el-menu-item index="/configuration/o-bw/projectLib/1">给排水+电器</el-menu-item>
		            <el-menu-item index="/configuration/o-bw/completed/1">给排水+电器+暖通</el-menu-item>
		            <el-menu-item index="/configuration/o-bw/recycle/1">给排水+电器+消防+弱点</el-menu-item>
		        </el-menu>
		    </div>
		    <div class="main">
	            <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
	                <el-table ref="multipleTable" class="scroll-me" :data="coinsManagementTableData" border tooltip-effect="dark"
	                          style="min-width: 1537px;margin-top:20px">
	                    <el-table-column class="table-tr" prop="ip" label="项目名称" width=""></el-table-column>
	                    <el-table-column class="table-tr" prop="func" label="楼层" width="200"></el-table-column>
	                    <el-table-column class="table-tr" prop="operator" label="大小" width="200"></el-table-column>
	                    <el-table-column class="table-tr" prop="operator" label="上传人" width="200"></el-table-column>
	                    <el-table-column class="table-tr" :formatter="dateFormat" prop="operateTime" label="上传时间" width="200"></el-table-column>
	                    <el-table-column class="table-tr" :formatter="dateFormat" prop="operateTime" label="状态" width="200"></el-table-column>
	                    <el-table-column class="table-tr" :formatter="dateFormat" prop="operateTime" label="碰撞事件" width="200"></el-table-column>
	                </el-table> 
	            </vue-scrollbar>
	            <div class="pagination">
                    <div style="margin-top: 20px">
                        <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                        <el-pagination style="margin-left:30%"
                                       @size-change="handleSizeChange"
                                       @current-change="handleCurrentChange"
                                       :current-page="4"
                                       :page-sizes="[100, 200, 300, 400]"
                                       :page-size="100"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :total="400">
                        </el-pagination>
                    </div>
                </div>
	        </div>
	    </div>
    </div>
</template>

<script>
    import VueScrollbar from '../../../static/scroll/vue-scrollbar.vue'
    export default {
    	created(){
            this.activeIndex = this.$route.path;
        },
        data (){
            return {
            	activeIndex:"",
                coinsManagementTableData: [{
                          "epid": 1,
                          "func": "string",
                          "ip": "string",
                          "operateTime": "2017-12-06T07:14:39.085Z",
                          "operator": "string",
                          "target": "string"
                        },
                        {
                          "epid": 1,
                          "func": "string",
                          "ip": "string",
                          "operateTime": "2017-12-06T07:14:39.085Z",
                          "operator": "string",
                          "target": "string"
                        }]
            }
        },
        components: {
            VueScrollbar
        },
        methods: {
            indexSort(){
                //序号
                return index * 1;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .container .el-menu {
        padding: 10px 20px;
        border-bottom: 1px solid #e6e6e6;
    }

    .container .el-menu .el-menu-item {
        height: 40px;
        min-width: 132px;
        margin-right: 50px;
        line-height: 40px;
        text-align: center
    }

    .container .is-active {
        background-color: #f5f8fd;
        font-size: 16px;
        font-weight: 700;
    }

    .container .el-menu .el-menu-item:hover {
        background-color: #f5f8fd;
    }
    .header {
      height: 40px;
      background-color: #fff;
      padding: 10px 20px;
      margin-top: 20px;
      border-bottom: 1px solid #e6e6e6;
    }
    .header span{
    	line-height: 40px;
    	display: inline-block;
    	font-size: 14px;
    	cursor: pointer;
    }
    .header span:before{
    	content: ">";
    	width: 48px;
    	text-align: center;
    	display: inline-block;
    }
    .header span:nth-of-type(1):before{
    	content: "";
    	width: 0px;
    }
    .header span.active{
    	color: #6595f2;
    }
    .header .el-form-item__label {
      text-align: left;
    }
    .ztree {
      margin-top: 0px;
      width: 205px;
    }
    .main {
      padding: 20px;
      background-color: #fff;
    }
    .textcell {
      height: 46px;
      padding: 0 20px;
      line-height: 46px;
      overflow: hidden;
      text-overflow: ellipsis;
      box-sizing: border-box;
      white-space: nowrap;
    }
</style>
