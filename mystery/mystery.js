// Stores passwords to specific html pages
var passwords = {
    'architect'       : 'build',
    'botanist'        : 'bitcoin',
    'chef'            : 'cook',
    'collector'       : 'wutwut',
    'doctor'          : 'cure',
    'genetic-engineer': 'spud',
    'inventor'        : 'toetoe',
    'manufacturer'    : 'toast',
    'meteorologist'   : 'cloud',
    'miner'           : 'coke',
    'traveler'        : 'enews'
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
    var prompt = window.prompt('Access to ' + characterName + ', please enter password');
    var password = passwords[characterName];
    var isCorrectPassword = password === prompt;
    if (isCorrectPassword) {
        var href = window.location.href;
        var index = href.indexOf('index.html');
        if (index > -1) {
            href = href.substring(0, index);
        }
        var url = 'characters/' + characterName + '/' + characterName + '.html';
        window.location.href = href + url;
    }
}
