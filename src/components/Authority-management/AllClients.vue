<template>
    <div>
        <div class="header">
            <span class="online-number">所有客户端在线人数：<span></span>个</span>
        </div>
        <div class="main">
            <el-table ref="multipleTable" :data="memberTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px">
                <el-table-column type='index' label="序号" width="150"></el-table-column>
                <el-table-column prop="name" label="名称（帐号）"></el-table-column>
                <el-table-column prop="role" label="角色"></el-table-column>
                <el-table-column label="登录时间"></el-table-column>
                <el-table-column prop="email" label="时长"></el-table-column>
            </el-table>
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
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped>
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
        line-height: 40px;
    }

    .main {
        padding: 0 20px;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
    }

    .online-number {
        font-size: 12px;
        color: #263147;
    }
</style>
