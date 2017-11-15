<template>
    <div>
        <h1>remiz-构件库</h1>
        <el-select v-model="obj.value" placeholder="请选择活动区域" style="width:100%" :disabled="isDisable" @change="change">
            <el-option
                v-for="item in majorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>

        </el-select>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                obj:{
                    value:""
                },

                isDisable:false,
                majorOptions: [{    //专业选择框
                    value: '不限',
                    label: '不限'
                },{    //专业选择框
                    value: '土建',
                    label: '土建'
                }, {
                    value: '钢筋',
                    label: '钢筋'
                }, {
                    value: '安装',
                    label: '安装'
                }, {
                    value: 'Revit',
                    label: 'Revit'
                }, {
                    value: 'Tekla',
                    label: 'Tekla'
                }, {
                    value: '场布',
                    label: '场布'
                }],
            }
        },
        methods:{
            change(val){
                if(val%2==0){
                    this.isDisable = true;
                }
            }
        },
        created(){
            this.obj.value = this.majorOptions[0].value
        }
    }
</script>
