<template>
	<div class="contain">
		<header>
			<h2 class="titile">个人供应商信息</h2>
		</header>
		<section>
			<article class="barTop">
				<ul>
					<li>剩余金额(元)：</li>
					<li>授权总额度(元)：</li>
					<li>授权利率(%)：</li>
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
						<span class="bar">姓名：</span>
						<el-input class="inp" v-model="form.name" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">身份证号码：</span>
						<el-input class="inp len" v-model="form.idCard" :disabled="!flag"></el-input>
					</div>
					<divp class="item">
						<span class="bar">联系方式：</span>
						<el-input class="inp" v-model="form.tel" :disabled="!flag"></el-input>
					</divp>
					<div class="item">
						<span class="bar">车牌号：</span>
						<el-input class="inp" v-model="form.vehicleCard" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item">
						<span class="bar">开始合作时间：</span>
						<el-date-picker class="inp" :disabled="!flag"
							v-model="form.joinTime"
							type="date"
							placeholder="选择日期">
						</el-date-picker>
					</div>
					<div class="item">
						<span class="bar">有无合同：</span>				
            <el-select class="inp" :disabled="!flag" v-model="form.pact" placeholder="请选择">
							<el-option label="有" value="1"></el-option>
							<el-option label="无" value="0"></el-option>
						</el-select>

					</div>
					<div class="item">
						<span class="bar">所属行业：</span>
						<el-input class="inp" v-model="form.trade" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar">主营业务：</span>
						<el-input class="inp" v-model="form.businessScope" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item item4">
						<span class="bar">联系地址：</span>
						<el-input class="inp" v-model="form.address" :disabled="!flag"></el-input>
					</div>
				</div>
				<div class="list clear">
					<div class="item">
						<span class="bar">紧急联系人：</span>
						<el-input class="inp" v-model="form.likmanName" :disabled="!flag"></el-input>
					</div>
					<div class="item">
						<span class="bar" style="width:98px;">紧急联系人电话：</span>
						<el-input class="inp" v-model="form.likmanTel" :disabled="!flag"></el-input>
					</div>
				</div>
			</article>
			<article>
				<h3 class="title">前三大客户的业务占比</h3>
				<div class="list clear">
					<p class="item">
						<span class="bar">客户名称1：</span>
						<el-input class="inp" v-model="form.clientName1" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例1：</span>
						<el-input class="inp" v-model="form.occupyRate1" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">客户名称2：</span>
						<el-input class="inp" v-model="form.clientName2" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例2：</span>
						<el-input class="inp" v-model="form.occupyRate2" :disabled="!flag"></el-input>
					</p>
				</div>
				<div class="list clear">
					<p class="item">
						<span class="bar">客户名称3：</span>
						<el-input class="inp" v-model="form.clientName3" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">所占比例3：</span>
						<el-input class="inp" v-model="form.occupyRate3" :disabled="!flag"></el-input>
					</p>
				</div>
			</article>
			<article>
				<h3 class="title">银行信息</h3>
				<div class="list clear">
					<p class="item">
						<span class="bar">银行名称：</span>
						<el-input class="inp" v-model="form.bankName" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">银行支行名称：</span>
						<el-input class="inp" v-model="form.bankBranch" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">银行开户名称：</span>
						<el-input class="inp" v-model="form.bankAccount" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">银行卡号：</span>
						<el-input class="inp len" v-model="form.bankCardNum" :disabled="!flag"></el-input>
					</p>
				</div>
			</article>
			<article>
				<h3 class="title">建议额度</h3>
				<div class="list clear">
					<p class="item">
						<span class="bar">额度（元）：</span>
						<el-input class="inp" v-model="form.limitMoney" :disabled="!flag"></el-input>
					</p>
					<p class="item">
						<span class="bar">利率（%）：</span>
						<el-input class="inp" v-model="form.rate" :disabled="true"></el-input>
					</p>
					<p class="item">
						<span class="bar">期限（个月）：</span>
						<el-input class="inp" v-model="form.monthNum" :disabled="!flag"></el-input>
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
			<el-button size="small" @click="cancel">取消</el-button>
			<el-button size="small" @click="save" type="primary">保存</el-button>
		</footer>
	</div>
