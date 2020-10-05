var oilCanvas = document.getElementById("oilChart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

var ctx = oilCanvas.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeText("Results Here", 10, 50);

function generateChart(p,np){
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

var pieChart = new Chart(oilCanvas, {
  type: 'doughnut',
  data: oilData
});
}
