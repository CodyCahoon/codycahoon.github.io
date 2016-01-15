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

function toggle(mode)
{
    $(".nav-item").removeClass("selected-nav");
    switch (mode)
    {
        case 0:
        $(".about-grid").removeClass("hidden-top");
        $(".project-grid").addClass("hidden-right");
        $(".blog-grid").addClass("hidden-bottom");
        $(".contact-grid").addClass("hidden-right");

        $("#nav-list li:nth-child(5)").addClass("selected-nav");
        break;

        case 1:
        lastMovement = "hidden-top";

        $(".about-grid").addClass("hidden-top");
        $(".project-grid").removeClass("hidden-right");
        $(".blog-grid").addClass("hidden-bottom");
        $(".contact-grid").addClass("hidden-right");

        $("#nav-list li:nth-child(6)").addClass("selected-nav");

        break;


        case 2:
        $(".about-grid").addClass("hidden-top");
        $(".project-grid").addClass("hidden-right");
        $(".blog-grid").removeClass("hidden-bottom");
        $(".contact-grid").addClass("hidden-right");

        $("#nav-list li:nth-child(7)").addClass("selected-nav");
        break;

        default:
        $(".about-grid").addClass("hidden-top");
        $(".project-grid").addClass("hidden-right");
        $(".blog-grid").addClass("hidden-bottom");
        $(".contact-grid").removeClass("hidden-right");

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
