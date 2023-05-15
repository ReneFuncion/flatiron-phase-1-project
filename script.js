
document.addEventListener('DOMContentLoaded', () => {
    let dataCount = 0;

    const prices = [[], [], [], [], []];    //A simple database for prices
    // const pricesBtc = prices[0];
    // const pricesEth = prices[1];
    const symbols = ["-", "-", "-", "-", "-"];      //Names of the  crypto instruments
    const chartLocations = [];      //The DOM locations for the charts
    // const chartLocationBtc = chartLocations[0];
    // const chartLocationEth = chartLocations[1];
    const xAxisLabels = [];         //Labels for x axis
    const chartData = {             //The data format to plot in Chart.js
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
    //The dom locations of the charts to be plotted
    const allCanvasElements = document.querySelectorAll('.chart');
    allCanvasElements.forEach((e) => {
        chartLocations.push(e);
    });
    //Location of the final large plot at the bottom of the webpage
    const canvasElement = document.getElementById('lastCanvas');
    //The crypto prices are very long.  Plots based on the full prices.  Displayed on the ticker prices are shorter
    function limitDecimalOutput(num) {
        const limitDecimalPlaces = 4;
        return parseFloat(parseFloat(num).toFixed(limitDecimalPlaces));
    }
    //Put the prices in the scrolling box and change the background if prices going up or down
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
    //Put the etherium prices on the moving box with the correct trending color
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
    //Update the small database of prices.  An array of arrays
    function storeData(data) {

        for (let i = 0; i < 5; i++) {
            prices[i].push(data[i]["priceUsd"]);
            symbols[i] = data[i]["symbol"];
        }
    }
    //The heart of the program.  fetch the data and using setInterval at the bottom 
    //keep fetching every 10 secs.  I could update every sec. but its pointless and 
    //the owners might get mad.  and late at night not a lot of trades happening 
    //so prices flatline.  As time progresses the chart become more detailed because 
    // more data points
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
        //This forEach will enter the template data of Chart.js and sequentially plot the charts on 
        //the screen
        prices.forEach((e, i) => {
            chartData.data.datasets[0].label = symbols[i];
            chartData.data.datasets[0].data = e;
            chartData.data.labels = xAxisLabels;
            new Chart(chartLocations[i], chartData);        //actual charting here
        }
        );
    }

    //Add an event listener to all five charts.  Clicking on any of the small charts at the top will produce
    //a large full chart of the clicked instrument at the bottom 
    allCanvasElements.forEach((e, index) => {
        chartLocations.push(e);
        e.addEventListener('click', () => {
            boe = index + 1;
            console.log('boe:', boe);
            updateMainChart();
        });
    });

    //Plot the big chart that the user clicked on
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

    //Feeding the chart data for Chart.js to plot each instrument. There are five instruments.
    //There is a pattern to feed data to Chart.js I used the simplest one I could run successfully.
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

    const myElement1 = document.getElementById('myElement1'); //first bos to hold bitcoin scrolling across
    const myElement2 = document.getElementById('myElement2');   //second box to hold etherium scrolling 

    const boxSeparation = 400;
    const scrollSpeed = 10;
    //determine the lenght of the containing element for the two boxes to be scrolled
    let outerContainerWidth = document.getElementById('outerContainer').clientWidth;
    //first box at the start  every time the animation repeats inside setInterval fucntion
    let leftPosition1 = outerContainerWidth;
    //start of the second box is right behind the first box.  Therefore the length of the first box is needed
    //or the boxes will overlap.  Boxseparation is to keep them apart
    let leftPosition2 = outerContainerWidth + myElement1.offsetWidth + boxSeparation;
    //Running this function repeatedly using setInterval to animate the boxes moving
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
    //Function to repeat certain actions
    setInterval(updatePrices, 10000);  //repeatedly run fetch every 10secs
    setInterval(moveElements, scrollSpeed);  //scroll the ticker display from  right to left
});
