// متغيرات للحفاظ على الرصيد وعدد العملات المستخرجة
let balance = 0;
let extracted = 0;
let isMining = false;
let startTime = 0;
let miningInterval = null;
let miningDuration = 8 * 60 * 60 * 1000; // مدة التعدين 8 ساعات
let remainingTime = miningDuration; 

// التحقق مما إذا كان المستخدم مسجلاً
function checkUserLogin() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('auth-section').style.display = 'none'; 
        loadUserData(); // تحميل بيانات المستخدم
    } else {
        document.getElementById('auth-section').style.display = 'block'; 
    }
}

// تحميل بيانات المستخدم من localStorage
function loadUserData() {
    balance = parseInt(localStorage.getItem('balance')) || 0;
    extracted = parseInt(localStorage.getItem('extracted')) || 0;
    updateMiningInfo();
}

// التحديث في الصفحة
function updateMiningInfo() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('extracted').textContent = extracted;
}

// عرض الآية
document.getElementById('show-verse').addEventListener('click', function() {
    alert('هذه هي الآية القرآنية: بسم الله الرحمن الرحيم');
});

// عرض الذكر
document.getElementById('show-dhikr').addEventListener('click', function() {
    alert('سبحان الله وبحمده، سبحان الله العظيم');
});

// بدء التعدين بعد الضغط على الأزرار
document.getElementById('start-mining').addEventListener('click', function() {
    if (!isMining) {
        isMining = true;
        startTime = Date.now();
        miningInterval = setInterval(function () {
            remainingTime = miningDuration - (Date.now() - startTime);

            if (remainingTime <= 0) {
                clearInterval(miningInterval);
                extracted += 3; 
                balance += 3;
                updateMiningInfo();
                alert("تم التعدين! لديك الآن " + extracted + " عملات.");
                isMining = false;
                remainingTime = miningDuration;
            }

            let hours = Math.floor(remainingTime / 1000 / 60 / 60);
            let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
            let seconds = Math.floor((remainingTime / 1000) % 60);
            document.getElementById('mining-timer').textContent = `الوقت المتبقي: ${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
});

// تسجيل الدخول أو التسجيل
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('balance', balance);
        localStorage.setItem('extracted', extracted);
        document.getElementById('auth-section').style.display = 'none';
        loadUserData();
    } else {
        alert("كلمة المرور غير متطابقة");
    }
});

// تحقق من حالة تسجيل الدخول عند تحميل الصفحة
checkUserLogin();
