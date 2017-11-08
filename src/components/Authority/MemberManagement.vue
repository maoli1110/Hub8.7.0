<template>
    <div>
        <div class="header">
            <div class="el-form-item">
                <label class="el-form-item__label" style="width: 85px;">组织节点：</label>
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-select v-model="orgValue" placeholder="请选择">
                        <el-option
                            :value="orgValue" v-show="false">
                        </el-option>
                        <ul id="orgTree" class="ztree"></ul>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item">
                <label class="el-form-item__label" style="width: 85px;">角色：</label>
                <div class="el-form-item__content" style="margin-left: 85px;">
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="el-form-item">
                <label class="el-form-item__label" style="width: 80px;"></label>
                <div class="el-form-item__content" style="margin-left: 80px;">
                    <el-input placeholder="请选择日期" icon="search"></el-input>
                </div>
            </div>
        </div>
        <div class="main">
            <div>
                <el-button type="success">添加人员</el-button>
                <el-button type="warning">批量添加</el-button>
                <el-button type="danger"> 删除人员</el-button>
            </div>
            <el-table ref="multipleTable" :data="memberTableData" border tooltip-effect="dark"
                      style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type='index' label="序号" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column label="通行证" width="150">
                  <template slot-scope="scope">
                     <div :title="scope.row.pass" class="textcell" >
                       {{ scope.row.pass }}
                     </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="角色" width="100"></el-table-column>
                <el-table-column prop="phone" label="手机号码" width="180"></el-table-column>               
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>               
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>            
                <el-table-column prop="WAU" label="周活跃度" width="100" ></el-table-column>               
                <el-table-column label="备注" width="200">
                   <template slot-scope="scope">
                     <div :title="scope.row.remarks" class="textcell">
                       {{ scope.row.remarks }}
                     </div>
                    </template>
                </el-table-column>               
                <el-table-column label="操作" ></el-table-column>               
            </el-table>
            <div style="margin-top: 20px">
                <div style="float:left;height:40px;line-height:40px">共10个结果</div>
                <el-pagination  style="margin-left:30%"
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

</template>
<script>
export default {
  data() {
    return {
      orgValue: "",
      setting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.onClick
        }
      },
      zNodes: [
        {
          id: 1,
          pId: 0,
          name: "展开、折叠 自定义图标不同",
          open: true,
          iconSkin: "pIcon01"
        },
        { id: 11, pId: 1, name: "叶子节点4", iconSkin: "icon01" },
        { id: 12, pId: 1, name: "叶子节点2", iconSkin: "icon02" },
        { id: 13, pId: 1, name: "叶子节点3", iconSkin: "icon03" },
        {
          id: 2,
          pId: 0,
          name: "展开、折叠 自定义图标相同",
          open: true,
          iconSkin: "pIcon02"
        },
        { id: 21, pId: 2, name: "叶子节点1", iconSkin: "icon04" },
        { id: 22, pId: 2, name: "叶子节点2", iconSkin: "icon05" },
        { id: 23, pId: 2, name: "叶子节点3", iconSkin: "icon06" },
        { id: 3, pId: 0, name: "不使用自定义图标", open: true },
        { id: 31, pId: 3, name: "叶子节点1" },
        { id: 32, pId: 3, name: "叶子节点2" },
        { id: 33, pId: 3, name: "叶子节点3" }
      ],
      memberTableData: [
        {
          name: "赵四",
          pass: "wulijjjj111111111111111111",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remark11111111111111111111111111111111111111111111111"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        },
        {
          name: "赵四",
          pass: "wulijjjj",
          role: "项目经理",
          phone: "18075240365",
          email: "978648117@163.com",
          date: "2016-05-03 13:51",
          WAU: "5小时.5次",
          remarks: "超长remarks"
        }
      ],
      role: "",
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
    onClick(event, treeId, treeNode) {
      this.orgValue = treeNode.name;
      setTimeout(function() {
        $(".el-select-dropdown__item.selected").click();
      }, 100);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    $.fn.zTree.init($("#orgTree"), this.setting, this.zNodes);
  }
};
</script>
<style scoped>
.header {
  height: 40px;
  background-color: #fff;
  padding: 10px 20px;
}

.ztree {
  margin-top: 0px;
  width: 205px;
}

.el-form-item {
  float: left;
  width: 20%;
  margin-bottom: 0px;
}

.main {
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
}
.textcell {
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>




