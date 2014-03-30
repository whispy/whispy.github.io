// Figure out how to do dynamic insertion of elements so the code becomes less of a repetitious mess.
/*
var fancyDan = (function() { // define the globally scoped variable 'fancyDan' and set it equal to this immediately invoked anonymous function expression (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
 
function init(selector) { // define the function 'init' that takes a single argument
 
var menuItems = $(selector); // set the variable 'menuItems' to all elements that match the contents of variable 'selector' using jQuery

bindListeners(menuItems); // call the function 'bindListeners' with the variable 'menuItems'
 
} // init

function loadContent() { // Inline loading of content
var toLoad = jQuery(this).attr('href')+' .content';
window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5); //append url
//window.location = jQuery(this).attr('href');
$('#about').load(toLoad); // select the element with id 'about' and load it with data returned from the function 'toLoad' (currently the 'toLoad' function doesn't exist in this context)
$('#about').show(); // display/show the element with id 'about'
}

var hash = window.location.hash.substr(1);
var href = $('#nav li a').each(function(){
    var href = $(this).attr('href');
    if(hash==href.substr(0,href.length-5)){
        var toLoad = hash+'.html #content';
        $('#content').load(toLoad)
    }
});
 
function bindListeners(menuItems) { // define the function 'bindListeners' that takes a single argument
 
	menuItems.each(function(key) { // for each of the elements in the variable 'menuItems' call the anonymous function (generally referred to as a callback) with a single argument that denotes the current index of the for loop (aka the variable 'key')
	var id = $(menuItems[key]).children().attr('id'); // set the variable 'id' to the first id returned from the first child of all children elements within the current menuItem (which is selected/indexed by the variable 'key') using jQuery

		$('#' + id).on('click', function(e) { // bind this jQuery click event handler to the element that has the variable 'id' as its identifier (when a click event occurs on an id that is being listened to)
			menuItems.children().removeClass('on'); // remove the 'on' class for all elements inside all menuItems
			$(e.target).addClass('on'); // add the class 'on' to the element we just clicked on
			$('#header').animate({"margin-left":"6%"}); // animate the header shifting to the left
			loadContent(); // call the function 'loadContent' (currently the 'loadContent' function doesn't exist in this context)
 			return false;	// Inline loading of content end
		}); // #+id click event handler
	}); // menuItems.each
} // bindListeners
 
return {
	init: init // exposes the function 'init' to anything that wants to use 'fancyDan' (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
};
 
})(); // fancyDan
 
 
$(document).ready(function() { // when the DOM is fully loaded, execute the contents of this anonymous function
 	var navSelector = '#menu li'; // set the variable 'navSelector' to the all 'li' elements inside the element with id 'menu'
 	fancyDan.init(navSelector); // call the function 'init' on the module 'fancyDan' with navSelector as an argument to the function 'init'
}); // $(document).ready
*/
jQuery(document).ready(function() {
	var aboutA = jQuery("#about_a");
	var workA = jQuery("#work_a");
	var contactA = jQuery("#contact_a");
	var home = jQuery("#home_a");
	var allNavA = jQuery("#about_a, #work_a, #contact_a")
	var container = jQuery(".container");
	var width = $(window).width();

//Desktop navigation

	//Clicking on About
	 jQuery("#about_a").click(function() {
		var toLoad = jQuery(this).attr('href')+' .content';
		if(width<=777) {
  			container.addClass('mobileNav'); //why is this not working?
  		} // if end
  		else {	
		 if (!aboutA.is('.on')) {
			aboutA.addClass('on');
		 	jQuery(".header").animate({
		 	"margin-left":"6%",
		 	}); //animate method end
		 	jQuery("#about").fadeIn("slow");
		 	jQuery("#contact, #work").hide();
		 	window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5); //append url
			
			function loadContent() {	// Inline loading of content
	       	 jQuery('#about').load(toLoad)
	       	 jQuery('#about').show();
	    	}	
	    	loadContent();
	    	return false;	// Inline loading of content end
		 } else {
		 	aboutA.removeClass('on');
		 	jQuery("#contact, #work").hide();
		 	jQuery("#about").fadeIn("slow");
		 	window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5); //append url
			
			function loadContent() {	// Inline loading of content
	       	 jQuery('#about').load(toLoad)
	       	 jQuery('#about').show();
	    	}	
	    	loadContent();
	    	return false;	// Inline loading of content end
			} // else end
		} //else end
	}); // click method end

	 //Clicking on Work
	 jQuery("#work_a").click(function() {
	 	var toLoad = jQuery(this).attr('href')+' .content';
		if(width<=777) {
  			container.addClass('mobileNav'); //why is this not working?
  		} // if end
  		else {	
		 	if (!workA.is('.on')) {
				workA.addClass('on');
		 		jQuery(".header").animate({
		 		"margin-left":"6%",
		 	}); //animate method end
		 		jQuery("#work").fadeIn("slow");
		 		jQuery("#contact, #about").hide();
		 	window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5); //append url
			
			function loadContent() { // Inline loading of content
	       	 jQuery('#work').load(toLoad)
	       	 jQuery('#work').show();
	    	}	
	    	loadContent();
	    	return false;	// Inline loading of content end

		 } else {
		 	workA.removeClass('on');
		 	jQuery("#contact, #about").hide();
		 	jQuery("#work").fadeIn("slow");
		 	window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5); //append url
			
			function loadContent() { // Inline loading of content
	       	 jQuery('#work').load(toLoad)
	       	 jQuery('#work').show();
	    	}	
	    	loadContent();
	    	return false;	// Inline loading of content end
		} // else end
	} //else end
	}); // click method end

	 //Clicking on Contact
	 jQuery("#contact_a").click(function() {
	 	var toLoad = jQuery(this).attr('href')+' .content';
	 	if(width<=777) {
  			container.addClass('mobileNav'); //why is this not working?
  		} // if end
  		else {	
		 	if (!contactA.is('.on')) {
				contactA.addClass('on');
		 		jQuery(".header").animate({
		 		"margin-left":"6%",
		 	}); //animate method end
		 		jQuery("#contact").fadeIn("slow");
		 		jQuery("#work, #about").hide();
			window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5); //append url
		 	
		 	function loadContent() { // Inline loading of content
	       	 jQuery('#contact').load(toLoad)
	       	 jQuery('#contact').show();
	    	}	
	    	loadContent();
	    	return false;	// Inline loading of content end
		 } else {
		 	contactA.removeClass('on');
		 	jQuery("#work, #about").hide();
		 	jQuery("#contact").fadeIn("slow");
		 	window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5); //append url
		 	
		 	function loadContent() { // Inline loading of content
	       	 jQuery('#contact').load(toLoad)
	       	 jQuery('#contact').show();
	    	}	
	    	loadContent();
	    	return false;	// Inline loading of content end
			} // else end
		} //else end
	}); // click method end

	 //Clicking on Home or logo
	 jQuery("#home_a, #logo").click(function() {

	 	if (!home.is('.on')) {
			home.addClass('on');
	 		jQuery(".header").animate({
	 		"margin-left":"37.5%",
	 	}); //animate method end
	 		jQuery("#about, #work, #contact").hide();
			allNavA.removeClass('on');
	 } else {
	 		home.removeClass('on');
			jQuery(".header").animate({
	 		"margin-left":"37.5%",
	 	}); //animate method end
			jQuery("#about, #work, #contact").hide();
			allNavA.removeClass('on');
		} // else end
	}); // click method end
