function resetDivs() {  // resets certain divs to their default states.
	panel.removeClass("showDiv");
	panel.removeClass("panelSidebar");
	panel.addClass("resetDiv");
	workDisplay.removeClass("showDiv")
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

function fancyNav(selector) {
	var menuItems = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(menuItems); // call the function 'bindListeners' with the variable 'menuItems'

	function divInit() {
    	resetDivs();
    	showDivs();
	} // loadContent end

	function bindListeners() {
		if(width >= 778){
			$('#headerWrapper').addClass('headerLeft');
		}
        divInit();
	} //bindListeners end

	$("#selfieDiv").on('click', function() {
		resetDivs();
		$('#headerWrapper').removeClass('headerLeft');
	}); // click method end
}; // fancyNav end

function fancyWork(selector) {
	var workThumbs = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(workThumbs); // call the function 'bindListeners' with the variable 'menuItems'

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
	navAClick();
})

$(window).on('popstate', function(){
	_paq.push(['setDocumentTitle', window.location.pathname]);
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
	
	if(window.location.href.indexOf("index") === -1 && window.location.pathname.indexOf("pieces") === -1 && window.location.pathname !== '/') {
		var URLnotIndex = window.location.pathname
		var navSelector = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		fancyNav(navSelector);
	}
	if(window.location.href.indexOf("index") !== -1 || window.location.pathname === '/') {
		resetDivs();
		$('#headerWrapper').removeClass('headerLeft');
	}

});

$(window).on('pronto.load', function(){
})

$(window).on('pronto.render', function(){
	var body = $('html, body');
	var workDisplayOffset = workDisplay.offset().top;
	body.animate({scrollTop: workDisplayOffset}, 250, 'easeInOutCirc'); // scroll to top whenever changing page
	designsInit();
	writingsInit();
	//console.log(window.location.pathname)
})

function navAClick() { //run fancyNav on click of .navigation anchors
	$('.navigation').on('click', 'a', function() {
		var navSelector = '#menu li';
		fancyNav(navSelector);
	})
}


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

	panelRight = $('.workDisplay').width();

	panel.addClass("resetDiv");

	//run fancyNav on direct URL load if URL does NOT include 'index' AND does NOT include design AND there is a pathname
	if(window.location.href.indexOf("index") === -1 && window.location.pathname !== '/') {
		var URLnotIndex = window.location.pathname
		var navSelector = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		fancyNav(navSelector);
	}

	//Enables users to come in on a piece or article and still have fancyNav execute when they click on a navigation link
	navAClick();

	//run designsInit on pageload if pathname includes 'designs'
	if(window.location.href.indexOf("designs") > -1) {
		designsInit();
	}

	//run writingsInit on page load if pathname includes 'writings'
	if(window.location.pathname.indexOf('writings') > -1) {
		writingsInit();
	}

	//Enable Ajaxify.js on the listed elements
	jQuery('#ajaxContent, #ajaxWork, #ajaxHero, #ajaxHeroWork').ajaxify({
	});

}); // $(document).ready end

//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");

	//add headerLeft if browser is resized to be >778 px AND page is not 'index' or '/'

	if((width >= 778) && ((!window.location.pathname === 'index.html') || (!window.location.pathname === '/'))){
		console.log((window.location.href.indexOf("index") == -1));
		console.log((!window.location.pathname === '/'));
		$('#headerWrapper').addClass('headerLeft');
	}

	/*if(width <= 777){
		panel.removeClass("panelSidebar");
		$('.content').removeClass("contentSidebar");
		content.removeClass("marginTop0");
		$('.heroImage').removeClass('heroSidebar');
	}
	if(width >= 777){
		panel.addClass("panelSidebar");
		$('.content').addClass("contentSidebar");
		content.addClass("marginTop0");
		$('.heroImage').addClass('heroSidebar');
	}*/

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
