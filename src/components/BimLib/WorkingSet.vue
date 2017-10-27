<template>
    <div>
        <!-- <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div> -->
         <!-- <el-table class="quality-table" :data="tableData" style="width: 100%"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)" >
               <el-table-column width="50" type="selection" id="processId">
                </el-table-column>
                <el-table-column label="序号" width="80" prop="index">(cur_page-1)*10+index
                </el-table-column>
                <el-table-column prop="processName" width="" label="流程名称" sortable>
                </el-table-column>
                <el-table-column prop="updateUser" width="120" label="更新人" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" width="165" label="更新时间" sortable :formatter="formatTime">
                </el-table-column>
                <el-table-column prop="remark" label="备注"  sortable>
                </el-table-column>
                <el-table-column label="操作" width="135" @click.native="addnew" class="quality-page-tableIcon">
         
                    <template scope="scope" >
                        <el-button @click="dialogVisible = true">del</el-button>
                   <el-icon class="icon-edit" @click.native="dialogFormVisible = true"></el-icon>
                        <el-icon class="icon-delete2" @click.native="open2(scope.$index,scope.row)"></el-icon>
                        <el-icon class="icon-document" @click.native="addBPM"></el-icon>
         
                        <span class="quality-icon icon"  @click="isBMPEditShow(scope.$index,scope.row)"></span>
                        <span class="quality-icon icon" @click="formModelList(scope.$index,scope.row)"></span>
                        <span class="quality-icon icon" @click="deleteProcess(scope.$index,scope.row)"></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="[10, 50, 100, 150]" :page-size="totalPage" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                </el-pagination>
            </div> -->
            <el-table class="quality-table" :data="tableData" style="width: 100%"  :default-sort="{prop: 'date', order: 'descending'}"  height="calc(100vh - 380px)" >
               <!-- <el-table-column width="50" type="selection" id="processId">
                </el-table-column>-->
                <el-table-column label="序号" width="80" prop="index"><!--(cur_page-1)*10+index-->
                </el-table-column>
                <el-table-column prop="processName" width="" label="流程名称" sortable>
                </el-table-column>
                <el-table-column prop="updateUser" width="120" label="更新人" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" width="165" label="更新时间" sortable >
                </el-table-column>
                <el-table-column prop="remark" label="备注"  sortable>
                </el-table-column>
                <el-table-column label="操作" width="135" class="quality-page-tableIcon">

                    <template scope="scope" >
                        <!--<el-button @click="dialogVisible = true">del</el-button>-->
                   <!--     <el-icon class="icon-edit" @click.native="dialogFormVisible = true"></el-icon>
                        <el-icon class="icon-delete2" @click.native="open2(scope.$index,scope.row)"></el-icon>
                        <el-icon class="icon-document" @click.native="addBPM"></el-icon>-->

                        <span class="quality-icon icon" ></span>
                        <span class="quality-icon icon" ></span>
                        <span class="quality-icon icon" ></span>
                    </template>
                </el-table-column>
            </el-table>
             
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import {FormIndex} from "../../utils/common.js";
    // import "../../utils/directive.js"
    export default {
        created(){
            FormIndex(this.tableData,2,10)
        },        
        data: function(){
            return {
                content: '<p>Hello BBK</p>',
                editorOption: {
                    // something config
                },
                tableData:[
                    {index:1,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18:13:14',remark:"模板模板模板末班吧"},
                    {index:2,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18:13:14',remark:"模板模板模板末班吧"},
                    {index:3,processName:'鲁班安装',updateUser:"杨会杰",updateTime:'2017-11-18:13:14',remark:"模板模板模板末班吧"},
                ],
            }
        },
        components: {
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            },
            getData(){
                for(let i = 0;i<this.tableData.length;i++){
                   this.tableData[i].index = 3*10+ this.tableData[i].index;
                }
            }
        },
        computed: {

            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
       
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>