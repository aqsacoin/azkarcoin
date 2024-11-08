// متغيرات للحفاظ على الرصيد وعدد العملات المستخرجة
let balance = 0; // الرصيد الأساسي للمستخدم
let extracted = 0; // عدد العملات المستخرجة
let isMining = false; // حالة التعدين
let startTime = 0; // وقت بداية التعدين
let miningInterval = null; // المؤقت الذي يحسب الوقت
let miningDuration = 8 * 60 * 60 * 1000; // مدة دورة التعدين 8 ساعات بالمللي ثانية
let remainingTime = miningDuration; // الوقت المتبقي

// التحقق مما إذا كان المستخدم مسجلاً
function checkUserLogin() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('auth-section').style.display = 'none'; // إخفاء قسم التسجيل/تسجيل الدخول
        updateMiningInfo(); // تحديث معلومات التعدين
    } else {
        document.getElementById('auth-section').style.display = 'block'; // عرض قسم التسجيل/تسجيل الدخول
    }
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

// بدء التعدين
document.getElementById('start-mining').addEventListener('click', function() {
    if (!isMining) { // إذا لم يكن التعدين جارياً
        isMining = true;
        startTime = Date.now(); // تعيين وقت بداية التعدين
        miningInterval = setInterval(function () {
            remainingTime = miningDuration - (Date.now() - startTime); // الوقت المتبقي

            if (remainingTime <= 0) {
                clearInterval(miningInterval); // إيقاف المؤقت
                extracted += 3; // إضافة 3 عملات عند انتهاء الدورة
                balance += 3; // إضافة 3 عملات للرصيد
                updateMiningInfo(); // تحديث المعلومات في الصفحة
                alert("تم التعدين! لديك الآن " + extracted + " عملات.");
                isMining = false;
                remainingTime = miningDuration; // إعادة تعيين الوقت المتبقي
            }

            // تحديث المؤقت في الصفحة
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
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('auth-section').style.display = 'none';
        updateMiningInfo(); // تحديث معلومات التعدين
    } else {
        alert("كلمة المرور غير متطابقة");
    }
});

// تحقق من حالة تسجيل الدخول عند تحميل الصفحة
checkUserLogin();
