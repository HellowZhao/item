<template>
     <div class="register">
          <el-row type="flex" justify="center">
               <el-col :span="6">
                    <el-form ref="form" :model="form" class="bezel">
                         <el-form-item class="center">
                              <el-input placeholder="请输入账户名" v-model="form.account" prefix-icon="el-icon-user"></el-input>
                         </el-form-item>
                         <el-form-item class="center">
                              <el-input placeholder="请输入密码" show-password v-model="form.pass" prefix-icon="el-icon-lock"></el-input>
                         </el-form-item>
                         <el-form-item class="center">
                              <el-input placeholder="请确认密码" show-password v-model="form.passOnce" prefix-icon="el-icon-lock"></el-input>
                         </el-form-item>
                         <el-form-item class="center">
                              <el-button @click="redirect" style="width:100%">注 &nbsp; 测</el-button>
                         </el-form-item>
                    </el-form>
               </el-col>
          </el-row>
     </div>
</template>
<script>
     export default {
          name:'register',
          data(){
               return {
                    form:{
                         account:'',
                         pass:'',
                         passOnce:''
                    }
               }
          },
          methods:{
               redirect(){
                    if(this.form.pass == this.form.passOnce){
                         let registerText = this.$qs.stringify(this.$refs.form.model)
                         console.log(registerText)
                         this.$axios.post('/api/register',registerText).then((req,res)=>{
                              console.log(req.data)
                              if(req.data == "注册成功"){
                                   this.$notify({
                                        title:"成功",
                                        message:'注册成功',
                                        type:'success'
                                   })
                                   this.$router.push('/')
                              }else if(req.data == "注册失败"){
                                   this.$notify.error({
                                        title:"失败",
                                        message:'已有该账户，请重新注册'
                                   })
                              }
                         })
                    }else{
                         this.$notify.error({
                              title: '错误',
                              message: '两次密码不一样，请再次输入'
                         });
                    }
               }
          }
     }
</script>
<style >
     .register{
          width:100%;
          height:100vh;
          background-image: url('../assets/yue.png');
          background-size:100%;
     }
     .bezel{
          border-radius:5px;
          background-color:rgba(255,255,255,0.6);
          border:1px solid #ffffff;
          padding: 20px 0;
          margin:30vh 0;
     }
     .center{
          width:80%;
          margin:20px 10%;
     }
</style>

