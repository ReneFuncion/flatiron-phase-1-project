Real-Time Cryptocurrency Tracker

Introduction
This is my first project in Flatiron's full-stack web development course. I found computer programming to be very addicting, and I wish I had more time to add more features. However, this project should suffice for now, and I'm excited to learn more. This project fetches data from a free API that provides real-time cryptocurrency prices and presents them in an interactive and visually appealing way.

Features
- Fetches real-time cryptocurrency prices from a free API
- Plots five small line charts at the top of the webpage
- Scrolling crypto prices at the top, resembling a financial chart
- Ticker tape showing current prices scrolling from right to left
- Background color of the ticker tape changes to red if prices are trending up, and green if prices are trending down
- A large chart of a selected cryptocurrency instrument displayed below the small charts
- Charts update in real-time

Challenges and Learning Experience
The scrolling functionality and associated CSS were the most challenging parts of this project. I learned more about CSS during this part of the project than I learned in class. After designing the head of the webpage, I learned the basic concept of CSS Flexbox.

Retrieving real-time prices from the API was another challenge. The key to achieving this was using `fetch` inside the `setInterval()` function, polling the API every 10 seconds for the current prices. Next, I stored the prices of five cryptocurrency instruments in an array using `push` and utilized the Chart.js library to plot the line charts.

Technologies Used
- HTML
- CSS
- JavaScript
- Fetch API
- Chart.js

How to Use
1. Open the webpage.  No installation required.
2. Observe the scrolling ticker tape at the top showing real-time cryptocurrency prices
3. View the five small line charts below the ticker tape, each representing a different cryptocurrency
4. Click on any small chart to display a larger version of the chart below
5. Enjoy watching the charts update in real-time as the prices change

Conclusion
Working on this project was an enjoyable experience. Seeing the prices change on the charts in real time was unbelievably satisfying. In addition, this project allowed me to explore and learn more about web development, and I look forward to applying these skills to future projects.


MIT License

Copyright (c) 2023 Rene Funcion

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.