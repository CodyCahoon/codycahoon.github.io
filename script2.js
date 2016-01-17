$("#nav-list li:nth-child(5)").click(function(){
    toggle(0);
});

$("#nav-list li:nth-child(6)").click(function(){
    toggle(1);
});

$("#nav-list li:nth-child(7)").click(function(){
    toggle(2);
});

$("#nav-list li:nth-child(8)").click(function(){
    toggle(3);
});

$(window).resize(resize);
$(document).ready(resize);

function toggle(mode)
{
    $(".nav-item").removeClass("selected-nav");
    $("#nav-list li:nth-child(" + (mode + 5) + ")").addClass("selected-nav");

    switch (mode)
    {
        case 0:
        $("#about-page").removeClass("hide-about");
        $("#project-page").addClass("hide-project");
        $("#blog-page").addClass("hide-blog");
        $("#contact-page").addClass("hide-contact");
        break;

        case 1:
        $("#about-page").addClass("hide-about");
        $("#project-page").removeClass("hide-project");
        $("#blog-page").addClass("hide-blog");
        $("#contact-page").addClass("hide-contact");
        break;

        case 2:
        $("#about-page").addClass("hide-about");
        $("#project-page").addClass("hide-project");
        $("#blog-page").removeClass("hide-blog");
        $("#contact-page").addClass("hide-contact");
        break;

        default:
        $("#about-page").addClass("hide-about");
        $("#project-page").addClass("hide-project");
        $("#blog-page").addClass("hide-blog");
        $("#contact-page").removeClass("hide-contact");
        break;
    }
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

function imgFit()
{
    var width = $(this).width();
    var height = $(this).height();
    var min = Math.min(width, height);

    var imgWidth = $(this).find("img").width();
    var imgHeight = $(this).find("img").height();

    if (imgWidth >= imgHeight)
    {
        $(this).find("img").height(min);
    }
    if (imgHeight >= imgWidth){
        $(this).find("img").width(min);
    }
}

function resize()
{
    $("#about-page .grid div:first-child").each(imgFit);
    $("#about-page .grid div:last-child").each(textFit);
}
