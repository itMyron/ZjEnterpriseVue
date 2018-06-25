<template>
	<div class="contain">
		<header>
			<h2 class="titile">查看</h2>
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
				<div class="switch">
					<el-switch style="display: block" v-model="flag" active-color="#409EFF" inactive-color="#ff4949" active-text="编辑" inactive-text="">
					</el-switch>
				</div>
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
						<el-date-picker class="inp" :disabled="!flag" v-model="registerTime" type="date" placeholder="选择时间"  value-format="yyyy-MM-dd">
						</el-date-picker>
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
				</div>
				<div class="list clear">
					<div class="item">
						<span class="bar">开始合作时间：</span>
						<el-date-picker class="inp" :disabled="!flag" v-model="joinTime" type="date" placeholder="选择时间"  value-format="yyyy-MM-dd">
						</el-date-picker>
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
						<el-input class="inp" v-model="clientName1" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例1：</span>
						<el-input class="inp" v-model="occupyRate1" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">客户名称2：</span>
						<el-input class="inp" v-model="clientName2" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例2：</span>
						<el-input class="inp" v-model="occupyRate2" :disabled="!flag"></el-input>
					</p>
				</div>
				<div class="list clear">
					<p class="item">
						<span class="bar">客户名称3：</span>
						<el-input class="inp" v-model="clientName3" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例3：</span>
						<el-input class="inp" v-model="occupyRate3" :disabled="!flag"></el-input>
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
						<el-input class="inp" v-model="alimitInfo.limitMoney" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">利率：</span>
						<el-input class="inp" v-model="rate" disabled="true"></el-input>
					</p>
					<p class="item">
						<span class="bar">期限：</span>
						<el-input class="inp" v-model="alimitInfo.monthNum" :disabled="!flag"></el-input>
					</p>
				</div>
			</article>
			<article>
				<h3 class="title">附件资料</h3>
				<div class="list clear">
					<div class="item" v-for="item in dialogImageUrl" :key="item">
						<uploadImg @url="getUrl" :dialogImageUrl="item.filePath+item.fileName" :fileName="item.fileName" :fileType="item.fileType" :flag="flag" :title="item.fileTypeStr"></uploadImg>
					</div>
					<!--<div class="item" v-for="item in returnImage" :key="item">
						<uploadImg @url="getUrl" 
								:dialogImageUrl="item.dialogImageUrl" 
								:flag="flag" :title='item.title'></uploadImg>
					</div>-->
				</div>
			</article>
		</section>
		<footer v-if="flag">
			<el-button size="small" @click="flag = false">取消</el-button>
			<el-button size="small" @click="editBase" type="primary">保存</el-button>
		</footer>
	</div>
