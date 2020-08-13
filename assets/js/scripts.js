const updateViewportHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    alert("Setting VH to " + `${window.innerHeight}px`);
}
window.addEventListener('resize', updateViewportHeight)
updateViewportHeight();
