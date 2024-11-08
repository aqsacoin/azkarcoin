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

let minedCoins = 0;
let timer = 8 * 60 * 60; // 8 ساعات بالثواني
let miningActive = false;
let canMine = false; // يتم تعيين هذه القيمة إلى true عندما يتم الضغط على جميع الأزرار
let loggedInUser = null; // المتغير الذي يخزن المستخدم المسجل دخوله

let ayahClicked = false;
let hadithClicked = false;
let dhikrClicked = false;

// استرجاع حالة تسجيل الدخول
if (localStorage.getItem("loggedInUser")) {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    showMainPage();
}

// عرض آية
showAyahBtn.addEventListener("click", () => {
    const randomAyah = ayat[Math.floor(Math.random() * ayat.length)];
    alert(randomAyah); // عرض الآية في نافذة منبثقة
    ayahClicked = true; // تعيين متغير الضغط على الزر
    checkIfCanMine(); // التحقق إذا يمكن بدء التعدين
});

// عرض حديث
showHadithBtn.addEventListener("click", () => {
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    alert(randomHadith); // عرض الحديث في نافذة منبثقة
    hadithClicked = true; // تعيين متغير الضغط على الزر
    checkIfCanMine(); // التحقق إذا يمكن بدء التعدين
});

// عرض ذكر
showDhikrBtn.addEventListener("click", () => {
    const randomDhikr = dhikrs[Math.floor(Math.random() * dhikrs.length)];
    alert(randomDhikr); // عرض الذكر في نافذة منبثقة
    dhikrClicked = true; // تعيين متغير الضغط على الزر
    checkIfCanMine(); // التحقق إذا يمكن بدء التعدين
});

// التحقق إذا يمكن بدء التعدين
function checkIfCanMine() {
    if (ayahClicked && hadithClicked && dhikrClicked) {
        canMine = true; // تمكين التعدين بعد الضغط على جميع الأزرار
        mineBtn.disabled = false; // تمكين زر التعدين
    }
}

// بدء التعدين
mineBtn.addEventListener("click", () => {
    if (canMine) {
        miningActive = true;
        startMining();
    }
});

// مؤقت التعدين
function startMining() {
    let interval = setInterval(function () {
        if (timer <= 0) {
            clearInterval(interval);
            alert("تم التعدين! تم إضافة عملات جديدة.");
            minedCoins += 3; // إضافة 3 عملات بعد 8 ساعات
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

// دالة تسجيل الدخول
function login() {
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;

    if (localStorage.getItem(username) && localStorage.getItem(username) === password) {
        loggedInUser = username;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        showMainPage();
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
}

// دالة التسجيل
function register() {
    const email = document.getElementById("emailRegister").value;
    const username = document.getElementById("usernameRegister").value;
    const password = document.getElementById("passwordRegister").value;
    const confirmPassword = document.getElementById("confirmPasswordRegister").value;

    if (password === confirmPassword) {
        if (!localStorage.getItem(username)) {
            localStorage.setItem(username, password);
            alert("تم التسجيل بنجاح!");
            registerForm.style.display = "none";
            loginForm.style.display = "block";
        } else {
            alert("اسم المستخدم موجود مسبقًا.");
        }
    } else {
        alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين.");
    }
}

// دالة إظهار الصفحة الرئيسية بعد تسجيل الدخول
function showMainPage() {
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    mainPage.style.display = "block";
}
