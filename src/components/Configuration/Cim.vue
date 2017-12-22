<template>
    <el-row>
        <el-col :span="4" class="relat" style="padding-right:50px;">
            <span class="absol span-block" style="width:50px;margin-right:47px;">地区：</span>
            <el-col :span="24">
                <input type="text" style="margin-left:47px;" id="provinLink" placeholder="请输入城市"/>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    import {getCitys} from '../../api/getData.js'
    export default {
        data() {
            return {
                cities: [],         //三级联动城市
                province: [],       //三级联动省
                counties: [],       //三级联动区
                ruleForm: {         //关闭三级联动 选择的省、市、区的id和name
                    location: "",
                    countyId: ""
                },
            }
        },
        mounted() {
            let vThis = this;
            getCitys().then((data)=>{
                this.cities = data.data.cities;
                this.province = data.data.provice;
                this.counties = data.data.counties;
            })
            //三级联动加载数据
            $("#provinLink").click(function (e) {
                SelCity(this, e, vThis, vThis.cities, vThis.counties, vThis.province);
            });
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options4 = this.list.filter(item => {
                            return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options4 = [];
                }
            },
            changeVal(value){
                console.log(value, 'value')
            },
        },
        watch: {
            'ruleForm.countyId': function (val, old) {//三级联动countryId发生变化的时候触发
                if (val != old) {
                    console.log(this.ruleForm.countyId, '有延迟吗');
                }
            }
        },
    }
</script>

