/*---------------------------------------

	ローカルナビ

--------------------------------------- */
var LocalNav = function(parent) {
	var _parent = parent;
	var _nav = '';

	this.constructor = function() {
		_parent = $('.main', _parent);
		_nav = $('.localNav', _parent);
	}

	this.getLimit = function() {
		return this.getTop() + _parent.height() - _nav.height();
	}

	this.follow = function() {
		_nav.css('top', $(window).scrollTop() - this.getTop() + 'px');
	}

	this.initial = function() {
		_nav.css('top', 0 + 'px');
	}

	this.getTop = function() {
		return _parent.offset().top;
	}

	this.getHeight = function() {
		return _nav.height();
	}

	this.scroll = function() {
		if ($(window).scrollTop() > this.getTop() && $(window).scrollTop() < this.getLimit()) {
			this.follow();
		}
		else if ($(window).scrollTop() <= this.getTop()) {
			this.initial();
		}

		_nav.find('a').each(function(){
			var href = $(this).attr('href');
			if ($(window).scrollTop() >= $(this).offset().top - 2 && $(window).scrollTop() < $(this).offset().top + $(this).height() - 2) {
				$(this).closest('li').addClass('current');
			}
			else {
				$(this).closest('li').removeClass('current');
			}
		});
	}
};

/*---------------------------------------

	メニュー

--------------------------------------- */
var Menu = function() {
	var _top = 0;
	var _nav = '';
	var _menu = '';
	var _class = 'follow';
	var _layer = '';
	var _pagetop = '';

	this.constructor = function() {
		_nav = $('#globalNav');
		_menu = $('.menu', _nav);
		_pagetop = $('.pageTop');
		_layer = $('#overlay');
		_layer.height($(document).height());
		var close = new Image();
		close.src = this.getCloseSrc();
		_pagetop.hide();
		_nav.hide();
		$('nav', _nav).hide();
		_layer.hide();
		this.setTop();
	}

	this.getCloseSrc = function() {
		var img = _menu.find('img').attr('src');
		var src = img.replace('.png', '_close.png');
		return src;
	}

	this.show = function() {
		_menu.find('img').attr('src', this.getCloseSrc());
		$('nav', _nav).fadeIn();
		_layer.fadeIn();
	}

	this.hidden = function() {
		var img = _menu.find('img').attr('src');
		var src = img.replace('_close', '');
		_menu.find('img').attr('src', src);
		$('nav', _nav).fadeOut();
		_layer.fadeOut();
	}

	this.getDisplay = function() {
		return $('nav', _nav).css('display');
	}

	this.addClass = function() {
		_nav.addClass(_class);
	}

	this.removeClass = function() {
		_nav.removeClass(_class);
	}

	this.setTop = function() {
		_top = $('#visual').height();
	}

	this.getTop = function() {
		return _top;
	}

	this.scroll = function() {
		if ($(window).scrollTop() > this.getTop()) {
			_nav.fadeIn();
			_pagetop.fadeIn();
		}
		else {
			_nav.fadeOut();
			_pagetop.fadeOut();
			this.hidden();
		}
	}
};

/*---------------------------------------

	twitter

--------------------------------------- */
var Twitter = function() {
	var _twitter = '';
	this.constructor = function() {
		_twitter = $('.twitter');
		_twitter.css('opacity', '0.5');
		this.setEvent();
	}

	this.setEvent = function() {
		_twitter.hover(function(){
			_twitter.stop().animate({opacity: 1}, 'fast');
		},function(){
			_twitter.stop().animate({opacity: 0.5}, 'fast');
		});
	}
}


/*---------------------------------------

	スペシャルの最後の
	sectionにpadding設定

--------------------------------------- */
function setLastPadding() {
	var last = $('section:last');

	if (last.length == 0) return;
	if (last.offset().top >= $(document).height() - $(window).height()) {
		var padding = $(window).height() - last.height() - $('footer').outerHeight();
		last.css('padding-bottom', padding + 'px');
	}
}

