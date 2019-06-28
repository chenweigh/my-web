var html = `<div class="error-toast">
                <div class="error-toast-text">
                    {{msg}}
                </div>
            </div>`;

Vue.component('toast', {
    props:["msg"],
    data:function(){
        return {
        }
    },
    template: html,
    methods:{

    },
    mounted(){
        // 生命周期函数，vue 页面刷新就会触发的方法
        this.timer = setTimeout(() => {
            this.$parent.hideToast();
        }, 3000);
    },
    destroyed(){
        if(this.timer){
            clearTimeout(this.timer)
        }
    }
})