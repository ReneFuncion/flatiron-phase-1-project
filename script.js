
document.addEventListener('DOMContentLoaded', () => {
    const myElement1 = document.getElementById('myElement1');
    const myElement2 = document.getElementById('myElement2');
    let leftPosition1 = window.innerWidth;
    let leftPosition2 = window.innerWidth + myElement1.offsetWidth;
    setInterval(() => {
        leftPosition1--;
        myElement1.style.left = `${leftPosition1}px`;
        if (leftPosition1 <= -myElement1.offsetWidth) {
            leftPosition1 = window.innerWidth;
        }
    }, 10);

    setInterval(() => {
        leftPosition2--;
        myElement2.style.left = `${leftPosition2}px`;
        if (leftPosition2 <= -myElement2.offsetWidth) {
            leftPosition2 = window.innerWidth;
        }
    }, 10);
});