/*---------------------------------------

	パララックス

--------------------------------------- */
function parallax() {
	var userAgent = window.navigator.userAgent.toLowerCase();
	var appVersion = window.navigator.appVersion.toLowerCase();
	if (userAgent.indexOf('msie') != -1) {
		if (appVersion.indexOf('msie 6.') != -1) {
			return;
		}
		else if (appVersion.indexOf('msie 7.') != -1) {
			return;
		}
		else if (appVersion.indexOf('msie 8.') != -1) {
			return;
		}
	}
	else if (userAgent.indexOf('iphone') != -1) {
		return;
	}
	else if (userAgent.indexOf('ipad') != -1) {
		return;
	}
	else if (userAgent.indexOf('ipod') != -1) {
		return;
	}
	else if (userAgent.indexOf('android') != -1) {
		return;
	}


	$('#character section').each(function(){
		var scrollTop = $(window).scrollTop();
		var position = $(this).offset().top;
		var offset = 400;

		//opacity
		if (scrollTop >= position - offset) {
			var top = Math.floor(scrollTop - position + offset) / 200;
			$(this).css({'opacity': top});
		}
		else {
			$(this).css({'opacity': '0'});
		}

		//margin
		if (scrollTop >= position - offset) {
			var top = Math.floor(scrollTop - position + offset);
			var left = -200 + Math.floor(top);
			if (left < 0) {
				$(this).css({'margin-left': left + 'px'});
			}
			else {
				$(this).css({'margin-left': '0'});
			}
		}
		else {
			$(this).css({'margin-left': -200 + 'px'});
		}
	});
}

//new
var twitter = new Twitter();
var menu = new Menu();

var url = {};
url.full = window.location.href;
url.isSubdir = ( url.full.search(/\/movie/) != -1 || url.full.search(/\/goods/) != -1 || url.full.search(/\/special/) != -1);

if ( !url.isSubdir ) {
	var systemNav		= new LocalNav('#system');
	var characterNav	= new LocalNav('#character');
	var productNav		= new LocalNav('#product');
	var specialNav		= new LocalNav('#special');

} else {
	var localNav		= new LocalNav('#local');
}


$(document).ready(function(){

	if ( !url.isSubdir ) {

		//コンストラクタ
		menu.constructor();

		systemNav.constructor();
		characterNav.constructor();
		productNav.constructor();
		twitter.constructor();
		specialNav.constructor();

		//メニュー
		menu.scroll();

		//ローカルナビ
		systemNav.scroll();
		characterNav.scroll();
		productNav.scroll();
		specialNav.scroll();

	} else {
		localNav.constructor();
		localNav.scroll();

	}

	//スムーススクロール
	$('a[href^=#]').on('click', function(){
		var speed = 500;
		var href= $(this).attr('href');
		if ($(this).hasClass('nosmoothscroll')) return false;
		if ($(href).length == 0) return false;
		var position = $(href).offset().top;
		var limit = $(document).height() - $(window).height();
		if (position <= 0) {
			position = 0;
		}
		else if (position >= limit) {
			position = limit;
		}
		$('html, body').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

	//メニュー
	$('#globalNav .menu, #overlay').on('click', function(){
		if (menu.getDisplay() == 'none') {
			menu.show();
		}
		else {
			menu.hidden();
		}
	});


	//more
	$('#webupdate .button a').click(function(){
		var button = $(this).closest('.button');
		var img = button.find('img');
		var src = img.attr('src');
		var on = src.replace('_off', '_on');
		var off = src.replace('_on', '_off');

		var more = button.prev('.news').find('.more');
		if (more.css('display') == 'block') {
			img.attr('src', off);
			more.slideUp();
		}
		else {
			img.attr('src', on);
			more.slideDown();
		}
	});


	//lightbox
	$('#contents section').each(function(){
		var id = '#' + $(this).attr('id');
		wkDir = ( url.isSubdir ) ? "." : "" ;

		$(id + ' .lightbox').lightBox({
			imageLoading			: wkDir + './lightbox/images/lightbox-ico-loading.gif',
			imageBtnClose			: wkDir + './lightbox/images/lightbox-btn-close.gif',
			imageBtnPrev			: wkDir + './lightbox/images/lightbox-btn-prev.gif',
			imageBtnNext			: wkDir + './lightbox/images/lightbox-btn-next.gif',
			imageBlank				: wkDir + './lightbox/images/lightbox-blank.gif',
		});
	});

	//layzr（img|iframe 遅延ロード）
	var layzr = new Layzr();

});

$(window).scroll(function(){
	if ( !url.isSubdir ) {
		//メニュー
		menu.scroll();

		//ローカルナビ
		systemNav.scroll();
		characterNav.scroll();
		productNav.scroll();
		specialNav.scroll();

	} else {
		localNav.scroll();
	}

	//パララックス
	parallax();

	setLastPadding();
});


$(window).load(function(){

});

$(window).resize(function(){
	setLastPadding();
});


