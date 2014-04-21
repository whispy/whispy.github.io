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
    		if($('#selfieDiv').hasClass('on')) {
    			console.log('hi');
			panel.removeClass("showDiv");
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
		$('header a div').addClass('on');
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


$(window).on('pronto.request', function(e, event
