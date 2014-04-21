function fancyNav(selector) {
	var menuItems = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(menuItems); // call the function 'bindListeners' with the variable 'menuItems'

	function resetDivs() {
		console.log('resetDivs');
		/*indexPanel.css({
			'height':'' // figure this out
		})*/
		panel.removeClass("showDiv");
		panel.removeClass("panelSidebar");
		panel.addClass("resetDiv");
		workDisplay.removeClass("showDiv")
		workDisplay.addClass("resetDiv");
	}; // resetDivs end
	
	function showDivs() {
		console.log('showDivs');
		headerWrapper.removeClass("headerCenter");
		panel.removeClass("resetDiv");
		$('div#indexPanel').removeAttr('id');
    		panel.addClass("showDiv");
    		if($('#selfieDiv').hasClass('on')) { //Class gets added but not removed if people click selfieDiv twice in a row
    			console.log('hi');
			panel.removeClass("showDiv");
			panel.addClass("resetDiv");
			headerWrapper.removeClass('headerLeft');
			headerWrapper.addClass("headerCenter");
			$('#selfieDiv').removeClass('on');
		}
	}; //showDivs end

	function loadContent() {
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

        	loadContent(); // call the function 'loadContent(toLoad)''
        	//return false; // Inline loading of content end
	} //bindListeners end

	$("#selfieDiv").on('click', function() {
		$('#selfieDiv').addClass('on');
		console.log('selfie div on')
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

}; // fancyNav

function fancyWork(selector) {
	var workThumbs = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(workThumbs); // call the function 'bindListeners' with the variable 'menuItems'

	function loadPieces(toLoad) { // Inline loading of content
		var toFetch = toLoad + '.html' + ' .work ';
		window.location.hash = toLoad.replace('./pieces/', '');
		workDisplay.load(toFetch);
		workDisplayFadeIn();
	} // Inline loading of content end

	function workDisplayFadeIn() {
		workDisplay.addClass("resetDiv");
		workDisplay.addClass("showDiv");
	};

	function bindListeners() {
    	$('.imgDiv').on('click', 'a', function() {
    		var toLoad = $(this).attr('href').replace('.html', '');
			if(width<=777) {
				panel.css({
    				"opacity":"0.0",
    				"visibility":"visible",
    			});
				console.log('hi');
				loadPieces(toLoad);
				return false;
			}
			else {

				if (panel.width()>=101) {
					$.stylesheet("#indexPanel.panelSidebar").css({
						"left":panelRight + 110 + 'px'
					});
		
					panel.addClass("panelSidebar");
					$('#indexContent').addClass("marginTop0");

					
					$('.content .imgDiv').css({
						"margin-top":"10px",
						"width":"80px",
						"height":"80px"
					});
				}

				loadPieces(toLoad);
				return false;
			}
    	}); //click function end
    }; //bindListeners end

}; // fancyWork

function fancyBlog(selector) {
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

}; // fancyBlog


$(window).on('pronto.request', function(e, eventInfo){
	console.log('pronto.request');
	var navSelector = '#menu li';
	fancyNav(navSelector);
})

 
$(document).ready(function () {

	//Defining global variables
	width = $(window).width();
	panel = $('.panel');
	indexPanel = $('#indexPanel');
	workDisplay = $('.workDisplay');
	headerWrapper = $('#headerWrapper');

	headerLeft = $('#headerWrapper').offset().left;
	headerCenterLarge = (width / 2) + 87.5;
	headerCenterSmall = (width / 2) + 50;
	panelRight = $('#indexWorkDisplay').width();

	panel.addClass("resetDiv");
	
	console.log(window.location.href.indexOf("index"));
	if(window.location.href.indexOf("index") === -1) {
		var URLnotIndex = window.location.pathname
		var navSelector = URLnotIndex.replace('.html','').replace('/','')
		fancyNav(navSelector);
	}
	
	jQuery('#ajaxContent').ajaxify({
		verbosity : 2,
		turbo : false
	});

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

	


	function setWorkThumbs(data) {
		var workThumbs = '.imgDiv a'
		fancyWork(workThumbs);
		return workThumbs;
	}

	function getWorkThumbs() {
		return $.get("work.html");
	}


	function setBlogArticles(data) {
		var blogArticles = '.content p'
		fancyBlog(blogArticles);
		return blogArticles;
	}

	function getBlogArticles() {
		return $.get("blog.html");
	}

	/*window.onhashchange = workHashChange
	function workHashChange() { // if the hash is not #work and changes to work, this fires
		if (window.location.hash === '#work') {
			getWorkThumbs().then(setWorkThumbs);
		}
		if (window.location.hash === '#blog') {
			getBlogArticles().then(setBlogArticles);
		}
	};

	function hashChange() {
		currHash = window.location.hash
		var navSelector = '#menu li';
		if (currHash === '') {
			fancyNav(navSelector); // call the function fancyNav with navSelector as an argument
		}

		if (currHash === '#menu') {
			fancyNav(navSelector); // call the function fancyNav with navSelector as an argument
		}



		var navClick = $('.navigation').find(currHash);
		if (navClick.length) {
			fancyNav(navSelector); // call the function fancyNav with navSelector as an argument
			navClick.trigger('click');
			if (currHash === '#work') {
				getWorkThumbs().then(setWorkThumbs);
			}
			if (currHash === '#blog') {
				getBlogArticles().then(setBlogArticles);
			}
		}


		var pieceClick = $('.imgDiv').find(currHash);
		if (pieceClick.length) { // if hash is 'piece#' (# = number value)
			var pieceHash = window.location.hash;
			fancyNav(navSelector); // call the function fancyNav with navSelector as an argument
			$('.navigation').find('#work').trigger('click');
			window.location.hash = pieceHash;
			getWorkThumbs().then(setWorkThumbs);
			pieceClick.trigger('click'); // only works when running through step by step in debugger...
		}
	} //hashChange end

	hashChange();*/
	//checkSize();

}); // $(document).ready




//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");
	//currHash = window.location.hash

	if(panel.hasClass("panelSidebar")) {
		var	panelRight = $('#indexWorkDisplay').width();
		$.stylesheet("#indexPanel.panelSidebar").css({
			"left":panelRight + 110 + 'px' // scrollbar width 17. problems if going from scrollbar -> no scrollbar (doesn't take into account scrollbar width)
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
	} // if !headerWrapper has class headerLeft end

	if(headerWrapper.hasClass("headerLeft")) {
		//var navClick = $('.navigation').find(currHash);
		var workDisplayLeft = $('#indexWorkDisplay').offset().left;
		//if (currHash != '')  {
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
		//} // if navClick.length end
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
    		$('#headerWrapper').animate({
    			"margin-left":"0%"
    		})
    		//jQuery('.container').addClass('mobileNav');
    	});
	} //bindListeners end
}; // fancyMobileNav end

	 /*	if (!container.is('.mobileNav')) {
	 		jQuery("#about, #work, #contact").fadeOut("fast");
			//container.addClass('mobileNav');
	 		jQuery(".header").animate({
	 		"margin-left":"61%",
	 	}); //animate method end
	 		jQuery(".container").animate({
	 		"margin-left":"75px"
	 	}) // animate method end

	 } //if end
	 else {
	 	jQuery("#about, #work, #contact, #home_a").fadeOut("fast");
		container.removeClass('mobileNav');
		jQuery(".container").animate({
	 		"margin-left":""
	 	}) // animate method end
	 		jQuery(".header").animate({
	 		"margin-left":"6%",
	 	}); //animate method end
		} // else end*/

//Animations for mobile navigation
/* jQuery("#menu_a").click(function() {

		jQuery("#about, #work, #contact").fadeOut("fast");
		allNavA.removeClass('on');

	 	if (!container.is('.mobileNav')) {
	 		jQuery("#about, #work, #contact").fadeOut("fast");
			//container.addClass('mobileNav');
	 		jQuery(".header").animate({
	 		"margin-left":"61%",
	 	}); //animate method end
	 		jQuery(".container").animate({
	 		"margin-left":"75px"
	 	}) // animate method end

	 } //if end
	 else {
	 	jQuery("#about, #work, #contact, #home_a").fadeOut("fast");
		container.removeClass('mobileNav');
		jQuery(".container").animate({
	 		"margin-left":""
	 	}) // animate method end
	 		jQuery(".header").animate({
	 		"margin-left":"6%",
	 	}); //animate method end
		} // else end
	}); // click method end
//Animations for mobile navigation end

*/
