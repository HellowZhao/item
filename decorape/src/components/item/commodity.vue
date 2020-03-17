<template>
    <div class="commodity">
        <el-row>
            <el-col :span="7">
                <el-input placeholder="想要输入的..." suffix-icon="el-icon-search"></el-input>
            </el-col>
            <el-col :span="17">
                <el-button icon="el-icon-edit" class="edit" @click="add"></el-button>
            </el-col>
        </el-row>
        <!-- 展示列表 -->
        <el-row :gutter="10">
            <el-col :md="12" v-for="(item,i) in data" :key="i">
                <el-card>
                    <div slot="header">
                        <span>{{item.name}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="kou(item._id,i)">编辑</el-button>
                    </div>
                    <el-row>
                        <el-col :md="9">
                            <el-image class="image" :src="item.url[0].url" fit="fill"></el-image>
                        </el-col>
                        <el-col :md="15">
                            <div class="kou">型号：<span>{{item.model}}</span></div>
                            <div class="kou">价格：<span>{{item.price}}</span></div>
                            <div class="kou">生产厂商：<span>{{item.firm}}</span></div>
                            <div class="kou">手机号:<span>{{item.iphone}}</span></div>
                            <div class="kou">备注信息：<span>{{item.describe}}</span></div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <!-- 添加 弹出框 -->
        <el-dialog title="添加商品信息" width="50%" :visible.sync = "visible">
            <el-form ref="formItem" :model="formItem" label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="formItem.name"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        action="http://localhost:1122/commoAdd"
                        accept=".jpg,.jpeg,.png"
                        list-type="picture-card"
                        :file-list="formItem.url"
                        :before-remove="beforeRemove"
                        :on-progress = "progress"
                        :limit="1"
                        :on-exceed="aaa"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="型号">
                    <el-input v-model="formItem.model"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="formItem.price" style="width:20%"></el-input><span class="qian">￥</span>    
                </el-form-item>
                <el-form-item label="生产厂商">
                    <el-input v-model="formItem.firm"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                     <el-input v-model="formItem.iphone"></el-input>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input v-model="formItem.describe"></el-input>
                </el-form-item> 
                <el-form-item>
                    <el-button type="submit" @click="onSubmit">确定</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑商品信息" width="50%" :visible.sync = "visibleEdit">
            
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'commodity',
        data(){
            return {
                visible:false,
                data:[],
                formItem:{
                    name:'',
                    model:'',
                    url:[],
                    price:'',
                    firm:'',
                    iphone:'',
                    describe:''
                }
            }
        },
        created(){
            this.$axios.get('/api/commo').then(data => {
                if(data != ''){
                    let inif = data.data.map((item) => {
                        if(item.url.length == 0){
                            item.url.push({
                                url:'../../static/1.jpg'
                            })
                        }
                        return item
                    })
                    this.data = inif
                }else{
                    this.$notify.error({
                        title: '错误',
                        duration:0,
                        message: '没有获取到数据库'
                    });
                }
            },err => {
                this.$notify.error({
                    title: '错误',
                    duration:0,
                    message: '没有获取到数据库'
                });
            })
        },
        methods:{
            // 打开添加弹出框
            add(){
                this.visible = true
            },
            kou(id,num){
                console.log(id)
                console.log(num)
            },
              // 添加按钮
            onSubmit(){
                let string = this.$qs.stringify(this.$refs.formItem.model)
                if(this.formItem == "" || this.price == ""){
                    this.visible = false
                    this.$notify.error({
                        title: '错误',
                        message: '请填写名称和价钱'
                    });
                }else{
                    this.visible = false
                    this.$axios.post('/api/commoAdd',string)
                    this.data.push(this.formItem)
                    this.$notify({
                        title:"成功",
                        message:'添加商品成功',
                        type:'success'
                    })
                }
            },
            aaa(aa,bb){
                this.$message({
                    showClose: true,
                    message: '照片只能上传一张',
                    type: 'warning'
                });
            },
            progress(res,file){
                let prog = {name:file.name,url:file.url}
                this.formItem.url.push(prog)
            },
            beforeRemove(){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }
          

        }
    }
</script>

<style scoped>
    .edit{
        float:right;
    }
    .image{
        width:100%;
        height:180px;
    }
    .kou{
        padding:0 0 15px 20px;
    }
    .kou span{
        font-size:1.2rem
    }
    .tip{
        border:1px solid red;
        height:200px;
    }
    .pian{
        padding:0 10px;
        font-weight:800;
        font-size:1.5rem;
        
    }
</style>