//Desktop navigation end


//Get window size
function checkSize() {
 var width = $(window).width();
 var container = jQuery(".container");
  if(width<=777) {
  	container.addClass('mobileNav');
  } // if end
  else {
  	jQuery("#home_a").show();
  	container.removeClass('mobileNav');
  	container.css('margin-left','');
  } //else end
}

checkSize();
$(window).resize(function() {
  checkSize();
});
//Get window size end
*/
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
	 		/*jQuery(".container").animate({
	 		"margin-left":"75px"
	 	}) // animate method end

	 } //if end
	 else {
	 	jQuery("#about, #work, #contact, #home_a").fadeOut("fast");
		container.removeClass('mobileNav');
		/*jQuery(".container").animate({
	 		"margin-left":""
	 	}) // animate method end
	 		jQuery(".header").animate({
	 		"margin-left":"6%",
	 	}); //animate method end
		} // else end
	}); // click method end
//Animations for mobile navigation end

}); //ready method end

	// Code to get linking to work somehow
	/*var hash = window.location.hash.substr(1);
	var href = $('#about_a').each(function(){
    	var href = $(this).attr('href');
    	if(hash==href.substr(0,href.length-5)){
        	var toLoad = hash+'.html #content';
        	$('#content').load(toLoad)
    	}
	}); */
