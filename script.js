$(document).ready(function(){
    resize(true);
});
$(window).resize(function(){
    resize(false);
});


function resize(firstRun)
{
    $("nav li").each(function(){
        imgFit($(this), 0.75, true);
    });

    //Fit image-only divs
    $(".grid div").each(function(){
        imgFit($(this), 1, false);
    });

    //Fit paragraph-only divs

    $(".grid div").each(function(){
        paragraphsFit($(this), firstRun);
    });

}

$("nav li").click(function(){
    toggle($(this).index() + 1);
});

function toggle(index){
    $("nav li").removeClass("selected");
    if (index < 3)
    {
        index = 3;
    }
    $("nav li:nth-child(" + index + ")").addClass("selected");

    index -= 2;
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
function textFit()
{
    // Makes the text fit correctly in its grid
    //Max of 22.5px when full screen, move down from that value
    parent.find("p").css('font-size', '24px');
    while( parent.find("p").height() > parent.height() ) {
        parent.find("p").css('font-size', (parseInt(parent.find("p").css('font-size')) - 1) + "px" );
    }
}

function paragraphsFit(parent, firstRun)
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
        if(firstRun)
        {
            parent.find("p").css('font-size', (parseInt(parent.find("p").css('font-size')) - 1) + "px" );

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
