<template>
    <div>
        <div>
            <ul id="treeDemo2" class="ztree"></ul>
        </div>
        <h2>{{curSelectedNode}}</h2> 
    </div>
</template>

<script>
var i=0;
import "../../../static/zTree/js/jquery.ztree.core.min.js";
import "../../../static/zTree/js/jquery.ztree.excheck.min.js";
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'curSelectedNode'
        ])
    },
    data() {
        return {
            activeIndex: '/authority/member-management',
            setting: {
                check: {
                    enable: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                view: {
                    showIcon: false
                }
            },
            zNodes: [
                { id: 1, pId: 0, name: "随意勾选 1", open: true },
                { id: 11, pId: 1, name: "随意勾选 1-1", open: true },
                { id: 111, pId: 11, name: "随意勾选 1-1-1" },
                { id: 112, pId: 11, name: "随意勾选 1-1-2" },
                { id: 12, pId: 1, name: "随意勾选 1-2", open: true },
                { id: 121, pId: 12, name: "随意勾选 1-2-1" },
                { id: 122, pId: 12, name: "随意勾选 1-2-2" },
                { id: 2, pId: 0, name: "随意勾选 2", checked: true, open: true },
                { id: 21, pId: 2, name: "随意勾选 2-1" },
                { id: 22, pId: 2, name: "随意勾选 2-2", open: true },
                { id: 221, pId: 22, name: "随意勾选 2-2-1", checked: true },
                { id: 222, pId: 22, name: "随意勾选 2-2-2" },
                { id: 23, pId: 2, name: "随意勾选 2-3" }
            ]
        }
    },
    watch: {
        curSelectedNode:function(newvalue, oldvalue) {         
            console.log('点击不同的节点我才出现'+i++)
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted() {
        $.fn.zTree.init($("#treeDemo2"), this.setting, this.zNodes);
    }
}
</script>
<style scoped>
</style>




