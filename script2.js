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

function toggle(mode)
{
    $(".nav-item").removeClass("selected-nav");
    switch (mode)
    {
        case 0:
       $("#about-page").removeClass("hide-about");
       $("#project-page").addClass("hide-project");
       $("#blog-page").addClass("hide-blog");
       $("#contact-page").addClass("hide-contact");

        $("#nav-list li:nth-child(5)").addClass("selected-nav");
        break;

        case 1:
        $("#about-page").addClass("hide-about");
        $("#project-page").removeClass("hide-project");
        $("#blog-page").addClass("hide-blog");
        $("#contact-page").addClass("hide-contact");

         $("#nav-list li:nth-child(6)").addClass("selected-nav");

        break;


        case 2:

        $("#about-page").addClass("hide-about");
        $("#project-page").addClass("hide-project");
        $("#blog-page").removeClass("hide-blog");
        $("#contact-page").addClass("hide-contact");

        $("#nav-list li:nth-child(7)").addClass("selected-nav");
        break;

        default:

        $("#about-page").addClass("hide-about");
        $("#project-page").addClass("hide-project");
        $("#blog-page").addClass("hide-blog");
        $("#contact-page").removeClass("hide-contact");


        $("#nav-list li:nth-child(8)").addClass("selected-nav");

        break;
    }
}

$(document).mousemove(function(event) {
    var currentMousePos = { x: -1, y: -1 };

    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
    //    console.log(currentMousePos);
});

function resize(){
    var size = $(window).width();
    size -= $("nav").width();
    size -= 100;
    //$("#main").width(size);

}
