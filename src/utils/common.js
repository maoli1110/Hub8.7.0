/**
   * 分页序号处理
   * params:data 要处理的对象
   * params:currentPage 当前页
   * params:pagesize    每页显示多少条
   * 公式（n-1）*pagesize+currentIndex
   */
      function FormIndex(data,currentPage,pagesize){
          console.log('序列累加');
           data.forEach(function(val,key){
              val.index = (currentPage-1)*pagesize+val.index;
           })
      }
    /**
     *
     * @param localhost     分属模块
     * @returns {basePath}  分属模块对应的路径
     */
    function basePath(localhost){
        let basePaths = "";
         switch (localhost){
             case 'http://192.168.13.195:8989/builder/':
                 basePaths = 'http://192.168.13.195:8989/builder/';
                 break;
             case 'http://192.168.13.195:8989/cloud/':
                 basePaths= 'http://192.168.13.195:8989/cloud/';
                 break;
             case 'http://192.168.13.195:8989/builderCiVil/':
                 basePaths= 'http://192.168.13.195:8989/builderCiVil/';
                 break;
             case 'http://192.168.13.195:8989/cas/':
                 basePaths= 'http://192.168.13.195:8989/cas/';
                 break;
             case 'http://192.168.13.195:8989/palace/':
                 basePaths= 'http://192.168.13.195:8989/palace/';
                 break;
             default:
                 break;
         }
        return basePaths;
     }
    /*function apiBase() {
        let hostname = window.location.hostname,
            API_BASE_URL = 'http://test2api.dunizb.com';//默认环境
        if(hostname === 'crm.dunizb.cn') {  //正式环境
            API_BASE_URL = 'http://api.dunizb.cn';
        } else if(hostname === 'admin.dunizb.com') {//公网测试环境
            API_BASE_URL = 'http://testapi.dunizb.com';
        } else if(hostname === 'manager.dunizb.com') {//内网测试环境
            API_BASE_URL = 'http://test2api.dunizb.com';
        }
        return API_BASE_URL;
    }*/
  export {
      FormIndex,
      basePath
  }
