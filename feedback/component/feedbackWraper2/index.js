var templateHtml = `<div class="feedback-wrapper2">
                        <img class="feedback-wrapper2-leftIcon" src="./images/feedback__icon__left.png" alt="">
                        <img class="feedback-wrapper2-rightIcon" src="./images/feedback__icon__right.png" alt="">
                        <div class="feedback-wrapper2-content" v-if="custom">
                            <slot></slot>
                        </div>
                        <div class="feedback-wrapper2-content" v-else>
                            <img class="feedback-wrapper2-content-titleImg animation animation-flipInX" v-bind:src="dic.titleImg"/>
                            <img class="feedback-wrapper2-content-echartImg animation animation-flipInY" v-bind:src="dic.echartImg"/>
                            <p class="feedback-wrapper2-content-text animation animation-zoomIn" v-html="dic.text"></p>
                        </div>
                    </div>`;

Vue.component('feedback-wrapper-2', {
    props:["dic", "custom"],
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