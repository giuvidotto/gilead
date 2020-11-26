var JS = JS || {};

$(document).ready(function(){
	JS.Common = new Common();
});

Common = function(){
	this.init();
}

Common.prototype = {
	init: function(){
		this.num = 0;
		this.conta = 0;
		this.conta2 = 0;
		this.img = $('.animation');
		this.topmenu = $('.top');
		this.tw;
		this.initEvents();
		this.timeout();
		this.topFix();
		this.smoothScrolling();
		this.autoBreadcrumb();
	},
	
	initEvents: function(){
		var escopo = this;
		$(window).scroll(function(){
			escopo.topFix();
		});
	},
	
	changeNum: function(){
		var escopo = this;
		if(escopo.conta<119){
			if(escopo.conta==90){
				if(escopo.conta2<200){
					escopo.conta2++;
				}else{
					escopo.num-=490;
					escopo.conta++;
					escopo.conta2=0;
				}
			}else{
				escopo.num-=490;
				escopo.conta++;
			}
		}else{
			escopo.num=0;
			escopo.conta=0;
		}
	},
	
	timeout: function() {
		var escopo = this;
		setTimeout(function(){
			escopo.tw = TweenLite.to(escopo.img, 0, {left:escopo.num+"px", onComplete:escopo.changeNum()});
			escopo.timeout();
		}, 33);
	},
	
	topFix: function(){
		var escopo = this;
		if($(window).scrollTop() > (88)){
			escopo.tw = TweenLite.to(escopo.topmenu, .2, {className:"+=on"});
		}else{
			escopo.tw = TweenLite.to(escopo.topmenu, .2, {className:"-=on"});
		}
	},
	
	smoothScrolling: function(){
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
				  $('html, body').animate({
					scrollTop: target.offset().top
				  }, 1000, "easeInOutCubic");
				  return false;
				}
			}
		});
	},
	
	autoBreadcrumb: function(){
		var escopo = this;
		var scrollPoint = [
			$('#home'),
			$('#hiv'),
			$('#aids'),
			$('#epidemiologia'),
			$('#destaques'),
			$('#prevencao')
		];
		
		$(window).scroll(function(){
			for(i=0; i<scrollPoint.length; i++){
				var scrollTop = scrollPoint[i].offset().top;
				var margem = Math.abs($(window).scrollTop() - scrollTop);
				if(margem <= 200){
					var url = scrollPoint[i].attr('id');
					window.history.pushState(url, '#EuPrevivo | '+url, '#'+url);
					escopo.topmenu.find("a").removeClass("breadcrumb");
					escopo.topmenu.find("a[href='#"+url+"']").addClass("breadcrumb");
				}
			}
		});
	}
}