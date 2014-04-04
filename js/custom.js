function fancyNav(selector) {
	var menuItems = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(menuItems); // call the function 'bindListeners' with the variable 'menuItems'

	function resetDivs() {
		$('.panel').hide().css({
			"width":"",
			"margin-right":"",
		});
		$(".workDisplay").hide().css({
			"min-height":"",
			"height":"",
		});
	}; // resetDivs end

	loadContent = function(toLoad) { // Inline loading of content
    	var toFetch = toLoad + '.html' + ' .content ';
    	window.location.hash = toLoad
    	resetDivs();
    	$('.panel').load(toFetch);
    	$('.panel').fadeIn();
	} // loadContent end

	function bindListeners() {
    	$('.navigation').on('click', 'a', function() {
        	var toLoad = $(this).attr('href').replace('.html', '');
        	var headerLeft = $('#header').position().left;
        	$('#header').css({
        		"margin-left":"headerLeft",
        	})
        	console.log(headerLeft);
			$('#header').animate({
				"margin-left":"6%"
			}, "easeInOutQuart" );        
        	loadContent(toLoad); // call the function 'loadContent'
        	return false; // Inline loading of content end
    	});
	} //bindListeners end

	$("#logo").click(function() {
		resetDivs();
		$("#header").animate({
			"margin-left":"",
		}, "easeInOutQuart"); //animate method end
	}); // click method end

}; // fancyNav

function fancyWork(selector) {
	var workThumbs = $(selector); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
	bindListeners(workThumbs); // call the function 'bindListeners' with the variable 'menuItems'

	function loadPieces(toLoad) { // Inline loading of content
		var toFetch = toLoad + '.html' + ' .work ';
		//window.location.hash = toLoad
		$('.workDisplay').load(toFetch);
		workDisplaySize();
	} // Inline loading of content end

	function workDisplaySize() {
		$('.workDisplay').css({
			"min-height":"100%",
			"height":"auto",
		}, workDisplayFadeIn() );
	};

	function workDisplayFadeIn() {
		$('.workDisplay').animate({
			"opacity":"1"
		});
		$('.workDisplay').fadeIn(150, "easeInOutQuad");
	};

	function bindListeners() {
    	$('.imgDiv').on('click', 'a', function() {
    		var toLoad = $(this).attr('href').replace('.html', '');
    		var width = $(window).width();
			//$('.workDisplay').fadeOut(50, "easeInOutQuad");
			if(width<=777) {
				$('.panel').fadeOut();
				console.log('hi');
				loadPieces(toLoad);
				return false;
			}
			else {
				$('.content').animate({
					"margin-top":"",
				}, 300 , "easeInOutQuart");
				$('.panel').animate({
					"width":"100px",
					"margin-right":"0px",
				}, 300 , "easeInOutQuart");
				$('.imgDiv').animate({
					"width":"80px",
					"height":"80px",
					"margin-top":"10px"
				}, 300 , "easeInOutQuart" );
				loadPieces(toLoad);
				return false;
			}
    	}); //click function end
    }; //bindListeners end

}; // fancyWork
 
 
$(document).ready(function () { // when the DOM is fully loaded, execute the contents of this anonymous function

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

		var $navClick = $('.navigation').find(currHash);
		if ($navClick.length) {
			fancyNav(navSelector); // call the function fancyNav with navSelector as an argument
			$navClick.trigger('click');
			if (currHash === '#work') {
				getWorkThumbs().then(setWorkThumbs);
			}
		}

		var $pieceClick = $('.imgDiv').find(currHash);
		if ($pieceClick.length) {
			getWorkThumbs().then(setWorkThumbs);
			$pieceClick.trigger('click');
		}
	} //hashChange end

	hashChange();
	checkSize();

}); // $(document).ready

//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");
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
    	$('.menuButton').on('click', 'a', function() {
    		console.log('tacobell');
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