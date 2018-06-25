<template>
	<div class="contain">
		<header>
			应收账款资料
		</header>
		<section>
				<article>
					<h3 class="title">基本信息</h3>
					<div class="list clear">
						<p class="item">
							<span class="bar">债务人：</span>
							<el-input class="inp" :disabled="true" v-model="form.legalPerson"></el-input>
						</p>
						<p class="item">
							<span class="bar">基础合同编号：</span>
							<el-input class="inp" :disabled="true" v-model="form.compactCode"></el-input>
						</p>
					</div>
					<div class="list clear">
						<p class="item">
							<span class="bar">金融金额：</span>
							<el-input class="inp" :disabled="true" v-model="form.financingMoney"></el-input>
						</p>
						<p class="item">
							<span class="bar">应收账款本余额：</span>
							<el-input class="inp" :disabled="true" v-model="form.receivablesBalance"></el-input>
						</p>
					</div>
					<div class="list clear">
						<div class="item">
							<span class="bar">应收账款到期日：</span>
							<el-date-picker class="inp" :disabled="!flag"
								v-model="form.compactTime"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</div>
						<div class="item">
							<span class="bar">保理到期日：</span>
							<el-date-picker class="inp" :disabled="!flag"
								v-model="form.factoringTime"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</div>
					</div>
				</article>
				<article class="imgView">
					<h3 class="title">应收账款单据资料</h3>
					<div class="list clear">
						<div class="item" v-for="item in imgList" :key="item" >
							<uploadImg @url="getUrl" :dialogImageUrl="item.fileUrl" :flag="false" :title="item.fileType"></uploadImg>
						</div>
					</div>
				</article>
    		

		</section>
	</div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import uploadImg from "../../../components/uploadImg/index";
export default {
  data() {
    return {
      imgList: [],
      form: {}
    };
  },
  components: {
    uploadImg: uploadImg
  },
  methods: {
    detail() {
      let sid = this.$route.query.id;
      let params = { id: sid };
      this.$fetch(this.$API.POST_FINAN_DETAIL, params).then(result => {
        if (result.code == "0") {
          this.form = result.data;
          let accessoryList = result.data.accessoryList;
          this.imgList = accessoryList;
        } else {
          if (result.code == "4001") {
            this.$router.push({
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
    this.detail();
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "./index.scss";
</style>
