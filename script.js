// مصفوفات الآيات، الأذكار، والأحاديث
const ayat = [
    "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا"
];

const azkar = [
    "سبحان الله",
    "الحمد لله",
    "لا إله إلا الله"
];

const ahadith = [
    "إنما الأعمال بالنيات",
    "الدين النصيحة",
    "من حسن إسلام المرء تركه ما لا يعنيه"
];

let miningEnabled = false;
let balance = 0;

// دالة لعرض الآية
document.getElementById("ayah-btn").addEventListener("click", function() {
    const ayahText = ayat[Math.floor(Math.random() * ayat.length)];
    document.getElementById("ayah-text").innerText = ayahText;
    checkMiningReady();
});

// دالة لعرض الذكر
document.getElementById("zikr-btn").addEventListener("click", function() {
    const zikrText = azkar[Math.floor(Math.random() * azkar.length)];
    document.getElementById("zikr-text").innerText = zikrText;
    checkMiningReady();
});

// دالة لعرض الحديث
document.getElementById("hadith-btn").addEventListener("click", function() {
    const hadithText = ahadith[Math.floor(Math.random() * ahadith.length)];
    document.getElementById("hadith-text").innerText = hadithText;
    checkMiningReady();
});

// تفعيل زر التعدين
function checkMiningReady() {
    const ayahDisplayed = document.getElementById("ayah-text").innerText !== "";
    const zikrDisplayed = document.getElementById("zikr-text").innerText !== "";
    const hadithDisplayed = document.getElementById("hadith-text").innerText !== "";
    document.getElementById("start-mining-btn").disabled = !(ayahDisplayed && zikrDisplayed && hadithDisplayed);
}

// دالة التعدين
document.getElementById("start-mining-btn").addEventListener("click", function() {
    if (!miningEnabled) {
        miningEnabled = true;
        document.getElementById("mining-status").innerText = "التعدين جاري...";
        setTimeout(() => {
            miningEnabled = false;
            balance += 3; // إضافة 3 عملات للرصيد
            document.getElementById("balance").innerText = balance;
            document.getElementById("mining-status").innerText = "تم التعدين! يمكنك البدء مجددًا بعد 8 ساعات";
        }, 8000); // مؤقت 8 ثوانٍ فقط للتجربة
    }
});
