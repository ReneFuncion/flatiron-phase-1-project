
document.addEventListener('DOMContentLoaded', () => {
    let dataCount = 0;
    const prices = [[], [], [], [], []];
    const pricesBtc = prices[0];
    const pricesEth = prices[1];
    const symbols = ["-", "-", "-", "-", "-"];
    const chartLocations = [];
    const chartLocationBtc = chartLocations[0];
    const chartLocationEth = chartLocations[1];
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

    const canvasElement = document.getElementById('lastCanvas');

    function limitDecimalOutput(num) {
        const limitDecimalPlaces = 4;
        return parseFloat(parseFloat(num).toFixed(limitDecimalPlaces));
    }

    function updateTickerBtc() {
        const elementBTC = document.getElementById('myElement1');
        const lenBtc = prices[0].length;
        elementBTC.textContent = "BTC " + limitDecimalOutput(prices[0][lenBtc - 1]);
        if (lenBtc == 0) {
            elementBTC.style.backgroundColor = "lightgreen";
        } else if (prices[0][lenBtc - 1] > prices[0][lenBtc - 2]) {
            elementBTC.style.backgroundColor = "lightgreen";
        } else {
            elementBTC.style.backgroundColor = "red";
        }
    }

    function updateXAxisLabels() {
        xAxisLabels.push(dataCount);
        dataCount++;
    }

    function updateTickerEth() {
        const elementETH = document.getElementById('myElement2');
        const lenETH = prices[1].length;
        elementETH.textContent = "ETH " + limitDecimalOutput(prices[1][lenETH - 1]);
        if (lenETH == 0) {
            elementETH.style.backgroundColor = "lightgreen";
        } else if (prices[1][lenETH - 1] > prices[1][lenETH - 2]) {
            elementETH.style.backgroundColor = "lightgreen";
        } else {
            elementETH.style.backgroundColor = "red";
        }
    }

    function storeData(data) {

        for (let i = 0; i < 5; i++) {
            prices[i].push(data[i]["priceUsd"]);
            symbols[i] = data[i]["symbol"];
        }
    }

    function updatePrices() {
        fetch("https://api.coincap.io/v2/assets")
            .then((resp) => resp.json())
            .then((jsonData) => {
                storeData(jsonData["data"]);
            }
            );

        updateTickerBtc();
        updateTickerEth();
        updateXAxisLabels();

        prices.forEach((e, i) => {
            chartData.data.datasets[0].label = symbols[i];
            chartData.data.datasets[0].data = e;
            chartData.data.labels = xAxisLabels;
            new Chart(chartLocations[i], chartData);
        }
        );

        // let boe = 5;
        // if (boe == 1) {
        //     plotMainBtc();
        // } else if (boe == 2) {
        //     plotMainEth();
        // } else if (boe == 3) {
        //     plotMainEthUsdt();
        // } else if (boe == 4) {
        //     plotMainBnb();
        // } else if (boe == 5) {
        //     plotMainUsdc();
        // }

    }
    allCanvasElements.forEach((e, index) => {
        chartLocations.push(e);
        e.addEventListener('click', () => {
            boe = index + 1;
            console.log('boe:', boe);
            updateMainChart();
        });
    });

    function updateMainChart() {
        if (boe === 1) {
            plotMainBtc();
        } else if (boe === 2) {
            plotMainEth();
        } else if (boe === 3) {
            plotMainEthUsdt();
        } else if (boe === 4) {
            plotMainBnb();
        } else if (boe === 5) {
            plotMainUsdc();
        }
    }


    function plotMainBtc() {
        chartData.data.datasets[0].label = symbols[0];
        chartData.data.datasets[0].data = prices[0];
        chartData.data.labels = xAxisLabels;
        new Chart(canvasElement, chartData);
    }
    function plotMainEth() {
        chartData.data.datasets[0].label = symbols[1];
        chartData.data.datasets[0].data = prices[1];
        chartData.data.labels = xAxisLabels;
        new Chart(canvasElement, chartData);
    }
    function plotMainEthUsdt() {
        chartData.data.datasets[0].label = symbols[2];
        chartData.data.datasets[0].data = prices[2];
        chartData.data.labels = xAxisLabels;
        new Chart(canvasElement, chartData);
    }
    function plotMainBnb() {
        chartData.data.datasets[0].label = symbols[3];
        chartData.data.datasets[0].data = prices[3];
        chartData.data.labels = xAxisLabels;
        new Chart(canvasElement, chartData);
    }
    function plotMainUsdc() {
        chartData.data.datasets[0].label = symbols[4];
        chartData.data.datasets[0].data = prices[4];
        chartData.data.labels = xAxisLabels;
        new Chart(canvasElement, chartData);
    }






    const myElement1 = document.getElementById('myElement1');
    const myElement2 = document.getElementById('myElement2');

    const boxSeparation = 400;
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
    setInterval(updatePrices, 10000);
    setInterval(moveElements, scrollSpeed);
    //plotChartBTC();

});
