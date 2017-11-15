<template>
    <div>
        <h1>remiz-构件库</h1>
        <el-select v-model="value" placeholder="请选择活动区域" style="width:100%" :disabled="isDisable" @change="change">
            <el-option value="1" >1</el-option>
            <el-option value="2" >2</el-option>
            <el-option value="3" >3</el-option>
            <el-option value="4" >4</el-option>
        </el-select>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                value:"",
                isDisable:false
            }
        },
        methods:{
            change(val){
                if(val%2==0){
                    this.isDisable = true;
                }
            }
        }
    }
</script>
