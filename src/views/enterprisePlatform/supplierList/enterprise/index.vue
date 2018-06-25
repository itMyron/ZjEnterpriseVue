<template>
	<div class="contain">
		<header>
			<el-input class="inp" v-model="key" placeholder="请输入公司名称或联系方式"></el-input>
			<el-button type="primary" plain icon="el-icon-search" size="mini">搜索</el-button>
			<el-button type="success" plain icon="el-icon-plus" size="mini" @click="add">新增</el-button>
		</header>
		<section>
			<el-table :data="tableData" stripe style="width: 100%">
    			<el-table-column prop="supCompanyName" label="企业名称" width="100"></el-table-column>
    			<!--<el-table-column prop="tel" label="联系方式" ></el-table-column>
    			<el-table-column prop="joinTime" label="开始合作时间" width="120" ></el-table-column>-->
				<el-table-column prop="businessScope" label="所属行业" width="100"></el-table-column>
				<el-table-column prop="address" label="联系地址"></el-table-column>
				<el-table-column prop="creditM" label="授信额度" width="100"></el-table-column>
				<el-table-column prop="status" label="审核"width="60"></el-table-column>
				<el-table-column prop="modifyTime" label="修改时间" width="150"></el-table-column>
				<el-table-column fixed="right" label="操作" width="350">
					<template slot-scope="scope">
						<!-- <el-button 	@click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button> -->
						<el-button size="mini" type="default" class="el-button el-button--info el-button--mini is-plain" plain @click="view(scope.row.id)">查看</el-button>
						<el-button size="mini" type="success" plain @click="agree(scope.row.id,1,scope.row.creditLimit)" v-show="scope.row.status=='待审核'">同意</el-button>
						<el-button size="mini" type="danger" plain @click="refuser(scope.row.id,2,scope.row.creditLimit)" v-show="scope.row.status=='待审核'">拒绝</el-button>
						<el-button size="mini" type="warning" plain @click="handleEdit(scope.row.id,scope.row)" v-if="scope.row.userId==null" >分配账号</el-button>
						<el-button size="mini" type="warning" plain @click="handleEdit2(scope.row.userId)" v-if="scope.row.userId!=null">重置密码</el-button>
					</template>
				</el-table-column>
  			</el-table>
			<el-dialog title="分配账号" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="账号" :label-width="formLabelWidth">
						<el-input v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form.conPassword"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="update">确 定</el-button>
				</div>
    		</el-dialog>
    		
		</section>
		<footer>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50]" :page-size="limitSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
			</el-pagination>
		</footer>
	</div>
