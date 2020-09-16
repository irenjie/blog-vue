<template>
    <div class="blog_main">
        <el-input class="title" type="textarea" autosize placeholder="请输入标题" v-model="blog.title"></el-input>
        <el-input class="description" type="textarea" :autosize="{ minRows: 2}" placeholder="请输入描述"
                  v-model="blog.description"></el-input>
        <mavon-editor class="md_editor" v-model="blog.content"/>
        <el-button class="but" type="primary" plain @click="addBlog">创 建</el-button>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "blogAdd",
        data() {
            return {
                blog: {
                    id: 0,
                    title: '',
                    description: '',
                    content: '',
                    cstCreate: '',
                    cstModified: ''
                }
            }
        },
        methods: {
            addBlog() {
                const _this=this
                if (this.blog.title===''||this.blog.content===''){
                    this.$message.error('标题或内容不能为空');
                    return
                }
                this.$axios.post('/blogedit',this.blog).then(res=>{
                    _this.$router.push('/blogEdit/'+res.data.data)
                })
            }
        },
        // 页面加载完后执行
        mounted() {
            blogAddResize()
        }
    }

    function blogAddResize() {
        var browseWidth = window.innerWidth;
        $(".blog_main").css({
            "margin-left": Math.round(browseWidth * 0.1),
            "margin-right": Math.round(browseWidth * 0.1)
        });
    }

    window.addEventListener('resize', blogAddResize)

</script>

<style scoped>
    .title {
        margin-top: 40px;
    }

    .description {
        margin: 20px 0 20px 0;
    }
    .but{
        margin: 30px auto 60px 0;
        float: left;
    }

</style>