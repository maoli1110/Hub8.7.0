  /**
   * 分页序号处理
   * params:data 要处理的对象
   * params:currentPage 当前页
   * params:pagesize    每页显示多少条
   * 公式（n-1）*pagesize+currentIndex
   */
  export function FormIndex(data,currentPage,pagesize){
      console.log('序列累加');
       data.forEach(function(val,key){
          val.index = (currentPage-1)*pagesize+val.index;
       })
  }