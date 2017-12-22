<template>
    <div>
        <div class="header">
        </div>

        <div class="main">
            <el-table :data="list" style="width: 100%">
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
<<<<<<< HEAD
                <el-table-column prop="projAttr" label="工程性质" width="500" align='left'>
                    <!-- <template slot-scope="scope">
=======
                <el-table-column prop="name" label="工程性质" width="500" align='left'>
                    <template slot-scope="scope">
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                        <div slot="reference" class="name-wrapper textcell" @mouseenter='mouseEnter(scope.row)' @mouseleave='mouseLeave(scope.row)'
                            style="position:relative">
                            <span v-show="!scope.row.edit">{{ scope.row.title }}</span>
                            <el-input v-show="scope.row.edit" size="small" @keyup.enter.native="scope.row.edit=!scope.row.edit" v-model="scope.row.title"></el-input>
                            <span v-show="scope.row.editShow" :class="scope.row.edit?'el-icon-document':'el-icon-edit'" style="position:absolute;right:2px;top:18px;color:#6595f2;cursor:pointer;font-size:14px"
                                @click="scope.row.edit=!scope.row.edit"></span>
<<<<<<< HEAD
                        </div> 
                    </template>-->
                </el-table-column>
                <el-table-column prop="projAttrNickName" label="名称" width="">
                </el-table-column>
                <el-table-column label="审核分析" width="300">
                <!-- attrConfig --> 
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.attrConfig==1?true:false" @change="changeList(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="关联进度" width="300">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.timeType" placeholder="请选择" style="width:70%" @change="changeList(scope.row)">
=======
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="名称" width="250">
                </el-table-column>
                <el-table-column label="审核分析" width="250">
                    <template slot-scope="scope">
                        <el-checkbox></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="关联进度" width="250">
                    <template slot-scope="scope">
                        <el-select v-model="role" placeholder="请选择" style="width:70%">
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
<<<<<<< HEAD
            </el-table>

            <el-button type="primary" class="basic-btn save-btn"
                       @click="saveProjAttrs">保存
            </el-button>
            <!-- <infinite-loading @infinite="infiniteHandler">
                <span slot="no-more">
                    我是有底线的人 滚够了吧！:(
                </span>
            </infinite-loading> -->
=======
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="icon-edit_   icon"></span>
                    </template>
                </el-table-column>
            </el-table>
            <infinite-loading @infinite="infiniteHandler">
                <span slot="no-more">
                    我是有底线的人 滚够了吧！:(
                </span>
            </infinite-loading>
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
        </div>

        <div>
        </div>
    </div>

    </div>
</template>
<style>
    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }

</style>
<script>
    import InfiniteLoading from "vue-infinite-loading";
<<<<<<< HEAD
    import {getProjAttrs,updateProjAttrs} from '../../api/getData-cxx.js';
    import {basePath} from '../../utils/common.js'
    //const api = "http://hn.algolia.com/api/v1/search_by_date?tags=story";
=======
    const api = "http://hn.algolia.com/api/v1/search_by_date?tags=story";
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
    export default {
        components: {
            InfiniteLoading
        },
        data() {
            return {
<<<<<<< HEAD
                
                isEdit: false,
                options: [{
                        value: 1,
                        label: "计划进度"
                    },
                    {
                        value: 2,
                        label: "实际进度"
                    },
=======
                isEdit: false,
                options: [{
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
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                ],
                editTemplateDialogVisible: false,
                editAttributesDialogVisible: false,
                orgValue: "",
                role: "",
                list: [],
                FolderTableData: [],
                multipleSelection: []
            };
        },
        methods: {
<<<<<<< HEAD
            changeList(row){
                this.list.forEach(function( value,index, array) {
                  if(value.id == row.id){
                    value.timeType = row.timeType;
                    value.attrConfig  = !value.attrConfig?1:0
                  }
                })
            },
            saveProjAttrs(){
                let vm = this;
                let baseUrl = basePath(this.$route.matched[2].path);
                let params = {'url':baseUrl,'projAttrs':vm.list}
                updateProjAttrs(params).then(function (res) {
                    if(res.data.msg == "success"){
                       vm.$message({
                          message: '修改成功',
                          type: 'success'
                        });
                    }
                })
                },
=======
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
            mouseEnter(row) {
                if (!row.editShow) {
                    row.editShow = !row.editShow;
                }
            },
            mouseLeave(row) {
                if (row.editShow) {
                    row.editShow = !row.editShow;
                }
            },
            infiniteHandler($state) {
<<<<<<< HEAD
                /*this.$axios
=======
                this.$axios
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
                    .get(api, {
                        params: {
                            page: this.list.length / 20 + 1
                        }
                    })
                    .then(({
                        data
                    }) => {
                        if (data.hits.length) {
                            this.list = this.list.concat(data.hits);
                            this.list.forEach(v => {
                                this.$set(v, "edit", false);
                                this.$set(v, "editShow", false);
                            });
                            $state.loaded();
                            if (this.list.length / 20 === 10) {
                                $state.complete();
                            }
                        } else {
                            $state.complete();
                        }
<<<<<<< HEAD
                    });*/
                //$(".main").scrollTop($(".main")[0].scrollHeight - 720);
            }
        },
        mounted() {
            
            let vm = this;
            let baseUrl = basePath(this.$route.matched[2].path);
            let params = {'url':baseUrl}
            getProjAttrs(params).then(function (res) {
                    if(res.data.msg == "success"){
                        vm.list = res.data.result
                    }
                })
        }
=======
                    });
                $(".main").scrollTop($(".main")[0].scrollHeight - 720);
            }
        },
        mounted() {}
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
    };

</script>
<style scoped>
<<<<<<< HEAD
    .basic-btn.save-btn{
        width: 140px;
        margin: 20px auto !important;
        display: block;
    }
=======
>>>>>>> 6f35a59f546bea79705a68894fe071f625462181
    .main {
        height: calc(100vh - 358px);
        padding: 20px;
        margin-top: 20px;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
        overflow: auto;
    }

    .textcell {
        width: 94%;
        height: 46px;
        padding: 0 20px;
        line-height: 46px;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
        white-space: nowrap;
    }

    .logo-color {
        display: inline-block;
        width: 30px;
        height: 18px;
        border-radius: 2px;
        vertical-align: middle;
    }

</style>
