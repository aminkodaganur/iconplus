// JavaScript Document
$(document).ready(function(e) {
    
	//$('.control-panel').height($(window).height()-5);
	//$('.win-height').height($(window).height());
	
	$('#dynamic-text').on('change',function(){
		$('#text').html($(this).val());
	});
		
	/*$('.more-option-btn').on('click',function(){
		$('.more-option-cnt').toggle('slow');			
	});*/
	
	$('#boxsize').on('input',function(){
		var wh = $(this).val();
		$('#box').height(wh).width(wh);
	});
	
	$('#fontsize').on('input',function(){
		var size = $(this).val();
		$('#text').css('font-size',size+'px');
	});
	
	$('input[type=radio][name=fontweight]').on('change',function(){
		var font = $(this).val();
		$('#text').css('font-weight',font);
	});
	
	$('#font-color').on('blur',function(){
		var a = $(this).val();
		var isOk  = /^#[0-9A-F]{6}$/i.test(a);
		if(isOk == false && a!=""){
			alert('Please eneter correct color code. E.g : #8e44ad');
			$(this).val('');
			return false;
		}
		$('#text').css('color',a);
		
	});
	
	$('#preview').on('click',function(){
		var privewIcon = $('#gen-Icon').html();
		$('.icon-preview').html(privewIcon);
		$('.icon-preview').children('#box').css('box-shadow','none');
	});
	
	
	document.getElementById("copyhtml").addEventListener("click", function() {
		var a = copyToClipboard(document.getElementById("html-code"));
		if(a){
			$(this).text('Copied to clipboard');
			setTimeout(function(){$('#copyhtml').text('Copy')},3000);
		}
	});
	document.getElementById("copycss").addEventListener("click", function() {
		var a = copyToClipboard(document.getElementById("css-code"));
		if(a){
			$(this).text('Copied to clipboard');
			setTimeout(function(){$('#copycss').text('Copy')},3000);
		}
	});
	
	function copyToClipboard(elem) {
		  // create hidden text element, if it doesn't already exist
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// can just use the original source element for the selection and copy
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
		} else {
			// must use a temporary form element for the selection and copy
			target = document.getElementById(targetId);
			if (!target) {
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// select the content
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);
		
		// copy the selection
		var succeed;
		try {
			  succeed = document.execCommand("copy");
		} catch(e) {
			succeed = false;
		}
		// restore original focus
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}
		
		if (isInput) {
			// restore prior selection
			elem.setSelectionRange(origSelectionStart, origSelectionEnd);
		} else {
			// clear temporary content
			target.textContent = "";
		}
		return succeed;
	}
	
});
/*-webkit-text-stroke: 3px rgba(255, 255, 255, 1);
    color: #1A84CC;*/