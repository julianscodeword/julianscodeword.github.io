const updateViewportHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    console.log("Setting VH to " + `${window.innerHeight}px`);
}
window.addEventListener('resize', updateViewportHeight)
updateViewportHeight();
