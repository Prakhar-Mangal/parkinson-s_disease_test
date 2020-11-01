let mycnvs;
let j = 0;

function setup() {
    mycnvs = createCanvas(400, 400);
    mycnvs.parent('canva')
    background(0);
    makePattern();
}

function makePattern() {
    for (i = 0; i < 400; i++) {
        x = sin(i / 25) * 100;
        y = cos(i / 50) * 200;

        ellipse(200 + x, 200 + y, 2, 2);
    }
}

function draw() {
    if (mouseIsPressed) {
        strokeWeight(0);
        ellipse(mouseX, mouseY, 5, 5);
    }
}

function savecvs() {
    saveCanvas(mycnvs, `np-${j}.jpg`);
    j++;
}

function check() {
    document.getElementById('all-button').innerHTML = `<div class="lds-hourglass"></div>`
    httpPost(
        "http://server1.cbkm.in:5000/get/eight",
        "json", { data: mycnvs.canvas.toDataURL() },
        (res) => {
            document.getElementById('all-button').innerHTML = ` <button type="button" onclick="savecvs()" class="btn btn-outline-primary">Save</button>&nbsp;&nbsp;
            <button type="button" onclick="check()" class="btn btn-outline-success">Check</button>&nbsp;&nbsp;
            <button type="button" onclick="clearAll()" class="btn btn-outline-danger">Clear</button>`;
            generateChart(parseFloat((res.p * 100).toFixed(3)), parseFloat((res.np * 100).toFixed(3)));

        }
    );

}

function clearAll() {
    background(0);
    makePattern();
}