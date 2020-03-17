<template>
     <div class="account">
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
                              <el-button @click="redirect" style="width:100%">登 &nbsp; 录</el-button>
                         </el-form-item>
                         <el-form-item class="center">
                              <el-checkbox v-model="checkbox">记住密码 </el-checkbox>
                              <a href="/register" style="position:absolute;right:0">注册账号 </a>
                         </el-form-item>
                    </el-form>
               </el-col>
          </el-row>
     </div>
</template>
<script>
     export default {
          name:'account',
          data(){
               return {
                    form:{
                         account:'',
                         pass:''
                    },
                    checkbox:true
               }
          },
          methods:{
               redirect(){
                    let register = this.$qs.stringify(this.$refs.form.model)
                    console.log(register)
                    this.$axios.post('/api/regi',register).then((req,res) => {
                        if(req.data == "登录成功"){
                             this.$message({
                                  message:'登录成功',
                                  type:'success'
                             })
                             this.$router.push('/user')
                        }else{
                             this.$message.error('登录失败，请重新登录！')
                        }
                    })
               }
          }
     }
</script>
<style scoped>
     .account{
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




