$(function () {
	// 菜单栏滑出
	(function () {
		var $nav = $("#nav"),
			$menuHide = $nav.find(".haveHide"),
			$ulHide = $nav.find(".ulHide"),
			$hideCon = $ulHide.find(".hide"),
			$logo2 = $("#header").find(".logo2"),
			$logo = $nav.find(".logo");
		// $hideCon.eq(0).css("display","none");
		//console.log($hideCon);
		//滚动显示
		$(window).scroll(function () {
			if ($(document).scrollTop()) {
				$nav.addClass("scroll");
				$logo.fadeIn();
				$logo2.addClass("scale");
			} else {
				$logo.fadeOut();
				$logo2.removeClass("scale");
				$nav.removeClass("scroll");
			}
		})
		$logo2.delay(1000).queue(function () {
			$(this).css({
				left: 60,
				opacity: 1
			});
		});
		$menuHide.hover(function () {
			$nav.addClass("hover");
			$ulHide.stop().slideDown();
			$hideCon.eq($(this).index("#nav .haveHide")).stop().fadeIn();
		}, function () {
			$ulHide.stop().slideUp();
			$nav.removeClass("hover");
			$hideCon.eq($(this).index("#nav .haveHide")).stop().fadeOut();
		})
		$hideCon.hover(function () {
			$nav.addClass("hover");
			$ulHide.stop().slideDown();
			$hideCon.eq($(this).index()).stop().fadeIn();
		}, function () {
			$ulHide.stop().slideUp();
			$nav.removeClass("hover");
			$hideCon.eq($(this).index()).stop().fadeOut();
		})
	})();
	//角色切换 
	(function () {
		var $role = $("#role"),
			$btn = $role.find(".btn"),
			$rol1 = $role.find(".rol1 .role"),
			$rol2 = $role.find(".rol2 .role"),
			showOff = false; //第一页显示
		$rol1.removeClass("hide");
		$btn.click(function () {
			showOff = !showOff;
			(showOff) ? change($rol1, $rol2): change($rol2, $rol1);
		})

		function change($s1, $s2) {
			$s1.stop();
			$s2.stop();
			$s1.addClass("hide");
			/*setTimeout(function(){
				$s2.removeClass("hide");
			},900);*/
			$s1.addClass("hide").delay(900).queue(function () {
				$s2.removeClass("hide");
			})
		}
	})();
	//信息服务
	(function () {
		var $serbtn = $("#server"),
			$serList = $("#serverlist"),
			$loseBtn = $serList.find(".close");
		$serbtn.click(function () {
			$serList.fadeIn();
			$serList.find(".main").addClass("show");
		})
		$loseBtn.click(function () {
			$serList.fadeOut();
			$serList.find(".main").removeClass("show");
			$serList.removeClass("show")
		})
		$serList.hide();
	})();
	//侧边栏
	(function () {
		var $slide = $("#slide"),
			$download = $slide.find(".download")
		$showBtn = $slide.find(".showBtn"),
			$showCon = $slide.find(".showCon"),
			$close = $showCon.find(".close"),
			$mainLis = $slide.find(".main li");;
		$showBtn.click(function () {
			//console.log(1)
			$(this).fadeOut();
			$download.addClass("show");
			$showCon.fadeIn();
		})
		$close.click(function () {
			$download.removeClass("show");
			$showCon.fadeOut();
			$showBtn.fadeIn();
		})
		$mainLis.hover(function () {
			$(this).stop().addClass("pos");
		}, function () {
			$(this).stop().delay(400).queue(function () {
				$(this).removeClass("pos")
			});
		})
	})();
	//面对对象banner封装
	(function () {
		//构造
		function Banr($ul, $tab, $pic) {
			//$ul是绝对定位的所有滑动内容的父级
			//$tab 是切换按钮
			//$pic 是可视窗口
			this.$ul = $ul;
			this.$tab = $tab;
			this.length = $tab.length;
			this.width = $pic.width();
			this.index = 0;
			this.timeOut = null;
		}
		Banr.prototype = {
			exe: function () {
				this.addEvent();
			},
			addEvent: function () {
				var This = this;
				This.$tab.hover(function () {
					clearInterval(this.timeOut);
					var $This = $(this);
					This.timeOut = setTimeout(function () {
						This.index = This.$tab.index($This);
						This.$ul.stop().animate({
							left: -This.width * This.index
						}, 300)
						$This.addClass("on").siblings().removeClass("on");
					}, 200)
				})
			},
		}
		//带有自动轮播
		function Banr2($ul, $tab, $pic) {
			Banr.call(this, $ul, $tab, $pic);
			this.$pic = $pic;
			this.timer = null;
		}

    //继承
		function fn() {};
		fn.prototype = Banr.prototype;
		Banr2.prototype = new fn();
		Banr2.prototype.temp = Banr2.prototype.exe;
		Banr2.prototype.exe = function () {
			this.temp();
			this.auto();
			this.clearTime();
		}
		Banr2.prototype.auto = function () {
			var This = this;
			this.timer = setInterval(function () {
				This.index++;
				This.index %= This.length;
				This.$tab.eq(This.index).addClass("on").siblings().removeClass("on");
				This.$ul.stop().animate({
					left: -This.width * This.index
				}, 300);
			}, 3000);
		}
		Banr2.prototype.clearTime = function () {
			var This = this;
			this.$pic.hover(function () {
				clearInterval(This.timer);
			}, function () {
				This.auto();
			});
		}
		window.Banr = Banr;
		window.Banr2 = Banr2;
	})();
	//新闻和banner
	(function () {
		//banner
		var $con = $("#content"),
			$swplist = $con.find(".news .swplist"),
			$banner = $con.find(".banner"),
			$tabs = $con.find(".banner .tab span");
		$informCon = $con.find(".informCon"),
			$wrapUl = $informCon.find(".wrapUl"),
			$wrap = $informCon.find(".wrap")
		$inTab = $con.find(".inform .tabli"),
			$informCon = $con.find(".informCon");
		//添加内容
		$wrapUl.each(function (i) {
			var $li = $("<li></li>");
			var num = 0;
			for (var j = 0, length = data.length; j < length; j++) {
				if (!i || data[j].typeX === (i - 1)) {
					$(this).append("<li><a href=''>" + data[j].title + "</a><span>" + data[j].time + "</span></li>");
					num++;
					if (num == 5) break;
				}
			}
		});
		var Banr1 = new Banr($wrap, $inTab, $informCon);
		Banr1.exe();
		var Bnr2 = new Banr2($swplist, $tabs, $banner);
		Bnr2.exe();
	})();
	//式神列表
	(function () {
		var $shishen = $("#shishen"),
			$tTab = $shishen.find(".title-tab"),
			$shishenList = $shishen.find(".shishenList"),
			$shishenTabs = $shishen.find(".shishen-tabs span"),
			$shishenListUl = $shishenList.find("ul"),
			$shishenBtns = $shishen.find(".shishenwrap .btn"),
			$left = $shishenBtns.eq(0),
			$right = $shishenBtns.eq(1),
			width = $shishenList.width(),
			timeOut = null;
		$index = 0,
			maxIndex = 0;

		$shishenTabs.click(function () {
			//console.log(allData[$(this).index()]);
			renData(allData[$(this).index()]);
			$(this).addClass("on").siblings().removeClass("on");
		})
		//生成所有的式神图标
		var allData = [
			[],
			[],
			[],
			[],
			[]
		];
		//内容添加
		getData();
		renData(allData[0]);

		function renData(newData) {
			$shishenListUl.html("");
			$shishenListUl.css("left", 0);
			$index = 0;
			$shishenBtns.hide();
			for (var i = 0, length = newData.length; i < length; i++) {
				if (i % 2 == 0) {
					var $li = $("<li></li>");
					$shishenListUl.append($li);
				}
				var $str = newData[i].isNew ? "<i class='new'></i>" : "";
				var $a = $("<a href='' class='shishen'>" +
					"<img src='img/index/content/shishen/" + newData[i].id + ".png'>" +
					$str + "<span>" + newData[i].name + "</span></a>");
				$li.append($a);
			}
			maxIndex = Math.ceil(newData.length / 12);
			if (maxIndex > 1) {
				$right.show()
			};
		}

		function getData() {
			for (var i = 0, length = shishenData.length; i < length; i++) {
				switch (shishenData[i].level) {
					case "SSR":
						index = 1;
						break;
					case "SR":
						index = 2;
						break;
					case "R":
						index = 3;
						break;
					case "N":
						index = 4;
						break;
				}
				allData[index].push(shishenData[i])
				allData[0].push(shishenData[i]);
			}
		}
		//点击切换
		$shishenBtns.click(function () {
			if ($(this).index()) {
				$index++;
				$index %= maxIndex;
			} else {
				$index--;
				$index = $index < 0 ? 0 : $index;
			}
			$index !== maxIndex - 1 ? $shishenBtns.eq(1).show() : $shishenBtns.eq(1).hide();
			$index !== 0 ? $shishenBtns.eq(0).show() : $shishenBtns.eq(0).hide();

			$shishenListUl.stop().animate({
				"left": -width * $index
			}, 300)
		})
	})();
	//式神主角
	(function () {
		var $shishen = $("#shishen"),
			$tTab = $shishen.find(".title .title-tab"),
			$shishenCon = $shishen.find(".shishen-con"),
			$zhujueCon = $shishen.find(".shishen-zhujue"),
			$roltab = $zhujueCon.find(".lefttab li");
		$roleWrap = $zhujueCon.find(".rolWrap");
		$tTab.click(function () {
			console.log($(this).index())
			$(this).addClass("on").siblings().removeClass("on");
			if ($(this).index() === 4) {
				$shishenCon.fadeOut();
				$zhujueCon.fadeIn();
			} else {
				console.log(1);
				$shishenCon.fadeIn();
				$zhujueCon.fadeOut();
			}
		});
		$roltab.click(function () {
			var $index = $(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$roleWrap.eq($index).fadeIn().siblings().fadeOut();
		})
	})();
	//攻略
	(function () {
		var $strategy = $("#strategy"),
			$pic = $strategy.find(".leftBanner .pic"),
			$swpUl = $strategy.find(".leftBanner .swplist"),
			$tabs = $strategy.find(".leftBanner .tab span"),
			$infoUl = $strategy.find(".strategyCon .infoUl"),
			$infoList = $strategy.find(".strategyCon .infoList"),
			$infoPic = $strategy.find(".strategyCon .pic"),
			$infoTabs = $strategy.find(".strategyCon .title-tab");
		//console.log($infoUl);	

		//数据添加
		var typeArr = ["新手", "式神", "斗技", "玩法", "高阶", "御魂"];
		$infoUl.each(function (i) {
			var num = 0,
				conHtml = '';
			for (var j = 0, length = strateData.length; j < length; j++) {
				var data = strateData[j],
					reg = new RegExp(i);
				if (reg.test(data.type) && num < 10) {
					num++;
					conHtml += "<li><i class='arrow'></i>" +
						"<a href=''>" +
						"<span class='info'>【" + typeArr[i] + "】 " + data.title + "</span>" +
						"</a>" +
						"<p class='author'>" + data.author + "</p></li>";
				}
			}
			$(this).html(conHtml);
		})
		var Banner2 = new Banr2($swpUl, $tabs, $pic);
		Banner2.exe();
		var Banner1 = new Banr($infoList, $infoTabs, $infoPic);
		Banner1.exe();
	})();
	//同人专区
	(function () {
		var $tongren = $("#tongren"),
			$tongrenPic = $tongren.find(".tongren-pic"),
			$tongrenUl = $tongrenPic.find(".tongren-swp>ul"),
			$tongrenTabs = $tongren.find(".tongren-topbar li"),
			$tongrenWrapUl = $tongrenPic.find(".tongren-swp");
		console.log($tongrenWrapUl);
		//内容添加
		$tongrenUl.each(function (index) {
			var num = 0,
				conHtml = '';
			for (var i = 0, length = fanData.length; i < length; i++) {
				var data = fanData[i];
				if (data.type === index) {
					conHtml += "<li>" +
						"<a href='javascript:;'>" +
						"<img src='" + data.url + "'>" +
						"<span>" +
						"<b></b>" +
						"</span>" +
						"<p class='title'>" + data.title + "</p>" +
						"</a>" +
						"</li>";
					num++;
					if (num > 7) break;
				}
			}
			$(this).html(conHtml);
		})
		var Banner1 = new Banr($tongrenWrapUl, $tongrenTabs, $tongrenPic);
		Banner1.exe();
	})()
})