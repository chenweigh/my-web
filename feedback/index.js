var domainServer = "/server";
// var domainServer = "//app.coding61.com/server";

const getQueryString = key => {
  var ls = location.search;
  //var reg = eval("new RegExp('[a-zA-Z0-9]+=[^&]+&|[a-zA-Z0-9]+=[^&]+$','g')");
  var reg = eval("new RegExp('[?&]+(" + key + ")=[^&]+&|[?&]+(" + key + ")=[^&]+$')");
  var args = ls.match(reg);
  if (args) {
    return args[0].split("=")[1].replace(/&$/, "");
  } else {
    //console.log(key + "不存在");
    return null;
  }
  //var args = ls.match(/[a-zA-Z0-9]+=[^&]+&|[a-zA-Z0-9]+=[^&]+$/g);
};
var Page = {
  show: function() {
    $(".feedback-view").css({ display: "block" });
  },
  init: function() {
    var pk = getQueryString("pk");
    Page.fetchMidTermFeedback(pk);

    // 这段是兼容微信浏览器的
    let audio = document.getElementById("bgm");
    document.addEventListener("WeixinJSBridgeReady", function () {
      audio.play();
    }, false);
  },
  cc:function(){
    $(".animation").each(function(){
        let scrollHeight = document.documentElement.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;

        var currentTop = $(this).offset().top;
        if(currentTop < scrollTop || currentTop >= scrollTop && currentTop < scrollTop+clientHeight+1){
            // console.log(currentTop, scrollTop, scrollHeight, "打开动画", $(this).attr("class"));
            $(this).css({
                "animation-play-state":"running"
            })
        }else{
            // console.log(currentTop, scrollTop, scrollHeight, "动画不在视图中", $(this).attr("class"))
            // console.log("超出屏幕")
            
        }
    })
  },
  fetchMidTermFeedback: function(pk) {
    $.ajax({
      type: "get",
      url: `${domainServer}/job_management/get_midterm_feedback/${pk}/`,
      dataType: "json",
      contentType: "application/json",
      timeout: 6000,
      success: function(json) {
        console.log(json);
        app.dealData(json);
        Page.show();
        $(window).scroll(function(e) {
            Page.cc();
        });
        
        Page.cc();
      },
      error: function(xhr, textStatus) {
        app.dealFailFetchEvent(xhr, textStatus);
      }
    });
  }
};

var app = new Vue({
  el: "#feedback",
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
    dealData(json) {
      this.intro = this.formatString(json.content);
      this.mastered_data = json.mastered_photo;
      this.learn_soon_data = json.learn_soon?json.learn_soon.split(",") : [];

      let myworks_data = {
        imgs: json.works_photo ? json.works_photo.split(",") : [],
        intro: this.formatString(json.works_intro)
      };
      this.myworks_data = myworks_data;

      let learn_situation = {
        titleImg: "./images/feedback__title__icon1.png",
        echartImg: json.learn_situation_photo,
        text: this.formatString(json.learn_situation_desc)
      };
      this.learn_situation = learn_situation;

      let live_situation = {
        titleImg: "./images/feedback__title__icon2.png",
        echartImg: json.learn_situation_photo,
        text: this.formatString(json.live_situation_desc)
      };
      this.live_situation = live_situation;

      let exercise_situation = {
        titleImg: "./images/feedback__title__icon3.png",
        echartImg: json.live_situation_photo,
        text: this.formatString(json.exercise_situation_desc)
      };
      this.exercise_situation = exercise_situation;

      let learn_attitude = {
        titleImg: "./images/feedback__title__icon4.png",
        echartImg: json.attitude_photo,
        text: this.formatString(json.attitude_desc)
      };
      this.learn_attitude = learn_attitude;

      let learn_ability = {
        titleImg: "./images/feedback__title__icon5.png",
        echartImg: json.ability_photo,
        text: this.formatString(json.ability_desc)
      };
      this.learn_ability = learn_ability;

      let teacher_suggestion = {
        text: this.formatString(json.evaluation)
      };
      this.teacher_suggestion = teacher_suggestion;
      this.hideLoading();
    },
    dealFailFetchEvent(xhr, textStatus) {
      console.log(xhr);
      this.hideLoading();
      if (textStatus == "timeout") {
        this.showToast("请求超时");
        return;
      }
      if (xhr.status == 401) {
        // token 失效, 重新授权
        this.showToast(401);
        return;
      } else if (xhr.status == 404) {
        this.showToast("未找到");
        return;
      } else if (xhr.status == 400 || xhr.status == 403) {
        var msg = JSON.parse(xhr.responseText).message || JSON.parse(xhr.responseText).detail;
        this.showToast(msg);
        return;
      } else if (xhr.status == 0) {
        this.showToast("网络未连接，请检查网络后重试。");
        return;
      } else {
        this.showToast("服务器繁忙");
        return;
      }
    },
    formatString(msg) {
      if(!msg) return "";
      return msg.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>");
    },
    showToast(msg) {
      this.toast.msg = msg;
      this.toast.show = true;
    },
    hideToast() {
      this.toast.show = false;
    },
    hideLoading() {
      this.loading.show = false;
    }
  }
});

Page.init();
