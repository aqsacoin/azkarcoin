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
const logoutBtn = document.getElementById("logoutBtn");

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

// دالة التسجيل
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    if (username && email && password) {
        const newUser = { username, email, password };
        localStorage.setItem("user_" + email, JSON.stringify(newUser));
        alert("تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول.");
        registerForm.reset();
        showMainPage(); // عرض الصفحة الرئيسية مباشرة بعد التسجيل
    } else {
        alert("يرجى ملء جميع الحقول.");
    }
});

// دالة تسجيل الدخول
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const storedUser = JSON.parse(localStorage.getItem("user_" + email));
    if (storedUser && storedUser.password === password) {
        loggedInUser = storedUser;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        showMainPage();
    } else {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    }
});

// دالة عرض الصفحة الرئيسية بعد تسجيل الدخول
function showMainPage() {
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    mainPage.style.display = "block";
    userNameDisplay.textContent = `مرحبًا، ${loggedInUser.username}`;
    userEmailDisplay.textContent = `بريدك الإلكتروني: ${loggedInUser.email}`;
    updateUI();
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
        if (!miningActive) {
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
            localStorage.setItem('timer', timer);
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

// تسجيل الخروج
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("miningActive");
    localStorage.removeItem("timer");
    alert("تم تسجيل الخروج بنجاح.");
    window.location.reload();
});

// التحقق إذا كان التعدين نشطاً عند تحميل الصفحة
if (miningActive) {
    startMining();
}
