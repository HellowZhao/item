<template>
  <div class="hello">
    <el-row>
      <el-col :span="7">
        <el-input placeholder="想要输入的..." suffix-icon="el-icon-search" v-model="seek"></el-input>
      </el-col>
      <el-col :span="17">
        <el-button icon="el-icon-edit" class="edit" @click="add"></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :md="12" v-for="(item,i) in data" :key="i">
        <el-card>
            <div slot="header">
              <span>{{item.company}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="kou(item._id,i)">编辑</el-button>
            </div>
            <div class="kou">姓名：<span>{{item.name}}</span></div>
            <div class="kou">手机号：<span>{{item.iphone}}</span></div>
            <div class="kou">住址：<span>{{item.site}}</span></div>
            <div class="kou">备注信息：<span>{{item.remark}}</span></div>
            <div class="kou">类型：<span>{{item.client}}</span></div>
            <div class="check">查看帐单</div>
        </el-card>  
      </el-col>
    </el-row>
    <!-- 添加工单 -->
    <el-dialog title="添加人员" width="50%" :visible.sync = "visible">
      <el-form ref="formItem" :model="formItem" label-width="80px">
          <el-form-item label="公司名称">
            <el-input v-model="formItem.company"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formItem.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formItem.iphone"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="formItem.site"></el-input>
          </el-form-item>
           <el-form-item label="类型">
             <el-select v-model="formItem.client" placeholder="请选择">
              <el-option v-for="(opti,i) in options" :key="i"
                :label="opti.label"
                :value="opti.label"
              ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="formItem.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑工单 -->
    <el-dialog title="编辑人员信息" width="50%" :visible.sync= "dialog">
      <el-form ref="formItem" :model="formItem" label-width="80px">
          <el-form-item label="公司名称">
            <el-input v-model="formItem.company"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formItem.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formItem.iphone"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="formItem.site"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formItem.client" placeholder="请选择">
              <el-option v-for="(opti,i) in options" :key="i"
                :label="opti.label"
                :value="opti.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="formItem.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogCom(formItem._id)">编辑</el-button>
            <el-button @click="dialogRemove(formItem._id)">删除用户</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
let _self
export default {
  name: 'inif',
  data () {
    return {
      visible:false, //添加人员
      dialog:false,  //编辑人员
      data:[],       // 全部人员信息
      delete:'',     //编辑那个页面 num
      seek:'',       //搜索框遍历
      formItem:{     
        company: '',
        name: '',
        iphone: '',
        site: '',
        client:'',
        remark: ''
      },
      options:[{
        label:'客户'
      },{
        label:'员工'
      }]
    }
  },
  created(){
    this.$axios.get('/api/').then((data) => {
        this.data = data.data.filter((item) => {
          return item.client == "客户"
        })
    },(err) => {
      this.$notify.error({
        title: '错误',
        duration:0,
        message: '没有获取到数据库'
      });
    })
  },
  methods:{
    // 弹出框显示
    add(){
      this.formItem = 
      { company: '',
        name: '',
        iphone: '',
        site: '',
        client:'',
        remark: ''}
      this.visible = true
    },
    // 添加用户信息
    onSubmit() {
      let aa = this.$qs.stringify(this.$refs.formItem.model)
  
      if(this.formItem.name == '' || this.formItem.iphone == '' || this.formItem.client == ''){
        this.visible = false
        this.$notify.error({
          title: '错误',
          message: '请输入姓名和手机号'
        });
      }else{  
        this.$axios.post('/api/user',aa) 
        this.visible = false;
        if(this.formItem.client == "客户"){
          this.data.push(this.formItem)
        }
        this.$notify({
          title:"成功",
          message:'添加用户成功',
          type:'success'
        })
      }
    },
    // 取消弹窗
    onCancel(){
      this.visible = false;
    },
    // 点击编辑 打开编辑页面
    kou(id,num){
      this.dialog = true;
      let inif = this.data.filter((res) => {
        return res._id == id
      })
      this.formItem = inif[0]
      this.delete = num
    },
    // 修改个人数据
    dialogCom(id){
      let json = this.$qs.stringify([{"_id":id},this.formItem])
      this.$axios.post('/api/userAmend',json)
      this.dialog = false
      this.$notify({
        title:"成功",
        message:'编辑用户成功',
        type:'success'
      })
    },
    // 删除数据 人员信息
    dialogRemove(id){
      let string = this.$qs.stringify({'_id':id}) 
      this.$axios.post('/api/userRemove',string)  
      this.dialog = false
      this.data.splice(this.delete,1)
      this.$notify({
        title: '成功',
        message: '删除用户成功',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>
  .edit{
    float:right;   
  }
  .kou{
    padding-bottom:15px;
  }
  .kou span{
    font-size:1.2rem
  }
  .check{
    cursor:pointer;
    color:aqua;
    text-align:center;
    padding-bottom:15px;
  }
</style>
