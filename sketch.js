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
    httpPost(
        "http://server1.cbkm.in:5000/get/eight",
        "json", { data: mycnvs.canvas.toDataURL() },
        (res) => {
            document.getElementById("output").innerHTML = `Parkinson's :- ${res.p * 100
                } %<br/>
      Non-Parkinson's :- ${res.np * 100} %`;
            generateChart(res.p * 100, res.np * 100)
        }
    );
}

function clearAll() {
    background(0);
    makePattern();
}