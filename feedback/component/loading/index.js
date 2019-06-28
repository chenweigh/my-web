var html = `<div class="loading">
                <div class="loading__container">
                    <div class="loading__img"></div>
                    <span class="loading__text">加载中...</span>
                </div>
            </div>`;

Vue.component('loading', {
    props:[],
    data:function(){
        return {
        }
    },
    template: html,
    methods:{

    },
    mounted(){
        // 生命周期函数，vue 页面刷新就会触发的方法
    },
})