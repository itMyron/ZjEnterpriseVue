<template>
	<div class="contain">
		<header>
			<h2 class="titile">企业供应商基本信息</h2>
		</header>
		<section>
      <article class="barTop">
        <ul>
          <li>剩余金额(元)：</li>
          <li>授权总额度(元)：</li>
          <li>授权利率：</li>
          <li>期限(月)：</li>
        </ul>
        <ul class="num">
          <li>{{baseInfo.surplusLimit}}</li>
          <li>{{baseInfo.limitMoney}}</li>
          <li>{{baseInfo.rate}}</li>
          <li>{{baseInfo.monthNum}}</li>
        </ul>
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
        <h3 class="title">基本信息</h3>
        <div class="list clear">
          <div class="item">
            <span class="bar">企业名称：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.companyName"></el-input>
          </div>
          <div class="item">
            <span class="bar">企业性质：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.companyNature"></el-input>
          </div>
          <divp class="item">
            <span class="bar">法定代表人：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.name"></el-input>
          </divp>
          <div class="item">
            <span class="bar">法人身份证号：</span>
            <el-input class="inp len"  :disabled="!flag"  v-model="baseInfo.idCard"></el-input>
          </div>
        </div>
        <div class="list clear">
          <div class="item">
            <span class="bar">公司联系人：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.likmanName"></el-input>
          </div>
          <div class="item">
            <span class="bar">联系人电话：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.likmanTel"></el-input>
          </div>
          <div class="item">
            <span class="bar">合作起始时间：</span>
            <el-date-picker class="inp" :disabled="!flag" v-model="baseInfo.joinTime" type="date"
				value-format="yyyy-MM-dd" placeholder="选择日期">
			</el-date-picker>
          </div>
          <div class="item">
            <span class="bar">注册资金：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.registerCapital"></el-input>
          </div>
        </div>

        <div class="list clear">
           <div class="item">
            <span class="bar">注册时间：</span>
            <el-date-picker class="inp" :disabled="!flag" v-model="baseInfo.registerTime" type="date"
				value-format="yyyy-MM-dd" placeholder="选择日期">
			</el-date-picker>
          </div>
          <div class="item">
            <span class="bar">实缴资金：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.paidCapital"></el-input>
          </div>
          <div class="item">
            <span class="bar">所属行业：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.trade"></el-input>
          </div>
          <div class="item">
            <span class="bar">主营业务：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.businessScope"></el-input>
          </div>
        </div>
        <div class="list clear">
          <div class="item item4">
            <span class="bar">注册地址：</span>
            <el-input class="inp"  :disabled="!flag" v-model="baseInfo.address"></el-input>
          </div>
        </div>
      </article>
      <article>
        <h3 class="title">前三大客户的业务占比</h3>
        <div class="list clear">
          <p class="item">
            <span class="bar">客户名称1：</span>
            <el-input class="inp"  :disabled="!flag" v-model="baseInfo.clientNames[0]"></el-input>
          </p>
          <p class="item">
            <span class="bar">所占比例1：</span>
            <el-input class="inp"  :disabled="!flag" v-model="baseInfo.clientRatios[0]"></el-input>
          </p>
          <p class="item">
            <span class="bar">客户名称2：</span>
            <el-input class="inp"  :disabled="!flag" v-model="baseInfo.clientNames[1]"></el-input>
          </p>
          <p class="item">
            <span class="bar">所占比例2：</span>
            <el-input class="inp"  :disabled="!flag" v-model="baseInfo.clientRatios[1]"></el-input>
          </p>
        </div>
        <div class="list clear">
          <p class="item">
            <span class="bar">客户名称3：</span>
            <el-input class="inp"  :disabled="!flag" v-model="baseInfo.clientNames[2]"></el-input>
          </p>
          <p class="item">
            <span class="bar">所占比例3：</span>
            <el-input class="inp"  :disabled="!flag" v-model="baseInfo.clientRatios[2]"></el-input>
          </p>
        </div>
      </article>
      <article>
        <h3 class="title">银行信息</h3>
        <div class="list clear">
          <p class="item">
            <span class="bar">银行名称：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.bankName"></el-input>
          </p>
          <p class="item">
            <span class="bar">银行支行名称：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.bankBranch"></el-input>
          </p>
          <p class="item">
            <span class="bar">银行开户名称：</span>
            <el-input class="inp"  :disabled="!flag"  v-model="baseInfo.bankAccount"></el-input>
          </p>
          <p class="item">
            <span class="bar">银行卡号：</span>
            <el-input class="inp len"  :disabled="!flag"  v-model="baseInfo.bankCardNum"></el-input>
          </p>
        </div>
      </article>
			<article>
				<h3 class="title">附件资料</h3>
				<div class="list clear">
					<div class="item" v-for="item in baseInfo.imgs" ref="supImgs" :key="item">
							<uploadImg @url="getUrl"
								:dialogImageUrl="item.dialogImageUrl" :flag="flag"  :title='item.title' :dataType="item.dataType" :outFiles="item.outFiles"></uploadImg>
					</div>
				</div>
			</article>
		</section>
		<footer v-if="flag">
			<el-button  size="small" @click="flag = false">取消</el-button>
			<el-button  size="small" @click="update()" type="primary" >保存</el-button>
		</footer>
	</div>
