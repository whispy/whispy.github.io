// Figure out how to do dynamic insertion of elements so the code becomes less of a repetitious mess.

var fancyDan = (function() {
 
var init = function(selector) {
var menuItems = $(selector);
 
bindListeners(menuItems);
 
},
 
bindListeners = function(menuItems) {
 
menuItems.each(function(key) {
var id = $(menuItems[key]).children().attr('id');
 
// bind all menu item click events
$('#' + id).on('click', function(e) {
menuItems.children().removeClass('on'); // remove the 'on' class for everything
$(e.target).addClass('on'); // add the class 'on' to the thing we just clicked on
$('#header').animate({"margin-left":"6%"}); // animate the header shifting to the left

function loadContent() {	// Inline loading of content
	       	 jQuery('#about').load(toLoad)
	       	 jQuery('#about').show();
	    	}	
	    	loadContent();
	    	return false;	// Inline loading of content end
 
});
 
});
 
}
 
return {
init: init
}
 
})();
 
jQuery(document).ready(function() {
 
var navSelector = '#menu li';
 
fancyDan.init(navSelector);
 
});

/*jQuery(document).ready(function() {
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
