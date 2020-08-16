const updateViewportHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`);
    document.documentElement.style.setProperty('--vmin', `${Math.min(window.innerHeight, window.innerWidth)}px`);
    document.documentElement.style.setProperty('--vmax', `${Math.max(window.innerHeight, window.innerWidth)}px`);
}
window.addEventListener('resize', updateViewportHeight)
updateViewportHeight();
