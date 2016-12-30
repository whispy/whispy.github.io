function resetDivs() {  // resets certain divs to their default states.
	console.log('resetDivs');
	panel.removeClass("panelSidebar");
	panel.addClass("resetDiv");
	workDisplay.addClass("resetDiv");
	content.removeClass("marginTop0");
	$('.panel .content').removeClass("contentSidebar");
	$('.heroImage').removeClass('heroSidebar');
	$('.articleYears').removeClass('yearsSidebar');
}; // resetDivs end

function showDivs() { // shows certain divs.
	headerWrapper.removeClass("headerCenter");
	panel.removeClass("resetDiv");
	$('div#indexPanel').removeAttr('id');
   	panel.addClass("showDiv");
}; //showDivs end

function fancyNav(curr_url) {
	console.log(curr_url + ' in fancyNav')
	bindListeners(curr_url); // call the function 'bindListeners' with the variable 'menuItems'

	function bindListeners() {
		console.log('bindListeners ' + curr_url);
		if (curr_url === '/about.html') {
			console.log('about');
			resetDivs();
			panel.removeClass("resetDiv");
		}

		else {
			go_to_index(curr_url);
		}	
	} //bindListeners end
}; // fancyNav end

function go_to_index(curr_url) {
	console.log('go_to_index');
	index_thumbs_container.addClass("hide");

	if (width >= 778) {
		console.log('headerLeft');
		console.log('width ' + curr_url);
		$('#headerWrapper').addClass('headerLeft');
		$('.selfie-text').addClass('hide');
		$('#headerWrapper').addClass('selfie-top');
		$('nav').addClass('nav-left');
		console.log('width > 778');
		fancyWork(curr_url);
	}

	if (curr_url === '/' || curr_url === '/index.html') { 
		console.log('curr_url === /');
		$('#headerWrapper').removeClass('headerLeft');
		$('nav').removeClass('nav-left');
		$('#headerWrapper').removeClass('selfie-top');
		$('header').removeClass('selfie-top');
		index_thumbs_container.removeClass("hide");
		index_thumbs_container.removeClass("index-thumbs-container-margin-top");
		$('.selfie-text').removeClass('hide');
		resetDivs();
	}

	else {
		//resetDivs();
		showDivs();
	}
	//fancyWork(curr_url);
}

function clear_sidebar(curr_url) {

}

function fancyWork(curr_url) {
	console.log(curr_url + ' in fancyWork');
	//var workThumbs = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(curr_url); // call the function 'bindListeners' with the variable 'menuItems'

	function bindListeners(curr_url) {

		if (!panel.hasClass("panelSidebar")) {
			panel.addClass("panelSidebar");
			setTimeout(function(){
				$('.panel .content').addClass("contentSidebar");
			}, 200);
			setTimeout(function(){
				$('.articleYears').addClass('yearsSidebar');
				$('.heroImage').addClass("heroSidebar"); //hides heroImage when thumbnails are sidebarred
			}, 500);
		}
		workDisplay.removeClass("resetDiv");
		console.log('did work display?');
    }; //bindListeners end
}; // fancyWork end

function fancyBlog(selector) { // is not called. Need to set it up similar to fancyWork
	var blogArticles = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(blogArticles); // call the function 'bindListeners' with the variable 'menuItems'

	function workDisplayFadeIn() {
		workDisplay.removeClass("resetDiv");
		workDisplay.addClass("showDiv");
		
	};
	
	function bindListeners() {

		if (!panel.hasClass("panelSidebar")) {
			panel.addClass("panelSidebar");
			setTimeout(function(){
				$('.panel .content').addClass("contentSidebar");
			}, 200);
			setTimeout(function(){
				$('.articleYears').addClass('yearsSidebar');
				$('.heroImage').addClass("heroSidebar"); //hides heroImage when thumbnails are sidebarred
			}, 500);
		}

		workDisplayFadeIn();

    }; //bindListeners end
}; // fancyBlog end


$(window).on('pronto.request', function(event, eventInfo){ //events do get triggered by back button -> figure out how to undo the functions that were run
	
	//console.log(window.location.pathname);
	//console.log(window.location.href);
	var body = $('html, body');
	var bodyOffset = $('body').offset().top;
	if (window.location.pathname.indexOf("index") > -1 || window.location.pathname === '/') { // If current URL (due to pronto.request) when link clicked includes 'index' OR is just '/'
		body.animate({scrollTop: bodyOffset}, 50, 'easeInOutCirc');
	}
})

$(window).on('popstate', function(){

});

$(window).on('pronto.load', function(){
})

$(window).on('pronto.render', function(){
	console.log('hi');
	var curr_url = window.location.pathname.substring('/');
	fancyNav(curr_url);

	var body = $('html, body');
	var bodyOffset = $('body').offset().top;
	if (window.location.href.indexOf("index") > -1) { // If URL of link clicked includes 'index'
		body.animate({scrollTop: bodyOffset}, 0, 'easeInOutCirc');
		//go_to_index();
	}
	else {
		body.animate({scrollTop: bodyOffset}, 250, 'easeInOutCirc');
	}
	//designsInit();
	//writingsInit();
	_paq.push(['setDocumentTitle', window.location.pathname]);
	_paq.push(['setCustomUrl', window.location.href]);
	_paq.push(['trackPageView']);
})

