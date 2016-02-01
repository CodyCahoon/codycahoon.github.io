$(document).ready(function(){

        setTimeout(function(){
            resize();
        }, 40);

});
$(window).resize(function(){
    resize();
});


var toggleProject = [false, false, false, false, false];
$("#page-2 .grid").click(function(){


    toggleProject[$(this).index()] = !toggleProject[$(this).index()];
    if (toggleProject[$(this).index()])
    {
        $("#page-2 .grid").addClass("hidden");
        $(this).removeClass("hidden");
        $(this).addClass("full-width-height");
        $("#page-2 .grid:nth-child(" + ($(this).index() + 1) + ") p:nth-child(n + 3)").removeClass("hidden");
    }
    else {
        $("#page-2 .grid").removeClass("hidden");
        $(this).removeClass("full-width-height");
        $("#page-2 .grid:nth-child(" + ($(this).index() + 1) + ") p:nth-child(n + 3)").addClass("hidden");


    }
});

function resize()
{
    //Fit image-only divs
    $(".grid div").each(function(){
        imgFit($(this), 1);
    });

    //Fit paragraph-only divs
    $(".grid div").each(function(){
        paragraphsFit($(this));
    });

    checkSize();
}

$("nav li").click(function(){
    toggle($(this).index() + 1);
});

$("nav > img").click(function(){
    toggle(1);
});

function toggle(index){
    $("nav li").removeClass("selected");
    $("nav li:nth-child(" + index + ")").addClass("selected");

    $(".page").each(function(){
        $(this).addClass("hide-" + ($(this).index() + 1));
    });

    $(".page:nth-child(" + index + ")").removeClass("hide-" + index);

}

/**
* Altered from StackOverflow
* http://stackoverflow.com/questions/6112660/how-to-automatically-change-the-text-size-inside-a-div
*
*/
function paragraphsFit(parent)
{
    var numParagraphs = parent.find("p").length;
    // Makes the text fit correctly in its grid
    //Max of 22.5px when full screen, move down from that value
    if (numParagraphs < 2)
    {
        parent.find("p").css('font-size', '24px');
        while( parent.find("p").height() > parent.height() ) {
            parent.find("p").css('font-size', (parseInt(parent.find("p").css('font-size')) - 1) + "px" );
        }
    }

    else{
        window.total = 0;
        parent.find("p").css('font-size', '24px');
        parent.find("p").each(getHeight);
            while( window.total > parent.height() ) {
                parent.find("p").css('font-size', (parseInt(parent.find("p").css('font-size')) - 1) + "px" );
                window.total = 0;
                parent.find("p").each(getHeight);
            }
    }
}

function imgFit(parent, scale, isNav)
{
    var width = parent.width();
    var height = parent.height();
    var min = Math.min(width, height) * scale;

    var imgWidth = parent.find("img").width();
    var imgHeight = parent.find("img").height();

    if(isNav){
        parent.find("img").width(min);
        parent.find("img").height(min);
    }
    else {
        if (imgHeight > imgWidth){
            parent.find("img").width(min);
        }
        else{
            parent.find("img").height(min);
        }
    }

}

function getHeight()
{
    if (typeof $(this).height() === "number" )
    {
        window.total +=  Number($(this).height());
    }
}

function checkSize(){


    if ($(window).width() < 768)
    {
        $("nav span").addClass("hidden");
        $("nav > img").addClass("hidden");

        $("nav").each(function(){
            imgFit($(this), 0.7, true);
        });

    }

    else {
        $("nav li").each(function(){
            imgFit($(this), 0.40, true);
        });

        $("nav img").removeClass("hidden");
        $("nav span").removeClass("hidden");

        var w = $("nav").width() * 0.75;
        w = Math.min(130, w);
        $("nav > img:first-child").width(w);
        $("nav > img:first-child").height(w);
    }
}
