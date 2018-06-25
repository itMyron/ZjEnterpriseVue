<template>
	<div class="contain">
		<header>
			<h2 class="titile">新增</h2>
		</header>
		<section>
			<article class="barTop">
				<ul>
					<li>剩余金额(元)：</li>
					<li>授权总额度(元)：</li>
					<li>授权利率：</li>
				</ul>
				<ul class="num">
					<li>{{limitMoney}}</li>
					<li>{{total}}</li>
					<li>{{rate}}</li>
				</ul>
			</article>
			<article>
				<h3 class="title">基本信息</h3>
				<div class="list clear">
					<div class="item">
						<span class="bar">企业名称：</span>
						<el-input class="inp" v-model="compareName" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">企业性质：</span>
						<el-input class="inp" v-model="companyNature" :disabled="!flag"></el-input>
					</div>
					<divp class="item">
						<span class="bar">法人代表：</span>
						<el-input class="inp" v-model="name" :disabled="!flag"></el-input>
					</divp>
					<div class="item">
						<span class="bar">注册资金：</span>
						<el-input class="inp" v-model="registerCapital" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item">
						<span class="bar">注册时间：</span>
						<el-date-picker class="inp" :disabled="!flag" v-model="registerTime" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd">
						</el-date-picker>
						<!--<span class="bar">注册时间：</span>
						<el-input class="inp" v-model="registerTime" :disabled="!flag"></el-input>-->
					</div>
					<div class="item">
						<span class="bar">实缴资金：</span>
						<el-input class="inp" v-model="paidCapital" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">所属行业：</span>
						<el-input class="inp" v-model="trade" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">主营业务：</span>
						<el-input class="inp" v-model="businessScope" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item item4">
						<span class="bar">联系地址：</span>
						<el-input class="inp" v-model="address" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item">
						<span class="bar">开始合作时间：</span>
						<el-date-picker class="inp" :disabled="!flag" v-model="joinTime" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd">
						</el-date-picker>
						<!--<span class="bar">开始合作时间：</span>
						<el-input class="inp" v-model="joinTime" :disabled="!flag"></el-input>-->
					</div>
					<div class="item">
						<span class="bar" style="width:98px;">联系方式：</span>
						<el-input class="inp" v-model="tel" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar" style="width:98px;">法人身份证号：</span>
						<el-input class="inp" v-model="idCard" :disabled="!flag"></el-input>
					</div>
				</div>
			</article>
			<article>
				<h3 class="title">前三大客户的业务占比</h3>
				<div class="list clear">
					<p class="item">
						<span class="bar">客户名称1：</span>
						<el-input class="inp" v-model="clientInfo.clientName1" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例1：</span>
						<el-input class="inp" v-model="clientInfo.occupyRate1" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">客户名称2：</span>
						<el-input class="inp" v-model="clientInfo.clientName2" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例2：</span>
						<el-input class="inp" v-model="clientInfo.occupyRate2" :disabled="!flag"></el-input>
					</p>
				</div>
				<div class="list clear">
					<p class="item">
						<span class="bar">客户名称3：</span>
						<el-input class="inp" v-model="clientInfo.clientName3" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例3：</span>
						<el-input class="inp" v-model="clientInfo.occupyRate3" :disabled="!flag"></el-input>
					</p>
				</div>
			</article>
			<article>
				<h3 class="title">银行信息</h3>
				<div class="list clear">
					<p class="item">
						<span class="bar">银行名称：</span>
						<el-input class="inp" v-model="bankName" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">银行支行名称：</span>
						<el-input class="inp" v-model="bankBranch" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">银行开户名称：</span>
						<el-input class="inp" v-model="bankAccount" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">银行卡号：</span>
						<el-input class="inp" v-model="bankCardNum" :disabled="!flag"></el-input>
					</p>
				</div>
			</article>
			<article>
				<h3 class="title">建议额度</h3>
				<div class="list clear">
					<p class="item">
						<span class="bar">额度：</span>
						<el-input class="inp" v-model="creadit" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">利率：</span>
						<el-input class="inp" v-model="rate" :disabled="flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">期限：</span>
						<el-input class="inp" v-model="limitNum" :disabled="!flag"></el-input>
					</p>
				</div>
			</article>
			<article>
				<h3 class="title">附件资料</h3>
				<div class="list clear">
					<div class="item" v-for="item in dialogImageUrl" :key="item">
						<uploadImg @url="getUrl" :dialogImageUrl="item.filePath+item.fileName" :fileName="item.fileName" :fileType="item.fileType" :flag="flag" :title="item.fileTypeStr"></uploadImg>
					</div>
				</div>
			</article>
		</section>
		<footer v-if="flag">
			<el-button size="small" @click="flag = false">取消</el-button>
			<el-button size="small" @click="submit(flag)" type="primary">保存</el-button>
		</footer>
	</div>
