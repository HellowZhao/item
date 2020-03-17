<template>
  <div id="app">
    <el-container class="container">
      <!-- 左侧边框 -->
      <el-menu default-active="$route.path" background-color="#2e323a" class="elMenu"
       text-color="#838790" active-text-color="white" :collapse="isCollapse" router>
        <el-menu-item index="/user">
          <i class="el-icon-share"></i>
          <span slot="title">客户信息</span>
        </el-menu-item>
        <el-submenu index="/user/staff">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span slot="title">员工信息</span>
          </template>
          <el-menu-item index="/user/staff">员工信息</el-menu-item>
          <el-menu-item index="/user/staffInif">员工打卡</el-menu-item>
        </el-submenu>
        <el-menu-item index="/user/commodity">
          <i class="el-icon-share"></i>
          <span slot="title">商品信息</span>
        </el-menu-item>
      </el-menu>
      <!-- 右侧显示栏 -->
      <el-container>
        <el-header>
          <el-row :span='12'>
            <el-menu mode="horizontal">
              <el-menu-item index="1">
                <i class="el-icon-s-fold" @click="collapse()"></i>
              </el-menu-item>   
            </el-menu>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <span>本产品最终解释权归公司所有</span>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'user',
  data(){
    return {
      isCollapse:false
    }
  },
  components: {
    
  },
  methods:{
    collapse(){
      if(this.isCollapse == true){
        this.isCollapse = false
      }else if(this.isCollapse == false){
        this.isCollapse = true 
      }
    }
  }
}
</script>

<style scoped>
  /* 框架 */
  .container{
    width:100vw;
    height:100vh;
    background-color:#F2F6FC
  }
  /* header */
  .el-header{
    background-color:white;
  }
  .elMenu:not(.el-menu--collapse){
    width:200px;
  }
  /* main滚动条 */
  .el-main{
    overflow-y:auto;
  }
  /* footer */
  .el-footer{
    text-align:right; 
    line-height: 60px;
    color:slategrey;
    background-color:white;
  }

</style>
