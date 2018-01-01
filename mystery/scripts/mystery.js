

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

function openClue(clueNumber) {
    
}