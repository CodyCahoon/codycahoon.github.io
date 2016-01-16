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
    /*    moveToCenter(".about-grid");
        moveToBottom(".project-grid");
        moveToBottom(".blog-grid");
        moveToBottom(".contact-grid");*/

        $(".about-grid").removeClass("hidden-top");
       $(".project-grid").addClass("hidden-right");
       $(".blog-grid").addClass("hidden-bottom");
       $(".contact-grid").addClass("hidden-right");

        $("#nav-list li:nth-child(5)").addClass("selected-nav");
        break;

        case 1:
    /*    moveToBottom(".about-grid");
        moveToCenter(".project-grid");
        moveToBottom(".blog-grid");
        moveToBottom(".contact-grid");*/

        $(".about-grid").addClass("hidden-top");
               $(".project-grid").removeClass("hidden-right");
               $(".blog-grid").addClass("hidden-bottom");
               $(".contact-grid").addClass("hidden-right");

         $("#nav-list li:nth-child(6)").addClass("selected-nav");

        break;


        case 2:
        /*moveToBottom(".about-grid");
        moveToBottom(".project-grid");
        moveToCenter(".blog-grid");
        moveToBottom(".contact-grid");*/

        $(".about-grid").addClass("hidden-top");
       $(".project-grid").addClass("hidden-right");
       $(".blog-grid").removeClass("hidden-bottom");
       $(".contact-grid").addClass("hidden-right");

        $("#nav-list li:nth-child(7)").addClass("selected-nav");
        break;

        default:
    /*    moveToBottom(".about-grid");
        moveToBottom(".project-grid");
        moveToBottom(".blog-grid");
        moveToCenter(".contact-grid");*/

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

function moveToBottom(selector){
    $(selector).addClass("hidden-top");

    setTimeout(function(){
        $(selector).css({
            WebkitTransition : 'top 0s ',
            MozTransition    : 'top 0s',
            MsTransition     : 'top 0s',
            OTransition      : 'top 0s',
            transition       : 'top 0s'
        });
        $(selector).addClass("hidden-bottom");
        $(selector).removeClass("hidden-top");


    }, 600);

    setTimeout(function(){
        $(selector).css({
            WebkitTransition : 'top 0.6s',
            MozTransition    : 'top 0.6s',
            MsTransition     : 'top 0.6s',
            OTransition      : 'top 0.6s',
            transition       : 'top 0.6s'
        });
    }, 620);
}

function moveToCenter(selector)
{
    $(selector).removeClass("hidden-bottom");
}
