// 引导页

$(function () {
  // 首屏滑动
  (function () {
    //获取节点
    $body = $("body");
    $embed = $("#bg").find(".bg1 object");
    $wrap = $("#homeWrap");
    $swp = $wrap.find(".swp");
    //console.log($swp)
    setTimeout(function () {
      $embed[0].onload = function () {
        $(this).css("opacity", 1);
      };
    }, 1500);
    $swp.eq(0).animate({
      opacity: 1,
      left: 30,
    }, 1800);
    $swp.eq(1).animate({
      opacity: 1,
      right: 30,
    }, 1800)
    $swp.eq(2).animate({
      opacity: 1,
      top: 70,
    }, 1200)
    $swp.eq(3).animate({
      opacity: 1,
      top: 610,
    }, 1200)


  })();
  //视频弹窗
  (function () {
    $videoBtn = $wrap.find(".videoBtn");
    $video = $wrap.find(".video");
    $close = $video.find(".videoClose");
    $videoBtn.on("click", function () {
      $body.addClass("noScroll");
      $video.css("display", "block");
    })
    $close.on("click", function () {
      $body.removeClass("noScroll");
      $video.css("display", "none");
    })
  })();
  //新版本情报
  (function () {
    var $newinfo = $("#newinfo"),
      $newinfolist = $newinfo.find(".infolist li"),
      $infocon = $newinfo.find(".infocon"),
      $infoconlist = $infocon.find("li"),
      $conClose = $infoconlist.find(".close"),
      $txt = $infoconlist.find(".text"),
      txtH = $txt.height(),
      $btn = $infocon.find(".btn");
    index = 0;
    //console.log($btn);
    //点击相应的选项卡
    //console.log($txt);
    //console.log($txt.eq(1).find(".mainTxt").height());

    $newinfolist.on("click", function () {
      //记录当前的索引
      index = $(this).index();
      $body.addClass("noScroll");
      $infoconlist.eq(index).fadeIn();
      $infocon.fadeIn();
    })
    //单击关闭选项信息
    $conClose.on("click", function () {
      $body.removeClass("noScroll");
      $(this).parent().fadeOut();
      $infocon.fadeOut();
    })
    //滚动条滚动
    $txt.each(function () {
      var $mainTxt = $(this).find(".mainTxt"),
        $scroll = $(this).find(".scrollBox"),
        $bar = $(this).find(".scrollBar"),
        maxH = $mainTxt.height(),
        barH = txtH * txtH / maxH,
        topMax = txtH - barH,
        txtopMax = maxH - txtH;
      $bar.height(barH);
      //鼠标滚轮滚动
      // $(this).mousewheel(function(e,d){
      scrollBar($bar, $mainTxt, $(this));
      // })
      dragScroll($bar, $mainTxt, $(this));
      //滚动条单击
      $scroll.click(function (e) {
        if (e.target === this) {
          var y = e.clientY - ($(this).offset().top - $(document).scrollTop()),
            top = $bar.position().top;
          top = y < top ? top - 100 : top + 100;
          top = Math.min(top, topMax);
          top = Math.max(top, 0);
          $bar.stop().animate({
            "top": top
          }, 500);
          $mainTxt.stop().animate({
            "top": -top * txtopMax / topMax
          }, 500);
        }
      });
    });
    $infocon.hide().css("opacity", 1);
    $infoconlist.hide();
    //滚动函数
    function scrollBar($obj1, $obj2, $obj3) {
      //obj1 滚动条 obj1.height/obj3.height = obj3.height/obj2.height
      //obj2 最大距离 监听对象的高度
      //obj3 可视距离 滚动监听对象
      var $viewHeight = $obj1.offsetParent().height();
      $obj1.height($viewHeight * $obj3.height() / $obj2.height());

      //最大滚动高度
      var $maxHeight = $viewHeight - $obj1.height();
      var contentMax = $obj2.height() - $obj3.height();
      //给监听对象添加鼠标滚动时间的监听
      $obj3.on("mousewheel", function (e, d) {
        e.preventDefault(); //阻止默认事件
        e.stopPropagation(); //获取滚动条的定位高度
        var top = $obj1.position().top;
        if (d > 0) {
          top -= 10;
        } else {
          top += 10;
        }
        top = Math.min(top, $maxHeight);
        top = Math.max(top, 0);
        $obj1.css("top", top);
        $obj2.css("top", -top / $maxHeight * contentMax);
        return false;
      })
    }
    //滚动条拖拽函数
    function dragScroll($obj1, $obj2, $obj3) {
      //obj1 滚动条 obj1.height/obj3.height = obj3.height/obj2.height
      //obj2 最大距离 监听对象的高度
      //obj3 可视距离 滚动监听对象
      var $viewHeight = $obj1.offsetParent().height();
      $obj1.height($viewHeight * $obj3.height() / $obj2.height());

      //最大滚动高度
      var $maxHeight = $viewHeight - $obj1.height();
      var contentMax = $obj2.height() - $obj3.height();
      //拖拽
      $obj1.mousedown(function (e) {
        var $downY = e.clientY,
          $downT = $obj1.position().top;
        $(document).mousemove(function (e) {
          var $newTop = e.clientY - $downY + $downT;
          $newTop = Math.min($maxHeight, $newTop);
          $newTop = Math.max(0, $newTop);
          $obj1.css("top", $newTop);
          $obj2.css("top", -$newTop / $maxHeight * contentMax);
        }).mouseup(function () {
          $(this).off("mousemove").off("mouseup");
        })
        return false;
      })
    }
    //滚动条单击
    function clickScroll($obj1, $obj2, $obj3) {
      //obj1 滚动条 obj1.height/obj3.height = obj3.height/obj2.height
      //obj2 最大距离 监听对象的高度
      //obj3 可视距离 滚动监听对象
      var $viewHeight = $obj1.offsetParent().height();
      $obj1.height($viewHeight * $obj3.height() / $obj2.height());

      //最大滚动高度
      var $maxTop = $viewHeight - $obj1.height();
      var contentMax = $obj2.height() - $obj3.height();
      //单击
      $obj1.offsetParent().click(function (e) {

      })
    }
    //向前点击切换
    $btn.eq(0).click(function () {
      index++;
      index %= $newinfolist.length
      //console.log(index);
      $infoconlist.eq(index).fadeIn().siblings().fadeOut();
    })
    //向后点击切换
    $btn.eq(1).click(function () {
      index--;
      index = index < 0 ? $newinfolist.length - 1 : index;
      //console.log(index);
      $infoconlist.eq(index).fadeIn().siblings().fadeOut();
    })


  })();

  //游戏特色
  (function () {
    var $game = $("#game"),
      $gameLi = $game.find("li"),
      $navBtn = $game.find(".btn"),
      $banner = $game.find(".banner")
    index = 0,
      length = $gameLi.length;
    //点击切换
    $gameLi.click(function () {
      if ($(this).index() !== index) {
        index = $(this).index();
        change();
      }
    });
    //前进后退
    $navBtn.click(function () {
      console.log($(this).index());
      if ($(this).index()) {
        index++;
        index %= length;
      } else {
        index--;
        index = index < 0 ? length - 1 : index;
      }
      change();
    })

    function change() {
      var lIndex = (index - 1),
        rIndex = (index + 1) % length;
      $gameLi.removeClass("left mid right");
      $gameLi.eq(index).addClass("mid");
      $gameLi.eq(lIndex).addClass("left");
      $gameLi.eq(rIndex).addClass("right");
    }

    function autoPlay() {
      index++;
      index %= length;
      change();
    }
    //自动轮播
    $game.timer = setInterval(autoPlay, 3000);
    $banner.on("mouseover", function () {
      clearInterval($game.timer);
    })
    $banner.on("mouseout", function () {
      console.log(2);
      $game.timer = setInterval(autoPlay, 3000);
    })
  })();
  //滚动条延时出现
  (function ($) {
    $.extend({
      scrollShow:function(){
        new ScrollShow(arguments);
      }
    })
    function ScrollShow(){
      var args = arguments[0];
      this.objArr = this.init.apply(this,args);
    }
    ScrollShow.prototype = {
      //主函数，当滚动时执行的函数
      main:function(){
        //如果存在滚动监听的对象
        if(this.objArr.length>0){
          //滚动高度加实际的页面的高度
          var height = $(document).scrollTop() + $(window).height();
          for (var i = this.objArr.length - 1; i >= 0; i--) {
            var obj = this.objArr[i];
            //如果超过了监听对象到页面顶部的高度就显示
            if (height >= obj.oddTop) {
              var This = this;
              (function () {
                var $This = $(obj);
                setTimeout(function () {
                  $This.removeClass("hide");
                }, ($This.index() % 3) * 300);
                //显示后移出当前对象
                This.objArr.slice(i, 1);
              })();
            }
          }
        }
      },
      init:function(){
        var arr = []
        var This = this;
        //添加监听对象
        for (var i = 0, length = arguments.length; i < length; i++) {
          arguments[i].each(function () {
            this.oddTop = $(this).offset().top;
            arr.push(this);
          })
        }
        //添加滚动的函数
        $(window).scroll(function(){
          This.main();
        });
        return arr;
      }
    }
  })($);

  //滚动条延时出现
  (function () {
    var $newinfo = $("#newinfo"),
      $newinfolist = $newinfo.find(".infolist li"),
      $title = $newinfo.find(".title"),
      $game = $("#game"),
      $gameLi = $game.find(".banner"),
      $gTitle = $game.find(".title")
    //console.log($newinfolist);
    $.scrollShow($title, $newinfolist, $gameLi, $gTitle);
  })();
})