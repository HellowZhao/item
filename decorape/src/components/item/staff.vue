<template>
    <div class="staff">
        <el-card :span="24">
            <el-table
             :data = "data"
             style="width:100%"
            >
                <el-table-column
                    prop = "name"
                    label="姓名"   
                ></el-table-column>
                <el-table-column
                    prop = "iphone"
                    label="手机号"   
                ></el-table-column>
                <el-table-column
                    prop = "site"
                    label="住址"   
                ></el-table-column>
                <el-table-column
                    prop = "client"
                    label="类型"   
                ></el-table-column>
                 <el-table-column
                    fixed="right"
                    label="操作" >
                    <el-button @click="punch()">查看打卡详情</el-button>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name:'staff',
        data(){
            return {
                data:[]
            }
        },
        created(){
            this.$axios.get('/api/').then((data) => {
                let aa =  data.data.filter((item) => {
                    return item.client == "员工"
                })
                this.data = aa
            },err => {
                this.$notify.error({
                    title: '错误',
                    duration:0,
                    message: '没有获取到数据库'
                });
            })
        },
        methods:{
           punch(num){
               console.log(num)
           }
        }
    }
</script>

<style scoped>

</style>



