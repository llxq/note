<template>
    <div>
        <h1>这个是登录组件，使用 .vue 文件定义出来的</h1>
        <h1>{{ msg }}</h1>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                msg: '这个是导出的数据'
            }
        },
        methods: {
            show() {
                console.log('这个是导出的方法');
            }
        }
    }
</script>

<style>

</style>
