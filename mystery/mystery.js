// Stores passwords to specific html pages
var passwords = {
    'architect'       : 'build',
    'blogger'         : 'enews',
    'botanist'        : 'bitcoin',
    'chef'            : 'cook',
    'collector'       : 'wutwut',
    'doctor'          : 'cure',
    'Genetic Engineer': 'spud',
    'inventor'        : 'toetoe',
    'manufacturer'    : 'toast',
    'meteorologist'   : 'cloud',
    'miner'           : 'coke',
};



// Toggles visibility of the clue, will not display clues that are locked
function toggleClue(characterName, clueNumber) {
    var targetElement = event.currentTarget;
    var isLocked = targetElement.classList.contains('locked');
    if (isLocked) {
        return;
    }        

    var href = window.location.href;
    var index = href.indexOf(characterName + '.html');
    if (index > -1) {
            href = href.substring(0, index);
    }    
    window.location.href = href + characterName + '-clue-' + clueNumber + '.html';
}

// Opens the character's url, as long as the user types in correct password
function openCharacter(characterName) {
    /*var captializedName = characterName.charAt(0).toUpperCase() + characterName.substring(1);
    var prompt = window.prompt('Please enter password to access The ' + captializedName);
    var password = passwords[characterName];
    var isCorrectPassword = password === prompt;
    if (isCorrectPassword) {*/
        var href = window.location.href;
        var index = href.indexOf('index.html');
        if (index > -1) {
            href = href.substring(0, index);
        }
        var url = 'characters/' + characterName + '/' + characterName + '.html';
        window.location.href = href + url;
    //}
}
