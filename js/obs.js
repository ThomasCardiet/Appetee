const ratio = .6;

/**
 *
 * @param {HTMLElement} elem
 */
const activate = function (elem) {
    const id = elem.getAttribute('id');
    // on connecte la section avec le bouton
    const anchor = document.querySelector('a[href="#' + id + '"]');
    if(anchor === null) return null;
    // on retire la classe active de tous les autres boutons
    anchor.parentElement
        .querySelectorAll('.active')
        .forEach(node => node.classList.remove('active'))
    anchor.classList.add('active');
}

/**
 *
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
const callback = function (entries, observer) {
    entries.forEach(function (entry) {
        // on vérifie que l'entrée est présente sur l'écran (intersectionRatio)
        if(entry.intersectionRatio > 0) {
            activate(entry.target)
        }
    })
}

// on récupère les elements avec un data-spy
const spies = document.querySelectorAll('[data-spy]');

// si il y en a plus de 0 on récupère 60% de la hauteur de l'écran pour modifier la taille du détecteur de section
if(spies.length > 0) {
    const y = Math.round(window.innerHeight * ratio);
    const observer = new IntersectionObserver(callback, {
        // modification de la hauteur de détéction (60% page)
        rootMargin: '0px 0px -'+y+'px 0px'
    });
    spies.forEach(function (spy) {
        observer.observe(spy);
    })
}