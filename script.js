// مصفوفات الآيات، الأذكار، والأحاديث
const ayat = ["إِنَّ مَعَ الْعُسْرِ يُسْرًا", "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا"];
const azkar = ["سبحان الله", "الحمد لله", "لا إله إلا الله"];
const ahadith = ["إنما الأعمال بالنيات", "الدين النصيحة", "من حسن إسلام المرء تركه ما لا يعنيه"];

let miningEnabled = false;
let balance = parseInt(localStorage.getItem("balance")) || 0;
let miningStart = parseInt(localStorage.getItem("miningStart")) || 0;

document.getElementById("balance").innerText = balance;

// تسجيل المستخدم الجديد
document.getElementById("register-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password === confirmPassword) {
        localStorage.setItem("user", JSON.stringify({ email, username, password }));
        alert("تم التسجيل بنجاح!");
        showMainSection();
    } else {
        alert("كلمات المرور غير متطابقة");
    }
});

// تسجيل الدخول
document.getElementById("login-btn").addEventListener("click", function() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username === username && user.password === password) {
        alert("تم تسجيل الدخول بنجاح!");
        showMainSection();
    } else {
        alert("بيانات تسجيل الدخول غير صحيحة");
    }
});

// عرض الأقسام الأساسية
function showMainSection() {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("main-section").style.display = "block";
}

// عرض تسجيل الدخول
document.getElementById("show-login").addEventListener("click", function() {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
});

// عرض صفحة التسجيل
document.getElementById("show-register").addEventListener("click", function() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("auth-section").style.display = "block";
});

// زر عرض الآية
document.getElementById("ayah-btn").addEventListener("click", function() {
    const ayahText = ayat[Math.floor(Math.random() * ayat.length)];
    document.getElementById("ayah-text").innerText = ayahText;
    checkMiningReady();
});

// زر عرض الذكر
document.getElementById("zikr-btn").addEventListener("click", function() {
    const zikrText = azkar[Math.floor(Math.random() * azkar.length)];
    document.getElementById("zikr-text").innerText = zikrText;
    checkMiningReady();
});

// زر عرض الحديث
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

// زر التعدين
document.getElementById("start-mining-btn").addEventListener("click", function() {
    const now = Date.now();
    if (!miningEnabled && (now - miningStart) >= 8 * 60 * 60 * 1000) {
        miningEnabled = true;
        miningStart = now;
        localStorage.setItem("miningStart", miningStart);
        document.getElementById("mining-status").innerText = "التعدين جاري...";
        setTimeout(() => {
            miningEnabled = false;
            balance += 3;
            localStorage.setItem("balance", balance);
            document.getElementById("balance").innerText = balance;
            document.getElementById("mining-status").innerText = "تم التعدين! يمكنك البدء مجددًا بعد 8 ساعات";
        }, 2000); // اختبار مؤقت سريع 2 ثانية
    } else {
        alert("يرجى الانتظار حتى انتهاء المؤقت.");
    }
});

// عرض تسجيل الدخول في حالة وجود مستخدم مسجل
if (localStorage.getItem("user")) {
    showMainSection();
}
