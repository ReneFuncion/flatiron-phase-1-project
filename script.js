
document.addEventListener('DOMContentLoaded', () => {
    let dataCount = 0;
    const prices = [[], [], [], [], []];
    const symbols = ["-", "-", "-", "-", "-"];
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
                    lineTension: 0.3,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        font: {
                            size: 3,
                        },
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: 3,
                        },

                    },
                },

            },
        },
    };

    const allCanvasElements = document.querySelectorAll('.chart');
    allCanvasElements.forEach((e) => {
        chartLocations.push(e);
    });

    function storeData(data) {
        for (let i = 0; i < 5; i++) {
            const priceFloat = parseFloat(parseFloat(data[i]["priceUsd"]).toFixed(3));
            prices[i].push(priceFloat);
            symbols[i] = data[i]["symbol"];
        }
    };
    function updateChart() {
        fetch("https://api.coincap.io/v2/assets")
            .then((resp) => resp.json())
            .then((jsonData) => {
                storeData(jsonData["data"]);
            }
            );

        const elementBTC = document.getElementById('myElement1');
        const lenBtc = prices[0].length;
        elementBTC.textContent = "BTC " + prices[0][lenBtc - 1];
        if (lenBtc == 0) {
            elementBTC.style.backgroundColor = "lightgreen";
        } else if (prices[0][lenBtc - 1] > prices[0][lenBtc - 2]) {
            elementBTC.style.backgroundColor = "lightgreen";
        } else {
            elementBTC.style.backgroundColor = "red";
        }

        const elementETH = document.getElementById('myElement2');
        const lenETH = prices[1].length;
        elementETH.textContent = "ETH " + prices[1][lenETH - 1];
        if (lenETH == 0) {
            elementETH.style.backgroundColor = "lightgreen";
        } else if (prices[1][lenETH - 1] > prices[1][lenETH - 2]) {
            elementETH.style.backgroundColor = "lightgreen";
        } else {
            elementETH.style.backgroundColor = "red";
        }

        xAxisLabels.push(dataCount);
        dataCount++;
        prices.forEach((e, i) => {
            chartData.data.datasets[0].label = symbols[i];
            chartData.data.datasets[0].data = e;
            chartData.data.labels = xAxisLabels;
            new Chart(chartLocations[i], chartData);
        }
        );
    }

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
