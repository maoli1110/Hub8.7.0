<template>
    <div>
        <div class="order-management order-detail">
            <div class="header">
                <el-col :span="8">
                    <div>
                        <el-input
                            placeholder="请输入搜索内容"
                            icon="search"
                            v-model="searchContent"
                            :on-icon-click="search" class="searchContent">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="advanced-search">
                      <el-button type="primary" class="basic-btn" @click="">高级搜索</el-button>
                      <el-button type="primary" class="basic-btn" @click="indexSort();indexSortDialogVisible=true">指标排序</el-button>
                    </div>
                </el-col>
            </div>
            
            <div class="main">
                <vue-scrollbar class="my-scrollbar" ref="VueScrollbar">
                      <el-col :span="20" style="padding-bottom:20px;">
                          <el-button type="primary" class="basic-btn" @click=""><i class="left-icon icon icon-info-update"></i><span class="btn-text">更新指标</span>
                              </el-button>
                          <el-button type="primary" class="basic-btn" @click=""><i class="left-icon icon icon-forbidden"></i><span class="btn-text">不更新</span>
                              </el-button>
                          <el-button type="primary" class="basic-btn" @click=""><i class="components-icon icon-delete "></i><span class="btn-text">删除</span>
                              </el-button>
                      </el-col>

                    <el-table ref="multipleTable scroll-me" :data="bindManageTableData" border tooltip-effect="dark"
                              style="min-width: 1537px;margin-top:20px" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type='index' label="编号" width="60"
                                         :index="sort"></el-table-column>
                        <el-table-column prop="computerName" label="工程名称" width="300"></el-table-column>
                        <el-table-column label="状态" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.username}}({{scope.row.realname}})</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="上传人" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.username}}({{scope.row.realname}})</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bindingTime" label="上传时间" width="200"></el-table-column>
                        <el-table-column prop="remarks" label="备注"></el-table-column>
                    </el-table>
                </vue-scrollbar>
                <div style="margin-top: 20px">
                    <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                    <el-pagination style="margin-left:30%"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="4"
                                   :page-sizes="[100, 200, 300, 400]"
                                   :page-size="100"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="指标分类设置-土建未审核" :visible.sync="indexSortDialogVisible" size='tiny' style="width:0">
        </el-dialog>
        <div class="el-dialog el-dialog--project-authorize"  v-show='indexSortDialogVisible' style="left:40%;top:0;z-index:10000">
            <div class="el-dialog__header">
                <span class="el-dialog__title">指标分类设置-土建未审核</span>
                <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="indexSortDialogVisible=false">
                    <i class="el-dialog__close el-icon el-icon-close"></i>
                </button>
            </div>
            <div class="el-dialog__body">
                <div style="height: 450px;">
                    <ul id="olderList" class="draggable-list">
                        <li v-for="(item, index) in olderList" :key="index" class="notwrap todolist-item"
                            :data-index="index">
                            好吃的美食--{{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="el-dialog__footer">
                <div data-v-a8097a2c="" class="dialog-footer" style="margin-top: 54px;">
                    <button data-v-a8097a2c="" type="button"
                    @click="indexSortDialogVisible=false"
                    class="el-button dialog-btn el-button--primary">
                       <span>确 定</span></button>
                    <button data-v-a8097a2c="" type="button"
                    @click="indexSortDialogVisible=false"
                    class="el-button dialog-btn el-button--default">
                        <span>取消</span></button>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
import VueScrollbar from "../../../static/scroll/vue-scrollbar.vue";
import Sortable from "sortablejs";
export default {
  data() {
    return {
      searchContent: "曹相相",
      indexSortDialogVisible: false,
      multipleSelection: [],
      olderList: [
        { name: "香肠" },
        { name: "烤鸭" },
        { name: "烧鸡" },
        { name: "卤煮" },
        { name: "酱汁腊肉" },
        { name: "松花小肚" },
        { name: "白丸子" },
        { name: "红丸子" },
        { name: "汆丸子" },
        { name: "蒸熊掌" },
        { name: "蒸羊羔" },
        { name: "蒸鹿尾" },
        { name: "梅菜扣肉" },
        { name: "四喜丸子" },
        { name: "酒酿萝卜皮" },
        { name: "红烧胖大海" },
        { name: "连年有鱼" }
      ],
      newList: [
        { name: "香肠" },
        { name: "烤鸭" },
        { name: "烧鸡" },
        { name: "卤煮" },
        { name: "酱汁腊肉" },
        { name: "松花小肚" },
        { name: "白丸子" },
        { name: "红丸子" },
        { name: "汆丸子" },
        { name: "蒸熊掌" },
        { name: "蒸羊羔" },
        { name: "蒸鹿尾" },
        { name: "梅菜扣肉" },
        { name: "四喜丸子" },
        { name: "酒酿萝卜皮" },
        { name: "红烧胖大海" },
        { name: "连年有鱼" }
      ],
      bindManageTableData: [
        {
          bindingId: 0,
          bindingTime: "string",
          computerName: "string",
          enterprisePackageId: 0,
          hardwareCode: "string",
          realName: "string",
          remarks: "string",
          username: "string"
        }
      ]
    };
  },
  methods: {
    backToOrderList() {
      this.$router.push({ path: "/order-management/orders" });
    },
    search(ev) {
      //                搜索
      console.log(ev);
    },
    handleSelectionChange(val) {
      //                多选
      this.multipleSelection = val;
    },
    sort() {
      //序号
      return index * 1;
    },
    indexSort() {
      console.log(123);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getList() {
      this.$nextTick(() => {
        let olderList = document.getElementById("olderList");
        Sortable.create(olderList, {
          animation: 120,
          // onRemove(event) {
          //     vm.newList.splice(event.newIndex, 0, vm.olderList[event.item.getAttribute('data-index')]);
          // },
          onEnd: evt => {
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
            this.newList.splice(evt.newIndex, 0, tempIndex);
          }
        });
      });
    }
  },
  components: {
    VueScrollbar
  },
  created() {
    this.getList();
  },
  mounted() {
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  }
};
</script>

<style scoped>
.order-management .main {
  padding: 20px;
}
.left-icon {
  float: left;
  margin-top: -1px;
}
.header .advanced-search {
  margin-left: 10px;
}
.header .advanced-search {
  margin-left: 10px;
}

.header .unbind {
  padding: 10px 15px 10px 30px;
  background-color: #4778c7;
  color: #fff;
  border-radius: 4px;
}

.header .unbind span {
  font-size: 14px;
}

.draggable-list li {
  padding: 9px;
  border: 1px solid #e7ebee;
  border-bottom: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  list-style: none;
}
.draggable-list li:last-child {
  border-bottom: 1px solid #e7ebee;
}

.draggable-list {
  height: 100%;
  overflow: auto;
}
.order-management .content .el-input {
  width: 100%;
}
</style>
