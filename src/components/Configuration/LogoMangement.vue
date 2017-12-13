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
                            ></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="标识名称" width="280" align='left'>
                    <template slot-scope="scope">

                        <div slot="reference" class="name-wrapper textcell" 
                        @mouseenter='mouseEnter(scope.row)'
                        @mouseleave='mouseLeave(scope.row)'
                        style="position:relative">
                            <span  v-show="!scope.row.edit">{{ scope.row.title }}</span>
                            <el-input v-show="scope.row.edit" size="small" @keyup.enter.native="scope.row.edit=!scope.row.edit"v-model="scope.row.title"></el-input>
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
                        <el-checkbox></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="LuBan Boss问题配置">
                    <template slot-scope="scope">
                        <!-- v-model="scope.row.lubanboss" -->
                        <el-checkbox></el-checkbox>
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
        }
      ],
      options: [],
      multipleSelection: []
    };
  },
  methods: {
    getRandomColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(
          -6
        )
      );
    },
    mouseEnter(row) {
      if (!row.editShow) {
        row.editShow = !row.editShow;
      }
    },
    mouseLeave(row) {
      if (row.editShow) {
        row.editShow = !row.editShow;
      }
    },
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
              this.$set(v, "logoColor", this.getRandomColor());
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
  mounted() {
  }
};
</script>
<style scoped>
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




