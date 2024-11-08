// متغيرات الأزرار والعناصر
const showVerseButton = document.getElementById('showVerseButton');
const showDhikrButton = document.getElementById('showDhikrButton');
const startMiningButton = document.getElementById('startMiningButton');

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
startMiningButton.addEventListener('click', function() {
    alert("تم بدء التعدين!");
    startMiningButton.disabled = true;
    setTimeout(() => {
        startMiningButton.disabled = false;
    }, 28800000); // 8 ساعات بالمللي ثانية
});

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
