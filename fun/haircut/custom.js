function sliderPreMove() {
    var sliderPre = $("#sliderPre");
    var range = 9;

    sliderPre.slider({
        min: 1,
        max: range,
        value: 5
    });


    var position = sliderPre.position(),
    sliderPreWidth = sliderPre.width(),
    minX = position.left,
    maxX = minX + sliderPreWidth,
    tickSize = sliderPreWidth / range;

    $("div.pre").mousemove(function(e) {
        if (e.pageX >= minX && e.pageX <= maxX) {
            var val = (e.pageX - minX) / tickSize;
            //console.log(val)
            sliderPre.slider("value", val); 
            if(val > 0 && val < 1){
                $("img#pre").attr('src', 'images/PreHaircut-04.jpg')
            }
            if(val > 1 && val < 2){
                $("img#pre").attr('src', 'images/PreHaircut-03.jpg')
            }
            if(val > 2 && val < 3){
                $("img#pre").attr('src', 'images/PreHaircut-02.jpg')
            }
            if(val > 3 && val < 4){
                $("img#pre").attr('src', 'images/PreHaircut-01.jpg')
            }
            if(val > 4 && val < 5){
                $("img#pre").attr('src', 'images/PreHaircut-05.jpg')
            }  
            if(val > 5 && val < 6){
                $("img#pre").attr('src', 'images/PreHaircut-06.jpg')
            }
            if(val > 6 && val < 7){
                $("img#pre").attr('src', 'images/PreHaircut-07.jpg')
            }
            if(val > 7 && val < 8){
                $("img#pre").attr('src', 'images/PreHaircut-08.jpg')
            }
            if(val > 8){
                $("img#pre").attr('src', 'images/PreHaircut-09.jpg')
            }    
        }
    });

    $("div.pre").on("vmousemove", (function(e) {
        if (e.pageX >= minX && e.pageX <= maxX) {
            var val = (e.pageX - minX) / tickSize;
            //console.log(val)
            sliderPre.slider("value", val); 
            if(val > 0 && val < 1){
                $("img#pre").attr('src', 'images/PreHaircut-04.jpg')
            }
            if(val > 1 && val < 2){
                $("img#pre").attr('src', 'images/PreHaircut-03.jpg')
            }
            if(val > 2 && val < 3){
                $("img#pre").attr('src', 'images/PreHaircut-02.jpg')
            }
            if(val > 3 && val < 4){
                $("img#pre").attr('src', 'images/PreHaircut-01.jpg')
            }
            if(val > 4 && val < 5){
                $("img#pre").attr('src', 'images/PreHaircut-05.jpg')
            }  
            if(val > 5 && val < 6){
                $("img#pre").attr('src', 'images/PreHaircut-06.jpg')
            }
            if(val > 6 && val < 7){
                $("img#pre").attr('src', 'images/PreHaircut-07.jpg')
            }
            if(val > 7 && val < 8){
                $("img#pre").attr('src', 'images/PreHaircut-08.jpg')
            }
            if(val > 8){
                $("img#pre").attr('src', 'images/PreHaircut-09.jpg')
            }    
        }
    }));
};

function sliderPostMove() {
    var sliderPost = $("#sliderPost");
    var range = 9;

    sliderPost.slider({
        min: 1,
        max: range,
        value: 5
    });


    var position = sliderPost.position(),
    sliderPostWidth = sliderPost.width(),
    minX = position.left,
    maxX = minX + sliderPostWidth,
    tickSize = sliderPostWidth / range;

    $("div.post").mousemove(function(e) {
        if (e.pageX >= minX && e.pageX <= maxX) {
            var val = (e.pageX - minX) / tickSize;
            //console.log(val)
            sliderPost.slider("value", val); 
            if(val > 0 && val < 1){
                $("img#post").attr('src', 'images/PostHaircut-04.jpg')
            }
            if(val > 1 && val < 2){
                $("img#post").attr('src', 'images/PostHaircut-03.jpg')
            }
            if(val > 2 && val < 3){
                $("img#post").attr('src', 'images/PostHaircut-02.jpg')
            }
            if(val > 3 && val < 4){
                $("img#post").attr('src', 'images/PostHaircut-01.jpg')
            }
            if(val > 4 && val < 5){
                $("img#post").attr('src', 'images/PostHaircut-05.jpg')
            }  
            if(val > 5 && val < 6){
                $("img#post").attr('src', 'images/PostHaircut-06.jpg')
            }
            if(val > 6 && val < 7){
                $("img#post").attr('src', 'images/PostHaircut-07.jpg')
            }
            if(val > 7 && val < 8){
                $("img#post").attr('src', 'images/PostHaircut-08.jpg')
            }
            if(val > 8){
                $("img#post").attr('src', 'images/PostHaircut-09.jpg')
            }        
        }
    });

 $("div.post").on("vmousemove", (function(e) {
        if (e.pageX >= minX && e.pageX <= maxX) {
            var val = (e.pageX - minX) / tickSize;
            //console.log(val)
            sliderPost.slider("value", val); 
            if(val > 0 && val < 1){
                $("img#post").attr('src', 'images/PostHaircut-04.jpg')
            }
            if(val > 1 && val < 2){
                $("img#post").attr('src', 'images/PostHaircut-03.jpg')
            }
            if(val > 2 && val < 3){
                $("img#post").attr('src', 'images/PostHaircut-02.jpg')
            }
            if(val > 3 && val < 4){
                $("img#post").attr('src', 'images/PostHaircut-01.jpg')
            }
            if(val > 4 && val < 5){
                $("img#post").attr('src', 'images/PostHaircut-05.jpg')
            }  
            if(val > 5 && val < 6){
                $("img#post").attr('src', 'images/PostHaircut-06.jpg')
            }
            if(val > 6 && val < 7){
                $("img#post").attr('src', 'images/PostHaircut-07.jpg')
            }
            if(val > 7 && val < 8){
                $("img#post").attr('src', 'images/PostHaircut-08.jpg')
            }
            if(val > 8){
                $("img#post").attr('src', 'images/PostHaircut-09.jpg')
            }        
        }
    }));
};

$(document).ready(function () {

sliderPreMove();
sliderPostMove();

});