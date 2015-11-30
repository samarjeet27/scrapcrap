$(document).ready(function() {
	var $slider = $(".banner").unslider({
		dots: true,
		keys: true,
		delay: false,
		fluid: true
	}),
	$unslider = $slider.data("unslider"),
	$hero = $(".hero"),
	$header = $("header"),
	galli = 0,
	acts = [],
	isDesktop = function() {
		return window.innerWidth > 960;
	},
	createActivity = function(i) {
		var act = acts[i],
			$slide = $(".act-slide"),
			$slideShow = $(".act-slideshow").find("ul"),
			$content = $slide.find(".act-content"),
			$heading = $("<h2>").text(act.name),
			$desc = $("<p>").html(act.description);

		$content.append($heading);
		$content.append($desc);

		for (var s = 0; s < act.images.length; s++) {
			var img = act.images[s];
			var $li = $("<li>").css("background-image", 'url("images/act/' + img + '")');
			$slideShow.append($li);
		}
	},
	hideAndShow = function($lis, index) {
		for (var i = 0; i < $lis.length; i++) 
			$($lis[i]).hide();

		$($lis[index]).show();
	},
	assign = function (cls) {
		$(".banner ." + cls).on("click", function() {
			$unslider[cls]();
		})
	};
	assign("next");
	assign("prev");

	$("header a").click(function(e) {
		e.preventDefault();
		var offset = $("#" + $(this).attr("href").substr(1)).offset();
		$("html, body").animate({
			scrollTop: offset.top - $("header").outerHeight()
		}, "slow");
	});

	$(document).on("click", ".act-btn", function(t) {
		createActivity($(this).attr("act-id"));
		$(".act-slideshow").gallery();
		$(".act-blackout").fadeIn(200, function() {
			$(".act-slideshow li").css("height", $(".act-slide").height());
		});
	});

	$(".bt-close").click(function() {
		$(".act-blackout").fadeOut(400, function() {
			$(".act-slideshow").find("ul").empty();
			$(".act-content").empty();
			galli = 0;
		});
	});

	if(isDesktop()) {
		$(window).bind("scroll", function() {
			var top = $(window).scrollTop(),
				hH = $hero.height() - $header.height();
			if (top > hH) {
				$(".logo").fadeIn(100);
				setTimeout(function() {
					$header.addClass("secondary");
				}, 50);
			} else {
				$(".logo").hide();

				setTimeout(function() {
					$header.removeClass("secondary");
				}, 50);
			}
		});
	}

	var $workList = $("#work-list");
	$.getJSON("data/activities.json", function(json, n) {
		acts = json;
		for (var i = 0; i < json.length; i++) {
			var $baseCol = $("<div>").addClass("col-1-3"),
				$workCard = $("<div>").addClass("work-card"),
				item = json[i];

			$workCard.append($("<h2>").text(item.name));
			$workCard.append($("<img>").attr("src", "images/act/" + item.images[0]));
			$workCard.append($("<p>").text(item.sdesc));
			var $bottom = $("<div>").addClass("bottom");
			$bottom.append($("<button>").attr("act-id", i).addClass("act-btn").text("More"));
			$workCard.append($bottom);
			$baseCol.append($workCard);
			$workList.append($baseCol);
		}
	});

	$.fn.gallery = function() {
		var $me = $(this),
			$ul = $me.find("ul"),
			$lis = $ul.children("li");

		hideAndShow($lis, 0);
		$me.find(".next").on("click", function() {
			galli++;
			if (galli == $lis.length)
				galli = 0;
			hideAndShow($lis, galli);
		});
		$me.find(".prev").on("click", function() {
			if (galli > 0)
				galli--;
			hideAndShow($lis, galli);
		});
	};
});