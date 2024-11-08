<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقع التعدين</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div id="welcome-section">
            <h2>مرحبا بك في موقع التعدين</h2>
            <button id="showAyahBtn" onclick="showAyah()">إعرض الآية</button>
            <p id="ayahDisplay"></p>

            <button id="showDhikrBtn" onclick="showDhikr()">إعرض الذكر</button>
            <p id="dhikrDisplay"></p>

            <button id="showHadithBtn" onclick="showHadith()">إعرض الحديث النبوي</button>
            <p id="hadithDisplay"></p>

            <button id="startMiningBtn" onclick="startMining()" disabled>إبدأ التعدين</button>
        </div>

        <div id="mining-section">
            <h2>دورة التعدين</h2>
            <p>الوقت المتبقي للتعدين: <span id="countdown"></span></p>
            <p>عدد العملات المستخرجة: <span id="extractedCoins">0</span> عملة</p>
            <p>رصيدك الحالي: <span id="balance">0</span> عملة</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
