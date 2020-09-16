import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

// 全局请求开头(后端)
axios.defaults.baseURL = "http://192.168.90.82:8081/mablog"

// request 拦截器
axios.interceptors.request.use(config => {
    return config
})

// response 拦截器
axios.interceptors.response.use(response => {

        if (response.data == null || !response.data.msg)
            return response;
        // 处理 Result
        let result = response.data;

        if (result.code === 200) {
            // 登陆成功弹出消息并放行
            if (result.msg !== 'OK') {
                ElementUI.Message.success(result.msg)
            }
            return response
        } else {
            ElementUI.Message.error(result.msg)
            return response
        }
    },
    // 后端抛出 Exception
    error => {
        /*if (error.response.status === 400) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }*/
    })
