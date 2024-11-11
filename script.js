// تبديل العرض بين نموذج تسجيل الدخول والتسجيل
function switchToRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function switchToLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// تسجيل مستخدم جديد
function registerUser() {
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-password-repeat").value;

  if (password !== confirmPassword) {
    alert("كلمتا المرور غير متطابقتين. الرجاء التأكد.");
    return;
  }

  if (username && email && password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
    switchToLogin();
  } else {
    alert("الرجاء ملء جميع الحقول.");
  }
}

// تسجيل الدخول
function loginUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    document.getElementById("username-display").textContent = storedUsername;
    document.getElementById("login-form").style.display = "none";
    document.getElementById("user-dashboard").style.display = "block";
    checkMiningStatus(); // تحقق من حالة التعدين عند تسجيل الدخول
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
}

// بدء التعدين وإضافة العملات
function startMining() {
  const lastMiningTime = localStorage.getItem("lastMiningTime");
  const now = new Date().getTime();

  // التحقق إذا كان المستخدم قد بدأ التعدين في آخر 24 ساعة
  if (lastMiningTime && now - lastMiningTime < 24 * 60 * 60 * 1000) {
    alert("يجب الانتظار حتى انتهاء المؤقت قبل بدء التعدين مرة أخرى.");
    return;
  }

  alert("تم بدء عملية التعدين! سيتم إضافة العملات إلى حسابك.");

  let userCoins = document.getElementById("user-coins");
  userCoins.textContent = parseInt(userCoins.textContent) + 3;

  let referralCoins = document.getElementById("referral-coins");
  referralCoins.textContent = parseInt(referralCoins.textContent) + 1;

  // تخزين توقيت التعدين الأخير وتحديث المؤقت
  localStorage.setItem("lastMiningTime", now);
  startMiningTimer(24 * 60 * 60); // 24 ساعة بالثواني
}

// بدء مؤقت التعدين
function startMiningTimer(duration) {
  const timerDisplay = document.getElementById("mining-timer");
  let timer = duration;

  const interval = setInterval(function() {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    timerDisplay.textContent = `الوقت المتبقي للتعدين: ${hours}:${minutes}:${seconds}`;

    if (--timer < 0) {
      clearInterval(interval);
      timerDisplay.textContent = "يمكنك بدء التعدين الآن!";
      localStorage.removeItem("lastMiningTime");
    }
  }, 1000);
}

// التحقق من حالة التعدين عند تسجيل الدخول
function checkMiningStatus() {
  const lastMiningTime = localStorage.getItem("lastMiningTime");
  const now = new Date().getTime();

  if (lastMiningTime) {
    const timeSinceLastMining = Math.floor((now - lastMiningTime) / 1000);
    const remainingTime = 24 * 60 * 60 - timeSinceLastMining;

    if (remainingTime > 0) {
      startMiningTimer(remainingTime);
    }
  }
}