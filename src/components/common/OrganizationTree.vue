<template>
    <div>
        <div class="organization-header">
            <div>
                <label class="el-form-item__label">组织节点：</label>
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-select v-model="orgValue" placeholder="请选择" style="width:100%" class="org-text" @click.native='selectDropDown'>
                        <el-option :value="orgValue" v-show="false">
                        </el-option>
                    </el-select>
                    <div style="margin-left:45px;border:1px solid #e6e6e6" class="select-dropdown">
                        <el-input placeholder="请输入组织节点" icon="search" style="width:100%"></el-input>
                        <ul id="orgTree" class="ztree"></ul>
                    </div>
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
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.orgTreeClick
                    }
                },
                zNodes: [],
                orgValue: "",
            };
        },
        methods: {
            getOrgTreeInfo() {
                this.zNodes = [];
                types.getDefaultProcessTemplateTreeInfo().then(res => {
                    this.zNodes = res.data.result;
                    $.fn.zTree.init($("#orgTree"), this.orgSetting, this.zNodes);
                });
            },
            selectDropDown() {
                $(".el-select-dropdown__list").hide();
                $(".el-select-dropdown").css("border", "none");
                $(".select-dropdown").slideToggle("fast");
            },
            orgTreeClick(event, treeId, treeNode) {
                this.orgValue = treeNode.name;
                $(".select-dropdown").slideToggle("fast");
            },

        },
        mounted() {
            this.getOrgTreeInfo()
        }
    };

</script>
<style scoped>
    .organization-header {
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
        margin-bottom:20px;
    }

    .select-dropdown {
        display: none;
        width: 100%;
        height: 700px;
        padding: 10px;
        box-sizing: border-box;
        position: absolute;
        left: -45px;
        top: 35px;
        background-color: #fff;
        z-index: 3000;
    }

</style>
