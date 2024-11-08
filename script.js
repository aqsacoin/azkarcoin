// مصفوفات تحتوي على الآيات القرآنية، الأذكار، والأحاديث النبوية
const ayat = [
    "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ",
    "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "قُلْ هُوَ اللَّهُ أَحَدٌ",
    "إِنَّ اللَّهَ سَمِيعٌ بَصِيرٌ",
    "قُلْ أَعُوذُ بِرَبِّ النَّاسِ"
];

const adhkar = [
    "سُبْحَانَ اللَّهِ",
    "الْحَمْدُ لِلَّهِ",
    "اللَّهُ أَكْبَرُ",
    "لَا إِلٰهَ إِلَّا اللَّهُ",
    "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ مُحَمَّدٍ"
];

const ahadith = [
    "إنما الأعمال بالنيات.",
    "من لا يشكر الناس لا يشكر الله.",
    "طلب العلم فريضة على كل مسلم.",
    "من كان في حاجة أخيه كان الله في حاجته.",
    "من لا يرحم الناس لا يرحمه الله."
];

let coinsExtracted = 0;
let balance = 0;
let miningTime = 8 * 60 * 60 * 1000; // 8 ساعات بالمللي ثانية
let miningInterval;
let countdownTimer;

let isMiningActive = false;

// عرض آية عشوائية
function showAyah() {
    const randomAyah = ayat[Math.floor(Math.random() * ayat.length)];
    document.getElementById("ayahDisplay").innerText = randomAyah;
    document.getElementById("showAyahBtn").disabled = true;
    checkStartMining();
}

// عرض ذكر عشوائي
function showDhikr() {
    const randomDhikr = adhkar[Math.floor(Math.random() * adhkar.length)];
    document.getElementById("dhikrDisplay").innerText = randomDhikr;
    document.getElementById("showDhikrBtn").disabled = true;
    checkStartMining();
}

// عرض حديث نبوي عشوائي
function showHadith() {
    const randomHadith = ahadith[Math.floor(Math.random() * ahadith.length)];
    document.getElementById("hadithDisplay").innerText = randomHadith;
    document.getElementById("showHadithBtn").disabled = true;
    checkStartMining();
}

// التحقق إذا كانت الأزرار قد تم تفعيلها لبدء التعدين
function checkStartMining() {
    if (document.getElementById("ayahDisplay").innerText !== "" &&
        document.getElementById("dhikrDisplay").innerText !== "" &&
        document.getElementById("hadithDisplay").innerText !== "") {
        document.getElementById("startMiningBtn").disabled = false;
    }
}

// بدء التعدين
function startMining() {
    if (!isMiningActive) {
        isMiningActive = true;
        coinsExtracted = 0;
        balance += coinsExtracted;
        document.getElementById("extractedCoins").innerText = coinsExtracted;
        document.getElementById("balance").innerText = balance;

        // بدء العد التنازلي للتعدين
        startCountdown();
        document.getElementById("startMiningBtn").disabled = true;
    }
}

// بدء العد التنازلي
function startCountdown() {
    let timeLeft = miningTime;
    countdownTimer = setInterval(function() {
        timeLeft -= 1000;
        let hours = Math.floor(timeLeft / 3600000);
        let minutes = Math.floor((timeLeft % 3600000) / 60000);
        let seconds = Math.floor((timeLeft % 60000) / 1000);

        document.getElementById("countdown").innerText = `${hours} ساعة : ${minutes} دقيقة : ${seconds} ثانية`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            isMiningActive = false;
            document.getElementById("startMiningBtn").disabled = false;
            document.getElementById("showAyahBtn").disabled = false;
            document.getElementById("showDhikrBtn").disabled = false;
            document.getElementById("showHadithBtn").disabled = false;
        }
    }, 1000);
}
