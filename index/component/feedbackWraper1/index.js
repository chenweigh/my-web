var templateHtml = `<div class="feedback-wraper1">
                    <div class="feedback-wraper1-head">
                        <div class="feedback-wraper1-head-title" v-bind:style="titleStyle">{{title}}</div>
                        <div class="feedback-wraper1-head-icon">
                            <div class="feedback-wraper1-head-line"></div>
                            <div class="feedback-wraper1-head-square"></div>
                            <div class="feedback-wraper1-head-close">×</div>
                        </div>
                    </div>
                    <div class="feedback-wraper1-content">
                        <slot></slot>
                    </div>
                </div>`

Vue.component('feedback-wrapper-1', {
    props:["title", "titleStyle"],
    template: templateHtml,
    data:function(){
        return {

        }
    },
    methods:{
        
    },
    mounted(){
        // 生命周期函数，vue 页面刷新就会触发的方法
    },
})