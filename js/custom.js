function fancyNav(selector) {
//var fancyNav = (function() { // define the globally scoped variable 'fancyNav' and set it equal to this immediately invoked anonymous function expression (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
	//function init(selector) { // define the function 'init' that takes a single argument
		var menuItems = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery
		bindListeners(menuItems); // call the function 'bindListeners' with the variable 'menuItems'
	//} // init

	function resetDivs() {
		$('.panel').hide().css({
			"width":"",
			"margin-right":"",
		});
		$("#workDisplay").hide().css({
			"min-height":"",
			"height":"",
		});
	};

	function loadContent() { // Inline loading of content
		var toLoad = $(this).attr('href') + ' .content ';
		window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5); //append url
		resetDivs();
		$('.panel').load(toLoad);
		$('.panel').fadeIn();
	} // Inline loading of content end
 
	function bindListeners(menuItems) { // define the function 'bindListeners' that takes a single argument
		menuItems.each(function(key) { // for each of the elements in the variable 'menuItems' call the anonymous function (generally referred to as a callback) with a single argument that denotes the current index of the for loop (aka the variable 'key')
			var id = $(menuItems[key]).children().attr('id'); // set the variable 'id' to the first id returned from the first child of all children elements within the current menuItem (which is selected/indexed by the variable 'key') using jQuery
			$('#' + id).on('click', function(e) { // bind this jQuery click event handler to the element that has the variable 'id' as its identifier (when a click event occurs on an id that is being listened to)
				//menuItems.children().removeClass('on');
				//$(e.target).addClass('on');
				$('#header').animate({
					"margin-left":"6%"
				}, "easeInOutQuart" );
				loadContent.call(this); // call the function 'loadContent'
				return false; // Inline loading of content end
			}); // #+id click event handler
		
			$("#logo").click(function() {
				resetDivs();
				//menuItems.children().removeClass('on');
				$(".header").animate({
					"margin-left":"37.5%",
				}, "easeInOutQuart"); //animate method end
			}); // click method end
		}); // menuItems.each
	} // bindListeners

	//return {
		//init: init // exposes the function 'init' to anything that wants to use 'fancyDan' (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
	//};
	}; // fancyNav

var fancyWork = (function() { // define the globally scoped variable 'fancyWork' and set it equal to this immediately invoked anonymous function expression (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
	function initThumbs(selectorThumbs) { // define the function 'initThumbs' that takes a single argument
		var workThumbs = $(selectorThumbs); // set the variable 'workThumbs' to all elements that match the contents of variable 'selector' using jQuery
		bindListenersThumbs(workThumbs); // call the function 'bindListeners' with the variable 'menuItems'
	} // initThumbs

	function loadPieces() { // Inline loading of content
		var toLoad = jQuery(this).attr('href') + ' #workDisplay .work '; //this doesn't go by each 'a'
		//window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5); //append url
		//$('#workDisplay').hide();
		$('#workDisplay').load(toLoad);
		workDisplaySize();
	} // Inline loading of content end

	function workDisplaySize() {
		//loadContent.call(this); // call the function 'loadContent'
		//return false;	// Inline loading of content end
		$('#workDisplay').css({
			"min-height":"100%",
			"height":"auto",
		}, workDisplayFadeIn() );
	};

	function workDisplayFadeIn() {
		$('#workDisplay').animate({
			"opacity":"1"
		});
		$('#workDisplay').fadeIn(150, "easeInOutQuad");
	};
 
	function bindListenersThumbs(workThumbs) { // define the function 'bindListenersThumbs' that takes a single argument
		workThumbs.each(function(key) { // for each of the elements in the variable 'workThumbs' call the anonymous function (generally referred to as a callback) with a single argument that denotes the current index of the for loop (aka the variable 'key')
			var idThumbs = $(workThumbs[key]).attr('id'); // set the variable 'id' to the first id returned from the first child of all children elements within the current menuItem (which is selected/indexed by the variable 'key') using jQuery
			$('#' + idThumbs).on('click', function(e) { // bind this jQuery click event handler to the element that has the variable 'id' as its identifier (when a click event occurs on an id that is being listened to)
				$('#workDisplay').fadeOut(50, "easeInOutQuad");
				$('.content').animate({
					"margin-top":"",
				}, 300 , "easeInOutQuart");
				$('.panel').animate({
					"width":"100px",
					"margin-right":"0px",
				}, 300 , "easeInOutQuart");
				loadPieces.call(this);
				$('.imgDiv').animate({
					"width":"80px",
					"height":"80px",
					"margin-top":"10px"
				}, 300 , "easeInOutQuart" );
				return false;
			}); // #+id click event handler
		}); // workThumbs.each
	} // bindListenersThumbs
	return {
		initThumbs: initThumbs // exposes the function 'init' to anything that wants to use 'fancyWork' (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
	};})(); // fancyWork
 
 
$(document).ready(function () { // when the DOM is fully loaded, execute the contents of this anonymous function
	var navSelector = '#menu li'; // set the variable 'navSelector' to the all 'li' elements inside the element with id 'menu'
	fancyNav(navSelector); // call the function 'init' on the module 'fancyDan' with navSelector as an argument to the function 'init'
     
	function setWorkThumbs(data) {
		//var workThumbs = $("<div>").append(data).find("#workThumbBG .content img")
		//$(".content").html(workThumbs);
		var workThumbs = '.imgDiv a'
		fancyWork.initThumbs(workThumbs);
		return workThumbs;
	}

	function getWork() {
		return $.get("work.html");
	}


	window.onhashchange = hashChange;
	function hashChange() {
		if (window.location.hash === "#work") {
			getWork().then(setWorkThumbs);
		}; //if end
		if (window.location.hash === "#about") {
			console.log('hi');
		}; //if end
		if (window.location.hash === "#contact") {
			console.log('hi');
		}; //if end
	} //hashChange end

	hashChange();

	/* var hash = window.location.hash.substr(1);
	var href = $('#menu ul li a').each(function () {
		var href = $(this).attr('href');
		if (hash === href.substr(0, href.length - 5)) {
			var toLoad = hash + '.html .content';
			$('.content').load(toLoad);
		}
	});*/

}); // $(document).ready

//Get window size
function checkSize() {
	var width = $(window).width();
	var container = jQuery(".container");
	if(width<=777) {
		container.addClass('mobileNav');
	} // if end
	else {
		container.removeClass('mobileNav');
		container.css('margin-left','');
	} //else end
}

checkSize();
$(window).resize(function() {
	checkSize();
}); 
//Get window size end

/*
//Animations for mobile navigation
 jQuery("#menu_a").click(function() {

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
