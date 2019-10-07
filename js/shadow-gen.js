// JavaScript Document
///////////////////////////////////////////////////////////////////////////////////////////////////////
var pad = function(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

// Ratio is between 0 and 1
var changeColor = function(color, ratio, darker) {
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function() {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/),
        returnValue;

    // Return RGB(A)
    return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
};
var lighterColor = function(color, ratio) {
    return changeColor(color, ratio, false);
};
var darkerColor = function(color, ratio) {
    return changeColor(color, ratio, true);
};

// Use
//var darker = darkerColor('rgba(80, 75, 52, .5)', .2);
//var lighter = lighterColor('rgba(80, 75, 52, .5)', .2);
////////////////////////////////////////////////////////////////////////////////////////////////////
//// Function to convert HEX To RGB


function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

//Usage
//R = hexToR("#FFFFFF");
//G = hexToG("#FFFFFF");
//B = hexToB("#FFFFFF");

///////////////////////////////////////////////////////////////////////////////////////////////////
var bodyBackColor = "#E9E9E9";
var boxBackColor = "#1A84CC";

var boxshadowStyle = genShadow(bodyBackColor,120,1,20,'D');
var style = document.createElement('style')
	style.type = 'text/css';
	style.innerHTML = '.box-shadow { box-shadow : '+boxshadowStyle+';transition:0.2s ease; }';
	document.getElementsByTagName('head')[0].appendChild(style);
	$('#box').addClass('box-shadow'); 
	
var textshadowStyle = genShadow(boxBackColor,120,1,10,'D');
var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.text-shadow { text-shadow : '+textshadowStyle+';transition:0.2s ease; }';
	document.getElementsByTagName('head')[0].appendChild(style);
	$('#text').addClass('text-shadow'); 
	
function genShadow(color,shadow_lenght,fade,opacity,rotation){
	//alert(shadow_lenght);
	//console.log('color:'+color);console.log('shadow_lenght:'+shadow_lenght);console.log('fade:'+fade);console.log('opacity:'+opacity);console.log('rotation:'+rotation);
	var color = color;
	var shadow_lenght = parseInt(shadow_lenght);
	var fade = parseInt(fade);
	var opacity = parseInt(opacity)/100;
	var rotation = rotation;
	var values = [];
	var shadow_style = "";
	var shadow_color = "rgb("+hexToR(color)+", "+hexToG(color)+", "+hexToB(color)+")";
	console.log(shadow_color);
	
	for(var i=0; i<(shadow_lenght); i++){
		if(fade == 1)
			values.push( (opacity/shadow_lenght)*i);
		else
			values.push( (opacity));
	}
	values.sort(function(a, b){return b-a});
	var len = values.length - 1;
	
	for(var i=0; i<shadow_lenght; i++){
		var color = darkerColor(shadow_color, values[i]);
		var step = (i * shadow_lenght / 100);
		//console.log(values[len]);
		len--;
		
		if(rotation == "D"){
			//console.log('genrating..');
			if(i==0)
				shadow_style = shadow_style + ""+i+"px "+i+"px 0px "+color;
			else
				shadow_style = shadow_style + " ,"+i+"px "+i+"px 0px "+color;
		}else{
			rotation = parseFloat(rotation);
			if(i==0)
				shadow_style = shadow_style + (Math.sin(0 + rotation) * step)+"px "+(Math.cos(0 + rotation) * step)+"px 0px "+color;
			else
				shadow_style = shadow_style +" ,"+(Math.sin(0 + rotation) * step)+"px "+(Math.cos(0 + rotation) * step)+"px 0px "+color;
			
		}
	}
	return shadow_style;
}
/////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// EVENTS  ///////////////////////////////////

///////////////// Box - change Event /////////////////////
$('#bx-back-color').on('blur',function(){
	//console.log('bx-back-color changed');
	
	var color = $(this).val();
	var isOk  = /^#[0-9A-F]{6}$/i.test(color);
	if(isOk == false && color!=""){
		alert('Please eneter correct color code. E.g : #8e44ad');
		$(this).val('');
		return false;
	}	
	$('body').css('background-color',color);
	changedBox();
});

$('#bx-fade-flag').on('change',function(){
	//console.log('bx-fade-flag');
	changedBox();
});

$('input[type=radio][name=bx-shape]').on('change',function(){
	//console.log('bx-shape');
	var radius = $(this).val();
	$('#box').css('border-radius',radius+'px');
});

$('#bx-shadow-length').on('input',function(){
	//console.log('bx-shadow-length');
	changedBox();
});

$('#bx-opacity').on('input',function(){
	//console.log('bx-opacity');
	changedBox();
});

$('#bx-rotation').on('change',function(){
	//console.log('bx-rotation');
	changedBox();
});

$('#outline').on('change',function(){
	var a = $(this).prop('checked');
	if(a==true){
		$('#text').addClass('stroke');
		$('#text').css('color',$('#box').css('background-color'));
	}else{
		$('#text').removeClass('stroke');
		$('#text').css('color','#ffffff');
	}
});

//////////////////// Text - change Event /////////////////

$('#text-back-color').on('blur',function(){
	//console.log('text-back-color');	
	var color = $(this).val();
	var isOk  = /^#[0-9A-F]{6}$/i.test(color);
	if(isOk == false && color!=""){
		alert('Please eneter correct color code. E.g : #8e44ad');
		$(this).val('');
		return false;
	}
	$('#box').css('background-color',color);
	changedText();
});

$('#text-fade-flag').on('change',function(){
	//console.log('text-fade-flag');
	changedText();
});

$('#text-shadow-length').on('input',function(){
	//console.log('text-shadow-length');
	changedText();
});

$('#text-opacity').on('input',function(){
	//console.log('text-opacity');
	changedText();
});

$('#text-rotation').on('change',function(){
	//console.log('text-rotation');
	changedText();
});

function changedBox(){
	var color = $('#bx-back-color').val();
	if(color == ""){
		color = bodyBackColor;
	}
	
	var fade = $('#bx-fade-flag').prop('checked');
	if(fade == true){
		fade = 1;
	}else{
		fade = 0;
	}
	var lenght = $('#bx-shadow-length').val();
	var opacity = $('#bx-opacity').val();
	var rotation = $('#bx-rotation').val();
	//console.log("color:"+color);console.log("fade:"+fade);console.log("lenght:"+lenght);console.log("opacity:"+opacity);console.log("rotation:"+rotation);
	
	var boxshadowStyle = genShadow(color,lenght,fade,opacity,rotation);
	console.log(boxshadowStyle);
	$('.box-shadow').css('box-shadow',boxshadowStyle);
}
function changedText(){
    var color = $('#text-back-color').val();
	if(color == ""){
		color = boxBackColor;
	}
	
	var fade = $('#text-fade-flag').prop('checked');
	if(fade == true){
		fade = 1;
	}else{
		fade = 0;
	}
	var lenght = $('#text-shadow-length').val();
	var opacity = $('#text-opacity').val();
	var rotation = $('#text-rotation').val();
	//console.log("color:"+color);console.log("fade:"+fade);console.log("lenght:"+lenght);console.log("opacity:"+opacity);console.log("rotation:"+rotation);
	
	var boxshadowStyle = genShadow(color,lenght,fade,opacity,rotation);
	console.log(boxshadowStyle);
	$('.text-shadow').css('text-shadow',boxshadowStyle);
}
/////////////////////////////// End of Events /////////////////////////////
$('#btn-get-code').on('click',function(){
	var html = $('#dynamic-text').val();
	if(html=="")
		html = "fs";
	var html_code = '<div class="box-shadow">\n\t<div class="text-shadow">'+html+'</div>\n</div>';
	
	var box_width = $('#box').width();
	var box_height = $('#box').height();
	var box_radius = $('input[type=radio][name=bx-shape]:checked').val();
	var bg_color = $('#text-back-color').val();
	if(bg_color == ""){ bg_color = '#1A84CC'; }
	
	//box shadow gen shadow 
	var color = $('#bx-back-color').val();
	if(color == ""){
		color = bodyBackColor;
	}
	
	var fade = $('#bx-fade-flag').prop('checked');
	if(fade == true){
		fade = 1;
	}else{
		fade = 0;
	}
	var lenght = $('#bx-shadow-length').val();
	var opacity = $('#bx-opacity').val();
	var rotation = $('#bx-rotation').val();
	
	var boxshadowStyle = genShadow(color,lenght,fade,opacity,rotation);
	boxshadowStyle = boxshadowStyle.replace(/ ,/g," ,\n\t");
	//end of box shadow gen shadow 
	var css_code1 = '.box-shadow{\n\twidth:'+box_width+'px;\n\theight:'+box_height+'px;\n\toverflow : hidden;\n\tdisplay: table;\n\tmargin: 0 auto;\n\tborder-radius:'+box_radius+'px;\n\tbackground-color : '+bg_color+';\n\tbox-shadow:'+boxshadowStyle+';\n}';
	
	
	var text_color = $('#font-color').val();
	if(text_color == "") { text_color = "#ffffff"; }
	var text_size = $('#fontsize').val();
	var font_weight = $('input[type=radio][name=fontweight]:checked').val();
	if(typeof (font_weight) == 'undefined')
		font_weight = "bold";
	
	var text_outline = $('#outline').prop('checked');
	if(text_outline == true){
		text_outline = "2px";
		text_color = $('#box').css('background-color');
	}else{
		text_outline = "0px";
	}	
	//text shadow gen //
	var color = $('#text-back-color').val();
	if(color == ""){
		color = boxBackColor;
	}
	
	var fade = $('#text-fade-flag').prop('checked');
	if(fade == true){
		fade = 1;
	}else{
		fade = 0;
	}
	var lenght = $('#text-shadow-length').val();
	var opacity = $('#text-opacity').val();
	var rotation = $('#text-rotation').val();
	var textshadowStyle = genShadow(color,lenght,fade,opacity,rotation);
	textshadowStyle = textshadowStyle.replace(/ ,/g," ,\n\t");
	//end of shadow gen //
	
	var css_code2 = '\n\n.text-shadow{\n\tcolor: '+text_color+';\n\tfont-size: '+text_size+'px;\n\tfont-weight: '+font_weight+';\n\t-webkit-text-stroke: '+text_outline+' #FFFFFF;\n\t-moz-text-stroke: '+text_outline+' #FFFFFF;\n\t-o-text-stroke: '+text_outline+' #FFFFFF;\n\t-webkit-text-stroke: '+text_outline+' #FFFFFF;\n\twidth: 100%;\n\theight: 100%;\n\ttext-align: center;\n\tletter-spacing : 5px;\n\tline-height: 1;\n\tdisplay: table-cell;\n\tvertical-align: middle;\n\ttext-shadow:'+textshadowStyle+';\n}';
	$('#html-code').text(html_code);
	$('#css-code').text(css_code1+css_code2);
});

$('#downloadimage').on('click',function(){
	
	var html = $('#dynamic-text').val();
	
	var if_icon = (html.indexOf("class=") > -1); // checking for if icon is exist in html
	
	if(if_icon == true){
		alert('Sorry font awesome icons cant be exported right now. If you want to help me to implement this please fork me!!');
		return false;
	}
	
	if(html=="")
		html = "Fs";
	var html_code = '<div class="box-shadow"><div class="text-shadow">'+html+'</div></div>';
	
	var box_width = $('#box').width();
	var box_height = $('#box').height();
	var box_radius = $('input[type=radio][name=bx-shape]:checked').val();
	var bg_color = $('#text-back-color').val();
	if(bg_color == ""){ bg_color = '#1A84CC'; }
	
	var css_code1 = '.box-shadow{width:'+box_width+'px;height:'+box_height+'px;overflow : hidden;display: table;margin: 0 auto;border-radius:'+box_radius+'px;background-color : '+bg_color+';}';
	
	
	var text_color = $('#font-color').val();
	if(text_color == "") { text_color = "#ffffff"; }
	var text_size = $('#fontsize').val();
	var font_weight = $('input[type=radio][name=fontweight]:checked').val();
	if(typeof (font_weight) == 'undefined')
		font_weight = "bold";
	
	var text_outline = $('#outline').prop('checked');
	if(text_outline == true){
		text_outline = "2px";
		text_color = $('#box').css('background-color');
	}else{
		text_outline = "0px";
	}	
	//text shadow gen //
	var color = $('#text-back-color').val();
	if(color == ""){
		color = boxBackColor;
	}
	
	var fade = $('#text-fade-flag').prop('checked');
	if(fade == true){
		fade = 1;
	}else{
		fade = 0;
	}
	var lenght = $('#text-shadow-length').val();
	var opacity = $('#text-opacity').val();
	var rotation = $('#text-rotation').val();
	var textshadowStyle = genShadow(color,lenght,fade,opacity,rotation);
	//textshadowStyle = textshadowStyle.replace(/ ,/g," ,\n\t");
	//end of shadow gen //
	
	var css_code2 = '.text-shadow{font-family: "Roboto", sans-serif;color: '+text_color+';font-size: '+text_size+'px;font-weight: '+font_weight+';-webkit-text-stroke: '+text_outline+' #FFFFFF;-moz-text-stroke: '+text_outline+' #FFFFFF;-o-text-stroke: '+text_outline+' #FFFFFF;-webkit-text-stroke: '+text_outline+' #FFFFFF;width: 100%;height: 100%;text-align: center;letter-spacing : 5px;line-height: 1;display: table-cell;vertical-align: middle;text-shadow:'+textshadowStyle+';}';
	$('#html-code').text(html_code);
	$('#css-code').text(css_code1+css_code2);
	
	
	var data = '<svg xmlns="http://www.w3.org/2000/svg" width="'+box_width+'" height="'+box_height+'">';
    data = data+'<foreignObject width="100%" height="100%">';
	data = data+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />';	
	data = data+'<style>body{margin: 0px;}'+css_code1+css_code2+'</style>';
	data = data+"<body xmlns='http://www.w3.org/1999/xhtml'>";
    data = data+''+html_code;
	data = data+"</body>";
    data = data+'</foreignObject>';
    data = data+'</svg>';
	
	
	var a      = document.createElement('a');
	a.href     = 'data:image/svg+xml;utf8,' + unescape(data);
	a.download = 'plot.svg';
	a.target   = '_blank';
	document.body.appendChild(a); 
	a.click(); 
	document.body.removeChild(a);
});

//// HTML2Canvas
$('#downloadimageAspng').on('click',function(e){
	html2canvas(
		document.querySelector("#box"),
		{
			'backgroundColor' : null
		}
	).then(canvas => {
		var data = canvas.toDataURL("image/png",1);
		var a      = document.createElement('a');
		a.href     = data;
		a.download = 'icon+.png';
		a.target   = '_blank';
		document.body.appendChild(a); 
		a.click(); 
		document.body.removeChild(a);
	});
});