</template>
<script>
	import uploadImg from '../../../../components/uploadImg/index'
	//定义全局变量
	let compareino = {
		name: '', //姓名
	};

	export default {
		components: {
			"uploadImg": uploadImg
		},
		data() {
			return {
				flag: false,
				dialogImageUrl: [],
				limitMoney: '', //剩余额度
				total: '', //授信总额度
				rate: '', //授信利率
				monthNum: '', //授信期限
				compareName: '', //企业名称
				companyNature: '', //企业性质
				name: '', //法人代表
				registerCapital: '', //注册资金
				registerTime: '', //注册时间
				paidCapital: '', //实缴资金
				trade: '', //所属行业
				businessScope: '', //主营业务
				address: '', //联系地址
				joinTime: '', //合作时间
				tel: '', //联系方式
				idCard:'',
				clientInfo: {}, //三大客户比例
				bankName: '', //银行名称
				bankBranch: '', //银行支行名称
				bankAccount: '', //银行开户名称
				bankCardNum: '', //银行卡号
				//建议额度信息
				alimitInfo: {},
				imageList: [], //附件图片信息
				dialogFormVisible: false,
				formLabelWidth: '100px',
				imageList: [],
				form: {},
				currentIndex: '',
			}
		},
		methods: {
			//数据的初始化操作
			init() {
				let _this = this;
				console.log("企业供应商详情地址是" + _this.$API.CREDIT_MONEY);
				_this.$post(_this.$API.CREDIT_MONEY)
					.then((result) => {
						console.log("返回的数据" + result.receivables);
						//查询的额度信息
						if(null != result && result.code == "0") {
							_this.limitMoney = result.limitMoney;
							_this.rate = result.rate;
							_this.total = result.total;
						} else {
							_this.$message({
								message: '额度信息查询失败！',
								type: 'warning'
							});
						}
					})
				console.log("当前浏览器的请求参数是" + this.$route.query.suppId);
				_this.$fetch(_this.$API.COMPARE_SUPPLIER_DETAIL, {
						"suppId": this.$route.query.suppId
					})
					.then((result) => {
						//查询的额度信息
						if(null != result && result.code == "0") {
							if(null != result.supplier) {
								let getSupplierData = result.supplier;
								_this.compareName = getSupplierData.companyName;
								_this.companyNature = getSupplierData.companyNature;
								_this.name = getSupplierData.name;
								_this.registerCapital = getSupplierData.registerCapital;
								_this.registerTime = getSupplierData.registerTime;
								_this.paidCapital = getSupplierData.paidCapital;
								_this.trade = getSupplierData.trade;
								_this.businessScope = getSupplierData.businessScope;
								_this.address = getSupplierData.address;
								_this.joinTime = getSupplierData.joinTime;
								_this.tel = getSupplierData.tel;
								_this.idCard = getSupplierData.idCard;
								//三大客户信息
								_this.clientInfo = getSupplierData.proportionClient;
								let bToObj = JSON.parse(getSupplierData.proportionClient);
								if(null != bToObj) {
									_this.clientName1 = bToObj.clientName1;
									_this.occupyRate1 = bToObj.occupyRate1;
									_this.clientName2 = bToObj.clientName2;
									_this.occupyRate2 = bToObj.occupyRate2;
									_this.clientName3 = bToObj.clientName3;
									_this.occupyRate3 = bToObj.occupyRate3;
								}
								_this.bankName = getSupplierData.bankName;
								_this.bankBranch = getSupplierData.bankBranch;
								_this.bankAccount = getSupplierData.bankAccount;
								_this.bankCardNum = getSupplierData.bankCardNum;

								let accessories = result.accessories;
								let fileTypes = [1, 3, 4, 5, 6, 7];
								for(let i = 0; i < accessories.length; i++) {
									if(accessories[i].fileType == 1) {
										accessories[i].fileTypeStr = "营业执照";
										delete fileTypes[0];
									}
									if(accessories[i].fileType == 3) {
										accessories[i].fileTypeStr = "开户许可证";
										delete fileTypes[1];
									}
									if(accessories[i].fileType == 4) {
										accessories[i].fileTypeStr = "法人身份证复印件";
										delete fileTypes[2];
									}
									if(accessories[i].fileType == 5) {
										accessories[i].fileTypeStr = "增值税纳税人一般证明";
										delete fileTypes[3];
									}
									if(accessories[i].fileType == 6) {
										accessories[i].fileTypeStr = "征信授权书";
										delete fileTypes[4];
									}
									if(accessories[i].fileType == 7) {
										accessories[i].fileTypeStr = "基础交易合同";
										delete fileTypes[5];
									}
								}

								for(let i = 0; i < fileTypes.length; i++) {
									let sizeNum = accessories.length + i;
									let fileArr = {};
									if(fileTypes[i] != null) {
										if(fileTypes[i] == 1) {
											fileArr.fileTypeStr = "营业执照";
											fileArr.fileType = 1;
											accessories.push(fileArr);
										}
										if(fileTypes[i] == 3) {
											fileArr.fileTypeStr = "开户许可证";
											fileArr.fileType = 3;
											accessories.push(fileArr);
										}
										if(fileTypes[i] == 4) {
											fileArr.fileTypeStr = "法人身份证复印件";
											fileArr.fileType = 4;
											accessories.push(fileArr);
										}
										if(fileTypes[i] == 5) {
											fileArr.fileTypeStr = "增值税纳税人一般证明";
											fileArr.fileType = 5;
											accessories.push(fileArr);
										}
										if(fileTypes[i] == 6) {
											fileArr.fileTypeStr = "征信授权书";
											fileArr.fileType = 6;
											accessories.push(fileArr);
										}
										if(fileTypes[i] == 7) {
											fileArr.fileTypeStr = "基础交易合同";
											fileArr.fileType = 7;
											accessories.push(fileArr);
										}
									}
								}
								this.dialogImageUrl = result.accessories;

								if(null != result.alimit) {
									_this.alimitInfo.limitMoney = result.alimit.limitMoney;
									_this.alimitInfo.rate = result.alimit.rate;
									_this.alimitInfo.monthNum = result.alimit.monthNum;
								}
							}
						} else {
							_this.$message({
								message: '额度信息查询失败！',
								type: 'warning'
							});
						}
					})

					.catch((error) => {
						_this.$message.error('信息查询错误');
					})
			},
			//企业供应商信息的修改
			editBase() {
				let _this = this;
				console.log("提交信息是" + _this.name);
				if(null == _this.compareName || _this.compareName == "") {
					_this.$message({
						message: '企业名称为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.companyNature || this.companyNature == "") {
					_this.$message({
						message: '企业性质为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.name || _this.name == "") {
					_this.$message({
						message: '法人代表为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.registerCapital || _this.registerCapital == "") {
					_this.$message({
						message: '注册资金为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.registerTime || _this.registerTime == "") {
					_this.$message({
						message: '注册时间为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.paidCapital || _this.paidCapital == "") {
					_this.$message({
						message: '实缴资金为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.trade || _this.trade == "") {
					_this.$message({
						message: '所属行业为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.businessScope || _this.businessScope == "") {
					_this.$message({
						message: '主营业务为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.address || _this.address == "") {
					_this.$message({
						message: '联系地址为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.joinTime || _this.joinTime == "") {
					_this.$message({
						message: '开始合作时间为空！',
						type: 'warning'
					});
					return false;
				}

				if(null == _this.tel || _this.tel == "") {
					_this.$message({
						message: '联系方式为空！',
						type: 'warning'
					});
					return false;
				}
				if(null==_this.idCard||_this.idCard==""){
					_this.$message({
						message: '法人身份证号为空！',
						type: 'warning'
					});
					return false;
				}
				if(null == _this.bankName || _this.bankName == "") {
					_this.$message({
						message: '银行名称为空！',
						type: 'warning'
					});
					return false;
				}

				if(null == _this.bankCardNum || _this.bankCardNum == "") {
					_this.$message({
						message: '银行卡号为空！',
						type: 'warning'
					});
					return false;
				}
				console.log("填写的建议额度是" + _this.alimitInfo.limitMoney);
				/*if(null == _this.alimitInfo.limitMoney || _this.alimitInfo.limitMoney == "") {
					_this.$message({
						message: '额度为空！',
						type: 'warning'
					});
					return false;
				}*/
					console.log("填写额度" + _this.alimitInfo.limitMoney + "显示额度" + _this.limitMoney);
					if(_this.alimitInfo.limitMoney > _this.limitMoney) {
						_this.$message({
							message: '额度不能大于剩余额度！',
							type: 'warning'
						});
						return false;
					}
				/*if(null == _this.alimitInfo.rate || _this.alimitInfo.rate == "") {
					_this.$message({
						message: '利率为空！',
						type: 'warning'
					});
					return false;
				}*/
				if(null == _this.alimitInfo.monthNum || _this.alimitInfo.monthNum == "") {
					_this.$message({
						message: '期限为空！',
						type: 'warning'
					});
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
				console.log();
				let params = {
					compareName: _this.compareName, //姓名
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
					idCard:_this.idCard,
					clientInfo: {}, //三大客户比例
					bankName: _this.bankName, //银行名称
					bankBranch: _this.bankBranch, //银行支行名称
					bankAccount: _this.bankAccount, //银行开户名称
					bankCardNum: _this.bankCardNum, //银行卡号
					limitMoney: _this.alimitInfo.limitMoney, //额度
					rate: _this.alimitInfo.rate, //利率
					monthNum: _this.alimitInfo.monthNum, //期限
					viewImgs: viewImg, //上传的图片
				}
				_this.$post(_this.$API.ADD_SUPPLIER_INFO, params)
					.then((resultData) => {
						if(null != resultData && resultData.code == '0') {
							_this.$message({
								type: 'success',
								message: '修改成功!'
							})
						} else {
							_this.$message({
								type: 'success',
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
			},
			
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