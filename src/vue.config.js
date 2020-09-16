import $ from "jquery"

import router from "./router";

router.beforeEach((to, from, next) => {
    if (to.name==='blogs'){
        $("body").css("background","black")
    }else {
        $("body").css("background","white")
    }
    next()
})