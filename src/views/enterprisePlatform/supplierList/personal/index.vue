<template>
	<div class="contain">
		<header>
			<el-input class="inp" v-model="personalKey" placeholder="请输入姓名或联系方式"></el-input>
			<el-button type="primary" plain icon="el-icon-search" size="mini" @click="seek">搜索</el-button>
			<el-button type="success" plain icon="el-icon-plus" size="mini" @click="add">新增</el-button>
		</header>
		<section>
			<el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="trade" label="所属行业"></el-table-column>
				<el-table-column prop="tel" label="联系方式"></el-table-column>
        	<el-table-column prop="address" label="联系地址" width="250"></el-table-column>
			
				<el-table-column prop="creditM" label="授信额度" width="120"></el-table-column>
			
        	<el-table-column prop="auditTxt" label="状态" width="150"></el-table-column>
          <el-table-column prop="modifyTime" label="时间" width="150"></el-table-column>
				<el-table-column fixed="right" label="操作" width="310">
					<template slot-scope="scope">
						<!-- <el-button 	@click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button> -->
						<el-button size="mini" type="primary" class="el-button el-button--info el-button--mini is-plain" plain @click="view(scope.row.id)">查看</el-button>
            <el-button size="mini" type="success" plain @click="audit(scope.row.id,1)" v-if="scope.row.phasesAudit==0&&scope.row.status==0">同意</el-button>
						<el-button size="mini" type="danger" plain @click="audit(scope.row.id,2)" v-if="scope.row.phasesAudit==0&&scope.row.status==0">拒绝</el-button>
						<el-button size="mini" type="primary" plain @click="handleEdit(scope.$index,scope.row)" v-if="scope.row.userId!=null">重置密码</el-button>
						<el-button size="mini" type="warning" plain @click="allotAcc(scope.$index,scope.row)" v-if="scope.row.userId==null">分配账号</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog title="重置密码" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="账号" :label-width="formLabelWidth">
						<el-input v-model="form.username" disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form.pwd"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form.pwdAgain"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel" plain size="small">取 消</el-button>
					<el-button type="primary" plain @click="reset" size="small">确 定</el-button>
				</div>
			</el-dialog>
				<el-dialog title="分配账号" :visible.sync="dialogFormVisible2">
				<el-form :model="form">
					<el-form-item label="账号" :label-width="formLabelWidth">
						<el-input v-model="form2.username" ></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form2.pwd"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form2.pwdAgain"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel" plain size="small">取 消</el-button>
					<el-button type="primary" plain @click="update" size="small">确 定</el-button>
				</div>
			</el-dialog>
		</section>
		<footer>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 40, 60]" :page-size="limitSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
			</el-pagination>
		</footer>
	</div>
</template>
<script>
import { reformat } from "../../../../static/reformartDate";

export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "80px",
      form: {},
      form2: {},
      currentIndex: "",
      tableData: [],
      personalKey: ""
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
        type: 1,
        page: currentPage,
        limit: limitSize,
        key: _this.personalKey
      };
      _this.$fetch(_this.$API.POST_PERSONAL_LIST, params).then(result => {
        if (result.code == "0") {
          let list = result.page.list;
          for (let i = 0; i < list.length; i++) {
            let auditTxt = "";
            if (list[i].phasesAudit == 0) {
              auditTxt = "核心企业";
            }
            if (list[i].phasesAudit == 1) {
              auditTxt = "平台业务";
            }
            if (list[i].phasesAudit == 2) {
              auditTxt = "平台风控";
            }
            if (list[i].status == 0) {
              auditTxt += "待审核";
            }
            if (list[i].status == 1) {
              auditTxt += "通过";
            }
            if (list[i].status == 2) {
              auditTxt += "拒绝";
            }
            list[i].auditTxt = auditTxt;
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
    add() {
      const self = this;
      self.$router.push({
        path: "padd"
      });
    },
    view(val) {
      //点击查看按钮
      const self = this;
      self.$router.push({
        path: "/pview",
        query: {
          sid: val
        }
      });
    },
    handleEdit(index, row) {
      //重置密码
      this.form = { userId: row.userId };
      this.form.username = row.username;
      this.dialogFormVisible = true;
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
            supId: sid,
            status: val
          };
          _this.$fetch(_this.$API.POST_PERSONAL_AUDIT, params).then(result => {
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
    allotAcc(index, row) {
      //分配账号
      this.form2 = { sid: row.id };
      this.form2.username = row.username;
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = true;
    },
    cancel() {
      console.log(1111);
      //取消按钮
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
    },
    update() {
      //分配账号
      let _this = this;
      if (_this.form2.pwd != _this.form2.pwdAgain) {
        this.$message({
          message: "两次密码不一致",
          type: "warning"
        });
        return;
      }
      let params = {
        suppId: _this.form2.sid,
        password: _this.form2.pwd,
        username: _this.form2.username
      };
      _this.$fetch(_this.$API.POST_SYS_CRTA, params).then(result => {
        if (result.code == "0") {
          this.$message({
            message: "账号创建成功",
            type: "success"
          });
          this.dialogFormVisible2 = false;
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
    reset(val) {
      //重置密码
      this.$confirm("是否继续此项操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _this = this;
          if (_this.form.pwd != _this.form.pwdAgain) {
            this.$message({
              message: "两次密码不一致",
              type: "warning"
            });
            return;
          }
          let params = {
            userId: _this.form.userId,
            pwd: _this.form.pwd
          };
          _this.$fetch(_this.$API.POST_SYS_RESET, params).then(result => {
            if (result.code == "0") {
              if (_this.$fn.isNull(_this.form.pwd)) {
                this.$message({
                  message: "密码初始化成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "密码设置成功",
                  type: "success"
                });
              }
              this.dialogFormVisible = false;
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
    seek() {
      this.list();
      this.currentPage = 1;
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