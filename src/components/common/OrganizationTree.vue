<template>
    <div>
        <div class="organization-header">
            <div>
                <label class="el-form-item__label">组织：</label>
                <div class="el-form-item__content" style="margin-left: 55px;position:relative">
                    <el-select v-model="orgValue" placeholder="请选择" style="width:100%" class="org-text" @click.native='isSlideDown=!isSlideDown'>
                        <el-option :value="orgValue" v-show="false">
                        </el-option>
                    </el-select>
                    <transition name="fade">
                        <div style="margin-left:45px;border:1px solid #e6e6e6" class="select-down" v-show="isSlideDown">
                            <el-input placeholder="请输入组织节点" icon="search" :on-icon-click="searchOrgTree" @keyup.enter.native="searchOrgTree" v-model="searchVal"
                                style="width:100%"></el-input>
                            <ul id="orgTree" class="ztree"></ul>
                        </div>
                    </transition>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import * as types from "../../api/getData-ppc";
    export default {
        data() {
            return {
                orgSetting: {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "parentId"
                        }
                    },
                    callback: {
                        onClick: this.orgTreeClick
                    }
                },
                zNodes: [],
                currentTreeNode: {}, //当前选中树节点
                orgValue: "",
                searchVal: '',
                isSlideDown: false,
            };
        },
        watch: {
            searchVal(newVal, oldVal) {},
            orgValue(newVal, oldVal) {
                //当前选中节点发生变化时
                if (newVal) {
                    this.$emit('handleTreeNodeChange', this.currentTreeNode)
                }

            }
        },
        methods: {
            getOrgTreeInfo() {
                this.zNodes = [];
                types.getOrgTreeList().then(res => {
                    this.zNodes = res.data.result;
                    this.zNodes.forEach((val, key) => {
                        //添加icon
                        //this.$set(val,'iconSkin',"");
                        if (val.root) {
                            this.$set(val, "iconSkin", "rootNode");
                            this.currentTreeNode = val;
                            this.orgValue = val.name
                        } else if (!val.root && val.type == 0 && !val.direct) {
                            this.$set(val, "iconSkin", "subNode");
                        } else if (val.type == 1) {
                            this.$set(val, "iconSkin", "projNode");
                        } else if (val.direct) {
                            this.$set(val, "iconSkin", "projNode");
                        }
                    });
                    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.zNodes);
                });
            },
            orgTreeClick(event, treeId, treeNode) {
                this.currentTreeNode = treeNode
                this.orgValue = treeNode.name;
                this.isSlideDown = false;
            },
            //树结构的搜索功能
            searchOrgTree(event) {
                let treeObj = $.fn.zTree.getZTreeObj('orgTree');
                let nodes1 = treeObj.getNodesByParam("isHidden", true);
                let searchVal = this.searchVal;
                /* 将之前隐藏的展示*/
                if (nodes1.length > 0) {
                    treeObj.showNodes(nodes1);
                }
                let treeNodes = treeObj.transformToArray(treeObj.getNodes());
                let otherNeedShowNodes = [];
                // 隐藏不符合搜索条件的节点
                if (event.type == 'click' || event.keyCode == 13) {
                    for (let i = 0; i < treeNodes.length; i++) {
                        if (treeNodes[i].name.indexOf(searchVal) < 0) {
                            treeObj.hideNode(treeNodes[i]);
                        } else {
                            /*符合条件的父级*/
                            this.getZtreeChildNode(treeNodes[i], otherNeedShowNodes);
                            this.getZtreeParentNode(treeNodes[i], otherNeedShowNodes);
                        }
                    }
                    if (otherNeedShowNodes.length > 0) {
                        treeObj.showNodes(otherNeedShowNodes);
                        treeObj.expandAll(true);
                    }
                    if (!searchVal.length) {
                        treeObj.expandAll(false);
                    }
                }
            },
            getZtreeParentNode(ztreeNode, nodes) {
                let pNode = ztreeNode.getParentNode();
                /*console.log(pNode);*/
                if (pNode != null) {
                    if (nodes.indexOf(pNode) < 0) {
                        nodes.push(pNode);
                    }
                    this.getZtreeParentNode(pNode, nodes);
                }
            },
            getZtreeChildNode(ztreeNode, nodes) {
                if (!ztreeNode.isParent) {
                    return;
                }
                let children = ztreeNode.children;
                /* console.log(children);*/
                if (children.length > 0) {
                    for (let i = 0; i < children.length; i++) {
                        let child = children[i];
                        if (nodes.indexOf(child) < 0) {
                            nodes.push(child);
                        }
                        this.getZtreeChildNode(child, nodes);
                    }
                }
            },

        },
        mounted() {
            $(".organization-header .el-select-dropdown__list").hide();
            $(".organization-header .el-select-dropdown").css("border", "none"); //隐藏element 下拉框中下拉列表
            this.getOrgTreeInfo()
        }
    };

</script>
<style scoped>
    .organization-header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
        /* margin-bottom: 20px; */
    }

    .ztree {
        margin-top: 0px;
        height: 600px;
        overflow: auto;
    }

    .select-down {
        width: 100%;
        height: 680px;
        padding: 10px;
        box-sizing: border-box;
        position: absolute;
        left: -45px;
        top: 35px;
        background-color: #fff;
        z-index: 3000;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

</style>
