// المصفوفات
const ayat = [
    "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا",
    "وَقُل رَّبُّ زِدْنِي عِلْمًا",
    "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَاِي وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
    // أضف باقي الآيات هنا
];

const hadiths = [
    "قال رسول الله صلى الله عليه وسلم: من لا يشكر الناس لا يشكر الله.",
    "قال رسول الله صلى الله عليه وسلم: خير الناس أنفعهم للناس.",
    // أضف باقي الأحاديث هنا
];

const dhikrs = [
    "سبحان الله والحمد لله ولا إله إلا الله والله أكبر",
    "اللهم صل على محمد",
    "اللهم اغفر لي ولأبوي وللمؤمنين",
    // أضف باقي الأذكار هنا
];

// العناصر في الصفحة
const showAyahBtn = document.getElementById("showAyahBtn");
const showHadithBtn = document.getElementById("showHadithBtn");
const showDhikrBtn = document.getElementById("showDhikrBtn");
const mineBtn = document.getElementById("mineBtn");
const timerDisplay = document.getElementById("timer");
const minedCoinsDisplay = document.getElementById("minedCoins");

let minedCoins = 0;
let timer = 8 * 60 * 60; // 8 ساعات بالثواني
let miningActive = false;
let canMine = false;

// عرض آية
showAyahBtn.addEventListener("click", () => {
    const randomAyah = ayat[Math.floor(Math.random() * ayat.length)];
    alert(randomAyah); // عرض الآية في نافذة منبثقة
    checkIfCanMine(); // التحقق إذا يمكن بدء التعدين
});

// عرض حديث
showHadithBtn.addEventListener("click", () => {
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    alert(randomHadith); // عرض الحديث في نافذة منبثقة
    checkIfCanMine(); // التحقق إذا يمكن بدء التعدين
});

// عرض ذكر
showDhikrBtn.addEventListener("click", () => {
    const randomDhikr = dhikrs[Math.floor(Math.random() * dhikrs.length)];
    alert(randomDhikr); // عرض الذكر في نافذة منبثقة
    checkIfCanMine(); // التحقق إذا يمكن بدء التعدين
});

// التحقق إذا يمكن بدء التعدين
function checkIfCanMine() {
    if (showAyahBtn.clicked && showHadithBtn.clicked && showDhikrBtn.clicked) {
        mineBtn.disabled = false; // تمكين زر التعدين بعد الضغط على الأزرار
    }
}

// بدء التعدين
mineBtn.addEventListener("click", () => {
    if (canMine) {
        miningActive = true;
        startMining();
    }
});

// مؤقت التعدينا
function startMining() {
    let interval = setInterval(function () {
        if (timer <= 0) {
            clearInterval(interval);
            alert("تم التعدين! تم إضافة عملات جديدة.");
            minedCoins += 3; // إضافة عملة واحدة بعد 8 ساعات
            updateUI();
            miningActive = false;
            canMine = false; // عدم السماح بالتعدين مرة أخرى
            mineBtn.disabled = true; // تعطيل زر التعدين بعد أن انتهت المدة
        } else {
            timer--;
            updateUI(); // تحديث المؤقت
        }
    }, 1000);
}

// تحديث واجهة المستخدم
function updateUI() {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer % 3600) / 60);
    let seconds = timer % 60;
    timerDisplay.textContent = `المؤقت: ${hours}:${minutes}:${seconds}`;
    minedCoinsDisplay.textContent = `عدد العملات المستخرجة: ${minedCoins}`;
}
