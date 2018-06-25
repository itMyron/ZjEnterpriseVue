<template>
	<div class="contain">
		<header>
			应收账款资料
		</header>
		<section>
				<article>
					<div class="switch" v-if="false">
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
						<p class="item">
							<span class="bar">债务人：</span>
							<el-input class="inp" :disabled="!flag" v-model="baseInfo.legalPerson"></el-input>
						</p>
						<p class="item">
							<span class="bar">基础合同编号：</span>
							<el-input class="inp" :disabled="!flag" v-model="baseInfo.compactCode"></el-input>
						</p>
					</div>
					<div class="list clear">
						<p class="item">
							<span class="bar">融资金额：</span>
							<el-input class="inp" :disabled="!flag" v-model="baseInfo.financingMoney"></el-input>
						</p>
						<p class="item">
							<span class="bar">应收账款本余额：</span>
							<el-input class="inp" :disabled="!flag" v-model="baseInfo.receivablesBalance"></el-input>
						</p>
					</div>
					<div class="list clear">
						<p class="item">
							<span class="bar">应收账款到期日：</span>
							<el-date-picker class="inp" :disabled="!flag" v-model="baseInfo.compactTime"
								type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</p>
						<p class="item">
							<span class="bar">保理到期日：</span>
							<el-date-picker class="inp" :disabled="!flag" v-model="baseInfo.factoringTime"
								type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</p>
					</div>
				</article>
				<article class="imgView">
					<h3 class="title">应收账款单据资料</h3>
					<div class="list clear">
						<div class="item" v-for="item in baseInfo.imgs" ref="supImgs">
							<uploadImg @url="getUrl"
								:dialogImageUrl="item.dialogImageUrl" :flag="flag"  :title='item.title' :dataType="item.dataType" :outFiles="item.outFiles"></uploadImg>
						</div>
					</div>
				</article>
		</section>
		<footer v-if="flag">
			<el-button  size="small" @click="flag = false,cancel()">取消</el-button>
			<el-button  size="small" @click="save()" type="primary" >保存</el-button>
		</footer>
	</div>
</template>
<script>
	import uploadImg from '@/views/components/supplierImg/index'
	
	let baseInfo ={
		imgs :[],
		fileNames :[],
	}
	export default {
		components:{
			"uploadImg" : uploadImg ,
		},
		data(){
			return {
				baseInfo : baseInfo,
				flag:true ,
			}
		},
		methods: {
			setImgs(_this){
				let imgs = [
					{title:"营业执照",dataType:"营业执照"},
					{title:"开户许可证",dataType:"开户许可证"},
				];				
				_this.baseInfo.imgs = imgs;
			},
			getUrl(data){
				let _this = this;
				console.log("获取子组件",data)
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
			cancel() {      //取消按钮
				let self = this;
				self.$router.push({
					"path":"financingManage"
				})
			},
			save(){
				let _this = this;
				let addInfo = {
					id : _this.baseInfo.id,
					legalPerson : _this.baseInfo.legalPerson,
					compactCode : _this.baseInfo.compactCode,
					financingMoney : _this.baseInfo.financingMoney,
					receivablesBalance : _this.baseInfo.receivablesBalance,
					compactTime : _this.baseInfo.compactTime,
					factoringTime : _this.baseInfo.factoringTime,
					fileNames : JSON.stringify(_this.baseInfo.fileNames),
				}
			    if (_this.$fn.isNull(addInfo.legalPerson)) {
		          _this.$message.error("请确认姓名");
		          return;
		        }
		     	if (_this.$fn.isNull(addInfo.legalPerson)) {
			        _this.$message.error("请确认债务人");
			        return;
			    }
		     	if (_this.$fn.isNull(addInfo.compactCode)) {
			        _this.$message.error("请确认基础合同编号");
			        return;
			    }
		     	if (_this.$fn.isNull(addInfo.financingMoney) || !_this.$fn.isNumber(addInfo.financingMoney) ) {
			        _this.$message.error("请确认融资金额");
			        return;
			    }
		     	if (_this.$fn.isNull(addInfo.receivablesBalance) || !_this.$fn.isNumber(addInfo.receivablesBalance) ) {
			        _this.$message.error("请确认应收账款本余额");
			        return;
			    }
		     	if(  addInfo.financingMoney > addInfo.receivablesBalance){
		     		 _this.$message.error("融资金额不能大于应收账款本余额");
			        return;
		     	}
		     	if (_this.$fn.isNull(addInfo.compactTime)) {
			        _this.$message.error("请确认应收账款到期日");
			        return;
			    }
		     	if (_this.$fn.isNull(addInfo.factoringTime)) {
			        _this.$message.error("请确认保理到期日");
			        return;
			    }
		     	if (_this.$fn.isNull(addInfo.fileNames[0])) {
			        _this.$message.error("请确认附件资料");
			        return;
			    }
		     	if (_this.$fn.isNull(addInfo.fileNames[1])) {
			        _this.$message.error("请确认附件资料");
			        return;
			    }
				_this.$fetch(_this.$API.POST_ADD_FACT,addInfo)
				.then((result) => {
					if( result.state =="200"){
						_this.$message({message: '录入成功',type: 'success'});
						//回到表格页面
						_this.$router.push({path:"financingManage",})
					}else{
						_this.$message.error(result.msg);
					}
				})
			}
			
    	},
		created(){
			let _this = this;
			_this.setImgs(_this);
		},
		mounted(){
			baseInfo = {}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
