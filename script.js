const ayahs = [
    "آية 1: بسم الله الرحمن الرحيم...",
    "آية 2: الحمد لله رب العالمين...",
    "آية 3: الله لا إله إلا هو...",
    // إضافة المزيد من الآيات
];

const dhikrs = [
    "ذكر 1: سبحان الله",
    "ذكر 2: الحمد لله",
    "ذكر 3: الله أكبر",
    // إضافة المزيد من الأذكار
];

const hadiths = [
    "حديث 1: قال رسول الله صلى الله عليه وسلم...",
    "حديث 2: قال رسول الله صلى الله عليه وسلم...",
    "حديث 3: قال رسول الله صلى الله عليه وسلم...",
    // إضافة المزيد من الأحاديث
];

let miningTimer;
let totalMinedCoins = 0;
let coinsThisCycle = 0;

document.getElementById("authForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password === confirmPassword) {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        document.getElementById("auth").style.display = "none";
        document.getElementById("userContent").style.display = "block";
    } else {
        alert("كلمة المرور غير متطابقة!");
    }
});

document.getElementById("loginButton").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (localStorage.getItem("username") === username && localStorage.getItem("password") === password) {
        document.getElementById("auth").style.display = "none";
        document.getElementById("userContent").style.display = "block";
    } else {
        alert("إسم المستخدم أو كلمة المرور غير صحيحة!");
    }
});

document.getElementById("showAyahBtn").addEventListener("click", function() {
    const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
    document.getElementById("ayah").innerText = randomAyah;
});

document.getElementById("showDhikrBtn").addEventListener("click", function() {
    const randomDhikr = dhikrs[Math.floor(Math.random() * dhikrs.length)];
    document.getElementById("dhikr").innerText = randomDhikr;
});

document.getElementById("showHadithBtn").addEventListener("click", function() {
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    document.getElementById("hadith").innerText = randomHadith;
});

document.getElementById("startMiningBtn").addEventListener("click", function() {
    coinsThisCycle = 3;
    totalMinedCoins += coinsThisCycle;
    document.getElementById("minedCoins").innerText = totalMinedCoins;
    startMiningTimer();
});

function startMiningTimer() {
    let timeLeft = 8 * 60 * 60; // 8 ساعات بالثواني
    miningTimer = setInterval(function() {
        timeLeft--;
        let hours = Math.floor(timeLeft / 3600);
        let minutes = Math.floor((timeLeft % 3600) / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").innerText = `وقت التعدين: ${hours}:${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(miningTimer);
            alert("انتهت دورة التعدين، أعد المحاولة بعد 8 ساعات.");
        }
    }, 1000);
}
