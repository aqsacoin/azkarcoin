document.getElementById('start-mining').addEventListener('click', function() {
    // قم بتشغيل دورة التعدين هنا
    alert("بدأت دورة التعدين! حصلت على 3 عملات.");
    
    // عرض آية جديدة بعد كل دورة تعدين
    const ayahs = [
        "إِنَّ اللَّـهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا (الأحزاب: 56)",
        "قُلْ هُوَ اللَّـهُ أَحَدٌ  اللَّـهُ الصَّمَدُ (الإخلاص: 1-2)",
        "سُبْحَانَ اللَّـهِ وَبِحَمْدِهِ سُبْحَانَ اللَّـهِ الْعَظِيمِ"
    ];
    
    const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
    document.getElementById('ayah-box').innerHTML = `<p>قال الله تعالى: <br> "${randomAyah}"</p>`;
});
