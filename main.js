// main.js

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Fotoğraflar dizisi
var fotograflar = [
    'hasan.jpg',
    'nermin.jpg',
    'rabia.jpg',
    'semih.jpg',
    'mete.jpg'
    // Diğer fotoğrafları buraya ekle
];

ctx.imageSmoothingEnabled = true; // Düzgünleştirme etkinleştirildi

var tıklanmaSayacı = {};
var tıklanmaKonumları = {};
var toplamTıklanmaSayısı = 0;

fotograflar.forEach(function (foto) {
    tıklanmaSayacı[foto] = 0;
    tıklanmaKonumları[foto] = { x: 0, y: 0 };
});

function canvasHazırla() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cizgileriCiz();
}

function tıklamaHandler(event) {
    var clickedX = event.offsetX;
    var clickedY = event.offsetY;
    var fotoVarMi = false;

    fotograflar.forEach(function (foto) {
        var x = tıklanmaKonumları[foto].x;
        var y = tıklanmaKonumları[foto].y;
        if (clickedX >= x && clickedX <= x + 50 && clickedY >= y && clickedY <= y + 50) {
            tıklanmaSayacı[foto]++;
            toplamTıklanmaSayısı++;
            fotoVarMi = true;
            console.log("Fotoğrafa " + tıklanmaSayacı[foto] + " defa tıklandı");
        }
    });

    if (!fotoVarMi) {
        toplamTıklanmaSayısı--;
    }

    document.getElementById("tıklanmaSayacı").textContent = "Toplam tıklanma sayısı: " + toplamTıklanmaSayısı;
}

canvas.addEventListener('click', tıklamaHandler);

function baslatGeriSayim() {
    var saniye = 30;
    var geriSayim = document.getElementById("geriSayim");
    var geriSayimSpan = document.getElementById("süre");

    document.getElementById("baslatBtn").style.display = "none";
    geriSayim.style.display = "block";

    var saniyeSayacı = setInterval(function () {
        saniye--;
        geriSayimSpan.textContent = saniye;

        if (saniye <= 0) {
            clearInterval(saniyeSayacı);
            document.getElementById("yenidenBaslat").style.display = "block";
            canvas.removeEventListener('click', tıklamaHandler);
        }
    }, 1000);
}

document.getElementById("baslatBtn").onclick = baslatGeriSayim;

// Her 3 saniyede bir fotoğrafı ekrana bastırma işlemi
setInterval(function () {
    var secilenFoto = rasgeleFotoSec();

    var img = new Image();
    img.src = secilenFoto;

    img.onload = function () {
        var x = Math.random() * (canvas.width - 50);
        var y = Math.random() * (canvas.height - 50);
        tıklanmaKonumları[secilenFoto] = { x: x, y: y };
        canvasHazırla();
        ctx.drawImage(img, x, y, 50, 50);
    };
}, 3000);

function rasgeleFotoSec() {
    var uzunluk = fotograflar.length;
    var indeks = Math.floor(Math.random() * uzunluk);
    return fotograflar[indeks];
}

function cizgileriCiz() {
    for (var i = 0; i < canvas.width; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    for (var i = 0; i < canvas.height; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

// Yeniden başlatma butonu işlevi
document.getElementById("yenidenBaslat").onclick = function () {
    location.reload();
};