</template>
<script>
	import uploadImg from '../../../components/supplierImg/index';

	let baseInfo ={
		registerTime:'',
		joinTime:'',
		clientNames:[], //业务占比(客户名称)
		clientRatios:[], //业务占比(客户比例)
		imgs:[], //附件
	}
	
	export default {
		components:{
			"uploadImg" : uploadImg
		},
		data(){
			return {
				baseInfo : baseInfo,
				flag : false ,
				dialogImageUrl : "" ,
			}
		},
		methods :{
			setClientRates(_this,data){
		    	if(data.clientRates!=null){
			        let json = JSON.parse(data.clientRates);
		    	    let arr = ['','',''];
					for( let i = 0 ; i < arr.length ; i++){
						_this.baseInfo.clientNames[i] = json["clientName"+(i+1)];
						_this.baseInfo.clientRatios[i] = json["occupyRate"+(i+1)];
					}
			    }
		   },
		   setImgs(_this,data){
				let imgs = [
					{title:"营业执照",dataType:"1"},{title:"开户许可证",dataType:"3"},
					{title:"法人身份证复印件",dataType:"4"},{title:"增值税纳税人一般证明",dataType:"5"},
					{title:"基础合作合同",dataType:"6"},{title:"征信授权书(企业)",dataType:"7"},
				];				
				if(data != null){
					let imgArr = data.accessories;
					if( imgArr!=null && imgArr.length >0  ){
						for( let i = 0;i < imgArr.length; i++ ){
							for( let j = 0;j < imgs.length; j++){
								if( imgArr[i].fileType == imgs[j].dataType ){
									imgs[j].dialogImageUrl = imgArr[i].filePath + imgArr[i].fileName;
									imgs[j].outFiles = imgs[j].dataType + ";" + imgArr[i].fileName;
									break;
								}
							}
						}
					}
				}
				_this.baseInfo.imgs = imgs;
			},
			getUrl(data){
				let _this = this;
				let imgs = _this.baseInfo.imgs;
				for( let i = 0;i<imgs.length;i++ ){
					if( data.type == imgs[i].dataType ){
						imgs[i].outFiles = data.outFiles;
						imgs[i].dialogImageUrl = data.dialogImageUrl;
						break;
					}
				}
				_this.baseInfo.fileNames = [];
				for( let i = 0;i<imgs.length;i++ ){
					if(imgs[i].outFiles){
						_this.baseInfo.fileNames.push(imgs[i].outFiles);
					}
				}
			},
			init(){
				let _this = this ;
				_this.$post(_this.$API.POST_BASE_COMPANY_INFO)
				.then((result) => {
					if( result.code == "0" ){
						_this.baseInfo.id = result.data.id;
						_this.baseInfo.surplusLimit = result.data.surplusLimit;
						_this.baseInfo.limitMoney = result.data.limitMoney;
						_this.baseInfo.rate = result.data.rate;
						_this.baseInfo.monthNum = result.data.monthNum;
						_this.baseInfo.companyName = result.data.companyName;
						_this.baseInfo.companyNature = result.data.companyNature;
						_this.baseInfo.name = result.data.name;
						_this.baseInfo.idCard = result.data.idCard;
						_this.baseInfo.likmanName = result.data.likmanName;
						_this.baseInfo.likmanTel = result.data.likmanTel;
						_this.baseInfo.joinTime = result.data.joinTime;
						_this.baseInfo.registerCapital = result.data.registerCapital;
						_this.baseInfo.trade = result.data.trade;
						_this.baseInfo.businessScope = result.data.businessScope;
						_this.baseInfo.address = result.data.address;
						_this.baseInfo.bankName = result.data.bankName;
						_this.baseInfo.bankBranch = result.data.bankBranch;
						_this.baseInfo.bankAccount = result.data.bankAccount;
						_this.baseInfo.bankCardNum = result.data.bankCardNum;
						_this.baseInfo.registerTime = result.data.registerTime;
						_this.baseInfo.paidCapital = result.data.paidCapital;
						//设置客户占比
						_this.setClientRates(_this,result.data);
					}else{
						_this.$message.error(result.msg);
					}
					//设置附件资料
					_this.setImgs(_this,result);
				})
			},
			update() {      //确定按钮
				let _this = this;
				let supInfo = {
					id:_this.baseInfo.id,
					companyName : _this.baseInfo.companyName,
					companyNature : _this.baseInfo.companyNature,
					name : _this.baseInfo.name,
					idCard : _this.baseInfo.idCard,
					likmanName : _this.baseInfo.likmanName,
					likmanTel : _this.baseInfo.likmanTel,
					joinTime : _this.baseInfo.joinTime,
					registerCapital : _this.baseInfo.registerCapital,
					trade : _this.baseInfo.trade,
					businessScope : _this.baseInfo.businessScope,
					address : _this.baseInfo.address,
					bankName : _this.baseInfo.bankName,
					bankBranch : _this.baseInfo.bankBranch,
					bankAccount : _this.baseInfo.bankAccount,
					bankCardNum : _this.baseInfo.bankCardNum,
					registerTime : _this.baseInfo.registerTime,
					paidCapital : _this.baseInfo.paidCapital,
					clientNames : JSON.stringify(_this.baseInfo.clientNames),
					clientRatios : JSON.stringify(_this.baseInfo.clientRatios),
					fileNames : JSON.stringify(_this.baseInfo.fileNames),
				};
				if (_this.$fn.isNull(supInfo.companyName)) {
			        _this.$message.error("请确认企业名称");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.companyNature)) {
			        _this.$message.error("请确认企业性质");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.name)) {
			        _this.$message.error("请确认法定代表人");
			        return;
			    }
					if (_this.$fn.isNull(supInfo.idCard) || !_this.$fn.checkIdNum(supInfo.idCard)) {
			      _this.$message.error("请确认法人身份证号");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.likmanName)) {
			        _this.$message.error("请确认公司联系人");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.likmanTel)|| !_this.$fn.checkModile(supInfo.likmanTel)) {
			        _this.$message.error("请确认联系人电话");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.joinTime)) {
			        _this.$message.error("请确认合作起始时间");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.registerCapital) || !_this.$fn.isNumber(supInfo.registerCapital)) {
			        _this.$message.error("请确认注册资金");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.trade)) {
			        _this.$message.error("请确认所属行业");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.businessScope)) {
			        _this.$message.error("请确认主营业务");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.address)) {
			        _this.$message.error("请确认注册地址");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.paidCapital) || !_this.$fn.isNumber(supInfo.paidCapital)) {
			        _this.$message.error("请确认实缴资金");
			        return;
			    }
				if (_this.$fn.isNull(supInfo.registerTime)) {
			        _this.$message.error("请确认注册时间");
			        return;
			    }
				_this.$fetch(_this.$API.POST_UPDATE_COMPANY_INFO,supInfo)
				.then((result) => {
					console.log(result.msg);
					if( result.state =="200"){
						_this.$message({message: '编辑成功',type: 'success'});
					}else{
						_this.$message.error(result.msg);
					}
				})
				_this.flag = false;
			}
		},
		created(){
			let _this = this ;
			_this.init();
		}
	}


</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>

