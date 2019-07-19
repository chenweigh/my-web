var app = new Vue({
    el: "#personal",
    data: {
      toast: {
        show: false,
        msg: "出错了"
      },
      loading: {
        show: true
      },
      intro: "",
      mastered_data: "",
      learn_soon_data: [],
      myworks_data: {
        intro: "",
        imgs: []
      },
      learn_situation: {},
      live_situation: {},
      exercise_situation: {},
      learn_attitude: {},
      learn_ability: {},
      teacher_suggestion: {}
    },
    methods: {},
    mounted() {
      // 生命周期函数，vue 页面刷新就会触发的方法
      // var pk = getQueryString("pk");
      // this.fetchMidTermFeedback(pk);
    },
    methods: {
      
    }
  });