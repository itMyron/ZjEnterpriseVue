<template>
	<div class="contain">
		<header>
			<ul>
				<li>剩余金额(元)：</li>
				<li>授权总额度(元)：</li>
				<li>授权利率：</li>
				<li>授权期限：</li>
			</ul>
			<ul class="num">
				<li id="limitMoney">{{baseinfo.limitMoney}}</li>
				<li id="total">{{baseinfo.total}}</li>
				<li id="rate">{{baseinfo.rate}}</li>
				<li >{{baseinfo.monthNum}}</li>
			</ul>
		</header>
		<section>
			<article>
				<h3 class="title">产品类型</h3>
				<div class="list clear">
					<div class="item">
						<span class="bar">产品落户区域：</span>
						<font class="inp" id="productArea" >{{baseinfo.productArea}}</font>
					</div>
					<div class="item">
						<span class="bar">产品类型：</span>
						<font class="inp" id="productType">{{baseinfo.productType}}</font>
					</div>
					<div class="item">
						<span class="bar">保理业务类型：</span>
						<font class="inp" id="factorType" >{{baseinfo.factorType}}</font>
					</div>
					<div class="item">
						<span class="bar">转让额度种类：</span>
						<font class="inp" id="transferMoneyType">{{baseinfo.transferMoneyType}}</font>
					</div>
				</div>
			</article>
			<article>
				<div class="switch">
					<el-switch
						style="display: block"
						v-model="flag"
						active-color="#409EFF"
						inactive-color="#ff4949"
						active-text="编辑"
						inactive-text="">
					</el-switch>
				</div>
			</article>
			<article>
				<h3 class="title">客户基本信息</h3>
				<div class="list clear">
					<div class="item">
						<span class="bar">企业名称：</span>
						<el-input class="inp"  v-model="baseinfo.companyName" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">企业性质：</span>
						<el-input class="inp" id="companyNature" v-model="baseinfo.companyNature"  :disabled="!flag"></el-input>
					</div>
					<divp class="item">
						<span class="bar">注册资金：</span>
						<el-input class="inp" id="registerCapital" v-model="baseinfo.registerCapital"  :disabled="!flag"></el-input>
					</divp>
					<div class="item">
						<span class="bar">实缴资金(万)：</span>
						<el-input class="inp" id="paidCapital" v-model="baseinfo.paidCapital" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item">
						<span class="bar">法定代表人：</span>
						<el-input class="inp"id="legalPerson" v-model="baseinfo.legalPerson" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">联系方式：</span>
						<el-input class="inp" id="contactTel" v-model="baseinfo.contactTel"  :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">成立时间：</span>
						<el-date-picker class="inp" :disabled="!flag"
							v-model="baseinfo.registerTime"
							type="date"
							placeholder="选择日期"
      						value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
					
				</div>
				<div class="list clear">
					<div class="item item4">
						<span class="bar">注册地址：</span>
						<el-input class="inp" id="registerAddress" v-model="baseinfo.registerAddress" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item item4 clear">
						<span class="bar">主营业务：</span>
						<el-input class="inp textarea" id="businessScope" v-model="baseinfo.businessScope" :disabled="!flag" type="textarea"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item item4">
						<span class="bar">股东构成：</span>
						<el-input class="inp textarea" id="corporateArchitecture" v-model="baseinfo.corporateArchitecture" :disabled="!flag" type="textarea"></el-input>
					</div>
				</div>
			</article>
			<article>
				<h3 class="title">财务数据（最近一期）</h3>
				<div class="list clear">
					<p class="item">
						<span class="bar">总资产：</span>
						<el-input class="inp" id="totalAssets" v-model="baseinfo.totalAssets"  :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">主营收入：</span>
						<el-input class="inp" id="primaryIncome" v-model="baseinfo.primaryIncome" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">总负债：</span>
						<el-input class="inp" id="totalLiability" v-model="baseinfo.totalLiability" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">营业利润：</span>
						<el-input class="inp" id="profit" v-model="baseinfo.profit" :disabled="!flag"></el-input>
					</p>
				</div>
				<div class="list clear">
					<p class="item">
						<span class="bar">净资产：</span>
						<el-input class="inp" id="netAsset" v-model="baseinfo.netAsset" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">净利润：</span>
						<el-input class="inp" id="netProfits" v-model="baseinfo.netProfits" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">应收账款：</span>
						<el-input class="inp" id="receivables" v-model="baseinfo.receivables" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">应付账款：</span>
						<el-input class="inp" id="accountsPayable" v-model="baseinfo.accountsPayable" :disabled="!flag"></el-input>
					</p>
				</div>
				<div class="list clear">
					<p class="item">
						<span class="bar">资产负债率：</span>
						<el-input class="inp" id="assetsLiabilitiesRate" v-model="baseinfo.assetsLiabilitiesRate"  :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">流动比例：</span>
						<el-input class="inp" id="flowRate" v-model="baseinfo.flowRate" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">经营性现金流：</span>
						<el-input class="inp" id="runCashFlow" v-model="baseinfo.runCashFlow" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">投资性现金流：</span>
						<el-input class="inp" id="investCashFlow" v-model="baseinfo.investCashFlow" :disabled="!flag"></el-input>
					</p>
				</div>
				<div class="list clear">
					<p class="item">
						<span class="bar">统筹性现金流：</span>
						<el-input class="inp" id="planCashFlow" v-model="baseinfo.planCashFlow" :disabled="!flag"></el-input>
					</p>
				</div>
			</article>
			<article>
				<div>
					<h3 class="title v_title">应收账款基本信息</h3>
					<el-button size="small" type="primary" v-if="flag" @click="handleEdit(-1)"><i class="fa fa-plus"></i>&nbsp;添加条目</el-button>
				</div>
				<div class="list clear">
					<el-table :data="tableData" style="width: 100%">
        				<el-table-column prop="unit" label="应收单位" width="180"></el-table-column>
        				<el-table-column prop="money" label="应收账单金额" width="180"></el-table-column>
        				<el-table-column prop="age" label="账龄"></el-table-column>
						<el-table-column prop="formingReason" label="原因"></el-table-column>
        				<el-table-column label="操作" v-if="flag">
							<template scope="scope">
            					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          					</template>
        				</el-table-column>
      				</el-table>
    				<el-dialog title="应收账款基本信息" :visible.sync="dialogFormVisible">
      					<el-form :model="form" label-width="60%">
        					<el-form-item label="应收单位" :label-width="formLabelWidth">
          					<el-input v-model="form.unit" auto-complete="off"></el-input></el-form-item>
        					<el-form-item label="应收账单金额" :label-width="formLabelWidth">
          						<el-input v-model="form.money" auto-complete="off"></el-input>
        					</el-form-item>
        					<el-form-item label="账龄" :label-width="formLabelWidth">
								<el-input v-model="form.age" auto-complete="off"></el-input>
        					</el-form-item>
        					<el-form-item label="原因" :label-width="formLabelWidth">
								<el-input  v-model="form.formingReason" auto-complete="off" type="textarea"></el-input>
        					</el-form-item>
      					</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="cancel">取 消</el-button>
							<el-button type="primary" @click="conform">确 定</el-button>
						</div>
    				</el-dialog>
				</div>
			</article>
		</section>
		<footer v-if="flag">
			<el-button  size="small" @click="flag = false">取消</el-button>
			<el-button  size="small" @click="submit()" type="primary" >保存</el-button>
		</footer>
	</div>
