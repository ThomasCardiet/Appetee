const ratio = .6;

/**
 *
 * @param {HTMLElement} elem
 */
const activate = function (elem) {
    const id = elem.getAttribute('id');
    const anchor = document.querySelector('a[href="#' + id + '"]');
    if(anchor === null) return null;
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
        if(entry.intersectionRatio > 0) {
            activate(entry.target)
        }
    })
}

const spies = document.querySelectorAll('[data-spy]');

if(spies.length > 0) {
    const y = Math.round(window.innerHeight * ratio);
    const observer = new IntersectionObserver(callback, {
        rootMargin: '0px 0px -'+y+'px 0px'
    });
    spies.forEach(function (spy) {
        observer.observe(spy);
    })
}