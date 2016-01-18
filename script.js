$(document).ready(resize);
$(window).resize(resize);

function resize()
{
    $("nav li").each(function(){
        var width = $(this).width();
        var height = $(this).height();
        var min = Math.min(width, height);
        $(this).find("img").width(min * 0.75);
        $(this).find("img").height(min * 0.75);

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
}
