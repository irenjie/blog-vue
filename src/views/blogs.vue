<template>
    <div class="div_main">
        <!--:class 作用是是否使css class生效-->
        <div class="card" v-for="(blog,index) in blogs" :class="{card_enter:index==selectedIndex}"
             @click="goBlogEdit(blog.id)"
             @mouseenter="scaleCard(1,index)" @mouseleave="scaleCard(2,index)">
            <p class="text_title">{{blog.title}}</p>
            <p class="text_desc">{{blog.description}}</p>
            <p class="text_modified">{{blog.cstCreate.substr(0,10)}}</p>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "blogs",
        data() {
            return {
                blogs: [],
                blogNum: 10,
                selectedIndex: -1
            }
        },
        methods: {
            async loadPage() {
                const _this = this
                await this.$axios.get("/blogs").then(res => {
                    _this.blogs = res.data.data
                })
            },
            goBlogEdit(blogId) {
                this.$router.push("/blogEdit/" + blogId)
            },
            /*
            type:1是鼠标进入放大，2是鼠标移除缩小
            index:卡片序号
            */
            scaleCard(type, index) {
                switch (type) {
                    case 1:
                        this.selectedIndex = index
                        break;
                    case 2:
                        this.selectedIndex = -1
                }
            }
        },
        async created() {
            await this.loadPage()
            $(".div_main").css("margin-left", Math.round(window.innerWidth / 20) + "px")
            blogResize()
        }
    }

    function blogResize() {
        var browseWidth = window.innerWidth;
        var card = $(".card")
        card.css("width", Math.round(browseWidth * 0.9))     // 卡片宽度
        var cardWidth = parseInt(card.css("width"))
        $(".div_main").css({
            "column-count": Math.floor(browseWidth * 0.9 / (cardWidth+20)),       // 卡片列数
            "width": browseWidth * 0.9 + "px"                          // 放卡片的 div 宽度
        })

        var blog_main = $(".blog_main")
        blog_main.css({
            "margin-left": Math.round(browseWidth * 0.05),
            "margin-right": Math.round(browseWidth * 0.05)
        });
    }

    // windows.onresize 只能定义一次，多页面每次定义都会被覆盖
    window.addEventListener('resize', blogResize)
</script>

<style scoped>

    .div_main {
        margin-left: -20px;
        margin-top: 40px;
        margin-bottom: 60px;
        column-count: 1;
        column-gap: 30px;
        column-fill: auto;
    }

    .card {
        background: #909399;
        max-width: 340px;
        min-height: 120px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 100%;
        overflow: auto;
        margin-bottom: 30px;
        color: white;
    }

    .card_enter {
        transform: scale(1.05, 1.1);
        cursor: pointer;
    }

    .text_title {
        margin: 8px 10px 0px 10px;
        font-size: 20px;
        letter-spacing: 2px;
        text-align: left;
    }

    .text_desc {
        margin: 60px 10px 10px 10px;
        font-size: 16px;
        letter-spacing: 1px;
        text-align: left;
    }

    .text_modified {
        margin: 10px 10px 10px 10px;
        font-size: 8px;
        letter-spacing: 1px;
        text-align: left;
    }

</style>