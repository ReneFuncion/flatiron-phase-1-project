
document.addEventListener('DOMContentLoaded', () => {
    let dataCount = 0;
    const prices = [[], [], [], [], []];
    const chartLocations = [];
    const xAxisLabels = [];
    const chartData = {
        type: 'line',
        data: {
            labels: xAxisLabels,
            datasets: [
                {
                    fill: false,
                    label: 'BTC',
                    data: prices[0],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                    lineTension: 2,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                },

            },
        },
    };

    const allCanvasElements = document.querySelectorAll('.chart');
    allCanvasElements.forEach((e) => {
        chartLocations.push(e);
    });

    function storePrices(data) {
        for (let i = 0; i < 5; i++) {
            prices[i].push(data[i]["priceUsd"])
        }
    };
    function updateChart() {
        fetch("https://api.coincap.io/v2/assets")
            .then((resp) => resp.json())
            .then((jsonData) => {
                storePrices(jsonData["data"]);
            }
            );
        xAxisLabels.push(dataCount);
        dataCount++;
        prices.forEach((e, i) => {
            chartData.data.datasets[0].data = e;
            chartData.data.labels = xAxisLabels;
            new Chart(chartLocations[i], chartData);
        }
        );
    }





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
    setInterval(updateChart, 10000);
    setInterval(moveElements, scrollSpeed);
});
