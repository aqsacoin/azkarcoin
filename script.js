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
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const mainPage = document.getElementById("mainPage");
const userNameDisplay = document.getElementById("userNameDisplay");
const userEmailDisplay = document.getElementById("userEmailDisplay");

let minedCoins = 0;
let timer = localStorage.getItem('timer') ? parseInt(localStorage.getItem('timer')) : 8 * 60 * 60; // 8 ساعات بالثواني
let miningActive = localStorage.getItem('miningActive') === 'true';
let canMine = false;
let loggedInUser = null;

let ayahClicked = false;
let hadithClicked = false;
let dhikrClicked = false;

if (localStorage.getItem("loggedInUser")) {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    showMainPage();
}

// عرض آية
showAyahBtn.addEventListener("click", () => {
    const randomAyah = ayat[Math.floor(Math.random() * ayat.length)];
    alert(randomAyah);
    ayahClicked = true;
    checkIfCanMine();
});

// عرض حديث
showHadithBtn.addEventListener("click", () => {
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    alert(randomHadith);
    hadithClicked = true;
    checkIfCanMine();
});

// عرض ذكر
showDhikrBtn.addEventListener("click", () => {
    const randomDhikr = dhikrs[Math.floor(Math.random() * dhikrs.length)];
    alert(randomDhikr);
    dhikrClicked = true;
    checkIfCanMine();
});

function checkIfCanMine() {
    if (ayahClicked && hadithClicked && dhikrClicked) {
        canMine = true;
        mineBtn.disabled = false;
    }
}

// بدء التعدين
mineBtn.addEventListener("click", () => {
    if (canMine && !miningActive) {
        miningActive = true;
        localStorage.setItem('miningActive', 'true');
        startMining();
    }
});

function startMining() {
    let interval = setInterval(function () {
        if (!miningActive) { // شرط إضافي للتأكد من أن التعدين مستمر
            clearInterval(interval);
            return;
        }
        if (timer <= 0) {
            clearInterval(interval);
            alert("تم التعدين! تم إضافة عملات جديدة.");
            minedCoins += 3;
            updateUI();
            miningActive = false;
            canMine = false;
            mineBtn.disabled = true;
            localStorage.setItem('miningActive', 'false');
        } else {
            timer--;
            updateUI();
            localStorage.setItem('timer', timer); // تحديث الوقت المتبقي في كل ثانية
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

// التحقق إذا كان التعدين نشطاً عند تحميل الصفحة
if (miningActive) {
    startMining();  // إذا كان التعدين نشطًا عند تحميل الصفحة، استئناف التعدين
                }
