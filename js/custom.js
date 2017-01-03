function fancyNav(curr_url) {
	// console.log(curr_url + ' in fancyNav')
	if (curr_url === null) {
		var curr_url = window.location.pathname.substring('/');
	}

	if (curr_url === '/about.html' || curr_url === '/contact.html') {
		// console.log('about');
		move_header(curr_url);
		go_to_sidebar(curr_url);
	}

	if(window.location.href.indexOf("designs") > -1) {
		// console.log('url includes designs');
		move_header(curr_url);
		go_to_sidebar(curr_url);
		go_to_work(curr_url);
	}

	if (curr_url === '/' || curr_url === '/index.html') {
		go_to_index(curr_url);
	}	
}; // fancyNav end

function move_header(curr_url) {
	// console.log('move_header ' + curr_url);

	if (width >= 778 && !(curr_url === '/index.html')) {
		// console.log('header moved left ' + curr_url);
		$('#headerWrapper').addClass('headerLeft');
		$('.index-content-container').addClass('hide');
		$('.selfie-text').addClass('hide');
		index_thumbs_container.addClass("hide");
		$('#headerWrapper').addClass('selfie-top');
		$('nav').addClass('nav-left');
	}

	else {
		$('.index-content-container').addClass('hide');
		$('.selfie-text').addClass('hide');
		index_thumbs_container.addClass("hide");	
	}
}

function go_to_index(curr_url) {
	// console.log('go_to_index ' + curr_url);

	$('#headerWrapper').removeClass('headerLeft');
	$('nav').removeClass('nav-left');
	$('#headerWrapper').removeClass('selfie-top');
	$('header').removeClass('selfie-top');
	$('.index-content-container').removeClass('hide');
	index_thumbs_container.removeClass("hide");
	index_thumbs_container.removeClass("index-thumbs-container-margin-top");
	$('.selfie-text').removeClass('hide');
	panel.removeClass("panelSidebar");
	panel.addClass("hide");
	workDisplay.addClass("hide");
}

function go_to_sidebar(curr_url) {
	// console.log('go_to_sidebar ' + curr_url);

	if (!panel.hasClass("panelSidebar")) {
		// console.log('panel doesnt have sidebar ' + curr_url);
		panel.addClass("panelSidebar");
		panel.removeClass("hide");
		$('.panel div#ajaxContent').addClass("contentSidebar");
		$('.articleYears').addClass('yearsSidebar');
		$('.heroImage').addClass("heroSidebar");
	}

	if (panel.hasClass('panelSidebar') && (curr_url.indexOf('designs') === -1 && curr_url.indexOf('writings') === -1)) {
		// console.log('panel does have sidebar ' + curr_url)
		workDisplay.addClass("hide");
		panel.removeClass('panelSidebar');
		$('.panel div#ajaxContent').removeClass("contentSidebar");
		$('.articleYears').removeClass('yearsSidebar');
		$('.heroImage').removeClass("heroSidebar");
	}
}

function go_to_work(curr_url) {
	// console.log(curr_url + ' in go_to_work');
	index_thumbs_container.addClass("hide");
	workDisplay.removeClass('hide');
	var curr_url_split = curr_url.split('/')[2];
	// console.log(curr_url_split);
	$('.sidebar-thumb a').each(function() {
    	if ($(this).attr('href') == curr_url_split) {
       		$(this).parent().addClass('selected');
    	}
    });
	// console.log('did work display?');
}; // go_to_work end

function fancyBlog(selector) { // is not called. Need to set it up similar to go_to_work
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
	// console.log('pronto.render start');
	var curr_url = window.location.pathname.substring('/');
	fancyNav(curr_url);

	var body = $('html, body');
	var bodyOffset = $('body').offset().top;
	if (window.location.href.indexOf("index") > -1) { // If URL of link clicked includes 'index'
		body.animate({scrollTop: bodyOffset}, 0, 'easeInOutCirc');
	}
	else {
		body.animate({scrollTop: bodyOffset}, 250, 'easeInOutCirc');
	}

	_paq.push(['setDocumentTitle', window.location.pathname]);
	_paq.push(['setCustomUrl', window.location.href]);
	_paq.push(['trackPageView']);
})

function designsInit() {
	var designsList = ["a-few-more-breaths", "bar-vivant", "bulmer-specimen", "jam-packed", "midnight-munchies", "nutrition-program", "occupy-together", "photography", "pix-patisserie"]
	var designsLocation = window.location.pathname.replace('/designs/','').replace('.html','');
		
	if($.inArray(designsLocation, designsList) > -1) { //if 'writingsLocation' is equal to an article listed in 'writingsList'
		var selectLink = designsLocation;
		$('a[href*="'+selectLink+'"]').addClass("selectLink");
		var URLnotIndex = window.location.pathname
		var workThumbs = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		//go_to_work(workThumbs);
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

	$('#noscriptDiv').css('display','none');

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

	setTimeout( function() {
		workDisplay.removeClass('transition-zero-override');
		panel.removeClass('transition-zero-override');
	}, 400);

	var curr_url = null;
	fancyNav(curr_url);

	//Enable Ajaxify.js on the listed elements
	jQuery('#ajaxContent, #ajaxWork, .sidebar-thumb, .index-thumbs-container .index-thumb, #selfieDiv, .navigation li').ajaxify({
	});

}); // $(document).ready end

//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");

	//add headerLeft if browser is resized to be >778 px AND page is not 'index' or '/'
	if((width >= 778) && (window.location.href.indexOf("index") == -1)){
		$('#headerWrapper').addClass('headerLeft');
		$('nav').addClass('nav-left');
	}

	else {
		$('#headerWrapper').removeClass('headerLeft');
		$('nav').removeClass('nav-left');
	}

} // checksize() end

$(window).resize(function() {
	checkSize();
}); 
//Get window size end