
document.addEventListener('DOMContentLoaded', () => {
    const myElement = document.getElementById('myElement');
    let leftPosition = window.innerWidth;

    setInterval(() => {
        leftPosition--;
        myElement.style.left = `${leftPosition}px`;
        if (leftPosition <= -myElement.offsetWidth) {
            leftPosition = window.innerWidth;
        }
    }, 10);
});
