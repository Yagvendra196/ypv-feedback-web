(function($){
'use strict';
if(typeof _wpcf7=='undefined'||_wpcf7===null){
return;
}
_wpcf7=$.extend({
cached:0
}, _wpcf7);
$.fn.wpcf7InitForm=function(){
this.ajaxForm({
beforeSubmit:function(arr, $form, options){
$form.wpcf7ClearResponseOutput();
$form.find('[aria-invalid]').attr('aria-invalid', 'false');
$form.find('img.ajax-loader').css({ visibility:'visible' });
return true;
},
beforeSerialize:function($form, options){
$form.find('[placeholder].placeheld').each(function(i, n){
$(n).val('');
});
return true;
},
data:{ '_wpcf7_is_ajax_call':1 },
dataType:'json',
success:$.wpcf7AjaxSuccess,
error:function(xhr, status, error, $form){
var e=$('<div class="ajax-error"></div>').text(error.message);
$form.after(e);
}});
if(_wpcf7.cached){
this.wpcf7OnloadRefill();
}
this.wpcf7ToggleSubmit();
this.find('.wpcf7-submit').wpcf7AjaxLoader();
this.find('.wpcf7-acceptance').click(function(){
$(this).closest('form').wpcf7ToggleSubmit();
});
this.find('.wpcf7-exclusive-checkbox').wpcf7ExclusiveCheckbox();
this.find('.wpcf7-list-item.has-free-text').wpcf7ToggleCheckboxFreetext();
this.find('[placeholder]').wpcf7Placeholder();
if(_wpcf7.jqueryUi&&! _wpcf7.supportHtml5.date){
this.find('input.wpcf7-date[type="date"]').each(function(){
$(this).datepicker({
dateFormat:'yy-mm-dd',
minDate:new Date($(this).attr('min')),
maxDate:new Date($(this).attr('max'))
});
});
}
if(_wpcf7.jqueryUi&&! _wpcf7.supportHtml5.number){
this.find('input.wpcf7-number[type="number"]').each(function(){
$(this).spinner({
min:$(this).attr('min'),
max:$(this).attr('max'),
step:$(this).attr('step')
});
});
}
this.find('.wpcf7-character-count').wpcf7CharacterCount();
this.find('.wpcf7-validates-as-url').change(function(){
$(this).wpcf7NormalizeUrl();
});
this.find('.wpcf7-recaptcha').wpcf7Recaptcha();
};
$.wpcf7AjaxSuccess=function(data, status, xhr, $form){
if(! $.isPlainObject(data)||$.isEmptyObject(data)){
return;
}
var $responseOutput=$form.find('div.wpcf7-response-output');
$form.wpcf7ClearResponseOutput();
$form.find('.wpcf7-form-control').removeClass('wpcf7-not-valid');
$form.removeClass('invalid spam sent failed');
if(data.captcha){
$form.wpcf7RefillCaptcha(data.captcha);
}
if(data.quiz){
$form.wpcf7RefillQuiz(data.quiz);
}
if(data.invalids){
$.each(data.invalids, function(i, n){
$form.find(n.into).wpcf7NotValidTip(n.message);
$form.find(n.into).find('.wpcf7-form-control').addClass('wpcf7-not-valid');
$form.find(n.into).find('[aria-invalid]').attr('aria-invalid', 'true');
});
$responseOutput.addClass('wpcf7-validation-errors');
$form.addClass('invalid');
$(data.into).trigger('wpcf7:invalid');
$(data.into).trigger('invalid.wpcf7');
}else if(1==data.spam){
$form.find('[name="g-recaptcha-response"]').each(function(){
if(''==$(this).val()){
var $recaptcha=$(this).closest('.wpcf7-form-control-wrap');
$recaptcha.wpcf7NotValidTip(_wpcf7.recaptcha.messages.empty);
}});
$responseOutput.addClass('wpcf7-spam-blocked');
$form.addClass('spam');
$(data.into).trigger('wpcf7:spam');
$(data.into).trigger('spam.wpcf7');
}else if(1==data.mailSent){
$responseOutput.addClass('wpcf7-mail-sent-ok');
$form.addClass('sent');
if(data.onSentOk){
$.each(data.onSentOk, function(i, n){ eval(n) });
}
$(data.into).trigger('wpcf7:mailsent');
$(data.into).trigger('mailsent.wpcf7');
}else{
$responseOutput.addClass('wpcf7-mail-sent-ng');
$form.addClass('failed');
$(data.into).trigger('wpcf7:mailfailed');
$(data.into).trigger('mailfailed.wpcf7');
}
if(data.onSubmit){
$.each(data.onSubmit, function(i, n){ eval(n) });
}
$(data.into).trigger('wpcf7:submit');
$(data.into).trigger('submit.wpcf7');
if(1==data.mailSent){
$form.resetForm();
}
$form.find('[placeholder].placeheld').each(function(i, n){
$(n).val($(n).attr('placeholder'));
});
$responseOutput.append(data.message).slideDown('fast');
$responseOutput.attr('role', 'alert');
$.wpcf7UpdateScreenReaderResponse($form, data);
};
$.fn.wpcf7ExclusiveCheckbox=function(){
return this.find('input:checkbox').click(function(){
var name=$(this).attr('name');
$(this).closest('form').find('input:checkbox[name="' + name + '"]').not(this).prop('checked', false);
});
};
$.fn.wpcf7Placeholder=function(){
if(_wpcf7.supportHtml5.placeholder){
return this;
}
return this.each(function(){
$(this).val($(this).attr('placeholder'));
$(this).addClass('placeheld');
$(this).focus(function(){
if($(this).hasClass('placeheld'))
$(this).val('').removeClass('placeheld');
});
$(this).blur(function(){
if(''==$(this).val()){
$(this).val($(this).attr('placeholder'));
$(this).addClass('placeheld');
}});
});
};
$.fn.wpcf7AjaxLoader=function(){
return this.each(function(){
var loader=$('<img class="ajax-loader" />')
.attr({ src:_wpcf7.loaderUrl, alt:_wpcf7.sending })
.css('visibility', 'hidden');
$(this).after(loader);
});
};
$.fn.wpcf7ToggleSubmit=function(){
return this.each(function(){
var form=$(this);
if(this.tagName.toLowerCase()!='form'){
form=$(this).find('form').first();
}
if(form.hasClass('wpcf7-acceptance-as-validation')){
return;
}
var submit=form.find('input:submit');
if(! submit.length) return;
var acceptances=form.find('input:checkbox.wpcf7-acceptance');
if(! acceptances.length) return;
submit.removeAttr('disabled');
acceptances.each(function(i, n){
n=$(n);
if(n.hasClass('wpcf7-invert')&&n.is(':checked')
|| ! n.hasClass('wpcf7-invert')&&! n.is(':checked')){
submit.attr('disabled', 'disabled');
}});
});
};
$.fn.wpcf7ToggleCheckboxFreetext=function(){
return this.each(function(){
var $wrap=$(this).closest('.wpcf7-form-control');
if($(this).find(':checkbox,:radio').is(':checked')){
$(this).find(':input.wpcf7-free-text').prop('disabled', false);
}else{
$(this).find(':input.wpcf7-free-text').prop('disabled', true);
}
$wrap.find(':checkbox,:radio').change(function(){
var $cb=$('.has-free-text', $wrap).find(':checkbox,:radio');
var $freetext=$(':input.wpcf7-free-text', $wrap);
if($cb.is(':checked')){
$freetext.prop('disabled', false).focus();
}else{
$freetext.prop('disabled', true);
}});
});
};
$.fn.wpcf7CharacterCount=function(){
return this.each(function(){
var $count=$(this);
var name=$count.attr('data-target-name');
var down=$count.hasClass('down');
var starting=parseInt($count.attr('data-starting-value'), 10);
var maximum=parseInt($count.attr('data-maximum-value'), 10);
var minimum=parseInt($count.attr('data-minimum-value'), 10);
var updateCount=function($target){
var length=$target.val().length;
var count=down ? starting - length:length;
$count.attr('data-current-value', count);
$count.text(count);
if(maximum&&maximum < length){
$count.addClass('too-long');
}else{
$count.removeClass('too-long');
}
if(minimum&&length < minimum){
$count.addClass('too-short');
}else{
$count.removeClass('too-short');
}};
$count.closest('form').find(':input[name="' + name + '"]').each(function(){
updateCount($(this));
$(this).keyup(function(){
updateCount($(this));
});
});
});
};
$.fn.wpcf7NormalizeUrl=function(){
return this.each(function(){
var val=$.trim($(this).val());
if(val&&! val.match(/^[a-z][a-z0-9.+-]*:/i)){
val=val.replace(/^\/+/, '');
val='http://' + val;
}
$(this).val(val);
});
};
$.fn.wpcf7NotValidTip=function(message){
return this.each(function(){
var $into=$(this);
$into.find('span.wpcf7-not-valid-tip').remove();
$into.append('<span role="alert" class="wpcf7-not-valid-tip">' + message + '</span>');
if($into.is('.use-floating-validation-tip *')){
$('.wpcf7-not-valid-tip', $into).mouseover(function(){
$(this).wpcf7FadeOut();
});
$(':input', $into).focus(function(){
$('.wpcf7-not-valid-tip', $into).not(':hidden').wpcf7FadeOut();
});
}});
};
$.fn.wpcf7FadeOut=function(){
return this.each(function(){
$(this).animate({
opacity:0
}, 'fast', function(){
$(this).css({'z-index':-100});
});
});
};
$.fn.wpcf7OnloadRefill=function(){
return this.each(function(){
var url=$(this).attr('action');
if(0 < url.indexOf('#')){
url=url.substr(0, url.indexOf('#'));
}
var id=$(this).find('input[name="_wpcf7"]').val();
var unitTag=$(this).find('input[name="_wpcf7_unit_tag"]').val();
$.getJSON(url,
{ _wpcf7_is_ajax_call:1, _wpcf7:id, _wpcf7_request_ver:$.now() },
function(data){
if(data&&data.captcha){
$('#' + unitTag).wpcf7RefillCaptcha(data.captcha);
}
if(data&&data.quiz){
$('#' + unitTag).wpcf7RefillQuiz(data.quiz);
}}
);
});
};
$.fn.wpcf7RefillCaptcha=function(captcha){
return this.each(function(){
var form=$(this);
$.each(captcha, function(i, n){
form.find(':input[name="' + i + '"]').clearFields();
form.find('img.wpcf7-captcha-' + i).attr('src', n);
var match=/([0-9]+)\.(png|gif|jpeg)$/.exec(n);
form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
});
});
};
$.fn.wpcf7RefillQuiz=function(quiz){
return this.each(function(){
var form=$(this);
$.each(quiz, function(i, n){
form.find(':input[name="' + i + '"]').clearFields();
form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
});
});
};
$.fn.wpcf7ClearResponseOutput=function(){
return this.each(function(){
$(this).find('div.wpcf7-response-output').hide().empty().removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked').removeAttr('role');
$(this).find('span.wpcf7-not-valid-tip').remove();
$(this).find('img.ajax-loader').css({ visibility:'hidden' });
});
};
$.fn.wpcf7Recaptcha=function(){
return this.each(function(){
var events='wpcf7:spam wpcf7:mailsent wpcf7:mailfailed';
$(this).closest('div.wpcf7').on(events, function(e){
if(recaptchaWidgets&&grecaptcha){
$.each(recaptchaWidgets, function(index, value){
grecaptcha.reset(value);
});
}});
});
};
$.wpcf7UpdateScreenReaderResponse=function($form, data){
$('.wpcf7 .screen-reader-response').html('').attr('role', '');
if(data.message){
var $response=$form.siblings('.screen-reader-response').first();
$response.append(data.message);
if(data.invalids){
var $invalids=$('<ul></ul>');
$.each(data.invalids, function(i, n){
if(n.idref){
var $li=$('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
}else{
var $li=$('<li></li>').append(n.message);
}
$invalids.append($li);
});
$response.append($invalids);
}
$response.attr('role', 'alert').focus();
}};
$.wpcf7SupportHtml5=function(){
var features={};
var input=document.createElement('input');
features.placeholder='placeholder' in input;
var inputTypes=['email', 'url', 'tel', 'number', 'range', 'date'];
$.each(inputTypes, function(index, value){
input.setAttribute('type', value);
features[value]=input.type!=='text';
});
return features;
};
$(function(){
_wpcf7.supportHtml5=$.wpcf7SupportHtml5();
$('div.wpcf7 > form').wpcf7InitForm();
});
})(jQuery);
(function(c){function p(d,b,a){var e=this,l=d.add(this),h=d.find(a.tabs),i=b.jquery?b:d.children(b),j;h.length||(h=d.children());i.length||(i=d.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return e.click(n,g);if(f>n)return e.click(0,g)}if(!k.length){if(j>=0)return e;f=a.initialIndex;k=h.eq(f)}if(f===j)return e;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(e,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return e}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return e.click(j+1)},prev:function(){return e.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find('a[href^="#"]').unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(e).bind(g,a[g]);e[g]=function(k){k&&c(e).bind(g,k);return e}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){e.click(f,g);return g.preventDefault()})});i.find('a[href^="#"]').bind("click.T",function(f){e.click(c(this).attr("href"),f)});if(location.hash&&a.tabs=="a"&&d.find("[href="+location.hash+"]").length)e.click(location.hash);
else if(a.initialIndex===0||a.initialIndex>0)e.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.5"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,b){o[d]=b}};var o={"default":function(d,b){this.getPanes().hide().eq(d).show();b.call()},fade:function(d,b){var a=this.getConf(),e=a.fadeOutSpeed,l=this.getPanes();e?l.fadeOut(e):l.hide();l.eq(d).fadeIn(a.fadeInSpeed,b)},slide:function(d,
b){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,b)},ajax:function(d,b){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(d,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(d).animate({width:m},function(){c(this).show();b.call()})});c.fn.fpTabs=function(d,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b=
{onBeforeClick:b};b=c.extend({},c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),d,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);
(function(c){var a;a=c.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:false,autopause:true,interval:3000,clickable:true,api:false}};function b(k,i){var o=this,f=k.add(this),j=k.data("tabs"),e,d=true;function h(q){var p=c(q);return p.length<2?p:k.parent().find(q)}var n=h(i.next).click(function(){j.next()});var l=h(i.prev).click(function(){j.prev()});c.extend(o,{getTabs:function(){return j},getConf:function(){return i},play:function(){if(e){return o}var p=c.Event("onBeforePlay");f.trigger(p);if(p.isDefaultPrevented()){return o}m();d=false;f.trigger("onPlay");return o},pause:function(){if(!e){return o}var p=c.Event("onBeforePause");f.trigger(p);if(p.isDefaultPrevented()){return o}e=clearTimeout(e);f.trigger("onPause");return o},stop:function(){o.pause();d=true}});function m(){e=setTimeout(j.next,i.interval);j.onClick(function(p){if(p.originalEvent==null){e=clearTimeout(e);e=setTimeout(j.next,i.interval)}})}c.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(q,p){if(c.isFunction(i[p])){c(o).bind(p,i[p])}o[p]=function(r){return c(o).bind(p,r)}});if(i.autopause){j.getTabs().add(n).add(l).add(j.getPanes()).hover(o.pause,function(){if(!d){o.play()}})}if(i.autoplay){o.play()}if(i.clickable){j.getPanes().click(function(){j.next()})}if(!j.getConf().rotate){var g=i.disabledClass;if(!j.getIndex()){l.addClass(g)}j.onBeforeClick(function(q,p){l.toggleClass(g,!p);n.toggleClass(g,p==j.getTabs().length-1)})}}c.fn.slideshow=function(d){var e=this.data("slideshow");if(e){return e}d=c.extend({},a.conf,d);this.each(function(){e=new b(c(this),d);c(this).data("slideshow",e)});return d.api?e:this}})(jQuery);
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);
(function ($){
function getViewportHeight(){
var height=window.innerHeight;
var mode=document.compatMode;
if((mode||!$.support.boxModel)){
height=(mode=='CSS1Compat') ?
document.documentElement.clientHeight:
document.body.clientHeight;
}
return height;
}
$(window).scroll(function (){
var vpH=getViewportHeight(),
scrolltop=(document.documentElement.scrollTop ?
document.documentElement.scrollTop:
document.body.scrollTop),
elems=[];
$.each($.cache, function (){
if(this.events&&this.events.inview){
elems.push(this.handle.elem);
}});
if(elems.length){
$(elems).each(function (){
var $el=$(this),
top=$el.offset().top,
height=$el.height(),
inview=$el.data('inview')||false;
if(scrolltop > (top + height)||scrolltop + vpH < top){
if(inview){
$el.data('inview', false);
$el.trigger('inview', [ false ]);
}}else if(scrolltop < (top + height)){
if(!inview){
$el.data('inview', true);
$el.trigger('inview', [ true ]);
}}
});
}});
$(function (){
$(window).scroll();
});
})(jQuery);
(function(d){var p=function(b){return b.split("").reverse().join("")},l={numberStep:function(b,a){var e=Math.floor(b);d(a.elem).text(e)}},h=function(b){var a=b.elem;a.nodeType&&a.parentNode&&(a=a._animateNumberSetter,a||(a=l.numberStep),a(b.now,b))};d.Tween&&d.Tween.propHooks?d.Tween.propHooks.number={set:h}:d.fx.step.number=h;d.animateNumber={numberStepFactories:{append:function(b){return function(a,e){var k=Math.floor(a);d(e.elem).prop("number",a).text(k+b)}},separator:function(b,a){b=b||" ";a=
a||3;return function(e,k){var c=Math.floor(e).toString(),s=d(k.elem);if(c.length>a){for(var f=c,g=a,l=f.split("").reverse(),c=[],m,q,n,r=0,h=Math.ceil(f.length/g);r<h;r++){m="";for(n=0;n<g;n++){q=r*g+n;if(q===f.length)break;m+=l[q]}c.push(m)}f=c.length-1;g=p(c[f]);c[f]=p(parseInt(g,10).toString());c=c.join(b);c=p(c)}s.prop("number",e).text(c)}}}};d.fn.animateNumber=function(){for(var b=arguments[0],a=d.extend({},l,b),e=d(this),k=[a],c=1,h=arguments.length;c<h;c++)k.push(arguments[c]);if(b.numberStep){var f=
this.each(function(){this._animateNumberSetter=b.numberStep}),g=a.complete;a.complete=function(){f.each(function(){delete this._animateNumberSetter});g&&g.apply(this,arguments)}}return e.animate.apply(e,k)}})(jQuery);
(function($){
var defaultsettings={
'bgColor':'#ccc',
'fgColor':'red',
'size':160,
'donutwidth':40,
'textsize':16,
}
var methods={
init:function(options){
var initcanvas=true;
if(typeof(options)=="object"){
this.donutchartsettings=$.extend({}, defaultsettings, options);
if(options["size"]&&!options["donutwidth"])
this.donutchartsettings["donutwidth"]=options["size"]/4;
if(options["size"]&&!options["textsize"])
this.donutchartsettings["textsize"]=options["size"]/10;
}else{
if(typeof(this.donutchartsettings)=="object")
initcanvas=false;
else
this.donutchartsettings=defaultsettings;
}
if(initcanvas){
$(this).css("position","relative");
$(this).css("width",this.donutchartsettings.size+"px");
$(this).css("height",this.donutchartsettings.size+"px");
$(this).html("<canvas width='"+this.donutchartsettings.size+"' height='"+this.donutchartsettings.size+"'></canvas><div class='donutchart-text' style='position:absolute;top:0;left:0;line-height:"+this.donutchartsettings.size+"px;text-align:center;width:"+this.donutchartsettings.size+"px;font-weight:bold;font-size:"+this.donutchartsettings.textsize+"px;font-weight:bold;'></div>");
var canvas=$("canvas",this).get(0);
if(typeof(G_vmlCanvasManager)!="undefined")
G_vmlCanvasManager.initElement(canvas);
var ctx=canvas.getContext('2d');
methods.drawBg.call(ctx, this.donutchartsettings);
}},
drawBg:function(settings){
this.clearRect(0,0,settings.size,settings.size);
this.beginPath();
this.fillStyle=settings.bgColor;
this.arc(settings.size/2,settings.size/2,settings.size/2,0,2*Math.PI,false);
this.arc(settings.size/2,settings.size/2,settings.size/2-settings.donutwidth,0,2*Math.PI,true);
this.fill();
},
drawFg:function(settings,percent){
var ratio=percent/100 * 360;
var startAngle=Math.PI*-90/180;
var endAngle=Math.PI*(-90+ratio)/180;
this.beginPath();
this.fillStyle=settings.fgColor;
this.arc(settings.size/2,settings.size/2,settings.size/2,startAngle,endAngle,false);
this.arc(settings.size/2,settings.size/2,settings.size/2-settings.donutwidth,endAngle,startAngle,true);
this.fill();
},
};
$.fn.donutchart=function(method){
return this.each(function(){
methods.init.call(this, method);
if(method=="animate"){
var percentage=$(this).attr("data-percent");
var canvas=$(this).children("canvas").get(0);
var percenttext=$(this).children("div");
var dcs=this.donutchartsettings;
if(canvas.getContext){
var ctx=canvas.getContext('2d');
var j=0;
function animateDonutChart(){
j++;
methods.drawBg.call(ctx,dcs);
methods.drawFg.apply(ctx,[dcs,j]);
percenttext.text(j+"%");
if(j >=percentage)
clearInterval(animationID);
}
var animationID=setInterval(animateDonutChart,20);
}}
})
}})(jQuery);
jQuery(document).ready(function($){
"use strict";
$('.dt-sc-counter').each(function(){
var $posttext=$(this).find('.dt-sc-counter-number').attr('data-append');
var $append='';
if(typeof $posttext==="undefined"){
$append=$.animateNumber.numberStepFactories.append('');
}else{
$append=$.animateNumber.numberStepFactories.append($posttext);
}
$(this).one('inview', function (event, visible){
if(visible===true){
var val=$(this).find('.dt-sc-counter-number').attr('data-value');
$(this).find('.dt-sc-counter-number').animateNumber({ number:val, numberStep:$append }, 2000);
}});
});
$('.dt-sc-toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
$('.dt-sc-toggle').click(function(){ $(this).next('.dt-sc-toggle-content').slideToggle(); });
$('.dt-sc-toggle-frame-set').each(function(){
var $this=$(this),
$toggle=$this.find('.dt-sc-toggle-accordion');
$toggle.click(function(){
if($(this).next().is(':hidden')){
$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
$(this).toggleClass('active').next().slideDown();
}
return false;
});
$this.find('.dt-sc-toggle-accordion:first').addClass("active");
$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
});
if($(".dt-sc-tooltip-bottom").length){
$(".dt-sc-tooltip-bottom").each(function(){	$(this).tipTip({maxWidth:"auto"});});
}
if($(".dt-sc-tooltip-top").length){
$(".dt-sc-tooltip-top").each(function(){ $(this).tipTip({maxWidth:"auto",defaultPosition:"top"});});
}
if($(".dt-sc-tooltip-left").length){
$(".dt-sc-tooltip-left").each(function(){ $(this).tipTip({maxWidth:"auto",defaultPosition:"left"});});
}
if($(".dt-sc-tooltip-right").length){
$(".dt-sc-tooltip-right").each(function(){ $(this).tipTip({maxWidth:"auto",defaultPosition:"right"});});
}
if($('ul.dt-sc-tabs-horizontal').length > 0){
$('ul.dt-sc-tabs-horizontal').each(function(){
$(this).fpTabs('> .dt-sc-tabs-horizontal-content', {
effect:'fade'
});
});
}
if($('ul.dt-sc-tabs-horizontal-frame').length > 0){
$('ul.dt-sc-tabs-horizontal-frame').each(function(){
if($(this).parent('.dt-sc-tabs-horizontal-frame-container').hasClass('type6')){
$(this).fpTabs('> .dt-sc-tabs-horizontal-frame-content', {
effect:'fade',
tabs:'li'
});
}else{
$(this).fpTabs('> .dt-sc-tabs-horizontal-frame-content', {
effect:'fade'
});
}});
}
if($('ul.dt-sc-tabs-vertical').length > 0){
$('ul.dt-sc-tabs-vertical').each(function(){
$(this).fpTabs('> .dt-sc-tabs-vertical-content', {
effect:'fade'
});
});
$('.dt-sc-tabs-vertical').each(function(){
$(this).find("li:first").addClass('first').addClass('current');
$(this).find("li:last").addClass('last');
});
$('.dt-sc-tabs-vertical li').click(function(){
$(this).parent().children().removeClass('current');
$(this).addClass('current');
});
}
if($('ul.dt-sc-tabs-vertical-frame').length > 0){
$('ul.dt-sc-tabs-vertical-frame').each(function(){
$(this).fpTabs('> .dt-sc-tabs-vertical-frame-content', {
effect:'fade'
});
});
$('.dt-sc-tabs-vertical-frame').each(function(){
$(this).find("li:first").addClass('first').addClass('current');
$(this).find("li:last").addClass('last');
});
$('.dt-sc-tabs-vertical-frame li').click(function(){
$(this).parent().children().removeClass('current');
$(this).addClass('current');
});
}
$('.dt-sc-subscribe-frm').each(function(){
$(this).submit(function(){
var This=$(this);
var $data="";
var $name=$(this).find('input[name=mc_name]').val();
var $email=$(this).find('input[name=mc_email]').val();
var $listid=$(this).find('input[name=mc_listid]').val();
$.ajax({
type:"post",
dataType:"html",
url:dttheme_urls.ajaxurl,
data:{ action:"dt_ajax_mc_subscribe", mc_name:$name, mc_email:$email, mc_listid:$listid },
success:function (data){
$data=$(data);
if($data.length > 0){
This.next('.dt_ajax_subscribe_msg').html($data);
}},
error:function (jqXHR, textStatus, errorThrown){
This.next('.dt_ajax_subscribe_msg').html('Page load faild.');
}});
return false;
});
});
$(window).load(function(){
if($(".carousel_items").length){
$(".carousel_items .dt-sc-testimonial-carousel").each(function(){
var $prev=$(this).parents(".carousel_items").find(".testimonial-prev");
var $next=$(this).parents(".carousel_items").find(".testimonial-next");
var $anim=$(this).parents(".carousel_items").attr("data-animation");
$(this).carouFredSel({
responsive:true,
auto:false,
width:'100%',
prev:$prev,
next:$next,
height:'variable',
scroll:{ easing:"linear", duration:500, fx:$anim },
items:{ width:1170, height:'variable',  visible:{ min:1, max:1 }}
});
});
}
if($(".dt-sc-partners-carousel").length){
$(".dt-sc-partners-carousel").each(function(){
var $prev=$(this).parents(".dt-sc-partners-carousel-wrapper").find(".partners-prev");
var $next=$(this).parents(".dt-sc-partners-carousel-wrapper").find(".partners-next");
var $scroll=$(this).parents(".dt-sc-partners-carousel-wrapper").attr('data-scroll');
var $visible=$(this).parents(".dt-sc-partners-carousel-wrapper").attr('data-visible');
$(this).carouFredSel({
responsive:true,
auto:false,
width:'100%',
height:'variable',
prev:$prev,
next:$next,
scroll:parseInt($scroll),
items:{
visible:{
min:parseInt($visible)
}}
});
});
}
if($(".dt-sc-images-carousel").length){
$(".dt-sc-images-carousel").each(function(){
var $prev=$(this).parents(".dt-sc-images-wrapper").find(".images-prev");
var $next=$(this).parents(".dt-sc-images-wrapper").find(".images-next");
$(this).carouFredSel({
responsive:true,
auto:false,
width:'100%',
height:'variable',
prev:$prev,
next:$next,
scroll:1,
items:{
width:570,
height:'variable',
visible:{ min:1, max:1 }}
});
});
}
if($('.dt-sc-twitter-carousel-wrapper').length > 0){
$('.dt-sc-twitter-carousel-wrapper .dt-sc-twitter-carousel').carouFredSel({
width:'auto',
height:'auto',
scroll:1,
direction:'up',
items:{
height:'auto',
visible:{ min:1, max:1 }}
});
}
if($('.dt-sc-testimonial-special-wrapper').length > 0){
$('.dt-sc-testimonial-special-wrapper .dt-sc-testimonial-special').carouFredSel({
responsive:true,
auto:false,
width:'100%',
pagination:{
container:".dt-sc-testimonial-images",
anchorBuilder:false
},
height:'auto',
scroll:{ fx:"crossfade" },
items:{ start:3, visible:{ min:1, max:1 }}
});
}
$(".dt-sc-donutchart").each(function(){
var $this=$(this);
var $bgColor=($this.data("bgcolor")!==undefined) ? $this.data("bgcolor"):"#5D18D6";
var $fgColor=($this.data("fgcolor")!==undefined) ? $this.data("fgcolor"):"#000000";
var $size=($this.data("size")!==undefined) ? $this.data("size"):"100";
$this.donutchart({'size':$size, 'fgColor':$fgColor, 'bgColor':$bgColor , 'donutwidth':5 });
$this.donutchart('animate');
});
});
if($(".dt-sc-parallax-section").length){
$('.dt-sc-parallax-section').each(function(){
$(this).bind('inview', function (event, visible){
if(visible===true){
$(this).parallax("50%", 0.5);
}else{
$(this).css('background-position', '');
}});
});
}
$('form[name="frmbmi"]').submit(function(){
var This=$(this);
var fet=This.find('input[name="txtfeet"]').val();
var inc=This.find('input[name="txtinches"]').val();
var tinc=(parseInt(fet) * 12) + parseInt(inc);
var lbs=This.find('input[name="txtlbs"]').val();
var bmi=(parseFloat(lbs) / (tinc * tinc)) * 703;
This.find('input[name="txtbmi"]').val(parseFloat(bmi).toFixed(1));
return false;
});
if($('.fancyInline').length > 0){
var str=$('.fancyInline').attr('href');
str=str.substr(0, 4);
if(str!=='http'){
$('.fancyInline').fancybox({
scrolling:'no',
width:'auto',
height:'auto'
});
}}
if($(".dt-sc-video-wrapper").length){
if($(".dt-sc-video-item").length){
$(".dt-sc-video-item").each(function(){
$(this).click(function(){
$('.video-overlay-inner a').attr('href', $(this).attr('data-link'));
$('.dt-sc-video-wrapper img').attr('src', $(this).find('.dt-sc-vitem-thumb img').attr('data-full'));
$('.video-overlay-inner h2').html($(this).find('h2').html());
$('.video-overlay-inner p').html($(this).find('p').html());
$(this).parent('div').children().removeClass('active');
$(this).addClass('active');
});
});
}
$(".video-overlay-inner a").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow:false,social_tools:false,deeplinking:false});
var video_scroll=$(".dt-sc-video-manager-right").niceScroll({ cursorcolor:"#ffffff", cursorwidth:"2px"});
video_scroll.rail.addClass('dt-sc-skin');
}
$('.dt-sc-infinite-portfolio-load-more').each(function(){
var $this=$(this),
$x=$(this).prev('.dt-sc-infinite-portfolio-container').data('paged'),
$xstyle=$(this).data('style');
if($xstyle=='lazy'){
$(window).scroll(function(){
if($(window).scrollTop()==$(document).height() - $(window).height()){
var $per_page=$this.data('per-page'),
$term=$this.data('term'),
$style=$this.data('style'),
$paged=$x,
$prev=$this.prev();
$x++;
$.ajax({
type:"post",
dataType:"html",
url:dttheme_urls.ajaxurl,
data:{ action:"dt_ajax_infinite_portfolios", per_page:$per_page, term:$term, style:$style , paged:$paged },
success:function (data){
if(data.length > 0){
$prev.append(data);
}else{
$prev.find(".message").removeClass("hidden");
setTimeout(function(){
$prev.find(".message").addClass('hidden');
$this.addClass('disable');
}, 5000);
}},
error:function (jqXHR, textStatus, errorThrown){
}});
}});
}else if($xstyle=='load-more'){
$this.click(function(e){
e.preventDefault();
var $per_page=$(this).data('per-page'),
$term=$(this).data('term'),
$style=$(this).data('style'),
$paged=$x,
$prev=$(this).prev();
$x++;
$.ajax({
type:"post",
dataType:"html",
url:dttheme_urls.ajaxurl,
data:{ action:"dt_ajax_infinite_portfolios", per_page:$per_page, term:$term, style:$style , paged:$paged },
success:function (data){
if(data.length > 0){
$prev.append(data);
}else{
$prev.find(".message").removeClass("hidden");
setTimeout(function(){
$prev.find(".message").addClass('hidden');
$this.addClass('disable');
}, 5000);
}},
error:function (jqXHR, textStatus, errorThrown){
}});
});
}});
});
(function($){
$(".dt-sc-progress").one('inview', function (event, visible){
var $this=$(this),
pvalue=$this.find('.dt-sc-bar').attr('data-value');
if(visible==true){
$this.find('.dt-sc-bar').animate({width:pvalue + "%"},600,function(){ $this.find('.dt-sc-bar-text').fadeIn(400); });
}});
})(jQuery);
!function(){"use strict";function a(a){function b(b,d){var f,p,q=b==window,r=d&&void 0!==d.message?d.message:void 0;if(d=a.extend({},a.blockUI.defaults,d||{}),!d.ignoreIfBlocked||!a(b).data("blockUI.isBlocked")){if(d.overlayCSS=a.extend({},a.blockUI.defaults.overlayCSS,d.overlayCSS||{}),f=a.extend({},a.blockUI.defaults.css,d.css||{}),d.onOverlayClick&&(d.overlayCSS.cursor="pointer"),p=a.extend({},a.blockUI.defaults.themedCSS,d.themedCSS||{}),r=void 0===r?d.message:r,q&&n&&c(window,{fadeOut:0}),r&&"string"!=typeof r&&(r.parentNode||r.jquery)){var s=r.jquery?r[0]:r,t={};a(b).data("blockUI.history",t),t.el=s,t.parent=s.parentNode,t.display=s.style.display,t.position=s.style.position,t.parent&&t.parent.removeChild(s)}a(b).data("blockUI.onUnblock",d.onUnblock);var u,v,w,x,y=d.baseZ;u=a(k||d.forceIframe?'<iframe class="blockUI" style="z-index:'+y++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+d.iframeSrc+'"></iframe>':'<div class="blockUI" style="display:none"></div>'),v=a(d.theme?'<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+y++ +';display:none"></div>':'<div class="blockUI blockOverlay" style="z-index:'+y++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),d.theme&&q?(x='<div class="blockUI '+d.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(y+10)+';display:none;position:fixed">',d.title&&(x+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(d.title||"&nbsp;")+"</div>"),x+='<div class="ui-widget-content ui-dialog-content"></div>',x+="</div>"):d.theme?(x='<div class="blockUI '+d.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(y+10)+';display:none;position:absolute">',d.title&&(x+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(d.title||"&nbsp;")+"</div>"),x+='<div class="ui-widget-content ui-dialog-content"></div>',x+="</div>"):x=q?'<div class="blockUI '+d.blockMsgClass+' blockPage" style="z-index:'+(y+10)+';display:none;position:fixed"></div>':'<div class="blockUI '+d.blockMsgClass+' blockElement" style="z-index:'+(y+10)+';display:none;position:absolute"></div>',w=a(x),r&&(d.theme?(w.css(p),w.addClass("ui-widget-content")):w.css(f)),d.theme||v.css(d.overlayCSS),v.css("position",q?"fixed":"absolute"),(k||d.forceIframe)&&u.css("opacity",0);var z=[u,v,w],A=a(q?"body":b);a.each(z,function(){this.appendTo(A)}),d.theme&&d.draggable&&a.fn.draggable&&w.draggable({handle:".ui-dialog-titlebar",cancel:"li"});var B=m&&(!a.support.boxModel||a("object,embed",q?null:b).length>0);if(l||B){if(q&&d.allowBodyStretch&&a.support.boxModel&&a("html,body").css("height","100%"),(l||!a.support.boxModel)&&!q)var C=i(b,"borderTopWidth"),D=i(b,"borderLeftWidth"),E=C?"(0 - "+C+")":0,F=D?"(0 - "+D+")":0;a.each(z,function(a,b){var c=b[0].style;if(c.position="absolute",a<2)q?c.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+d.quirksmodeOffsetHack+') + "px"'):c.setExpression("height",'this.parentNode.offsetHeight + "px"'),q?c.setExpression("width",'jQuery.support.boxModel&&document.documentElement.clientWidth||document.body.clientWidth + "px"'):c.setExpression("width",'this.parentNode.offsetWidth + "px"'),F&&c.setExpression("left",F),E&&c.setExpression("top",E);else if(d.centerY)q&&c.setExpression("top",'(document.documentElement.clientHeight||document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah=document.documentElement.scrollTop ? document.documentElement.scrollTop:document.body.scrollTop) + "px"'),c.marginTop=0;else if(!d.centerY&&q){var e=d.css&&d.css.top?parseInt(d.css.top,10):0,f="((document.documentElement.scrollTop ? document.documentElement.scrollTop:document.body.scrollTop) + "+e+') + "px"';c.setExpression("top",f)}})}if(r&&(d.theme?w.find(".ui-widget-content").append(r):w.append(r),(r.jquery||r.nodeType)&&a(r).show()),(k||d.forceIframe)&&d.showOverlay&&u.show(),d.fadeIn){var G=d.onBlock?d.onBlock:j,H=d.showOverlay&&!r?G:j,I=r?G:j;d.showOverlay&&v._fadeIn(d.fadeIn,H),r&&w._fadeIn(d.fadeIn,I)}else d.showOverlay&&v.show(),r&&w.show(),d.onBlock&&d.onBlock.bind(w)();if(e(1,b,d),q?(n=w[0],o=a(d.focusableElements,n),d.focusInput&&setTimeout(g,20)):h(w[0],d.centerX,d.centerY),d.timeout){var J=setTimeout(function(){q?a.unblockUI(d):a(b).unblock(d)},d.timeout);a(b).data("blockUI.timeout",J)}}}function c(b,c){var f,g=b==window,h=a(b),i=h.data("blockUI.history"),j=h.data("blockUI.timeout");j&&(clearTimeout(j),h.removeData("blockUI.timeout")),c=a.extend({},a.blockUI.defaults,c||{}),e(0,b,c),null===c.onUnblock&&(c.onUnblock=h.data("blockUI.onUnblock"),h.removeData("blockUI.onUnblock"));var k;k=g?a(document.body).children().filter(".blockUI").add("body > .blockUI"):h.find(">.blockUI"),c.cursorReset&&(k.length>1&&(k[1].style.cursor=c.cursorReset),k.length>2&&(k[2].style.cursor=c.cursorReset)),g&&(n=o=null),c.fadeOut?(f=k.length,k.stop().fadeOut(c.fadeOut,function(){0===--f&&d(k,i,c,b)})):d(k,i,c,b)}function d(b,c,d,e){var f=a(e);if(!f.data("blockUI.isBlocked")){b.each(function(a,b){this.parentNode&&this.parentNode.removeChild(this)}),c&&c.el&&(c.el.style.display=c.display,c.el.style.position=c.position,c.el.style.cursor="default",c.parent&&c.parent.appendChild(c.el),f.removeData("blockUI.history")),f.data("blockUI.static")&&f.css("position","static"),"function"==typeof d.onUnblock&&d.onUnblock(e,d);var g=a(document.body),h=g.width(),i=g[0].style.width;g.width(h-1).width(h),g[0].style.width=i}}function e(b,c,d){var e=c==window,g=a(c);if((b||(!e||n)&&(e||g.data("blockUI.isBlocked")))&&(g.data("blockUI.isBlocked",b),e&&d.bindEvents&&(!b||d.showOverlay))){var h="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";b?a(document).bind(h,d,f):a(document).unbind(h,f)}}function f(b){if("keydown"===b.type&&b.keyCode&&9==b.keyCode&&n&&b.data.constrainTabKey){var c=o,d=!b.shiftKey&&b.target===c[c.length-1],e=b.shiftKey&&b.target===c[0];if(d||e)return setTimeout(function(){g(e)},10),!1}var f=b.data,h=a(b.target);return h.hasClass("blockOverlay")&&f.onOverlayClick&&f.onOverlayClick(b),h.parents("div."+f.blockMsgClass).length>0||0===h.parents().children().filter("div.blockUI").length}function g(a){if(o){var b=o[a===!0?o.length-1:0];b&&b.focus()}}function h(a,b,c){var d=a.parentNode,e=a.style,f=(d.offsetWidth-a.offsetWidth)/2-i(d,"borderLeftWidth"),g=(d.offsetHeight-a.offsetHeight)/2-i(d,"borderTopWidth");b&&(e.left=f>0?f+"px":"0"),c&&(e.top=g>0?g+"px":"0")}function i(b,c){return parseInt(a.css(b,c),10)||0}a.fn._fadeIn=a.fn.fadeIn;var j=a.noop||function(){},k=/MSIE/.test(navigator.userAgent),l=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent),m=(document.documentMode||0,a.isFunction(document.createElement("div").style.setExpression));a.blockUI=function(a){b(window,a)},a.unblockUI=function(a){c(window,a)},a.growlUI=function(b,c,d,e){var f=a('<div class="growlUI"></div>');b&&f.append("<h1>"+b+"</h1>"),c&&f.append("<h2>"+c+"</h2>"),void 0===d&&(d=3e3);var g=function(b){b=b||{},a.blockUI({message:f,fadeIn:"undefined"!=typeof b.fadeIn?b.fadeIn:700,fadeOut:"undefined"!=typeof b.fadeOut?b.fadeOut:1e3,timeout:"undefined"!=typeof b.timeout?b.timeout:d,centerY:!1,showOverlay:!1,onUnblock:e,css:a.blockUI.defaults.growlCSS})};g();f.css("opacity");f.mouseover(function(){g({fadeIn:0,timeout:3e4});var b=a(".blockMsg");b.stop(),b.fadeTo(300,1)}).mouseout(function(){a(".blockMsg").fadeOut(1e3)})},a.fn.block=function(c){if(this[0]===window)return a.blockUI(c),this;var d=a.extend({},a.blockUI.defaults,c||{});return this.each(function(){var b=a(this);d.ignoreIfBlocked&&b.data("blockUI.isBlocked")||b.unblock({fadeOut:0})}),this.each(function(){"static"==a.css(this,"position")&&(this.style.position="relative",a(this).data("blockUI.static",!0)),this.style.zoom=1,b(this,c)})},a.fn.unblock=function(b){return this[0]===window?(a.unblockUI(b),this):this.each(function(){c(this,b)})},a.blockUI.version=2.7,a.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:!0,theme:!1,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:!1,baseZ:1e3,centerX:!0,centerY:!0,allowBodyStretch:!0,bindEvents:!0,constrainTabKey:!0,fadeIn:200,fadeOut:400,timeout:0,showOverlay:!0,focusInput:!0,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:!1};var n=null,o=[]}"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],a):a(jQuery)}();