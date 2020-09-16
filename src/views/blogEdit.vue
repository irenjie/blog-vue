<template>
    <div class="blog_main">
        <p class="title">{{blog.title}}</p>
        <p class="description">{{blog.description}}</p>
        <mavon-editor class="md_editor" v-model="blog.content"
                      :toolbarsFlag="props.toolbarsFlag"
                      :subfield="props.subfield"
                      :defaultOpen="props.defaultOpen"/>
        <div class="buttons" v-show="isEdit">
            <el-button type="warning" plain @click="onEdit(1)">修 改</el-button>
            <el-button type="danger" plain @click="onEdit(2)">删 除</el-button>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "blogEdit",
        data() {
            return {
                isEdit: false,
                blog: {
                    id: 0,
                    title: '',
                    description: '',
                    content: '',
                    cstCreate: '',
                    cstModified: ''
                },
                props: {
                    toolbarsFlag: false,
                    subfield: false,
                    defaultOpen: "preview"
                }
            }
        },
        methods: {
            async loadpage() {
                var blogId = this.$route.params.blogId
                const _this = this
                // 地址中有 blogId，是回显数据
                if (blogId) {
                    // 地址中 blogId 后面有 'm'， 我要编辑
                    if (blogId.charAt(blogId.length - 1) === 'm') {
                        this.isEdit = true
                        blogId = blogId.substring(0, blogId.length - 1)
                        this.props.toolbarsFlag = true
                        this.props.subfield = true
                        this.props.defaultOpen = 'edit'
                    }
                    await this.$axios.get('/blog/' + blogId).then(res => {
                        _this.blog = res.data.data
                    })
                }
            },
            onEdit(editType) {
                if (editType===1)
                    this.showBox(1,"修改文章会覆盖内容，确认修改？", 'info')
                else if (editType===2)
                    this.showBox(2,"文章将永久删除，确认删除？", 'warning')
            },
            showBox(editType,content, boxType) {
                this.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: boxType
                }).then(() => {
                    const _this=this
                    if (editType===1)
                        this.$axios.post('/blogedit',this.blog)
                    else if (editType===2) {
                        this.$axios.get('/blogdelete/' + this.blog.id).then(res=>{
                            _this.$router.push('/')
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            }
        },
        async created() {
            await this.loadpage()
            blogEditResize()
        }
    }

    function blogEditResize() {
        var browseWidth = window.innerWidth;
        // "width":Math.round(browseWidth*0.8),
        $(".blog_main").css({
            "margin-left": Math.round(browseWidth * 0.1),
            "margin-right": Math.round(browseWidth * 0.1)
        });
    }

    window.addEventListener('resize', blogEditResize)
</script>

<style scoped>
    .title {
        font-family: 楷体, 华文楷体, serif;
        font-size: 48px;
        font-weight: bold;
        text-align: left;
    }

    .description {
        font-size: 18px;
        text-align: left;
    }

    .buttons {
        margin: 30px 0 60px 0;
        float: left;
    }

</style>