var count = 1;
var tp = 0, tnp = 0;
function drawTable(p, np) {
    r = np >= p ? 'Non Parkinson' : 'Parkinson'
    document.getElementById('output').innerHTML += `<tr>
    <th scope="row">${count}</th>
    <td>${p}</td>
    <td>${np}</td>
    <td>${r}</td>
  </tr>`
    tnp += np;
    tp += p;
    if (count == 5) {
        generateResultChart(tp / 5, tnp / 5);
        fr = tnp >= tp ? false : true

        document.getElementById('attempt').innerHTML = `Final Result: ${fr ? `Parkinson ${(tp / 5).toFixed(3)}%` : `Non Parkinson ${(tnp / 5).toFixed(3)}%`}`;
        document.getElementById('all-button').innerHTML = `<button type="button" onclick="testAgain()" class="btn btn-outline-primary">Test Again</button>`
        document.getElementById('export').innerHTML = `<button type="button" onclick="tableToExcel('myTable', 'name', '${personName}-${personID}.xls')" class="btn btn-outline-primary">Export to Excel</button>`

    } else {
        document.getElementById('attempt').innerHTML = `Final Result, Attempt Remaining: ${5 - count}`;
        count++;
    }
}


var oilCanvas = document.getElementById("oilChart");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
var ctx = oilCanvas.getContext("2d");
ctx.font = "30px Times";
ctx.strokeText("Results Here", 200, 50);

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
    drawTable(p, np)
    setup()

}


var result = document.getElementById("result-chart");
var cntx = result.getContext("2d");


var pieResultChart = null;
function generateResultChart(p, np) {
    if (pieResultChart != null) {
        pieResultChart.destroy();
    }
    var resultData = {
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

    pieResultChart = new Chart(result, {
        type: 'doughnut',
        data: resultData
    });

}

function testAgain() {
    window.location.reload();
}

var personName = prompt("Please enter your name");
var personID = prompt("Please enter your ID");

document.getElementById('pname').innerHTML = `Name: ${personName}`
document.getElementById('pid').innerHTML = `ID: ${personID}`

function tableToExcel(table, name, filename) {
    let uri = 'data:application/vnd.ms-excel;base64,', 
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>', 
    base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) },         format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; })}
    
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}

    var link = document.createElement('a');
    link.download = filename;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

