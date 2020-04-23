(function() {
    'use strict';
    const links = Array.from(document.getElementsByClassName('nav-item'));
    const pages = Array.from(document.getElementsByClassName('content'));

    links.forEach((link, index) => {
        link.addEventListener('click', () => renderPage(index))
    });
     
    function renderPage(index = 0) {
        pages.forEach(p => p.style.display = 'none');
        links.forEach(l => l.classList.remove('nav-item--selected'));
        links[index].classList.add('nav-item--selected');
        pages[index].style.display = 'flex';
    }

    renderPage();
})();