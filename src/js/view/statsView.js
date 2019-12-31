import * as Chart from '../chart.bundle.min';

export const updateStats = (moves, pairsRemain) => {
    
    //moves number indicator
    const movesElement = document.querySelector('.container__moves');
    //pairs remaining indicator
    const pairsElement = document.querySelector('.container__pairs');

    movesElement.textContent = moves;
    pairsElement.textContent = pairsRemain;
}

export const chartScores = (scores) => {

    //grab the container where the chart will live
    const containerLeft = document.querySelector('.container__left');

    //grab the chart cavnas if it exists
    let chartCanvas = document.getElementById('myChart');

    //if it exists, remove it from DOM so new chart doesn't overlap
    if(chartCanvas) {
        containerLeft.removeChild(chartCanvas);
    }

    //chart markup
    const markup = `<canvas id="myChart" width="300" height="300"></canvas>`;

    //insert new chart before end of left container
    containerLeft.insertAdjacentHTML('beforeend', markup);

    //take last 5 elements of the scores array passed in
    const mostRecentFive = scores.slice(-5);

    //make copy of and sort scores array to not mutate
    const sorted = [...scores].sort( (a,b) => b-a);

    //sort the entire scores array from largest to smallest, copy over last 5 elements
    const topFive = sorted.slice(-5);

    //grab the chart canvas
    chartCanvas = document.getElementById('myChart');

    //chartjs parameters
    let myLineChart = new Chart.Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [{
                    label: "Most Recent 5 games",
                    backgroundColor: "#0a1449",
                    borderColor: "#0a1449",
                    data: mostRecentFive,
                    fill: false
                },
                {
                    label: "5 Lowest Scores",
                    backgroundColor: "#006b0c",
                    borderColor: "#006b0c",
                    data: topFive,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
        }
    });
}