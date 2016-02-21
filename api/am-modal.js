$(document).ready(function(e) {

  resizeDiv();
  window.onresize = function(event) {
    resizeDiv();
  }

  function resizeDiv() {
    vpw = $(window).width();
    vph = $(window).height();
    $('.am-modal').css('height', vph + "px");
  }

  $('.am-modal-trigger').on('click', function() {
    var target = $(this).data('am-target');
    $(target).css('display','block');
    $(target).addClass('zoomIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    		$(target).removeClass('zoomIn');
    });
  });
	
  $('.am-close').on('click', function() {
	  
	var selector = $(this);  
    selector.parent().parent().addClass('zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    	selector.parent().parent().removeClass('zoomOut');
        selector.parent().parent().css('display','none');
    });
  	
  });
  
  $(document).keyup(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode `27`
			$('.am-modal').addClass('zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('.am-modal').removeClass('zoomOut');
				$('.am-modal').css('display','none');
			});
		}
	});
  
});