</template>
<script>
	import uploadImg from '../../../../components/uploadImg/index'

	export default {
		components: {
			"uploadImg": uploadImg
		},
		data() {

			return {
				flag: true,
				dialogImageUrl: [],
				tableData: [],
				dialogFormVisible: false,
				formLabelWidth: '100px',
				form: {},
				currentIndex: '',

				limitMoney: '', //剩余额度
				total: '', //授信总额度
				rate: '', //授信利率
				compareName: '', //企业名称
				companyNature: '', //企业性质
				name: '', //法人代表
				idCard:'',//法人身份证号
				registerCapital: '', //注册资金
				registerTime: '', //注册时间
				paidCapital: '', //实缴资金
				trade: '', //所属行业
				businessScope: '', //主营业务
				address: '', //联系地址
				joinTime: '', //合作时间
				tel: '', //联系方式
				clientInfo: {}, //三大客户比例
				bankName: '', //银行名称
				bankBranch: '', //银行支行名称
				bankAccount: '', //银行开户名称
				bankCardNum: '', //银行卡号
				creadit: '', //额度
				limitRate: '', //利率
				limitNum: '', //期限
				imageList: [], //附件图片信息
			}
		},
		methods: {
			init() {
				let _this = this;
				console.log("返回的额度的接口是" + _this.$API.CREDIT_MONEY);
				_this.$fetch(this.$API.CREDIT_MONEY)
					.then((resultData) => {
						if(null != resultData && resultData.code == '0') {
							console.log("返回的对象是" + resultData + "返回的属性是" + resultData.total);
							_this.limitMoney = resultData.limitMoney;
							_this.total = resultData.total;
							_this.rate = resultData.rate;
						}
					});

			},
			submit(flag) {
				flag = true;
				let _this = this;
				console.log("获取的客户的姓名是" + _this.compareName);
				if(_this.compareName.trim() == null || _this.compareName.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '企业名称为空!'
					})
					return false;
				}
				if(_this.companyNature.trim() == null || _this.companyNature.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '企业性质为空!'
					})
					return false;
				}
				if(_this.name.trim() == null || _this.name.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '法人代表为空!'
					})
					return false;
				}
				if(_this.registerCapital.trim() == null || _this.registerCapital.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '注册资金为空!'
					})
					return false;
				}

				if(_this.registerTime == null || _this.registerTime == "") {
					_this.$message({
						type: 'warning',
						message: '注册时间为空!'
					})
					return false;
				}

				if(_this.paidCapital.trim() == null || _this.paidCapital.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '实缴资金为空!'
					})
					return false;
				}
				if(_this.trade.trim() == null || _this.trade.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '所属行业为空!'
					})
					return false;
				}
				if(_this.businessScope.trim() == null || _this.businessScope.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '主营业务为空!'
					})
					return false;
				}

				if(_this.address.trim() == null || _this.address.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '联系地址为空!'
					})
					return false;
				}
				if(_this.joinTime == null || _this.joinTime == "") {
					_this.$message({
						type: 'warning',
						message: '开始合作时间为空!'
					})
					return false;
				}
				if(_this.tel.trim() == null || _this.tel.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '紧急联系人电话为空!'
					})
					return false;
				}
				if(null==_this.idCard.trim()||_this.idCard.trim()==""){
					_this.$message({
						type: 'warning',
						message: '法人身份证号为空!'
					})
					return false;
				}
				//合作人信息是可以为空
				console.log("三大客户信息是" + _this.clientInfo);
				if(_this.bankName.trim() == null || _this.bankName.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '银行名称为空!'
					})
					return false;
				}
				if(_this.bankAccount.trim() == null || _this.bankAccount.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '银行开户名称为空!'
					})
					return false;
				}
				if(_this.bankCardNum.trim() == null || _this.bankCardNum.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '银行卡号为空!'
					})
					return false;
				}
				if(_this.creadit.trim() == null || _this.creadit.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '额度为空!'
					})
					return false;
				} else {
					console.log("建议额度是" + _this.creadit + "剩余金额" + _this.limitMoney + "授信总金额" + _this.total);
					if(_this.creadit > _this.limitMoney) {
						_this.$message({
							type: 'warning',
							message: '授信额度大于不能大于剩余金额或者授信总金额!'
						})
						return false;
					}

				}
				if(_this.limitNum.trim() == null || _this.limitNum.trim() == "") {
					_this.$message({
						type: 'warning',
						message: '期限为空!'
					})
					return false;
				}
				let viewImg = "";
				let dialogImageUrl = this.dialogImageUrl;
				for(let i = 0; i < dialogImageUrl.length; i++) {
					if(dialogImageUrl[i].fileName != null) {
						viewImg +=
							dialogImageUrl[i].fileType + ";" + dialogImageUrl[i].fileName + ",";
					}
				}
				console.log("信息是" + _this.clientInfo);
				let params = {
					type:2,
					companyName: _this.compareName, //姓名
					companyNature: _this.companyNature, //身份证号
					name: _this.name, //联系方式
					registerCapital: _this.registerCapital, //车牌号
					registerTime: _this.registerTime, //开始合作时间
					paidCapital: _this.paidCapital, //有无合同
					trade: _this.trade, //所属行业
					businessScope: _this.businessScope, //主营业务
					address: _this.address, //联系地址
					joinTime: _this.joinTime, //紧急联系人
					tel: _this.tel, //紧急 联系人电话
					idCard :_this.idCard,
					proportionClient: JSON.stringify(_this.clientInfo), //三大客户比例
					bankName: _this.bankName, //银行名称
					bankBranch: _this.bankBranch, //银行支行名称
					bankAccount: _this.bankAccount, //银行开户名称
					bankCardNum: _this.bankCardNum, //银行卡号
					limitMoney: _this.creadit, //额度
					rate: _this.rate, //利率
					monthNum: _this.limitNum, //期限
					viewImgs: viewImg
				}
				console.log("选择的时间是注册时间" + _this.compareName + "合作时间" + _this.joinTime);
				console.log("企业供应商信息新增接口" + _this.$API.ADD_SUPPLIER_INFO, params);
				_this.$fetch(_this.$API.ADD_SUPPLIER_INFO, params)
					.then((resultData) => {
						if(null != resultData && resultData.code == '0') {
							_this.$message({
								type: 'success',
								message: '新增成功!'
							})
							this.$router.back(-1);
						} else {
							_this.$message({
								type: 'warning',
								message: resultData.msg
							})
						}
					})

			},
			handleEdit(index, row) { //编辑按钮
				this.form = {};
				if(index == 666) {
					this.dialogFormVisible = true
				} else {
					this.form = this.tableData[index]
					this.currentIndex = index
					this.dialogFormVisible = true
				}

			},
			handleDelete(index, row) { //删除按钮
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
			cancel() { //取消按钮
				this.dialogFormVisible = false
			},
			defaultLoad(data) {
				return false;
			},
			update() { //确定按钮
				this.form.date = reformat(this.form.date)
				this.tableData.push(this.form)
				this.dialogFormVisible = false
			},
			getUrl(data) {
				console.log(data)
				this.dialogImageUrl.map(item => {
					if(item.fileType == data.fileType) {
						item.fileName = data.fileName;
					}
				})
			}
		},
		created() {　　　　
			this.init();　 //页面创建的时候就会立即加载init方法
			let fileTypes = [1, 3, 4, 5, 6, 7];
			for(let i = 0; i < fileTypes.length; i++) {
				let fileArr = {};
				if(fileTypes[i] != null) {
					if(fileTypes[i] == 1) {
						fileArr.fileTypeStr = "营业执照";
						fileArr.fileType = 1;
						this.dialogImageUrl.push(fileArr);
					}
					if(fileTypes[i] == 3) {
						fileArr.fileTypeStr = "开户许可证";
						fileArr.fileType = 3;
						this.dialogImageUrl.push(fileArr);
					}
					if(fileTypes[i] == 4) {
						fileArr.fileTypeStr = "法人身份证复印件";
						fileArr.fileType = 4;
						this.dialogImageUrl.push(fileArr);
					}
					if(fileTypes[i] == 5) {
						fileArr.fileTypeStr = "增值税纳税人一般证明";
						fileArr.fileType = 5;
						this.dialogImageUrl.push(fileArr);
					}
					if(fileTypes[i] == 6) {
						fileArr.fileTypeStr = "征信授权书";
						fileArr.fileType = 6;
						this.dialogImageUrl.push(fileArr);
					}
					if(fileTypes[i] == 7) {
						fileArr.fileTypeStr = "基础交易合同";
						fileArr.fileType = 7;
						this.dialogImageUrl.push(fileArr);
					}
				}
			}
		},

	}
</script>
<style lang="scss" scoped type="text/css">
	@import "./index.scss";
</style>