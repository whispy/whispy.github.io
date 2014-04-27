function resetDivs() {
	console.log('resetDivs');
	panel.removeClass("showDiv");
	panel.removeClass("panelSidebar");
	panel.addClass("resetDiv");
	workDisplay.removeClass("showDiv")
	workDisplay.addClass("resetDiv");
	content.removeClass("marginTop0");
	$('.heroImage').removeClass('heroSidebar');
}; // resetDivs end

function showDivs() {
	console.log('showDivs');
	headerWrapper.removeClass("headerCenter");
	panel.removeClass("resetDiv");
	$('div#indexPanel').removeAttr('id');
   	panel.addClass("showDiv");
   	if($('#selfieDiv').hasClass('on')) { //Centers navigation if it is clicked
		panel.removeClass("showDiv");
		panel.addClass("resetDiv");
		headerWrapper.removeClass('headerLeft');
		headerWrapper.addClass("headerCenter");
		$('#selfieDiv').removeClass('on');
	}
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
		resetDivs();
    		var workDisplayLeft = $('#indexWorkDisplay').offset().left;
    		if(width>=1400) {
				$.stylesheet('#headerWrapper.headerLeft').css({
					"width":workDisplayLeft - 30 + 'px'
				})
			} // if end

			if(width<=1399 && width>=778) {
				$.stylesheet('#headerWrapper.headerLeft').css({
					"width":workDisplayLeft - 20 + 'px'
				})
			} // if end

    		$('#headerWrapper').addClass('headerLeft');

        	divInit();
	} //bindListeners end

	$("#selfieDiv").on('click', function() {
		$('#selfieDiv').addClass('on');
		var	width = $(window).width();
		var	headerCenterLarge = (width / 2) + 87.5;
		var	headerCenterSmall = (width / 2) + 50;
		resetDivs();
		$('#headerWrapper').removeClass('headerLeft');

		if(width>=1208) {
			$.stylesheet('#headerWrapper.headerCenter').css({
				"width":headerCenterLarge + 'px'
    		})
		} // if end
	
		if(width<=1207) {
			$.stylesheet('#headerWrapper.headerCenter').css({
				"width":headerCenterSmall + 'px'
    		})
		} // if end

		$('#headerWrapper').addClass('headerCenter');
	}); // click method end
}; // fancyNav end

function fancyWork(selector) {
	var workThumbs = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(workThumbs); // call the function 'bindListeners' with the variable 'menuItems'

	function workDisplayFadeIn() {
		workDisplay.addClass("resetDiv");
		workDisplay.addClass("showDiv");
	};

	function bindListeners() {
			if(width<=777) {
				console.log('fancyWork <777px');
				panel.addClass("resetDiv");
				workDisplayFadeIn();
			}
			else {

				if (panel.width()>=101) {
					$.stylesheet(".panel.panelSidebar").css({
						"left":panelRight + 110 + 'px'
					});
		
					panel.addClass("panelSidebar");
					$('.content').addClass("marginTop0");
					$('.heroImage').addClass("heroSidebar"); //hides heroImage when thumbnails are sidebarred

				} // if end

				workDisplayFadeIn();
			} // else end
    }; //bindListeners end
}; // fancyWork end

function fancyBlog(selector) { // is not called. Need to set it up similar to fancyWork
	var blogArticles = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(blogArticles); // call the function 'bindListeners' with the variable 'menuItems'

	function loadArticles(toLoad) { // Inline loading of content
		var toFetch = toLoad + '.html' + ' .content ';
		window.location.hash = toLoad.replace('articles/', '');
		panel.load(toFetch);
	} // Inline loading of content end

	
	function bindListeners() {
    	$('.content p').on('click', 'a', function() {
    		var toLoad = $(this).attr('href').replace('.html', '');
    		
			loadArticles(toLoad);
			return false;
    	}); //click function end
    }; //bindListeners end
}; // fancyBlog end

$(window).on('pronto.request', function(){
	navAClick();
})

