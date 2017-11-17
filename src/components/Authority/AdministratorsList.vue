<template>
    <div>
        <div class="admin-main">
            <div>
                <el-button type="primary" class="basic-btn" icon="plus" @click="addAdminDialogVisible=true;addAdmin()">
                    新增管理员
                

                </el-button>
                <el-button type="primary" class="basic-btn" icon="delete" @click="cancleAdmin()">取消权限</el-button>
                <el-input placeholder="请选择日期" icon="search" style="float:right;width:210px"></el-input>
            </div>
            <el-table ref="multipleTable" :data="roleTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="pass" label="通行证账号" width="250">
                </el-table-column>
                <el-table-column label="管理范围" width="400">
                    <template slot-scope="scope">
                        <div :title="scope.row.remarks" class="textcell">
                            {{ scope.row.remarks }}




                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="权限范围" width="400">
                    <template slot-scope="scope">
                        <div :title="scope.row.remarks" class="textcell">
                            {{ scope.row.remarks }}




                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="250">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span type="primary" class="el-icon-edit" @click="editRole(scope.row.id)"></span>
                    </template>
                </el-table-column>
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
        <el-dialog title="新增管理员" :visible.sync="addAdminDialogVisible" size='add-admin'>
            <div class="el-form-item">
                <label class="el-form-item__label" style="text-align:left;width:45px">角色：</label>
                <div class="el-form-item__content" style="margin-left: 45px;">
                    <el-select v-model="checkedCities" placeholder="请选择" class="admin-select"
                               @click.native="closeSelect()"
                               multiple
                               @visible-change.native='visibleChange(v)'
                               style="width:100%">
                        <el-option v-show="false"
                                   v-for="item in cities"
                                   :key="item"
                                   :label="item"
                                   :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:45px;border:1px solid #e6e6e6" class="select-dropdown">
                    <div style="padding:10px">
                        <el-input placeholder="请选择" icon="search"></el-input>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"
                                           style="margin-top:22px">
                            <el-checkbox v-for="city in cities" :label="city" :key="city" :title="city"
                                         class="add-admin-group">{{city}}


                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="padding:10px;border-top:1px solid #e6e6e6">
                        <div style="float:left">没有找到，点击

                            <el-button type="text"><span style="font-size:14px;font-weight:700">添加成员</span>
                            </el-button>
                        </div>
                        <el-button type="primary" class="dialog-btn select-dialog-btn" style="margin-left:70px"
                                   @click="saveSelect()">确 定

                        </el-button>
                        <el-button class="dialog-btn select-dialog-btn" @click="cancleSelect()">取消</el-button>
                    </div>
                </div>
            </div>

            <!-- <div slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="primary" class="dialog-btn">确 定</el-button>
                <el-button @click="addAdminDialogVisible = false" class="dialog-btn">取消</el-button>
            </div> -->
        </el-dialog>

    </div>

</template>
<script>
    import "../../../static/zTree/js/jquery.ztree.core.min.js";
    import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
    const cityOptions = [
        "上海",
        "北京",
        "广州",
        "深圳",
        "合肥",
        "上海111",
        "北京22222222222222222222",
        "广州2",
        "深圳3",
        "合肥4",
        "上海3",
        "北京7",
        "广州5",
        "深55圳",
        "合555肥"
    ];
    export default {
        data() {
            return {
                visible: true,
                url: "../../../static/tree1.json",
                cacheProjectTree: [],
                addAdminDialogVisible: false,
                textarea: "",
                checkedCities: ["上海", "北京"],
                cities: cityOptions,
                roles: [],
                roleTableData: [
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark55555555555555555555555555555555555"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    },
                    {
                        name: "赵四",
                        pass: 55556549894956,
                        date: "2016-05-03 13:51",
                        remarks: "超长remark"
                    }
                ],
                options: [
                    {
                        value: "选项1",
                        label: "黄金糕"
                    },
                    {
                        value: "选项2",
                        label: "双皮奶"
                    },
                    {
                        value: "选项3",
                        label: "蚵仔煎"
                    },
                    {
                        value: "选项4",
                        label: "龙须面"
                    },
                    {
                        value: "选项5",
                        label: "北京烤鸭"
                    }
                ],
                multipleSelection: []
            };
        },

        methods: {
            orgTreeClick(event, treeId, treeNode) {
                this.orgValue = treeNode.name;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            dialogOrgTreeClick(event, treeId, treeNode) {
                this.ruleForm.attribution = treeNode.name;
                setTimeout(() => {
                    $(".el-select-dropdown__item.selected").click();
                }, 100);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleCheckedCitiesChange(value) {
            },
            cancleAdmin() {
            },
            addAdmin() {
            },
            closeSelect(){
                 $(".select-dropdown").slideToggle('fast');
            },
            saveSelect(){
                $(".select-dropdown").slideToggle('fast');
            },
            cancleSelect(){
                this.checkedCities = [];
                $(".select-dropdown").slideToggle('fast');

            },
            visibleChange(v){
                console.log(v)
            }
        },
        mounted() {
        }
    };
</script>
<style scoped>
    .header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
    }

    .ztree {
        margin-top: 0px;
        width: 205px;
    }

    .admin-main {
        padding: 20px;
        background-color: #fff;
    }

    .textcell {
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .el-checkbox:nth-child(1) {
        width: 120px;
        height: 40px;
    }

    .el-checkbox + .el-checkbox {
        width: 120px;
        height: 40px;
        margin-left: 0px;
    }

    .select-dialog-btn {
        width: 90px;
        height: 36px;
        line-height: 0px;
    }
    .select-dropdown{
      display: none;
      width:634px;
      position: absolute;
    }
</style>




