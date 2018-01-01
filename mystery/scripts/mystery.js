var passwords = {
    botanist: 'plant',
    chef: 'cook',
    collector: 'items',
    doctor: 'cure',
    engineer: 'fix'
};

function toggleClue(clueNumber) {
    var clue = document.getElementById('clue-' + clueNumber);
    if (clue) {
        var isHidden = clue.classList.contains('hidden');
        if (isHidden) {
            clue.className = 'open-clue';
        } else {
            clue.className = 'open-clue hidden';
        }
    }
}

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
        window.location.href = href + 'characters/' + characterName + '.html';
    } else {
        console.log(false);
    }
}
