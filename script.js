// تحديد الأزرار
const showVerseButton = document.getElementById('showVerseButton');
const showDhikrButton = document.getElementById('showDhikrButton');
const startMiningButton = document.getElementById('startMiningButton');

// تحديد العناصر التي ستعرض فيها الآية والذكر
const verseElement = document.getElementById('verse');
const dhikrElement = document.getElementById('dhikr');

// الآية والذكر
const verse = "إِنَّ اللّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ";
const dhikr = "سُبْحَانَ اللّهِ وَبِحَمْدِهِ";

// إظهار الآية
showVerseButton.addEventListener('click', function() {
    verseElement.innerHTML = verse;
    checkReadyForMining();
});

// إظهار الذكر
showDhikrButton.addEventListener('click', function() {
    dhikrElement.innerHTML = dhikr;
    checkReadyForMining();
});

// التحقق من جاهزية البدء في التعدين
function checkReadyForMining() {
    if (verseElement.innerHTML && dhikrElement.innerHTML) {
        startMiningButton.disabled = false;
    }
}

// إضافة وظيفة للتعدين
startMiningButton.addEventListener('click', function() {
    alert("تم بدء التعدين!"); // يمكن إضافة منطق التعدين هنا
    startMiningButton.disabled = true;
    // ضبط المؤقت لـ 8 ساعات (8 * 60 * 60 * 1000 = 28800000 ملي ثانية)
    setTimeout(() => {
        startMiningButton.disabled = false; // إعادة تفعيل الزر بعد 8 ساعات
    }, 28800000); 
});
