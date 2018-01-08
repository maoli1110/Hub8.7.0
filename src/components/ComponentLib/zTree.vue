<template>
    <div>
        <el-dialog  custom-class="cloud-component"
            title="云构件树管理"
            :visible.sync="isShow"
            :before-close="handleClose">
            <el-row>
                <el-col class="cloud-toobar">
                    <!--{{paramObj.productId}}-->
                    <el-col :span="4" class="icon-item" >
                        <div @click="expandNode({type:'expand',operObj:'cloudTree'})"><span class="el-icon-plus"></span></div>
                    </el-col>
                    <el-col :span="4" class="icon-item" >
                        <div @click="expandNode({type:'collapse',operObj:'cloudTree'})"><span class="el-icon-minus"></span></div>
                    </el-col>
                    <el-col :span="4" class="icon-item">
                        <div @click="upMove"><span class="el-icon-arrow-up" ></span></div>
                    </el-col>
                    <el-col :span="4" class="icon-item">
                        <div @click="downMove"><span class="el-icon-arrow-down" ></span></div>
                    </el-col>
                    <el-col :span="4" class="icon-item">
                        <div @click="resetZtree"><span class="el-icon-d-arrow-left" ></span></div>
                    </el-col>
                    <el-col :span="4" class="icon-item">
                        <div @click="ztreeSave"><span class="el-icon-picture" ></span></div>
                    </el-col>
                </el-col>
                <el-col>
                    <!--<vue-scrollbar class="my-scrollbar" ref="VueScrollbar" style="height:450px;">-->
                        <ul class="ztree scroll-me" id="cloudTree" style="background:#fff;"></ul>
                    <!--</vue-scrollbar>-->
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary"
                           @click="uploadVisible = false;cloudComTreeOk()">确 定
                </el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="uploadVisible = false;hidePanel()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        treeList,               //构件树
        treeSave,               //保存构件树
    } from '../../api/getData-yhj.js';
    import "../../../static/zTree/js/jquery.ztree.all.min.js";
    let level=1;//状态树展开、折叠深度(代表点击"展开、折叠"按钮时应该展开的节点的level)
    let maxLevel = -1;//预览状态模板树的深度
    export default {
        props:{ztreeInfo:Object,isShow:Boolean},

        data() {
            return {
                dialogVisible: false,
                setting: {//搜索条件ztree setting
                    data: {
                        simpleData: {
                            enable: true,
                            idKey:'nodeCode',
                            pIdKey: "parentNodeCode",
                        },
                        key:{
                            name:'nodeName'
                        }
                    },
                    callback: {
//                        onClick: this.ztreeClick
                    },

                },
                zNodes:[],   //树结构的初始值
                zTreeParam:this.ztreeInfo,
            };
        },
        methods: {
            getData(){

            },
            commonMessage(message, type){
                this.$message({
                    type: type,
                    message: message
                })
            },
            handleClose(done) {
                this.dialogVisible = false;
                this.$emit('hidePanel',this.dialogVisible);
            },
            hidePanel(){
                this.$emit('hidePanel',this.dialogVisible);
            },
            //加载树结构
            getZtree(param){
                treeList(param).then((data)=>{
                    this.zNodes = data.data.result;
                    this.nodesList = data.data.result;
                    this.zNodes.forEach((val,key)=>{
                        this.$set(val,'pId',val.nodeCode)
                    })
                    let zTree = $.fn.zTree.init($("#cloudTree"), this.setting, this.zNodes);
                    let nodes = zTree.getNodes();
                    if (nodes.length > 0) {
                        zTree.selectNode(nodes[0]);
                    }
                    let treeNodes = zTree.transformToArray(zTree.getNodes());
                    //获取状态树的深度
                    for (let i = 0; i < treeNodes.length; i++) {

                        if (treeNodes[i].level >= maxLevel) {
                            maxLevel = treeNodes[i].level;
                        }
                        if (treeNodes[i].level == 0 && treeNodes[i].isParent) {
                            //展开"全部"下的子节点
                            zTree.expandNode(treeNodes[i], true, false, null, true);
                        }
                    }
                    level = 1;
                });
            },
            //保存构件树
            setZtree(param){
                treeSave(param).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage('保存成功!','success');
                        this.dialogVisible = false;
                        this.$emit('hidePanel',this.dialogVisible);
                    }
                })
            },
            //ztree  插件的事件
            ztreeClick(event, treeId, treeNode){
                console.log(treeNode.nodeCode)
            },
            //展开、收起树节点
            expandNode(e) {
                let type = e.type;
                let operObj = e.operObj;
                let zTree = $.fn.zTree.getZTreeObj(operObj);
                let treeNodes = zTree.transformToArray(zTree.getNodes());
                let flag = true;

                //点击展开、折叠的时候需要判断一下当前level的节点是不是都为折叠、展开状态
                for (let i = 0; i < treeNodes.length; i++) {
                    if (treeNodes[i].level == level && treeNodes[i].isParent) {
                        if (type == "expand" && !treeNodes[i].open) {
                            flag = false;
                            break;
                        } else if (type == "collapse" && treeNodes[i].open) {
                            flag = false;
                            break;
                        }
                    }
                }

                if (flag) {
                    //说明当前level的节点都为折叠或者展开状态
                    if (type == "expand") {
                        // level++
                        if (level < maxLevel - 1) {
                            level++;
                        }
                    } else if (type == "collapse") {
                        //level--
                        if (level == 0) {
                            return;
                        }
                        level--;
                    }
                }
                for (let i = 0; i < treeNodes.length; i++) {
                    if (treeNodes[i].level == level && treeNodes[i].isParent) {
                        if (type == "expand" && !treeNodes[i].open) {
                            zTree.expandNode(treeNodes[i], true, false, null, true);
                        } else if (type == "collapse" && treeNodes[i].open) {
                            zTree.expandNode(treeNodes[i], false, false, null, true);
                        }
                    }
                }
            },
            //上移
            upMove() {
                let treeObj = $.fn.zTree.getZTreeObj("cloudTree");
                let nodes = treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    this.$message({
                        showClose: true,
                        message: "至少选择一个节点",
                        type: "warning"
                    });
                    return;
                }
                //移动之前需要判断满足条件才能上移
                //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许粘贴
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].isParent != nodes[0].isParent) {
                        return;
                    }
                }
                //判断多选的节点/状态是否是同一层级，如果不是，不允许粘贴
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].level != nodes[0].level) {
                        return;
                    }
                }

                //判断节点/状态是否是第一个，如果是，不能移动
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].getPreNode() == null) {
                        return;
                    }
                }
                //判断状态前一个节点是否是节点，如果是，不能移动
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].isParent && !nodes[i].getPreNode()) {
                        return;
                    }
                }
                for (let i = 0; i < nodes.length; i++) {
                    treeObj.moveNode(nodes[i].getPreNode(), nodes[i], "prev");
                }
            },
            //下移
            downMove() {
                var treeObj = $.fn.zTree.getZTreeObj("cloudTree");
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    this.$message({
                        showClose: true,
                        message: "至少选择一个节点",
                        type: "warning"
                    });
                    return;
                }

                //移动之前需要判断满足条件才能下移
                //判断多选的内容是否是纯节点/纯状态，如果选择的既有节点又有状态不允许移动