</template>
<script>
import uploadImg from "../../../../components/uploadImg/index";
export default {
  components: {
    uploadImg: uploadImg
  },
  data() {
    return {
      flag: true,
      dialogImageUrl: [],
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {},
      currentIndex: "",
      limitMoney: "",
      total: "",
      rate: ""
    };
  },
  methods: {
    cancel() {
      //取消按钮
      this.$router.push({
        path: "/personal"
      });
    },
    getUrl(data) {
      this.dialogImageUrl.map(item => {
        if (item.fileType == data.fileType) {
          item.fileName = data.fileName;
        }
      });
    },
    save() {
      //添加
      let name = this.form.name;
      let idcard = this.form.idCard;
      let tel = this.form.tel;
      let vehicleCard = this.form.vehicleCard;
      let joinTime = this.form.joinTime;
      let pact = this.form.pact;
      let trade = this.form.trade;
      let businessScope = this.form.businessScope;
      let address = this.form.address;
      let likmanName = this.form.likmanName;
      let likmanTel = this.form.likmanTel;
      let bankName = this.form.bankName;
      let bankBranch = this.form.bankBranch;
      let bankAccount = this.form.bankAccount;
      let bankCardNum = this.form.bankCardNum;
      let limitMoney = this.form.limitMoney;
      let rate = this.form.rate;
      let monthNum = this.form.monthNum;
      if (this.$fn.isNull(name)) {
        this.$message.error("姓名不能为空");
        return;
      }
      if (this.$fn.isNull(idcard)) {
        this.$message.error("身份证号码不能为空");
        return;
      }
      if (!this.$fn.checkIdNum(idcard)) {
        this.$message.error("身份证号码格式不正确");
        return;
      }
      if (this.$fn.isNull(tel)) {
        this.$message.error("联系方式不能为空");
        return;
      }
      if (this.$fn.isNull(vehicleCard)) {
        this.$message.error("车牌号不能为空");
        return;
      }
      if (this.$fn.isNull(joinTime)) {
        this.$message.error("开始合作时间不能为空");
        return;
      }
      if (this.$fn.isNull(pact)) {
        this.$message.error("有无合同不能为空");
        return;
      }
      if (this.$fn.isNull(trade)) {
        this.$message.error("所属行业不能为空");
        return;
      }
      if (this.$fn.isNull(businessScope)) {
        this.$message.error("主营业务不能为空");
        return;
      }
      if (this.$fn.isNull(address)) {
        this.$message.error("联系地址不能为空");
        return;
      }
      if (this.$fn.isNull(likmanName)) {
        this.$message.error("紧急联系人不能为空");
        return;
      }
      if (this.$fn.isNull(likmanTel)) {
        this.$message.error("紧急联系人电话不能为空");
        return;
      }
      if (this.$fn.isNull(bankName)) {
        this.$message.error("银行名称不能为空");
        return;
      }
      if (this.$fn.isNull(bankBranch)) {
        this.$message.error("银行支行名称不能为空");
        return;
      }
      if (this.$fn.isNull(bankAccount)) {
        this.$message.error("银行开户名称不能为空");
        return;
      }
      if (this.$fn.isNull(bankCardNum)) {
        this.$message.error("银行卡号不能为空");
        return;
      }
      if (this.$fn.isNull(limitMoney)) {
        this.$message.error("额度不能为空");
        return;
      }
      if (!this.$fn.isNumber(limitMoney)) {
        this.$message.error("额度格式不正确");
        return;
      }
      if (this.$fn.isNull(monthNum)) {
        this.$message.error("期限不能为空");
        return;
      }
      if (!this.$fn.isNumber(monthNum)) {
        this.$message.error("期限格式不正确");
        return;
      }
      if (limitMoney > this.limitMoney) {
        this.$message.error("额度填写不能大于" + this.limitMoney);
        return;
      }
      let viewImg = "";
      let dialogImageUrl = this.dialogImageUrl;
      for (let i = 0; i < dialogImageUrl.length; i++) {
        if (dialogImageUrl[i].fileName != null) {
          viewImg +=
            dialogImageUrl[i].fileType + ";" + dialogImageUrl[i].fileName + ",";
        }
      }
      let proportionClient = {
        clientName1: this.form.clientName1,
        clientName2: this.form.clientName2,
        clientName3: this.form.clientName3,
        occupyRate1: this.form.occupyRate1,
        occupyRate2: this.form.occupyRate2,
        occupyRate3: this.form.occupyRate3
      };
      let param = {
        type: 1,
        name: name,
        idCard: idcard,
        tel: tel,
        vehicleCard: vehicleCard,
        joinTime: joinTime,
        pact: pact,
        trade: trade,
        businessScope: businessScope,
        address: address,
        likmanName: likmanName,
        likmanTel: likmanTel,
        bankName: bankName,
        bankBranch: bankBranch,
        bankAccount: bankAccount,
        bankCardNum: bankCardNum,
        limitMoney: limitMoney,
        rate: rate,
        monthNum: monthNum,
        proportionClient: JSON.stringify(proportionClient),
        viewImgs: viewImg
      };
      this.$fetch(this.$API.POST_PERSONAL_ADD, param).then(result => {
        if (result.code == "0") {
          this.$router.push("/Personal");
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
    getLimitCM() {
      //获取审批额度
      this.$fetch(this.$API.POST_CORE_LIMITCM).then(result => {
        if (result.code == "0") {
          this.total = result.total;
          this.limitMoney = result.limitMoney;
          this.rate = result.rate;
          this.form.rate = this.rate;
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
    }
  },
  created() {
    this.getLimitCM();
    let fileTypes = [6, 7, 8, 9];
    for (let i = 0; i < fileTypes.length; i++) {
      let fileArr = {};
      if (fileTypes[i] != null) {
        if (fileTypes[i] == 8) {
          fileArr.fileTypeStr = "身份证正面照";
          fileArr.fileType = 8;
          this.dialogImageUrl.push(fileArr);
        }
        if (fileTypes[i] == 9) {
          fileArr.fileTypeStr = "身份证反面照";
          fileArr.fileType = 9;
          this.dialogImageUrl.push(fileArr);
        }
        if (fileTypes[i] == 6) {
          fileArr.fileTypeStr = "征信授权书";
          fileArr.fileType = 6;
          this.dialogImageUrl.push(fileArr);
        }
        if (fileTypes[i] == 7) {
          fileArr.fileTypeStr = "基础交易合同";
          fileArr.fileType = 7;
          this.dialogImageUrl.push(fileArr);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "./index.scss";
</style>