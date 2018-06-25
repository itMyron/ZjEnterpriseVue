<template>
<div>
<div class="content">
  <div class="imgBox">
    <label class="upload-b" v-if="uploadDisabled" :class="{default:!flag}">
      <input type="file" @change="upload($event)" />
      <i class="	fa fa-cloud-upload"></i>
      <b>上传图片</b>
    </label> 
    <div class="imgHover" v-else :class="{default:!flag}" :dataType="dataType" :outFiles="outFiles">
      <img :src="dialogImageUrl" />
      <div class="bg-view">
        <p class="wrap"></p>
        <p class="wrapIcon">
          <i class="el-icon-view icon-m" @click="checkView"></i>
          <label class="icon-m upload-s">
            <i class="fa fa-camera"></i>
            <input type="file" @change="upload($event)" />
          </label>
        </p>
      </div>
    </div>
  </div>
  <p class="title">{{title}}</p>
</div>
<el-dialog :title="title" :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

</div>
</template>

<script>
  export default {
    data() {
      return {
        uploadDisabled: true ,
        dialogVisible: false ,
        dialogImageUrl: ' '
      };
    },
    props:{
        "dialogImageUrl" :{
          type:String ,
          default:""
        },
        "flag" :{
          type:Boolean ,
          default:false
        },
        "title" :{
          type:String ,
          default:""
        },
        "dataType":{
        	type:String,
        	default:""
        },
        "outFiles":{
        	type:String,
        	default:""
        }

		},
    methods: {
      checkView(){
        let self = this ;
        self.dialogVisible = true ;
        console.log("试试")
      },
      upload(e){
        let self = this ;
        if(self.flag){
          self.uploadDisabled = false ;
          //上传
          let file = e.target.files[0];
            if(file){
                var formData = new FormData();
                //限制上传图片大小
                if(file.size>10*1024*1024) {
                    self.$message.error('图片体积太大，请更换图片')
                }else{
                    formData.append("fileImg", file);
                    let xhr = new XMLHttpRequest();
                    let root = process.env.API_ROOT ;
                    xhr.open("post",root + "/sys/fileResource/uploadImg", true);
                    xhr.send(formData);
                    xhr.onload = function() {
                        let str = xhr.responseText;
                        let result = JSON.parse(str);
                        if(result.code == "0") {
                            let url = result.showUrl + result.fileName;
                             self.$emit('url',{
                            	 dialogImageUrl : url,
                            	 type: self.dataType,
                            	 outFiles : self.dataType + ";" + result.fileName,
                            })
                             //设置图片
                            self.dialogImageUrl = url;
                           
                        }
                    };
                }

            }
        }else{
          self.$message.error('请进入编辑状态再上传图片');
        }
      }
    },
    watch:{
        dialogImageUrl(){
            console.log("监听")
        }
    },
    created(){
        let self = this ;
        if(self.dialogImageUrl){
            self.uploadDisabled = false ;  
        }else{
            self.uploadDisabled = true ;  
        }
        /*console.log("图片url：",self.dialogImageUrl) ;
        console.log("状态：",self.flag) ;
        console.log("图片标题：",self.title) ;
        console.log("图片类型：",self.dataType) ;
        console.log("保存图片：",self.outFiles) ;
        console.log("---分割---");*/
    }
  }
</script>
<style lang="scss" scoped type="text/css">


  .content{
    width:120px ;
    text-align: center ;
    margin:0 auto ;
  .imgBox{
      position: relative;
      display: inline-block ;
      border: 1px dashed #409EFF;
      width: 100px ;
      height: 120px ;
      border-radius: 3px ;
      overflow: hidden ;
      .upload-b{
        width: 100% ;
        height: 100%;
        display: block ;
        text-align: center ;
        input{
          display: none ;
        }
        i{
          margin:0 auto ;
          font-size: 30px;
          padding: 27px 0 ;
        }
        b{
          display: block ;
          text-align: center ;
        
        }
      }
      .imgHover{
        height: 100% ;
        img{
          width: 100% ;
          height: 100%;
        }
        .bg-view{
          display: none ;
          .wrap{
            position: absolute ;
            left: 0 ;
            top:0 ;
            width: 100% ;
            height: 100%;
            background: #000 ;
            opacity: 0.4;
          }
          .wrapIcon{
            position: absolute ;
            z-index: 100 ;
            left: 0 ;
            top:0 ;
            width: 100% ;
            height: 120px;
            line-height: 120px ;
            color: #fff ;
            text-align: center ;
            .icon-m{
              font-size: 16px;
              margin: 0 8px;
              input{
                display: none ;
              }
            }
          }
        }
      }
      .imgHover:hover{
        .bg-view{
          display: block ;
        }
      }
    }
    .title{
      width:100% ;
      text-align: center ;
      color: blue ;
    }
    .default{
      cursor: not-allowed ;
    }
  } 
</style>