//                debugger;
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].isParent != nodes[0].isParent) {
                        return;
                    }
                }
                //判断多选的节点/状态是否是同一层级，如果不是，不允许移动
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].level != nodes[0].level) {
                        return;
                    }
                }

                //判断节点/状态是否是最后一个，如果是，不能移动
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].getNextNode() == null) {
                        return;
                    }
                }
                //判断节点后一个节点是否是状态，如果是，不能移动
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].isParent && !nodes[i].getNextNode()) {
                        return;
                    }
                }

                for (var i = nodes.length - 1; i >= 0; i--) {
                    treeObj.moveNode(nodes[i].getNextNode(), nodes[i], "next");
                }
            },
            //重置
            resetZtree(){
                this.getZtree(this.zTreeParam);
            },
            //保存
            ztreeSave(){

                let treeObj = $.fn.zTree.getZTreeObj("cloudTree");
                let nodes = treeObj.transformToArray(treeObj.getNodes());
                console.log(nodes,'nodes')
                let treeNodes = [];
                if(!nodes.length){
                    return false;
                }else{
                    nodes.forEach((val,key)=>{
                        treeNodes.push({description:val.description,nodeCode:val.nodeCode, nodeName:val.nodeName,parentNodeCode:val.parentNodeCode,productId:val.productId,sortIndex:val.sortIndex,version:val.version});
                    });
                    this.setZtree({version:this.zTreeParam.version,productId:this.zTreeParam.productId,componentTree:treeNodes})
                }

            },
            //构件树保存
            cloudComTreeOk(){
                //保存
                this.ztreeSave();
            },
        },
        mounted(){
            this.getData();
        },
        created(){
            this.dialogVisible = true;
        },
        watch:{

        }
    };
</script>
