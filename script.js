$(document).ready(resize);
$(window).resize(resize);

function resize()
{
    $("nav li").each(function(){
        imgFit($(this), 0.75, true);
    });

    //Fit image-only divs
    $(".grid div").each(function(){
        imgFit($(this), 1, false);
    });

    //Fit paragraph-only divs
    $(".grid div").each(textFit);
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
    $(this).find("p").css('font-size', '24px');
    while( $(this).find("p").height() > $(this).height() ) {
        $(this).find("p").css('font-size', (parseInt($(this).find("p").css('font-size')) - 1) + "px" );
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
        if (imgWidth > imgHeight){
            parent.find("img").height(min);
        }
        else if (imgHeight > imgWidth){
            parent.find("img").width(min);
        }
        else {
            parent.find("img").width(min);
            parent.find("img").height(min);
        }
    }

}
