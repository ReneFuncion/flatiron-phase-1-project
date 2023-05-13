
document.addEventListener('DOMContentLoaded', () => {
    let dataCount = 0;
    const prices = [[], [], [], [], []];
    const chartLocations = [];
    const xAxisLabels = [];


    const allCanvasElements = document.querySelectorAll('.chart');
    allCanvasElements.forEach((e) => {
        chartLocations.push(e);
    });


    function storePrices(data) {
        for (let i = 0; i < 5; i++) {
            prices[i].push(data[i]["priceUsd"])
        }
    }
    fetch("https://api.coincap.io/v2/assets")
        .then((resp) => resp.json())
        .then((jsonData) => {
            storePrices(jsonData["data"]);
        }
        );


    xAxisLabels.push(dataCount);
    dataCount++;





    function updateTicker(price) {
        const newPrice = price[price.length - 1];
        document.getElementById('myElement1').textContent = Math.floor(newPrice);
        document.getElementById('myElement2').textContent = "Rene";
    }
    updateTicker(prices[0]);

    const myElement1 = document.getElementById('myElement1');
    const myElement2 = document.getElementById('myElement2');

    const boxSeparation = 200;
    const scrollSpeed = 10;
    let outerContainerWidth = document.getElementById('outerContainer').clientWidth;
    let leftPosition1 = outerContainerWidth;
    let leftPosition2 = outerContainerWidth + myElement1.offsetWidth + boxSeparation;

    function moveElements() {
        leftPosition1--;
        leftPosition2--;

        myElement1.style.left = `${leftPosition1}px`;
        myElement2.style.left = `${leftPosition2}px`;

        if (leftPosition1 <= -myElement1.offsetWidth) {
            leftPosition1 = outerContainerWidth;
            leftPosition2 = outerContainerWidth + myElement1.offsetWidth + boxSeparation;
        }
    }

    setInterval(moveElements, scrollSpeed);
});
