import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import account from '../components/account.vue' //登录页面
import user from '../components/user.vue'  //显示页面
import err from '../components/err.vue' //页面错误
import register from '../components/register.vue' //注册页面

import inif from '../components/item/inif.vue' 
import staff from '../components/item/staff.vue'
import staffInif from '../components/item/staffInif.vue'
import commodity from '../components/item/commodity.vue'

export default new Router({
    routes:[
        {
            path:'/',
            name:'account',
            component:account
        },{
            path:'/user',
            name:'user',
            component:user,
            children:[
                {
                    path:'',
                    name:'inif',
                    component:inif
                },{
                    path:'staff',
                    name:'staff',
                    component:staff
                },{
                    path:'staffInif',
                    name:'staffInif',
                    component:staffInif
                },{
                    path:'commodity',
                    name:'commodity',
                    component:commodity
                }
            ]
        },{
            path:'/register',
            name:'register',
            component:register
        },{
            path:'*',
            component:err
        }
    ],
    mode:'history' //去掉#号
})

