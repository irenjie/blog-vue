import Vue from 'vue'
import VueRouter from 'vue-router'
import blogs from "../views/blogs";
import blogEdit from "../views/blogEdit";
import blogAdd from "../views/blogAdd";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: {name: 'blogs'}
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: blogs
    },
    {
        path: '/blogEdit/:blogId',
        name: 'blogEdit',
        component: blogEdit
    }
    ,
    {
        path: '/add',
        name: 'blogAdd',
        component: blogAdd
    }
]

const router = new VueRouter({
    routes
})

export default router