/*function link_click(curr_url) { //run fancyNav on click of .navigation anchors
	console.log('link_click ' + curr_url);
	//fancyNav(curr_url);
	$('.navigation').on('click', 'a', function() {
		console.log('nav a click');
		fancyNav(curr_url);
	})
	$('.index-thumb').on('click', 'a', function(curr_url) {
		console.log('index-thumb-click');
		fancyNav(curr_url);
	})
}
*/

function designsInit() {
	var designsList = ["a-few-more-breaths", "bar-vivant", "bulmer-specimen", "jam-packed", "midnight-munchies", "nutrition-program", "occupy-together", "photography", "pix-patisserie"]
	var designsLocation = window.location.pathname.replace('/designs/','').replace('.html','');
		
	if($.inArray(designsLocation, designsList) > -1) { //if 'writingsLocation' is equal to an article listed in 'writingsList'
		var selectLink = designsLocation;
		$('a[href*="'+selectLink+'"]').addClass("selectLink");
		var URLnotIndex = window.location.pathname
		var workThumbs = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		fancyWork(workThumbs);
	}
	if(($.inArray(designsLocation, designsList) == -1) && (window.location.pathname.indexOf("designs") > -1)) { //if 'writingsLocation' is NOT equal to an article listed in 'writingsList' AND the pathname includes 'writings'
		//in case I want to do something differently on /designs/
	}	
}

function writingsInit() {
	var writingsList = ["distraction-and-practicality", "illusion-of-choice", "measuring-friendship", "medicating-the-paradox", "new-technoworld", "perception-as-change"]
	var writingsLocation = window.location.pathname.replace('/writings/','').replace('.html','');
		
	if($.inArray(writingsLocation, writingsList) > -1) { //if 'writingsLocation' is equal to an article listed in 'writingsList'
		var selectLink = writingsLocation;
		$('a[href*="'+selectLink+'"]').addClass("selectLink");
		var URLnotIndex = window.location.pathname
		var blogArticles = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		fancyBlog(blogArticles);
	}
	if(($.inArray(writingsLocation, writingsList) == -1) && (window.location.pathname.indexOf("writings") > -1)) { //if 'writingsLocation' is NOT equal to an article listed in 'writingsList' AND the pathname includes 'writings'
		//in case I want to do something differently on /writings/
	}	
}

 
$(document).ready(function () {

	//Defining global variables
	window = $(window);
	width = $(window).width();
	panel = $('.panel');
	indexPanel = $('#indexPanel');
	content = $('.content');
	workDisplay = $('.workDisplay');
	headerWrapper = $('#headerWrapper');
	index_thumbs_container = $('.index-thumbs-container');

	panelRight = $('.workDisplay').width();

	panel.addClass("resetDiv");

	/*//run fancyNav on direct URL load if URL does NOT include 'index' AND does NOT include design AND there is a pathname
	if(window.location.href.indexOf("index") === -1 && window.location.pathname !== '/') {
		var URLnotIndex = window.location.pathname
		var navSelector = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		fancyNav(navSelector);
	}*/

	//Enables users to come in on a piece or article and still have fancyNav execute when they click on a navigation link
	//navAClick();

	/*index_thumbs_container.addClass("hide");
		index_thumbs_container.addClass("index-thumbs-container-margin-top");*/

	 //run designsInit on pageload if pathname includes 'designs'
	 if(window.location.href.indexOf("designs") > -1) {
	 	var curr_url = window.location.pathname.substring('/');
		fancyNav(curr_url);
	 }

	// //run writingsInit on page load if pathname includes 'writings'
	// if(window.location.pathname.indexOf('writings') > -1) {
	// 	writingsInit();
	// }

	//Enable Ajaxify.js on the listed elements
	jQuery('#ajaxContent, #ajaxWork, #ajaxHero, #ajaxHeroWork').ajaxify({
	});

}); // $(document).ready end

//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");

	//add headerLeft if browser is resized to be >778 px AND page is not 'index' or '/'
	if((width >= 778) && (window.location.href.indexOf("index") == -1)){
		$('#headerWrapper').addClass('headerLeft');
	}

} // checksize() end

$(window).resize(function() {
	//workDisplay.addClass("transitionReset"); // removes transitions when resizing
	//panel.addClass("transitionReset"); // removes transitions when resizing
	checkSize();
	//workDisplay.removeClass("transitionReset"); 
	//panel.removeClass("transitionReset"); 
}); 
//Get window size end

function fancyMobileNav(selector) {
	var mobileMenu = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(mobileMenu); // call the function 'bindListeners' with the variable 'menuItems'

	function bindListeners() {
    	$('#offCanvasMenu').on('click', 'a', function() {
    		//jQuery('.container').addClass('mobileNav');
    	});
	} //bindListeners end
}; // fancyMobileNav end
