<template>
    <div>
        <el-dialog :visible.sync="isShow" custom-class="up-component" :title="title" :before-close="handleClose">
            <el-row>
                <el-col :span="24" class="relat">
                    <span class="absol span-block label-w">构件文件：</span>
                    <div class="simulate-label" v-text="updateList.fileName"></div>
                    <el-upload :on-success="updataSucess" :on-error="updateError" :multiple='true'
                               :show-file-list="false"
                               class="upload-demo"
                               :action="uploadUri"
                               :on-preview="handlePreview"
                               :on-remove="handleRemove"
                               :file-list="fileList">
                        <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('update')"
                                   v-show="!override">上传
                        </el-button>
                        <el-button type="primary" class="basic-btn update-btn" @click="overUpdate('cover')"
                                   v-show="override">替换
                        </el-button>
                    </el-upload>

                </el-col>
                <el-col :span="24">
                    <el-col :span="12" class="relat">
                        <span class="absol span-block label-w">版本：</span>
                        <span class="simulate-input substr " style="margin-left:80px;"
                              v-text="updateList.version"></span>
                    </el-col>
                    <el-col :span="12" class="relat">
                        <span class="absol span-block label-w">专业：</span>
                        <span class="simulate-input substr " style="margin-left:80px;"
                              v-text="updateList.productName"></span>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12" class="relat">
                        <span class="absol span-block label-w">构件大类：</span>
                        <span class="simulate-input substr " style="margin-left:80px;"
                              v-text="updateList.bigType"></span>
                    </el-col>
                    <el-col :span="12" class="relat">
                        <span class="absol span-block label-w">构件小类：</span>
                        <span class="simulate-input substr " style="margin-left:80px;"
                              v-text="updateList.smallType"></span>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12" class="relat">
                        <span class="absol span-block label-w">构件编码：</span>
                        <span class="simulate-input substr " v-show="!override" style="margin-left:80px;"
                              v-text="updateList.componentCoding"></span>
                        <el-input placeholder="请输入模板名称" v-show="override" v-model="updateList.componentCoding"
                                  style="left:80px;"></el-input>
                    </el-col>
                    <el-col :span="12" class="relat">
                        <span class="absol span-block label-w">作者：</span>
                        <span class="simulate-input substr " style="margin-left:80px;"
                              v-text="updateList.author"></span>
                    </el-col>

                </el-col>
                <el-col class="relat">
                    <span class="absol span-block label-w">构件说明：</span>
                    <el-input type="textarea" placeholder="请输入模板名称" class="projManage-remark" :maxlength="150"
                              style="margin-left:80px;" :rows="4" v-model="updateList.remark"></el-input>
                    <span class="info-pos absol"
                          style="right:15px;bottom:3px;background:#fff;color:#ccc">({{!updateList.remark ? (0 + "/" + 150) : (updateList.remark.length + "/" + 150)}})</span>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialog-btn dialog-btn-ok" type="primary"
                           @click="updateOk()">确 定
                </el-button>
                <el-button class="dialog-btn dialog-btn-cancel" @click="handleClose()">
                    取 消
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        SteelExit,          //添加时判断是否存在
        generate,           //token验证
        SteelAdd,           //钢筋添加
        SteelUpdate,        //钢筋更新
        SteelList,          //钢筋列表
        SteelCountDownload, //下载次数
    } from '../../api/getData-yhj.js';
    export default{
        props:{isShow:Boolean,title:String,dataList:Object,uploadUrl:String,override:Boolean,tableParam:Object,downloadSum:Number},
        data(){
            return {
                updateList:this.dataList,//上传弹窗信息
                overrides:this.override,//是否是替换
                fileList: [],           //上传的文件信息
                uploadUri:this.uploadUrl,//上传地址
                tableInfo:this.tableParam,//列表参数
                tableDataList:{},
                count:this.downloadSum,
            }
        },
        methods:{
            //关闭弹窗
            handleClose(done){
                this.uploadVisible = false;
                this.$emit('uploadClose',{visible:this.uploadVisible})
            },
            /**common-message(公用消息框)
             * @params message   给出的错误提示
             * @params success  成功处理的
             * @params error    失败处理的
             * */
            commonConfirm(message, success, error, type){
                this.$confirm(message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: type
                }).then(success).catch(error);
            },
            commonAlert(message){
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                })
            },
            commonMessage(message, type){
                this.$message({
                    type: type,
                    message: message
                })
            },
            //创建时 token验证
            getTokenId(){
                generate().then((data)=>{
                    this.updateList.token     = data.data.result;
                })
            },
            //添加之前判断构件是否存在
            exists(param){
                SteelExit(param).then((data)=>{
                   if(!param.title){return false;}
                    let addParam = {
                        author: this.updateList.author,
                        bigTypeName: this.updateList.bigType,
                        coding: this.updateList.componentCoding,
                        componentFilePath: this.updateList.componentFilePath,
                        description:  this.updateList.remark,
                        fileName:  this.updateList.fileName,
                        pictureFilePath:  this.updateList.pictureFilePath,
                        productId: 2,
                        componentFileId:"",
                        smallTypeName:  this.updateList.smallType,
                        summaryFilePath:  this.updateList.summaryFilePath,
                        title:  this.updateList.name,
                        token:  "",
                        version:  this.updateList.version
                    }
                    if(data.data.result){
                        this.commonConfirm('构件已经存在，是否替换？',()=>{
                            this.updateInfo({productId:2,update:{
                                coding:this.updateList.componentCoding,
                                compntFileId:this.updateList.componentFileId,
                                componentFilePath:this.updateList.componentFilePath,
                                description:this.updateList.remark,
                                fileChanged:true,
                                fileName:this.updateList.fileName,
                                pictureFilePath:this.updateList.pictureFilePath,
                                summaryFilePath:this.updateList.summaryFilePath,
                                title:this.updateList.name
                            }})
                        },()=>{},"warning")
                    }else{
                        this.setAddInfo(addParam)
                    }
                })
            },
            /**
             *钢筋添加功能
             * @param url      响应地址
             * @param param    响应参数
             **/
            setAddInfo(param){
                SteelAdd(param).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage('添加构件成功','success');
                        setTimeout(()=>{
                            this.getTableList(this.tableInfo);
                        },1200)
                        this.$emit('uploadClose',{visible:this.uploadVisible,data:this.tableDataList,count:this.count})
                    }
                })
            },
            updateInfo(param){
                SteelUpdate(param).then((data)=>{
                    if(data.data.code==200){
                        this.commonMessage('更新构件成功','success');
                        this.getTableList(this.tableInfo);

                    };
                })
            },
            //钢筋下载次数
            getDownloadTimes(param){
                SteelCountDownload(param).then((data)=>{
                    this.count = data.data.result;
                    this.$emit('uploadClose',{visible:this.uploadVisible,data:this.tableDataList,count:this.count})
                })
            },
            //获取列表数据
            /**
             *钢筋数据列表
             * @param url       //响应地址
             * @param param     //响应参数
             **/
            getTableList(param){
                SteelList(param).then((data)=>{
                    if( data.data.result!=null){
                        this.uploadVisible = false;
                        this.tableDataList = data.data.result;
                        this.$emit('uploadClose',{visible:this.uploadVisible,data:this.tableDataList,count:this.count})
                    }
                    this.getDownloadTimes({bigTypeName:param.bigTypeName,endTime:param.endTime,majorName:"",productId:param.productId,smallTypeName:param.smallTypeName,startTime:param.startTime,title:param.title});//下载次数
                })
            },
            updateeDialogInfo(data){
                this.updateList = data;
            },
            getData(){

            },
            //上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            /**
             *上传成功回调的函数
             * @params response 浏览器的响应返回值
             * @params file     文件信息
             * @params fileList 文件的信息
             **/

            updataSucess(response, file, fileList){
                if(response.result==null){
                    this.commonMessage('请选择安装的文件','warning');
                    return false;
                };
                this.updateList = response.result;
            },
            /**
             *上传失败回调的函数
             * @params err      上传失败的返回信息
             * @params file     文件信息
             * @params fileList 文件的信息
             **/
            updateError(err, file, fileList){
                this.commonMessage('上传失败哦。。。。', 'warning')
            },
            /**
             * 上传文件再次上传 （ps:覆盖之前的)
             * @param type  1.update上传 2.cover修改页面
             **/
            overUpdate(){
                this.uploadUri = `${window.serverPath.cloudUrl}/component/gj/upload/2`;
                this.fileList = [];
            },
            //上传构件清除数据
            clearUploadInfo(){
                for (var key in this.updateList) {
                    console.log(this.updateList[key])
                    this.updateList[key] = '';
                }
            },

            //上传构件到服务器
            updateOk(){
                let updateParam = {
                    coding: this.updateList.componentCoding,
                    compntFileId: this.updateList.componentFileId,
                    componentFilePath:this.updateList.componentFilePath,
                    description: this.updateList.remark,
                    fileChanged: false,
                    fileName: this.updateList.fileName,
                    pictureFilePath: this.updateList.pictureFilePath,
                    summaryFilePath: this.updateList.summaryFilePath,
                    title: this.updateList.name
                }
                if(updateParam.summaryFilePath && updateParam.pictureFilePath && updateParam.componentFilePath){
                    updateParam.fileChanged = true;
                }else{
                    updateParam.fileChanged = false;
                }

                //保存上传到数据库
                if (this.override) {
                    this.updateInfo({productId:2,update:updateParam})
                } else {
                    this.exists({bigTypeName:this.updateList.bigType,productId:2,smallTypeName:this.updateList.smallType,title:this.updateList.name,version:this.updateList.version})
                }
            },
        },
        created(){
            this.getData();
        }
    }
</script>