</template>
<script>
	import { reformat } from '../../../../static/reformartDate'	
	import API from "@/config/api";
	let supplierInfo = [];
	export default {
		data(){
			let paramId = '';
			return {
				dialogFormVisible: false,
				formLabelWidth: '80px',
				form: {},
				currentIndex: '',
				tableData:supplierInfo,
				key:"",//查询信息
				
			}
		},
		components:{

		},
		methods: {
			add(){
				const self = this ;
				self.$store.dispatch("nav/changeBack", true);
				self.$router.push({
					"path":"eadd"
				})
			},
			lists(){
			let _this = this ;
			let currentPage = _this.currentPage;//当前页
      		let limitSize = _this.limitSize;//每页的条数
      		let totalCount = _this.totalCount;
      		//默认值的设置
      		if(null==currentPage||currentPage==""){
      			currentPage = 1;
      		}
      		if(null==limitSize||limitSize==""){
      			limitSize = 20;
      		}
      		if(null==totalCount||totalCount==""){
      			totalCount = 0;
      		}
      		let params ={
      			type: 2,
		        page: currentPage,
		        limit: limitSize,
		        key: _this.key
      		}
			let path =_this.$API.COMPARE_SUPPLIER_LIST+"&page=1&limit=10" 
			_this.$post(path).then((result) => {
					if(null!=result&&result.code=='0'){
						  let getData  = result.page.list;
						  supplierInfo = getData;
						   if(null!=supplierInfo){
						  	for(let i=0;i<supplierInfo.length;i++){
						  		let getSate = supplierInfo[i].status;
						  		//'0待审核1通过2拒绝'
						  		if(null!=getSate&&getSate=='0'){
						  			supplierInfo[i].status="待审核";
						  		}else if(null!=getSate&&getSate=='1'){
						  			supplierInfo[i].status="通过";
						  		}else if(null!=getSate&&getSate=='2'){
						  			supplierInfo[i].status="拒绝";
						  		}
						  }
						}
						   this.tableData= supplierInfo;
				          _this.totalCount = result.page.totalCount;
				          _this.limitSize = result.page.pageSize;
				          _this.currentPage = result.page.currPage;
					}
				});
			},
			agree(id,state,creditLimit){
				let _this = this;
				let  params ={supId:id,status:state,creditM:creditLimit};
				_this.$fetch(_this.$API.COMPARE_SUPPLIER_AUDIT,params)
				.then((resultData) => {
					if(null!=resultData&&resultData.code=='0'){
						_this.$message({
						type: 'success',
						message: '同意操作成功!'	
						})
					}else{
						_this.$message({
						type: 'warning',
						message: resultData.msg
						})
					}
				})
				
			},
			refuser(id,state,creditLimit){
				let _this = this;
				let  params ={supId:id,status:state,creditM:creditLimit};
				_this.$fetch(_this.$API.COMPARE_SUPPLIER_AUDIT,params)
				.then((resultData) => {
					if(null!=resultData&&resultData.code=='0'){
						_this.$message({
						type: 'success',
						message: '拒绝操作成功!'	
						})
					}else{
						_this.$message({
						type: 'warning',
						message: resultData.msg
						})
					}
				})
			},
			view(id){		//点击查看按钮
				let _this = this ;
				const self = this ;
				self.$router.push({
					"path":"eview",
					query: {suppId: id}})
			},
			 seek() {
			  this.lists();
		      this.currentPage = 1;
		    },
			handleEdit(id,row) {    //分配账户
				this.form = { suppId: id };
      			this.form.username = row.username;
				this.dialogFormVisible = true;
				
			},
			handleEdit2(userId) {    //重置密码
				let _this = this ;
				this.$confirm("是否继续此项操作?", "提示", {
		        confirmButtonText: "确定",
		        cancelButtonText: "取消",
		        type: "warning"
		      })
		        .then(() => {
		         let params = {userId:userId};
		          _this.$fetch(_this.$API.POST_SYS_RESET, params).then(result => {
		            if (result.code == "0") {
		              this.$message({
		                message: "重置成功",
		                type: "success"
		              });
		              this.lists();
		            } else {
		              this.$message({
		                message: result.msg,
		                type: "warning"
		              });
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
			cancel() {      //取消按钮
				this.dialogFormVisible = false
			},
			update() {      //确定按钮  重置账户
				let _this =this;
				if(null==_this.form.username||_this.form.username==""){
					_this.$message({
					type: 'warning',
					message: '用户名为空!'	
					})
					return false;
				}
				if(null==_this.form.password||_this.form.password==""){
					_this.$message({
					type: 'warning',
					message: '密码为空!'	
					})
					return false;
				}
				if(null==_this.form.conPassword||_this.form.conPassword==""){
					this.$message({
					type: 'warning',
					message: '确认密码为空!'	
					})
					return false;
				}
				if(null!=_this.form.password &&null!=_this.form.conPassword){
					if(_this.form.password !=_this.form.conPassword){
						this.$message({
						type: 'warning',
						message: '新密码和确认密码不一致!'	
						})
						return false;
						}
				}
				let params ={
					suppId:_this.form.suppId,
					username:_this.form.username,
					password:_this.form.password
				}
				_this.$fetch(this.$API.POST_SYS_CRTA,params)
				.then((resultData) => {
					if(null!=resultData&&resultData.code=='0'){
						_this.$message({
						type: 'warning',
						message: '分配账户成功'	
						})
						location.reload();
					}else{
						_this.$message({
						type: 'warning',
						message: resultData.msg
						})
					}
				});
				this.lists();
				this.dialogFormVisible = false;
				
			},
      		deleteRow(index, rows) {	//表格里面的操作按钮
				rows.splice(index, 1);
			},
			handleSizeChange(val) {		//改变每页条数
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {		//改变当前页时会触发
				console.log(`当前页: ${val}`);
			}
    },
	    created() {
	    this.lists();
	  	}
	}
	

</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
