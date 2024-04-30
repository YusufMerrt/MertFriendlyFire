// Canvas elementini al
var canvas = document.getElementById("canvas");

// 2D çizim bağlamını al
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

// Düzgünleştirme etkinleştirildi
ctx.imageSmoothingEnabled = true;

// Her bir fotoğraf için tıklanma sayacını ve konumlarını başlat
var tıklanmaSayacı = {};
var tıklanmaKonumları = {};
var toplamTıklanmaSayısı = 0;

fotograflar.forEach(function (foto) {
    tıklanmaSayacı[foto] = 0;
    tıklanmaKonumları[foto] = { x: 0, y: 0 };
});

// Canvas'ı temizleme ve çizgileri çizme fonksiyonu
function canvasHazırla() {
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Çizgileri çiz
    cizgileriCiz();
}

// Tıklama işleyicisi
function tıklamaHandler(event) {
    // Tıklanan noktanın x ve y koordinatları
    var clickedX = event.offsetX;
    var clickedY = event.offsetY;
    // Fotoğrafa tıklanıp tıklanmadığını kontrol etmek için bir bayrak
    var fotoVarMi = false;

    // Her fotoğraf için kontrol yap
    fotograflar.forEach(function (foto) {
        var x = tıklanmaKonumları[foto].x;
        var y = tıklanmaKonumları[foto].y;
        if (clickedX >= x && clickedX <= x + 50 && clickedY >= y && clickedY <= y + 50) {
            // Tıklanma durumunda ilgili sayacı 1 arttır
            tıklanmaSayacı[foto]++;
            // Toplam tıklanma sayısını arttır
            toplamTıklanmaSayısı++;
            // Fotoğrafa tıklandığını belirtmek için bayrağı true yap
            fotoVarMi = true;
            // Konsola kaç defa tıklandığını yazdır
            console.log("Fotoğrafa " + tıklanmaSayacı[foto] + " defa tıklandı");
        }
    });

    // Eğer tıklanan yerde fotoğraf yoksa toplam tıklanma sayısını azalt
    if (!fotoVarMi) {
        toplamTıklanmaSayısı--;
    }

    // Toplam tıklanma sayısını HTML'e yazdır
    document.getElementById("tıklanmaSayacı").textContent = "Toplam tıklanma sayısı: " + toplamTıklanmaSayısı;
}

// Tıklama olayını dinleyen işlevi ekleyin
canvas.addEventListener('click', tıklamaHandler);

// Başlat butonunun tıklanması durumunda geri sayımı başlatan işlev
function baslatGeriSayim() {
    var saniye = 30;
    var geriSayim = document.getElementById("geriSayim");
    var geriSayimSpan = document.getElementById("süre");

    // Başlat butonunu gizle
    document.getElementById("baslatBtn").style.display = "none";
    // Geri sayımı göster
    geriSayim.style.display = "block";

    // Her saniyede geri sayımı güncelleyen işlev
    var saniyeSayacı = setInterval(function () {
        saniye--;
        geriSayimSpan.textContent = saniye;

        // Süre bittiğinde
        if (saniye <= 0) {
            clearInterval(saniyeSayacı); // Zamanlayıcıyı durdur
            // Yeniden başlatma butonunu göster
            document.getElementById("yenidenBaslat").style.display = "block";
            // Tıklama olayını kaldır
            canvas.removeEventListener('click', tıklamaHandler);
        }
    }, 1000);
}

// Başlat butonuna tıklandığında geri sayımı başlat
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

// Rastgele bir fotoğraf seçme işlevi
function rasgeleFotoSec() {
    var uzunluk = fotograflar.length;
    var indeks = Math.floor(Math.random() * uzunluk);
    return fotograflar[indeks];
}

// Çizgileri çizen işlev
function cizgileriCiz() {
    // Dikey çizgileri çiz
    for (var i = 0; i < canvas.width; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    // Yatay çizgileri çiz
    for (var i = 0; i < canvas.height; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

// Yeniden başlatma butonunun tıklanması durumunda sayfayı yeniden yükle
document.getElementById("yenidenBaslat").onclick = function () {
    location.reload();
};
