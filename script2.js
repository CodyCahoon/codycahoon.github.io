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

$(window).resize(textFit);

$(document).ready(textFit);

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
    $('.grid div p').css('font-size', '22.5px');
    while( $('.grid div p').height() > $('.grid div:nth-child(2)').height() ) {
        $('.grid div p').css('font-size', (parseInt($('.grid div p').css('font-size')) - 0.5) + "px" );
    }

    //Resizes the profile image
    var width = $("#about-page .grid div:first-child").width();
    var height = $("#about-page .grid div:first-child").height();
    var min = Math.min(width, height);
    $("#prof-img").height(min);
    $("#prof-img").width(min);



}
