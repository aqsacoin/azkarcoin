let timer = 28800;  // المؤقت يبدأ من 8 ساعات (28800 ثانية)
let miningInterval; // المتغير الخاص بالـ setInterval
let minedCoins = 0; // عدد العملات المستخرجة
let miningActive = false; // حالة التعدين

// دالة التعدين
mineBtn.addEventListener("click", () => {
    if (mineBtn.disabled || miningActive) return; // إذا كان الزر معطلًا أو التعدين جاري، لا نفعل أي شيء

    mineBtn.disabled = true; // تعطيل زر التعدين أثناء التعدين
    miningActive = true;  // بدء التعدين
    startMining();
});

// دالة بدء التعدين
function startMining() {
    miningInterval = setInterval(() => {
        timer--;  // تقليل الوقت بمقدار ثانية كل مرة
        updateTimerDisplay(); // تحديث العرض عند كل ثانية
    }, 1000); // تحديث المؤقت كل ثانية
}

// دالة تحديث المؤقت
function updateTimerDisplay() {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    timerDisplay.textContent = `المؤقت: ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    
    // التحقق إذا انتهت الـ 8 ساعات
    if (timer <= 0) { // إذا انتهت الـ 8 ساعات
        clearInterval(miningInterval); // إيقاف التعدين
        minedCoins += 3; // إضافة 3 عملات عند انتهاء الوقت
        minedCoinsDisplay.textContent = `عدد العملات المستخرجة: ${minedCoins}`;
        mineBtn.disabled = false; // إعادة تفعيل زر التعدين
        miningActive = false;  // إيقاف حالة التعدين
    }
}

// دالة لتنسيق الرقم ليظهر بصيغة تحتوي على صفر إذا كان أقل من 10
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// تسجيل الدخول
function login() {
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.reload();
    } else {
        alert("الرجاء إدخال اسم المستخدم وكلمة المرور.");
    }
}

// التسجيل
function register() {
    const email = document.getElementById("emailRegister").value;
    const username = document.getElementById("usernameRegister").value;
    const password = document.getElementById("passwordRegister").value;
    const confirmPassword = document.getElementById("confirmPasswordRegister").value;

    if (password === confirmPassword) {
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("تم التسجيل بنجاح!");
    } else {
        alert("كلمة المرور وتأكيد كلمة المرور غير متطابقتين.");
    }
}

// تسجيل الخروج
function logout() {
    localStorage.clear();  // مسح بيانات المستخدم من التخزين المحلي
    window.location.reload(); // إعادة تحميل الصفحة
}

// تفعيل واجهة المستخدم بعد تسجيل الدخول
function showUserInfo() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
        document.getElementById("userNameDisplay").textContent = `اسم المستخدم: ${username}`;
        document.getElementById("userEmailDisplay").textContent = `البريد الإلكتروني: ${email}`;
        document.getElementById("mainPage").style.display = "block";  // إظهار الصفحة الرئيسية
        document.getElementById("loginForm").style.display = "none"; // إخفاء نموذج الدخول
        document.getElementById("registerForm").style.display = "none"; // إخفاء نموذج التسجيل
    }
}

// التحقق من حالة تسجيل الدخول
if (localStorage.getItem("username")) {
    showUserInfo();
}

// الآيات، الأحاديث والأذكار
const ayat = [
    "وَقَالَ رَبُّكُمْ ادْعُونِي أَسْتَجِبْ لَكُمْ",
    "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ"
];

const hadiths = [
    "من لا يشكر الناس لا يشكر الله.",
    "خير الناس أنفعهم للناس.",
    "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه."
];

const dhikr = [
    "سُبْحَانَ اللَّهِ",
    "اللَّهُ أَكْبَرُ",
    "الْحَمْدُ لِلَّهِ"
];

// عرض الآية، الحديث أو الذكر
document.getElementById("showAyahBtn").addEventListener("click", () => {
    const randomAyah = ayat[Math.floor(Math.random() * ayat.length)];
    alert(randomAyah);
});

document.getElementById("showHadithBtn").addEventListener("click", () => {
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    alert(randomHadith);
});

document.getElementById("showDhikrBtn").addEventListener("click", () => {
    const randomDhikr = dhikr[Math.floor(Math.random() * dhikr.length)];
    alert(randomDhikr);
});
