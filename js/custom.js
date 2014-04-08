function fancyNav(selector) {
	var menuItems = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(menuItems); // call the function 'bindListeners' with the variable 'menuItems'

	function resetDivs() {
		panel.css({
			"visibility":"hidden",
			"opacity":"0.0",
			"width":"",
			"margin-right":"",
			"left":"",
		});
		workDisplay.css({
			"visibility":"hidden",
			"opacity":"0.0",
		});
	}; // resetDivs end

	loadContent = function(toLoad) { // Inline loading of content
    	var toFetch = toLoad + '.html' + ' .content ';
    	window.location.hash = toLoad
    	
    	panel.load(toFetch);
    	panel.css({
    		"opacity":"0.0",
    		"visibility":"visible",
    	}).animate({
    		"opacity":"1.0",
    	}, 500, "easeInOutCubic");
	} // loadContent end

	function bindListeners() {
    	$('.navigation').on('click', 'a', function() {
    		resetDivs(); // fix flashing on this -> try to cache data somehow
        	var toLoad = $(this).attr('href').replace('.html', '');
        	var headerWrapperWidth = $('#headerWrapper').width();
        	var panelLeft = $('#indexPanel').offset().left - headerWrapperWidth;

			if(width>=1400) {
			$('#headerWrapper').animate({
       			"margin-left":panelLeft,
   			 }, "easeInOutQuart" ) 
			}

			if(width<=1399 && width>=778) {
        	var panelLeft1399 = panelLeft + 50;
			$('#headerWrapper').animate({
       			"margin-left":panelLeft1399,
   			 }, "easeInOutQuart" ) 
			}

			if(width<=777) {
			$('#headerWrapper').animate({
       			"margin-left":"0%",
   			 }, "easeInOutQuart" ) 
			}

        	loadContent(toLoad); // call the function 'loadContent'
        	return false; // Inline loading of content end
    	});
	} //bindListeners end

	$("#logo").click(function() {
		resetDivs();
		$("#headerWrapper").animate({
			"margin-left":headerLeft,
		}, "easeInOutQuart"); //animate method end
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
		workDisplay.css({
    		"opacity":"0.0",
    		"visibility":"visible",
    	}).animate({
    		"opacity":"1.0",
    	}, 300);
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

					panel.css({
						"width":"100px",
						"left":(0 - panelRight) + 100
					}).animate({
						"left":panelRight + 110 // scrollbar width 17. problems if going from scrollbar -> no scrollbar (doesn't take into account scrollbar width)
					}, 300 , "easeOutQuart");
					
					$('.imgDiv').css({
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

 
$(document).ready(function () { // when the DOM is fully loaded, execute the contents of this anonymous function

	width = $(window).width();
	headerLeft = $('#headerWrapper').offset().left;
	$('#headerWrapper').css({
       "margin-left":headerLeft,
    })
	panelRight = $('#indexWorkDisplay').width();

	panel = $('.panel');
	workDisplay = $('.workDisplay');


	function setWorkThumbs(data) {
		var workThumbs = '.imgDiv a'
		fancyWork(workThumbs);
		return workThumbs;
	}

	function getWorkThumbs() {
		return $.get("work.html");
	}

	window.onhashchange = workHashChange
	function workHashChange() { // if the hash is not #work and changes to work, this fires
		if (window.location.hash === '#work') {
			getWorkThumbs().then(setWorkThumbs);
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

        var headerWrapperWidth = $('#headerWrapper').width();
        var panelLeft = $('#indexPanel').offset().left - headerWrapperWidth;
		var navClick = $('.navigation').find(currHash);
		if (navClick.length)  {
			headerLeft = $('#headerWrapper').offset().left;
							console.log('hi');
			if(width>=1400) {
				$('#headerWrapper').css({
      				 "margin-left":panelLeft,
   				})
			}

			if(width<=1399 && width>=778) {
				var panelLeft1399 = panelLeft + 50;
				$('#headerWrapper').css({
      				 "margin-left":panelLeft1399,
   				})
			}
		}

	if(width<=777) {
		var mobileMenu = '#offCanvasMenu li';
		fancyMobileNav(mobileMenu);
		//container.addClass('mobileNav');
	} // if end
	else {
		//container.removeClass('mobileNav');
		container.css('margin-left','');
	} //else end
}

$(window).resize(function() {
		
	checkSize();
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