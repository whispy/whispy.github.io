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
	$('.articleDiv').removeClass('articleSidebar');	
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
		//$('.navigation').on('click', 'a', function() {
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
			if(width<=777) {
				console.log('fancyWork <777px');
				panel.addClass("resetDiv");
				workDisplayFadeIn();
			}
			else {

				if (!panel.hasClass("panelSidebar")) { //run if .panel does NOT have class .panelSidebar

					panel.addClass("panelSidebar");

					setTimeout(function(){
						$('.panel .content').addClass("contentSidebar");
						$('.panel .content').addClass("flex-container");
					}, 200);

					setTimeout(function(){
						//$('.content').addClass("marginTop0");
						$('.heroImage').addClass("heroSidebar"); //hides heroImage when thumbnails are sidebarred
					}, 500);

				} // if end

				workDisplayFadeIn();
			} // else end
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

			panel.addClass("panelSidebar");
			//this all needs figuring out -> why is there a delay when going between different writings while sidebar is on?
			
		var writingsList = ["distraction-and-practicality", "illusion-of-choice", "measuring-friendship", "medicating-the-paradox", "new-technoworld", "perception-as-change"]
		for (var i = 0; i < writingsList.length; i++) {
        	if(window.location.pathname.indexOf(writingsList[i]) > -1) {
            	$('.panel .content').addClass("contentSidebar");
            	$('.articleYears').addClass('yearsSidebar');
				$('.articleDiv').addClass('articleSidebar');
				$('.heroImage').addClass("heroSidebar");
				console.log('fancyblog1')
			}

			if(window.location.pathname.indexOf(writingsList[i]) < -1) {
				console.log('fancyblog2')
            	setTimeout(function(){
					$('.panel .content').addClass("contentSidebar");
				}, 200);

				setTimeout(function(){
					$('.articleYears').addClass('yearsSidebar');
					$('.articleDiv').addClass('articleSidebar');
					$('.heroImage').addClass("heroSidebar"); //hides heroImage when thumbnails are sidebarred
				}, 500);
			}
		}


		workDisplayFadeIn();

    }; //bindListeners end
}; // fancyBlog end


$(window).on('pronto.request', function(event, eventInfo){ //events do get triggered by back button -> figure out how to undo the functions that were run
	console.log(eventInfo);
	navAClick();
})

/* Back button stuff doesn't work 100%*/
$(window).on('popstate', function(e){ //making back/forward button work -> needs lots of cleaning, but functionality is there.
	//console.log(window.location.pathname)
		if(window.location.pathname.indexOf("design") != -1){
			var URLnotIndex = window.location.pathname
			var workThumbs = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
			fancyWork(workThumbs);
			$('.content .imgDiv').addClass("sidebarThumbs");
		}
		if(window.location.href.indexOf("index") === -1 && window.location.pathname.indexOf("pieces") === -1 && window.location.pathname !== '/') {
			var URLnotIndex = window.location.pathname
			var navSelector = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
			fancyNav(navSelector);
		}
		if(window.location.pathname.indexOf("writings") != -1) { // if it includes 'writings'
			var URLnotIndex = window.location.pathname
			var blogArticles = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
			fancyBlog(blogArticles);
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
	body.animate({scrollTop:0},'100','easeInOutBounce'); // scroll to top whenever changing page
	imgDivClick();
	blogClick();
	if(window.location.pathname.indexOf("design") != -1){ // Enables thumbnail sidebar if rendered page includes pieces in the URL
		$('.content .imgDiv').addClass("sidebarThumbs");
	}
	/*temporary!!!*/
	var writingsList = ["distraction-and-practicality", "illusion-of-choice", "measuring-friendship", "medicating-the-paradox", "new-technoworld", "perception-as-change"]
		for (var i = 0; i < writingsList.length; i++) {
        	if(window.location.pathname.indexOf(writingsList[i]) > -1) {
        		console.log('ellomate')
            	$('.panel .content').addClass("contentSidebar");
            	$('.articleYears').addClass('yearsSidebar');
				$('.articleDiv').addClass('articleSidebar');
				$('.heroImage').addClass("heroSidebar");
				console.log('fancyblog1')
			}
		}

})

function navAClick() { //run fancyNav on click of .navigation anchors
	$('.navigation').on('click', 'a', function() {
		var navSelector = '#menu li';
		fancyNav(navSelector);
	})
}


function imgDivClick() { //run fancyWork on click of .imgDiv anchors
	$('.imgDiv').on('click', 'a', function() {
		var workThumbs = '.imgDiv a'
		fancyWork(workThumbs);
	})
}

function blogClick() { //run fancyBlog on click of .articleDiv anchors
	if(window.location.pathname.indexOf("writings") > -1){ //add class to anchor containing selectLink
		selectLink = window.location.pathname.replace('/writings/','');
		//console.log(selectLink);
		$('a[href*="'+selectLink+'"]').addClass("selectLink");
	}
	//this is not running on first click of a new article from sidebar...
	$('.articleDiv').on('click', 'a', function() {
		var blogArticles = '.articleDiv a'
		fancyBlog(blogArticles);
	})
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

	headerLeft = $('#headerWrapper').offset().left;
	headerCenterLarge = (width / 2) + 87.5;
	headerCenterSmall = (width / 2) + 50;
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

	//run imgDivClick on page load if URL includes 'designs'
	if(window.location.href.indexOf("designs") != -1) {
		imgDivClick();
	}

	//run blogClick on page load if URL includes 'writing'
	if(window.location.href.indexOf("writings") != -1) {
		blogClick();
	}

	//run fancyBlog on page load if URL includes strings in writingsList
	var writingsList = ["distraction-and-practicality", "illusion-of-choice", "measuring-friendship", "medicating-the-paradox", "new-technoworld", "perception-as-change"]
	for (var i = 0; i < writingsList.length; i++) {
        if(window.location.pathname.indexOf(writingsList[i]) > -1) {
            //alert("your url contains the string "+writingsList[i]);
			var URLnotIndex = window.location.pathname
			var blogArticles = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
			showDivs();
			fancyNav(navSelector);
			fancyBlog(blogArticles);
			//$('.content .imgDiv').addClass("sidebarThumbs");
		}
	}

	//run fancyWork on page load if URL includes strings in designsList
	var designsList = ["a-few-more-breaths", "bar-vivant", "bulmer-specimen", "jam-packed", "midnight-munchies", "nutrition-program", "occupy-together", "photography", "pix-patisserie"]
	for (var i = 0; i < designsList.length; i++) {
        if(window.location.pathname.indexOf(designsList[i]) > -1) {
        	//alert("your url contains the string "+designsList[i]);
			var URLnotIndex = window.location.pathname
			var workThumbs = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
			showDivs();
			fancyNav(navSelector);
			fancyWork(workThumbs);
			$('.content .imgDiv').addClass("sidebarThumbs");
		}
	}
	
	//Enable Ajaxify.js on the listed elements
	jQuery('#ajaxContent, #ajaxWork, #ajaxHero, #ajaxHeroWork').ajaxify({
		verbosity : 2,
	});

}); // $(document).ready end

//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");

	//add headerLeft if browser is resized to be >778 px AND page is not 'index' or '/'
	if (width >= 778 && (! window.location.href.indexOf("index") ) ) {
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
