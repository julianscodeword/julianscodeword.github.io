const updateViewportHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`);
    document.documentElement.style.setProperty('--viewmin', `${Math.min(window.innerHeight, window.innerWidth)}px`);
    document.documentElement.style.setProperty('--viewmax', `${Math.max(window.innerHeight, window.innerWidth)}px`);
}
window.addEventListener('resize', updateViewportHeight)
updateViewportHeight();

window.customElements.whenDefined("x-book").then(() => {
    const books = document.getElementsByTagName("x-book");

    if (books.length> 0) {
        books[0].className += " ready";
    }
});
