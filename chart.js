var oilCanvas = document.getElementById("oilChart");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
var ctx = oilCanvas.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeText("Results Here", 10, 50);

var pieChart = null;

function generateChart(p, np) {
    if (pieChart != null) {
        pieChart.destroy();
    }
    var oilData = {
        labels: [
            "Parkinson",
            "Non Parkinson",
        ],
        datasets: [
            {
                data: [p, np],
                backgroundColor: [
                    "red",
                    "green"
                ]
            }]
    };

    pieChart = new Chart(oilCanvas, {
        type: 'doughnut',
        data: oilData
    });

}
