<template>
    <div>
        <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
                v-model="selectDate"
                type="daterange"
                placeholder="选择日期范围">
            </el-date-picker>
        </div>
        <div>
            <input type="text" id="demo" @change="citys"/>
        </div>
    </div>
</template>

<script>
    import {getCitys} from '../../api/getData.js'
    export default {
        data(){
            return {
                selectDate:"",
                cities:[],
                province:[],
                counties:[],
                ruleForm:{
                    location:"",
                    countyId:""
                },

            }
        },
        methods:{
            citys(val){
                console.log(this.ruleForm)
            },
        },
        mounted(){
            let vThis = this;

            getCitys().then((data)=>{
                this.cities = data.data.cities;
                this.province = data.data.provice;
                this.counties = data.data.counties;

            })
            $("#demo").click( function(e) {
                console.log(vThis.province,'vThis.cities')
                SelCity(this, e, vThis, vThis.cities, vThis.counties, vThis.province);
            });

        },
        created(){

        }
    }
</script>

<style scoped>
</style>
