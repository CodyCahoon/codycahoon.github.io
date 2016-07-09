(function(){
    'use strict';
    var $commandLine = $(".command-line");
    var newLine = '<li class="line current-line"><span class="command"></span><span class="next-letter">*</span></li>';
    var commands = [];
    var currentCommand = "";
    var currentCommandLength = 0;
    var $currentCommand = $(".current-line .command");

    $("body").on("keypress", function(e){
        addNewLetter(e.keyCode);
    });

    function addNewLetter(key) {
        currentCommandLength++;
        currentCommand += String.fromCharCode(key);
        $currentCommand.html(currentCommand);
    }

    function removeLetter() {
        if (currentCommandLength > 0) {
            currentCommand = currentCommand.substring(0, --currentCommandLength);
            $currentCommand.html(currentCommand);
        }
    }

    Mousetrap.bind("enter", function(){
        newCommand();
        removeOldCommand();
        addNewEmptyLine();
    });

    function newCommand(){
        commands.push(currentCommand);
        currentCommand = "";
        currentCommandLength = 0;
    }

    function removeOldCommand() {
        $(".next-letter").remove();
        $(".current-line").removeClass("current-line");
    }

    function addNewEmptyLine() {
        $commandLine.append(newLine);
        $currentCommand = $(".current-line .command");
        $commandLine.scrollTop($commandLine.height());
    }


    /** Code for disabling navigating backwards when backspace is typed
        http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
    */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function(e){
        if( e.which == 8 ) { //backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
                removeLetter();
            }
        }

    });



})();
