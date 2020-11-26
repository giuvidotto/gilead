$(document).ready(function() {
	$(window).on('load', function(){
		var $slides	= $(".slide");
		var slideNo = $(".slide").length;
		var currentSlide = 0;
		var slideDelay = 6;
		var slideDuration = .7;
		var tweenSlide;
		var terminou = true;
		var mesmo;
		
		tweenSlide = TweenLite.set($slides.filter(":gt(0)"), {opacity:0});
		
		slideNo>1 && TweenLite.delayedCall(slideDelay, nextSlide);
		
		$slides.css("position", "absolute").css("float", "none");
		
		var e;
		
		function goToSlide(e){
			mesmo = currentSlide;
			currentSlide = e;
			
			if(mesmo != currentSlide){
				tweenSlide.kill();
				terminou = false;
				tweenSlide = TweenLite.to( $slides.eq(mesmo), slideDuration, {opacity:0} );
			
				$(".slider-breadcrumb .item .botao").removeClass("on");
				$('.slider-breadcrumb .item .botao:eq('+currentSlide+')').addClass("on");
				
				tweenSlide = TweenLite.fromTo( $slides.eq(currentSlide), slideDuration, {opacity:0}, {opacity:1, onComplete:function(){
					terminou = true;
				}});
			}
		tweenSlide = TweenLite.delayedCall(slideDelay, nextSlide);
		}
		
		if(slideNo>1){
			$slides.each(function(){
				$("#slideBreadcrumb").append('<li class="item"><a href="javascript://" class="botao"></a></li>');
			});
			$('.slider-breadcrumb .item .botao').click(function(){
				goToSlide($('.slider-breadcrumb .item .botao').index(this));
			});
		}
		
		$('.slider-breadcrumb .item .botao:eq('+currentSlide+')').addClass("on");
		
		function nextSlide(){
			if(terminou){
				mesmo = currentSlide;
				if (currentSlide < $slides.length - 1) {
					currentSlide++;
				}
				else {
					currentSlide = 0;
				}
				
				if(mesmo != currentSlide){
					tweenSlide.kill();
					terminou = false;			
					tweenSlide = TweenLite.to( $slides.eq(mesmo), slideDuration, {opacity:0} );	
					
					if(mesmo != currentSlide){									
					$(".slider-breadcrumb .item .botao").removeClass("on");
					$('.slider-breadcrumb .item .botao:eq('+currentSlide+')').addClass("on");
					tweenSlide = TweenLite.fromTo( $slides.eq(currentSlide), slideDuration, {opacity:0}, {opacity:1, onComplete:function(){
						terminou = true;
					}});
					}
				}
			}
			tweenSlide = TweenLite.delayedCall(slideDelay, nextSlide);
		}
	});
});