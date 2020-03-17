<template>
    <div class="staffInif">
        <el-row>
            <el-col :span="24" v-for="(num,i) in data" :key="i">
                <el-card>
                    <el-table
                        :data = 'table'
                        style="width:100%">
                        <el-table-column label="姓名">{{num.name}}</el-table-column>
                        <el-table-column label="类型">{{num.client}}</el-table-column>
                        <el-table-column label="时间" prop="date"></el-table-column>
                        <el-table-column label="签到">
                            <el-button @click="prop(num._id)">签到</el-button>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:'staffInif',
        data(){
            return {
                data:[],
                table:[{
                    date:'',
                    sign:'上班签到'
                },{
                    date:'',
                    sign:'下班签退'
                }]
            }
        },
        created(){
            this.$axios.get('/api/').then((data) => {
                this.data = data.data.filter((item) => {
                    return item.client == "员工"
                })
            },(err) => {
                this.$notify.error({
                    title: '错误',
                    duration:0,
                    message: '没有获取到数据库'
                });
            })
            let date = new Date();
            this.table[0].date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"上午"
            this.table[1].date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"下午"
        },
        methods:{
            prop(aa){
                console.log(aa) 
            }
        }   
    }
</script>

<style scoped>

</style>

