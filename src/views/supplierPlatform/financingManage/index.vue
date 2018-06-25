<template>
	<div class="contain">
		<header>
			<el-input class="inp"  v-model="personalKey" placeholder="请输入债务人或合同编号"></el-input>
			<el-button type="primary" plain icon="el-icon-search" size="mini" @click="seek">搜索</el-button>
			<el-button type="success" plain icon="el-icon-plus" size="mini" @click="handleAdd(true)">新增</el-button>
		</header>
		<section>
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="supName" label="债权人"></el-table-column>
				<el-table-column prop="legalPerson" label="债务人"></el-table-column>
				<el-table-column prop="compactCode" label="基础合同编号" width="110"></el-table-column>
				<el-table-column prop="receivablesBalance" label="应收账款金额" width="140"></el-table-column>
				<el-table-column prop="financingMoney" label="融资金额" ></el-table-column>
				<el-table-column prop="compactTime" label="应收账款到期日" width="180"></el-table-column>
				<el-table-column prop="factoringTime" label="保理到期日" width="180"></el-table-column>
        		<el-table-column prop="applyTime" label="申请时间" width="180"></el-table-column>
				<el-table-column prop="audit" label="状态" ></el-table-column>
				<el-table-column fixed="right" label="操作" width="310">
					<template slot-scope="scope">
						<el-button size="mini" type="info" plain @click="handleView(scope.row)" >查看</el-button>
						<el-button size="mini" type="success" plain @click="applyAudit(scope.row)" v-if="scope.row.audit==='待发起'">申请融资</el-button>
						<el-button size="mini" type="primary" plain @click="repayment()">还款计划</el-button>
					</template>
				</el-table-column>
  			</el-table>
		</section>
		<footer>
			<el-pagination
				@size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="currentPage"
				 :page-sizes="[10, 20, 30]" :page-size="limitSize" layout="total, sizes, prev, pager, next, jumper"
				 :total="totalCount">
			</el-pagination>
		</footer>
	</div>
</template>
<script>
	import uploadImg from '../../components/supplierImg/index';
	let supplierInfo = [];
	export default {
		data(){
			return {
				tableData: supplierInfo,
				totalCount:"0",
			}
		},
		components:{
			"uploadImg":uploadImg
		},
		methods: {
			init(){
				let _this = this ;
				let currentPage = _this.currentPage;
			    let limitSize = _this.limitSize;
			    if (this.currentPage == null) {
			      currentPage = 1;
			    }
			    if (this.limitSize == null) {
			      limitSize = 10;
			    }
			    if (this.totalCount == null) {
			      this.totalCount = 0;
			    }
			    let params = {
			      page: currentPage,
			      limit: limitSize,
			      key: _this.personalKey
			    };
				_this.$fetch(_this.$API.POST_SUPPLIERFACTORINGLIST,params)
					.then((result) => {
							  let data  = result.page.list;
							  if( result.code == "0" ){
							  	if(null != data){
							  		supplierInfo = data;
							  		for(var i=0;i<supplierInfo.length;i++){
							  			 //设置审核状态
							  			if(supplierInfo[i].applyStatus == 4){
							  				supplierInfo[i].audit = "打款中";
							  			}else if( supplierInfo[i].applyStatus == 5 ){
							  				supplierInfo[i].audit = "已打款";
							  			}else if((supplierInfo[i].status == 2 && supplierInfo[i].applyStatus == 3) 
									    || supplierInfo[i].status == 1)  {
							  				supplierInfo[i].audit = "待发起";
							  			}else{
							  				supplierInfo[i].audit = "审核中";
							  			}
								    }
							  		_this.tableData = supplierInfo;
							  	    _this.totalCount = result.page.totalCount;
							    	_this.limitSize = result.page.pageSize;
							    	_this.currentPage = result.page.currPage;
							  }
						}else{
							_this.$message.error(result.msg);
						}
				})
			},
		    seek() {
		      this.init();
		      this.currentPage = 1;
		    },
			handleSizeChange(val) {		//改变每页条数
				 this.limitSize = val;
     			 this.init();
			},
			handleCurrentChange(val) {		//改变当前页时会触发
				this.currentPage = val;
      			this.init();
			},
			handleView(row){	//查看按钮
				const self = this ;
				let params = {
					id : row.id,
					status : row.status,
					applyStatus : row.applyStatus
				}
				self.$store.dispatch("nav/changeBack", true);
				self.$store.dispatch("financingManage/changeFlag",false) ;
				self.$router.push({
					"path":"/financingManageView",
					"query":params
				})
			},
			handleAdd(val){	//新增按钮
				const self = this ;
				self.$store.dispatch("nav/changeBack", true);
				self.$router.push({
					"path":"/financingManageAdd",
				})
			},//申请状态
			applyAudit(row){
				let _this = this;
				_this.$confirm('确定发起融资申请吗', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					let params = {
						id:row.id
					}
					_this.$fetch(_this.$API.POST_START_BU,params)
					.then((result) => {
						if(result.state == "200"){
							_this.$message({
							    message: '发起申请成功',
							    type: 'success'
							});
							row.audit = "审核中";
						}else{
							_this.$message.error(result.msg);
						}
					})
				}).catch(() => {
				});
			},
			cancel() {      //关闭按钮
				let _this = this;
				_this.dialogFormVisible = false ;
			},
			//还款计划
			repayment(){
				const self = this ;
				self.$message({message: '还款计划',type: 'success'});
			}
    	},
		created(){	
			let _this = this;
			_this.init();
		}
	}



</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
