<template>
    <div>
        <div class="header">
        </div>

        <div class="main">
            <el-table :data="list" style="width: 100%">
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="projAttr" label="工程性质" width="500" align='left'>
                </el-table-column>
                <el-table-column prop="projAttrNickName" label="名称" width="">
                </el-table-column>
                <el-table-column label="审核分析" width="">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.attrConfig==1?true:false" @change="changeList(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="关联进度" width="300">
                    <template slot-scope="scope">
                       <el-select v-model="scope.row.timeType" placeholder="请选择" style="width:70%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-button type="primary" class="basic-btn save-btn"
                       @click="saveProjAttrs">保存
            </el-button>
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
import { getProjAttrs, updateProjAttrs } from "../../api/getData-cxx.js";
import { basePath } from "../../utils/common.js";
export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      baseUrl : basePath(this.$route.matched[2].path),
      isEdit: false,
      options: [
        {
          value: 1,
          label: "计划进度"
        },
        {
          value: 2,
          label: "实际进度"
        }
      ],
      editTemplateDialogVisible: false,
      editAttributesDialogVisible: false,
      orgValue: "",
      role: "",
      list: [],
      FolderTableData: [],
      multipleSelection: []
    };
  },
  methods: {
    changeList(row) {
      this.list.forEach(function(value, index, array) {
        if (value.id == row.id) {
          value.timeType = row.timeType;
          value.attrConfig = !value.attrConfig ? 1 : 0;
        }
      });
    },
    saveProjAttrs() {
      let vm = this;
      let params = { url: vm.baseUrl, projAttrs: vm.list };
      updateProjAttrs(params).then(function(res) {
        if (res.data.msg == "success") {
          vm.$message({
            message: "修改成功",
            type: "success"
          });
        }
      });
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
      /*this.$axios
                    .get(api, {
                        params: {
                            page: this.list.length / 20 + 1
                        }
                    })
                    .then(({
                        data
                    }) => {
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
                    });*/
      //$(".main").scrollTop($(".main")[0].scrollHeight - 720);
    }
  },
  mounted() {
    let vm = this;
    let params = {
      url: vm.baseUrl
    };
    getProjAttrs(params).then(function(res) {
      if (res.data.msg == "success") {
        vm.list = res.data.result;
      }
    });
    //$(".main").scrollTop($(".main")[0].scrollHeight - 720);
  }
};
</script>
<style scoped>
.basic-btn.save-btn {
  width: 140px;
  margin: 20px auto !important;
  display: block;
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
