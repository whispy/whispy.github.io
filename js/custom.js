function fancyNav(selector) {
	var menuItems = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(menuItems); // call the function 'bindListeners' with the variable 'menuItems'



	function resetDivs() {
		panel.removeClass("showDiv");
		panel.removeClass("panelSidebar");
		panel.addClass("resetDiv");
		/*panel.css({
			"width":"",
			"margin-right":"", // figure out how to do this stuff with classes, if possible
			"left":"",
		});*/
		workDisplay.removeClass("showDiv")
		workDisplay.addClass("resetDiv");
	}; // resetDivs end
	
	function showDivs() {
		panel.removeClass("resetDiv");
    	panel.addClass("showDiv")
	}; //showDivs end

	loadContent = function(toLoad) { // Inline loading of content
    		var toFetch = toLoad + '.html' + ' .content ';
    		window.location.hash = toLoad
    		
    		panel.load(toFetch);
    		resetDivs();
    		showDivs();
	} // loadContent end

	function bindListeners() {
    	$('.navigation').on('click', 'a', function() {
    		resetDivs(); // fix flashing on this -> try to cache data somehow
        	var toLoad = $(this).attr('href').replace('.html', '');
			var headerWrapperWidth = $('#headerWrapper').width();
    		var panelLeft = $('#indexPanel').offset().left - headerWrapperWidth;

			if(width>=1400) {
			$.stylesheet('#headerWrapper.panelLeft').css({
       			"margin-left":panelLeft + 'px',
   			 }) 
			}

			if(width<=1399 && width>=778) {
        		var panelLeft1399 = panelLeft + 50;
			$.stylesheet('#headerWrapper.panelLeft').css({
       			"margin-left":panelLeft1399 + 'px',
   			 }) 
			}

			if(width<=777) {
			$.stylesheet('#headerWrapper.panelLeft').css({
       			"margin-left":"0%",
   			 }) 
			}
		$('#headerWrapper').addClass('panelLeft'); // use YUI instead?

        	loadContent(toLoad); // call the function 'loadContent'
        	return false; // Inline loading of content end
    	});
	} //bindListeners end

	$("#selfieDiv").click(function() {
		resetDivs();
		$.stylesheet('#headerWrapper.panelLeft').css({
			"margin-left":headerCenter + 'px',
		});
		$('#headerWrapper').addClass('panelLeft');
	}); // click method end

}; // fancyNav

function fancyWork(selector) {
	var workThumbs = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(workThumbs); // call the function 'bindListeners' with the variable 'menuItems'

	function loadPieces(toLoad) { // Inline loading of content
		var toFetch = toLoad + '.html' + ' .work ';
		window.location.hash = toLoad
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
					$('.content').animate({
						"margin-top":"0",
					}, 300 , "easeOutQuart");

					$.stylesheet("#indexPanel.panelSidebar").css({
						"left":panelRight + 110 + 'px' // scrollbar width 17. problems if going from scrollbar -> no scrollbar (doesn't take into account scrollbar width)
					});
		
					panel.addClass("panelSidebar");

					
					$('.content .imgDiv').css({
						"margin-top":"10px"
					}).animate({
						"width":"80px",
						"height":"80px",
					}, 300 , "easeOutQuart");
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
		window.location.hash = toLoad
				console.log('pippy');
				panel.load(toFetch);
				console.log(toFetch);
		console.log('trippy');

	} // Inline loading of content end

	
	function bindListeners() {
    	$('.content p').on('click', 'a', function() {
    		var toLoad = $(this).attr('href').replace('.html', '');
    		
			loadArticles(toLoad);
			return false;
			
    	}); //click function end
    }; //bindListeners end

}; // fancyBlog


 
$(document).ready(function () { // when the DOM is fully loaded, execute the contents of this anonymous function
 //console.log($.stylesheet('body').rules());
	//Defining global variables
	width = $(window).width();
	panel = $('.panel');
	workDisplay = $('.workDisplay');
	headerLeft = $('#headerWrapper').offset().left;
	headerCenter = (width / 2) - 109.5;
	panelRight = $('#indexWorkDisplay').width();

	
	$("#headerWrapper").addClass("panelLeft");
	panel.addClass("resetDiv");
	//console.log(headerLeft);
	$.stylesheet('#headerWrapper.panelLeft').css({
		"margin-left":headerCenter + 'px',
    })
    	//console.log($.stylesheet('#headerWrapper.panelLeft').rules());



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

	window.onhashchange = workHashChange
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

	hashChange();
	checkSize();

}); // $(document).ready




//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");
	currHash = window.location.hash

		var navClick = $('.navigation').find(currHash);
		if (navClick.length)  {
			if(width>=1400) {
				var headerWrapperWidth = $('#headerWrapper').width();
       			var panelLeft = $('#indexPanel').offset().left - headerWrapperWidth;
				console.log(panelLeft);
				$.stylesheet('#headerWrapper.panelLeft').css({
      				"margin-left":panelLeft + 'px',
   				})
			}

			if(width<=1399 && width>=778) {
				var headerWrapperWidth = $('#headerWrapper').width();
       			var panelLeft = $('#indexPanel').offset().left - headerWrapperWidth;
				var panelLeft1399 = panelLeft + 40;
				console.log(panelLeft1399);
				$.stylesheet('#headerWrapper.panelLeft').css({
      				"margin-left":panelLeft1399 + 'px',
   				})
			}
		}

	if(width<=777) {
		var mobileMenu = '#offCanvasMenu li';
		fancyMobileNav(mobileMenu);
		//container.addClass('mobileNav');
	} // if end
	
	//if(currHash === '') {
	//	$.stylesheet('#headerWrapper.panelLeft').css({
//       		"margin-left":""
    	//	})
//	}
	if(currHash === '') {
		var headerCenter = (width / 2) - 109.5;
				$.stylesheet('#headerWrapper.panelLeft').css({
      				"margin-left":headerCenter + 'px',
   				})
	} //else end

}

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
