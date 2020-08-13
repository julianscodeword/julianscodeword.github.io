const updateViewportHeight = () => {
    const height = `${window.innerHeight}px`;
    console.log(`BEFORE Setting height to ${height}.`);
    document.documentElement.style.setProperty('--vh', height);
    console.log(`AFTER Setting height to ${height}.`);
}
window.addEventListener('resize', updateViewportHeight)
updateViewportHeight();
