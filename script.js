// متغيرات الأزرار والعناصر
const showVerseButton = document.getElementById('showVerseButton');
const showDhikrButton = document.getElementById('showDhikrButton');
const startMiningButton = document.getElementById('startMiningButton');
const miningTimerElement = document.getElementById('miningTimer'); // عنصر لعرض المؤقت

const verseElement = document.getElementById('verse');
const dhikrElement = document.getElementById('dhikr');

const verse = "إِنَّ اللّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ";
const dhikr = "سُبْحَانَ اللّهِ وَبِحَمْدِهِ";

// عرض الآية
showVerseButton.addEventListener('click', function() {
    verseElement.innerHTML = verse;
    checkReadyForMining();
});

// عرض الذكر
showDhikrButton.addEventListener('click', function() {
    dhikrElement.innerHTML = dhikr;
    checkReadyForMining();
});

// التحقق من استعداد التعدين
function checkReadyForMining() {
    if (verseElement.innerHTML && dhikrElement.innerHTML) {
        startMiningButton.disabled = false;
    }
}

// بدء التعدين
let miningTimer;
startMiningButton.addEventListener('click', function() {
    alert("تم بدء التعدين!");
    startMiningButton.disabled = true;
    startMiningTimer(28800000); // 8 ساعات بالمللي ثانية
});

// بدء المؤقت
function startMiningTimer(duration) {
    let timer = duration;
    miningTimerElement.style.display = 'block'; // إظهار عنصر المؤقت

    function updateTimer() {
        let hours = Math.floor(timer / 3600000); // حساب الساعات
        let minutes = Math.floor((timer % 3600000) / 60000); // حساب الدقائق
        let seconds = Math.floor((timer % 60000) / 1000); // حساب الثواني

        miningTimerElement.innerHTML = `المتبقي للتعدين: ${hours}:${minutes}:${seconds}`;

        if (timer <= 0) {
            clearInterval(miningTimer); // إيقاف المؤقت عند الوصول للصفر
            startMiningButton.disabled = false; // إعادة تفعيل زر التعدين
            miningTimerElement.innerHTML = "تم إيقاف التعدين.";
        } else {
            timer -= 1000; // تقليل الوقت بمقدار ثانية
        }
    }

    miningTimer = setInterval(updateTimer, 1000); // تحديث المؤقت كل ثانية
}

// تسجيل الدخول
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {
        localStorage.setItem('user', JSON.stringify({ email, username }));
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        alert("كلمات السر غير متطابقة.");
    }
});

// التحقق من حالة المستخدم عند إعادة تحميل الصفحة
window.onload = function() {
    const user = localStorage.getItem('user');
    if (user) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }
};
