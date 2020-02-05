import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import E404 from '@/components/error/E404'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'',
            name:'home',
            component: Home
        },        
        {
            path:'*',
            name:'e404',
            component: E404            
        }
    ],
    mode:'history'
}
)