</template>
<script>
	
	import { reformat } from '../../../static/reformartDate'
	import fn from "@/static/common";
	export default {
		data(){
			return {
				baseinfo : {},
				flag : false ,
				tableData:[] ,
				dialogFormVisible: false,
				formLabelWidth: '100px',
				form: {},
				currentIndex: '',
				selectIndex:''
			}
		},
		components:{

		},
		methods :{
			conform(){
				this.dialogFormVisible = false;
			},
			init(){
				let _this = this ;
				_this.$fetch(this.$API.CREDIT_MONEY)
				.then((resultData) => {
					if(null!=resultData&&resultData.code=='0'){
						_this.baseinfo.limitMoney = resultData.limitMoney;
						_this.baseinfo.total = resultData.total;
						_this.baseinfo.rate = resultData.rate;
						//_this.baseinfo.monthNum = resultData.monthNum;
					}
				}),
				
				_this.$post(_this.$API.CORE_COMPARE_BASEINFO)
				.then((result) => {
					if(result.code == "0"){
						_this.baseinfo.id=result.info.id;
						_this.baseinfo.productArea = result.info.productArea ;
						//产品类型
						const productType = result.info.productType || "" ;
						if(productType == "1"){
							_this.baseinfo.productType = "应收账款装让" ;
						}else if(productType == "2"){
							_this.baseinfo.productType = "票据" ;
						}
						//保理业务类型
						const factorType = result.info.factorType ;
						switch (factorType) {
							case 1:	_this.baseinfo.factorType = "公开型有追索权保理" ; break ;
							case 2:	_this.baseinfo.factorType = "隐蔽型有追索权保理" ; break ;	
							case 3:	_this.baseinfo.factorType = "公开型无追索权保理" ; break ;
							case 4:	_this.baseinfo.factorType = "隐蔽型无追索权保理" ; break ;
							default: _this.baseinfo.factorType = "没有任何保理业务" ; break;
						}
						//转让额度种类
						const transferMoneyType = result.info.transferMoneyType ;
						switch (transferMoneyType) {
							case 1:	_this.baseinfo.factorType = "循环额度" ; break ;
							case 2:	_this.baseinfo.factorType = "非循环额度" ; break ;	
							default: _this.baseinfo.factorType = "没有转让额度种类业务" ; break;
						}
						_this.baseinfo.companyName = result.info.companyName ;	//企业名称
						_this.baseinfo.companyNature = result.info.companyNature ;	//企业性质
						_this.baseinfo.registerCapital = result.info.registerCapital ;	//注册资金
						_this.baseinfo.paidCapital = result.info.paidCapital ;	//实缴资金
						_this.baseinfo.legalPerson = result.info.legalPerson ;	//法人代表
						_this.baseinfo.contactTel = result.info.contactTel ;	//联系人
						_this.baseinfo.registerTime = result.info.registerTime ;	//成立或者注册时间
						_this.baseinfo.registerAddress = result.info.registerAddress ;	//注册地址
						_this.baseinfo.businessScope = result.info.businessScope ;	//主营业务
						_this.baseinfo.corporateArchitecture = result.info.corporateArchitecture ;	//股东构成
						_this.baseinfo.totalAssets = result.info.totalAssets ;	//总资产
						_this.baseinfo.primaryIncome = result.info.primaryIncome ;	//主营收入
						_this.baseinfo.totalLiability = result.info.totalLiability ;	//总负债
						_this.baseinfo.profit = result.info.profit ;	//营业利润
						_this.baseinfo.netAsset = result.info.netAsset ;	//净资产
						_this.baseinfo.netProfits = result.info.netProfits ;	//净利润
						_this.baseinfo.receivables = result.info.receivables ;	//应收账款
						_this.baseinfo.accountsPayable =result.info.accountsPayable ;	//应付账款
						_this.baseinfo.assetsLiabilitiesRate = result.info.assetsLiabilitiesRate ;	//资产负债率
						_this.baseinfo.flowRate = result.info.flowRate ;	//流动比率
						_this.baseinfo.runCashFlow = result.info.runCashFlow ;	//经营性现金流
						_this.baseinfo.investCashFlow = result.info.investCashFlow ;	//投资性现金流
						_this.baseinfo.planCashFlow = result.info.planCashFlow ;	//统筹性现金流
						//应收账款信息
						let receivables = result.receivables || "" ;
						if(receivables){
							let creditInfo = receivables.map(item => {
								let object ={};
								object.id = item.id;
								object.unit = item.unit;
								object.money = item.money;
								object.age = item.age;
								object.formingReason = item.formingReason;
								return object ;
							}) ;
							_this.tableData = creditInfo;
						}
						
					}else{
						_this.$message({
							message: '查询成功',
							type: 'success'
						});
					}
				})
				.catch((error)=>{
					 _this.$message.error('信息查询错误');
				})
			},
			submit(){
				let _this = this ;
				if(null==_this.baseinfo.companyName.trim()||_this.baseinfo.companyName.trim()==""){
					_this.$message({
						message:'企业为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.companyNature.trim()||_this.baseinfo.companyNature.trim()==""){
					_this.$message({
						message:'企业性质为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.registerCapital.trim()||_this.baseinfo.registerCapital.trim()==""){
					_this.$message({
						message:'注册资金为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.paidCapital.trim()||_this.baseinfo.paidCapital.trim()==""){
					_this.$message({
						message:'实缴资金为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.legalPerson.trim()||_this.baseinfo.legalPerson.trim()==""){
					_this.$message({
						message:'法人代表为空!',
						type:'warning'
					});
					return false;
				}
				
				if(null==_this.baseinfo.contactTel.trim()||_this.baseinfo.contactTel.trim()==""){
					_this.$message({
						message:'联系人为空!',
						type:'warning'
					});
					return false;
				}if(null==_this.baseinfo.registerTime||_this.baseinfo.registerTime==""){
					_this.$message({
						message:'注册时间为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.registerAddress.trim()||_this.baseinfo.registerAddress.trim()==""){
					_this.$message({
						message:'注册地址为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.businessScope.trim()||_this.baseinfo.businessScope.trim()==""){
					_this.$message({
						message:'主营业务为空!',
						type:'warning'
					});
					return false;
				}
				
				if(null== _this.baseinfo.corporateArchitecture.trim()|| _this.baseinfo.corporateArchitecture.trim()==""){
					_this.$message({
						message:'股东构成为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.totalAssets.trim()||_this.baseinfo.totalAssets.trim()==""){
					_this.$message({
						message:'总资产为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.primaryIncome.trim()||_this.baseinfo.primaryIncome.trim()==""){
					_this.$message({
						message:'主营收入为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.totalLiability.trim()||_this.baseinfo.totalLiability.trim()==""){
					_this.$message({
						message:'总负债为空!',
						type:'warning'
					});
					return false;
				}
				if(null== _this.baseinfo.profit.trim()|| _this.baseinfo.profit.trim()==""){
					_this.$message({
						message:'营业利润为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.netAsset.trim()||_this.baseinfo.netAsset.trim()==""){
					_this.$message({
						message:'净资产为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.netProfits.trim()||_this.baseinfo.netProfits.trim()==""){
					_this.$message({
						message:'净利润为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.receivables.trim()||_this.baseinfo.receivables.trim()==""){
					_this.$message({
						message:'应收账款为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.assetsLiabilitiesRate.trim()||_this.baseinfo.assetsLiabilitiesRate.trim()==""){
					_this.$message({
						message:'资产负债率为空!',
						type:'warning'
					});
					return false;
				}
				if(null==_this.baseinfo.flowRate.trim()||_this.baseinfo.flowRate.trim()==""){
					_this.$message({
						message:'流动比率为空!',
						type:'warning'
					});
					return false;
				}
				
				let params = {
				id:_this.baseinfo.id,
				companyName:_this.baseinfo.companyName,//企业名称
				companyNature:_this.baseinfo.companyNature,//企业性质
				registerCapital: _this.baseinfo.registerCapital,//注册资金
				paidCapital: _this.baseinfo.paidCapital,//实缴资金
				legalPerson: _this.baseinfo.legalPerson,//法人代表
				contactTel: _this.baseinfo.contactTel,//联系人
				registerTime: _this.baseinfo.registerTime,//成立或者注册时间
				registerAddress: _this.baseinfo.registerAddress,//注册地址
				businessScope: _this.baseinfo.businessScope,//主营业务
				corporateArchitecture: _this.baseinfo.corporateArchitecture,//股东构成
				
				totalAssets: _this.baseinfo.totalAssets,//总资产
				primaryIncome: _this.baseinfo.primaryIncome,//主营收入
				totalLiability: _this.baseinfo.totalLiability,//总负债
				profit: _this.baseinfo.profit,//营业利润
				netAsset: _this.baseinfo.netAsset,//净资产
				netProfits: _this.baseinfo.netProfits,//净利润
				receivables: _this.baseinfo.receivables,//应收账款
				accountsPayable: _this.baseinfo.accountsPayable,//应付账款
				assetsLiabilitiesRate:_this.baseinfo.assetsLiabilitiesRate,//资产负债率
				flowRate: _this.baseinfo.flowRate,//流动比率
				runCashFlow:_this.baseinfo.runCashFlow,//经营性现金流
				investCashFlow: _this.baseinfo.investCashFlow,//投资性现金流
				planCashFlow: _this.baseinfo.planCashFlow,//统筹性现金流
				receiveStr:JSON.stringify(_this.tableData),
				};
				console.log("删除的数据是"+JSON.stringify(_this.tableData));
				/*_this.$fetch(_this.$API.SUBMIT_COMPARE_INFO,params)
				.then((resultData) => {
					if(null!=resultData&&resultData.code=='0'){
						_this.$message({
						type: 'success',
						message: '修改成功!'	
						})
					}else{
						_this.$message({
						type: 'warning',
						message: resultData.msg
						})
					}
				})*/
				
			},
			handleEdit(index, row) {    //编辑按钮
				this.form = {} ;
				if(index == -1){//新增条目
					this.selectIndex = index;
					this.dialogFormVisible = true
				}else{//编辑
					this.form = this.tableData[index];
					this.currentIndex = index;
					this.selectIndex = index;
					this.dialogFormVisible = true
				}
				
				
			},
			handleDelete(index, row) {  //删除按钮
				//this.tableData = {id:row.id}
				console.log("删除的id是"+row.id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData.splice(index, 1)
					this.$message({
					type: 'success',
					message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
					type: 'info',
					message: '已取消删除'
					})
				})
			},
			cancel() {      //取消按钮
				this.dialogFormVisible = false
			},
			conform() {      //确定按钮
				//this.form.date = reformat(this.form.date)
				//this.tableData.push(this.form)
				let _this = this;
				console.log("选择的按钮是"+_this.selectIndex)
				if(null!=_this.selectIndex){
					if(_this.selectIndex==-1){
						this.tableData.push(this.form)
					}else{
						
					}
				}
				this.dialogFormVisible = false
			},
		},
		created(){
			this.init();
		}
	}

</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>