$(window).on('pronto.render', function(){
	imgDivClick();
	if(window.location.pathname.indexOf("pieces") != -1){
		$('.content .imgDiv').addClass("sidebarThumbs");
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

 
$(document).ready(function () {

	//Defining global variables
	width = $(window).width();
	panel = $('.panel');
	indexPanel = $('#indexPanel');
	content = $('.content');
	workDisplay = $('.workDisplay');
	headerWrapper = $('#headerWrapper');

	headerLeft = $('#headerWrapper').offset().left;
	headerCenterLarge = (width / 2) + 87.5;
	headerCenterSmall = (width / 2) + 50;
	panelRight = $('#indexWorkDisplay').width();

	panel.addClass("resetDiv");

	//run fancyNav on direct URL load if URL does NOT include 'index' AND does NOT include pieces
	if(window.location.href.indexOf("index") === -1 && window.location.pathname.indexOf("pieces") === -1) {
		var URLnotIndex = window.location.pathname
		var navSelector = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		fancyNav(navSelector);
	}

	//Enables users to come in on a piece and still have fancyNav execute when they click on a navigation link
	navAClick();

	//run imgDivClick on page load if URL includes 'work'
	if(window.location.href.indexOf("work") != -1) {
		imgDivClick();
	}

	//run fancyWork on page load if URL includes 'pieces'
	if(window.location.pathname.indexOf("pieces") != -1) {
		var URLnotIndex = window.location.pathname
		var workThumbs = URLnotIndex.replace('.html','').substring(URLnotIndex.lastIndexOf("/") + 1);
		showDivs();
		fancyNav(navSelector);
		fancyWork(workThumbs);
		$('.content .imgDiv').addClass("sidebarThumbs");
	}
	
	jQuery('#ajaxContent , #ajaxWork , #ajaxHero').ajaxify({
		verbosity : 2,
	});

	setHeaderWrapperWidth();
	function setHeaderWrapperWidth() {
		if(width>=1208) {
				$('#headerWrapper').css({
					"width":headerCenterLarge + 'px'
				})
				$.stylesheet('#headerWrapper.headerCenter').css({
					"width":headerCenterLarge + 'px'
				})
			}
	
		if(width<=1207) {
			$('#headerWrapper').css({
				"width":headerCenterSmall + 'px'
    		})
			$.stylesheet('#headerWrapper.headerCenter').css({
				"width":headerCenterSmall + 'px'
    		})
		}
    	
    	headerWrapper.addClass("headerCenter");
		$('#headerWrapper').css({
			"width":''
		})
	}

}); // $(document).ready end

//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");

	if(panel.hasClass("panelSidebar")) {
		var	panelRight = $('#indexWorkDisplay').width();
		$.stylesheet(".panel.panelSidebar").css({
			"left":panelRight + 110 + 'px'
		});
	} // if end

	if(!headerWrapper.hasClass("headerLeft")) {
		if(width>=1400) {
			var headerCenter3 = ((width / 2) + 87.5);
	   		$.stylesheet('#headerWrapper.headerCenter').css({
				"width":headerCenter3 + 'px'
    		})
		} // if end

		if(width<=1399 && width>=778) {
			var headerCenter4 = ((width / 2) + 50);
	   		$.stylesheet('#headerWrapper.headerCenter').css({
				"width":headerCenter4 + 'px'
    		})
	   	} // if end

		if(width<=777) {
	   		$.stylesheet('#headerWrapper.headerCenter').css({
				"width":"auto"
    		})
			var mobileMenu = '#offCanvasMenu li';
			fancyMobileNav(mobileMenu);
		} // if end
	} // if headerWrapper does NOT have class headerLeft end

	if(headerWrapper.hasClass("headerLeft")) {
		var workDisplayLeft = $('#indexWorkDisplay').offset().left;
			if(width>=1400) {
				$.stylesheet('#headerWrapper.headerLeft').css({
					"width":workDisplayLeft - 30 + 'px'
				})
			} // if end

			if(width<=1399 && width>=778) {
				$.stylesheet('#headerWrapper.headerLeft').css({
					"width":workDisplayLeft - 20 + 'px'
				})
			} // if end

			if(width<=777) {
				$.stylesheet('#headerWrapper.headerLeft').css({
					"width":"auto"
				})
			}
	} // if headerWrapper has class headerLeft end

} // checksize() end

$(window).resize(function() {
	$('#headerWrapper').addClass("transitionReset");
	checkSize();
	$('#headerWrapper').removeClass("transitionReset");
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
