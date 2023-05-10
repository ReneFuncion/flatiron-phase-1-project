
document.addEventListener('DOMContentLoaded', () => {

    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data["bpi"]["GBP"]["rate"]);
            console.log(data["bpi"]["EUR"]["rate"]);
        });

    const myElement1 = document.getElementById('myElement1');
    const myElement2 = document.getElementById('myElement2');
    const boxSeparation = 200;
    const scrollSpeed = 5;
    let leftPosition1 = window.innerWidth;
    let leftPosition2 = window.innerWidth + myElement1.offsetWidth + boxSeparation;

    // setInterval(() => {
    //     leftPosition1--;
    //     myElement1.style.left = `${leftPosition1}px`;
    //     if (leftPosition1 <= -myElement1.offsetWidth) {
    //         leftPosition1 = window.innerWidth;
    //     }
    // }, 10);

    function moveElement1() {
        leftPosition1--;
        myElement1.style.left = `${leftPosition1}px`;
        if (leftPosition1 <= -myElement1.offsetWidth) {
            leftPosition1 = window.innerWidth;
        }
    }
    function moveElement2() {
        leftPosition2--;
        myElement2.style.left = `${leftPosition2}px`;
        if (leftPosition2 <= -myElement2.offsetWidth) {
            leftPosition2 = window.innerWidth;
        }
    }
    function scrollElements() {
        setInterval(moveElement1, scrollSpeed);
        setInterval(moveElement2, scrollSpeed);
    }
    scrollElements();
    // setInterval(() => {
    //     leftPosition2--;
    //     myElement2.style.left = `${leftPosition2}px`;
    //     if (leftPosition2 <= -myElement2.offsetWidth) {
    //         leftPosition2 = window.innerWidth;
    //     }
    // }, 10);
});
