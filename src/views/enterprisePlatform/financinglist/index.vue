<template>
	<div class="contain">
		<header>
			<el-input class="inp" placeholder="请输入公司名称或合同编号" size="mini" v-model="personalKey"></el-input>
			<el-button type="primary" plain icon="el-icon-search" size="mini" @click="seek">搜索</el-button>
		</header>
		<section>
			<el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
    		<el-table-column prop="creditor" label="债权人"></el-table-column>
    		<el-table-column prop="debtor" label="债务人"></el-table-column>
				<el-table-column prop="compactCode" label="基础合同编号" width="110"></el-table-column>
				<el-table-column prop="receivablesBalance" label="应收账款本金余额" width="140"></el-table-column>
				<el-table-column prop="financingMoney" label="融资余额" ></el-table-column>
				<el-table-column prop="compactTime" label="应收账款到期日" width="140"></el-table-column>
				<el-table-column prop="factoringTime" label="保理到期日" width="140"></el-table-column>
        		<el-table-column prop="loanStatusTxt" label="状态"></el-table-column>
        		<el-table-column prop="applyTime" label="申请时间"></el-table-column>
				<el-table-column fixed="right" label="操作" width="310">
					<template slot-scope="scope">
						<el-button size="mini" type="info" plain @click="handleView(scope.row.id)">查看</el-button>
					   <el-button size="mini" type="success" plain @click="audit(scope.row.id,1)" v-if="scope.row.status==2&&scope.row.applyStatus==1">同意</el-button>
						<el-button size="mini" type="danger" plain @click="audit(scope.row.id,2)" v-if="scope.row.status==2&&scope.row.applyStatus==1">拒绝</el-button>
						<el-button size="mini" type="primary" plain @click="">还款计划</el-button>
					</template> 
				</el-table-column>
  			</el-table>
		</section>
		<footer>
			<el-pagination 
				@size-change="handleSizeChange"	
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[20, 40, 60]"
				:page-size="limitSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount">
			</el-pagination>
		</footer>
	</div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {},
  methods: {
    list() {
      let _this = this;
      let currentPage = _this.currentPage;
      let limitSize = _this.limitSize;
      if (this.currentPage == null) {
        currentPage = 1;
      }
      if (this.limitSize == null) {
        limitSize = 20;
      }
      if (this.totalCount == null) {
        this.totalCount = 0;
      }
      let params = {
        page: currentPage,
        limit: limitSize,
        key: _this.personalKey,
        status: 2,
        pCheck: 1
      };
      _this.$fetch(_this.$API.POST_FINAN_LIST, params).then(result => {
        if (result.code == "0") {
          let list = result.page.list;
          for (let i = 0; i < list.length; i++) {
            if (list[i].status == 13) {
              list[i].loanStatusTxt = "已融资";
            } else {
              list[i].loanStatusTxt = "未融资";
            }
          }
          _this.tableData = list;
          _this.totalCount = result.page.totalCount;
          _this.limitSize = result.page.pageSize;
          _this.currentPage = result.page.currPage;
        } else {
          if (result.code == "4001") {
            _this.$router.push({
              path: "/login"
            });
          } else {
            this.$message({
              message: result.msg,
              type: "warning"
            });
          }
        }
      });
    },
    seek() {
      this.list();
      this.currentPage = 1;
    },
    handleView(val) {
      const self = this;
      self.$router.push({
        path: "/financingListView",
        query: { id: val }
      });
    },
    audit(sid, val) {
      this.$confirm("是否继续此项操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _this = this;
          let params = {
            receivablesId: sid,
            status: val,
            type: 2
          };
          _this.$fetch(_this.$API.POST_FINAN_AUDIT, params).then(result => {
            if (result.code == "0") {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.list();
            } else {
              if (result.code == "4001") {
                _this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  message: result.msg,
                  type: "warning"
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deleteRow(index, rows) {
      //表格里面的操作按钮
      rows.splice(index, 1);
    },
    handleSizeChange(val) {
      //改变每页条数
      this.limitSize = val;
      this.list();
    },
    handleCurrentChange(val) {
      //改变当前页时会触发
      this.currentPage = val;
      this.list();
    }
  },
  created() {
    this.handleCurrentChange(this.currentPage);
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "./index.scss";
</style>
