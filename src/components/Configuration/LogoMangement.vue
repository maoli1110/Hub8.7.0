<template>
    <div>
        <div class="header">
        </div>

        <div class="main">
            <el-table :data="list" 
                      style="width: 100%">
                <el-table-column   type="index"  label="序号" width="55" >
                    
                </el-table-column>
                <el-table-column prop="name" label="标识颜色" width="250" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell">
                            <span
                                class="logo-color"
                                :style="{ backgroundColor: scope.row.logoColor }"
                            >{{scope.row.created_at_i}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="标识名称" width="280" align='left'>
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper textcell" 
                        @mouseenter='scope.row.editShow=!scope.row.editShow'
                        @mouseleave='scope.row.editShow=!scope.row.editShow'
                        style="position:relative">
                            <span  
                            v-show="!scope.row.edit"                          
                            >{{ scope.row.title }}</span>
                            <el-input                             
                            v-show="scope.row.edit" size="small" 
                            @keyup.enter.native="scope.row.edit=!scope.row.edit"
                            v-model="scope.row.title"></el-input>
                            <span  
                            v-show="scope.row.editShow"
                            :class="scope.row.edit?'el-icon-document':'el-icon-edit'" style="position:absolute;right:2px;top:18px;color:#6595f2;cursor:pointer;font-size:14px"
                            @click="scope.row.edit=!scope.row.edit"
                              ></span> 
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="更新人" width="250">

                </el-table-column>
                <el-table-column label="更新时间" width="250">
                    <template slot-scope="scope">{{ scope.row.created_at }}</template>
                </el-table-column>
                <el-table-column label="显示" width="250">
                    <template slot-scope="scope">
                        <!-- v-model="scope.row.show" -->
                        <el-checkbox>{{scope.row.title}}</el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="LuBan Boss问题配置">
                    <template slot-scope="scope">
                        <!-- v-model="scope.row.lubanboss" -->
                        <el-checkbox>{{scope.row.objectID}}</el-checkbox>
                    </template>
                </el-table-column>
            </el-table>
            <infinite-loading @infinite="infiniteHandler">
                    <span slot="no-more">
                      我是有底线的人 滚够了吧！:(
                    </span>
            </infinite-loading>
        </div>

        <div>
        </div>
    </div>

    </div>
</template>
<style>
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
</style>
<script>
import InfiniteLoading from "vue-infinite-loading";
const api = "http://hn.algolia.com/api/v1/search_by_date?tags=story";
export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      url: "../../../static/tree1.json",
      isEdit: false,
      editTemplateDialogVisible: false,
      editAttributesDialogVisible: false,
      orgValue: "",
      role: "",
      list: [],
      FolderTableData: [
        {
          logoColor: "#fa4148",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: true,
          lubanboss: true
        },
        {
          logoColor: "#ecd556",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: true,
          lubanboss: false
        },
        {
          logoColor: "#27a9e6",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: false,
          lubanboss: true
        },
        {
          logoColor: "#faab3b",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: false,
          lubanboss: false
        },
        {
          logoColor: "#808080",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: true,
          lubanboss: true
        },
        {
          logoColor: "#4bab4b",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: true,
          lubanboss: true
        },
        {
          logoColor: "#ec8952",
          logoName: "质量111111111111111111111111111111111111",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: false,
          lubanboss: true
        },
        {
          logoColor: "#f88fb2",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: true,
          lubanboss: false
        },
        {
          logoColor: "#89d5e9",
          logoName: "质量",
          updater: "wulikkkk",
          date: "2016-05-03 13:51",
          show: true,
          lubanboss: true
        },
        {
          logoColor: "#da4f64",
          logoName: "质量",
          updater: "wuli",
          date: "2016-05-03 13:51",
          show: true,
          lubanboss: false
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    infiniteHandler($state) {
      this.$axios
        .get(api, {
          params: {
            page: this.list.length / 20 + 1
          }
        })
        .then(({ data }) => {
          if (data.hits.length) {
            this.list = this.list.concat(data.hits);
            this.list.forEach(v => {
              this.$set(v, "edit", false);
              this.$set(v, "editShow", false);
            });
            $state.loaded();
            if (this.list.length / 20 === 10) {
              $state.complete();
            }
          } else {
            $state.complete();
          }
        });
      $(".main").scrollTop($(".main")[0].scrollHeight - 720);
    }
  },
  mounted() {}
};
</script>
<style scoped>
/*滚动条 start*/
::-webkit-scrollbar {
  width: 6px;
  height: 4px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.5);
}
.main {
  height: calc(100vh - 358px);
  padding: 20px;
  margin-top: 20px;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
  overflow: auto;
}

.textcell {
  width: 94%;
  height: 46px;
  padding: 0 20px;
  line-height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  white-space: nowrap;
}

.logo-color {
  display: inline-block;
  width: 30px;
  height: 18px;
  border-radius: 2px;
  vertical-align: middle;
}
</style>




