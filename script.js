// وظيفة لتشغيل الصوت عند الضغط على الأزرار
function playAzkarSound(azkarType) {
  var audio = new Audio(azkarType + '.mp3');
  audio.play();
}

// وظيفة لبدء عملية التعدين
function startMining() {
  var miningInfo = document.getElementById('mining-info');
  var startButton = document.getElementById('start-mining-btn');
  var timer = document.getElementById('mining-timer');
  
  var timeLeft = 24 * 60 * 60; // 24 ساعة بالثواني

  var timerInterval = setInterval(function() {
    var hours = Math.floor(timeLeft / 3600);
    var minutes = Math.floor((timeLeft % 3600) / 60);
    var seconds = timeLeft % 60;
    
    timer.innerHTML = hours + ':' + minutes + ':' + seconds;
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      miningInfo.innerHTML = "لقد انتهت فترة التعدين. حظاً سعيداً!";
      startButton.disabled = false; // تمكين الزر بعد انتهاء فترة التعدين
    }
  }, 1000);

  miningInfo.innerHTML = "يتم الآن التعدين...";
  startButton.disabled = true; // تعطيل الزر أثناء التعدين
}

// وظيفة لتحميل بيانات المستخدم
function loadUserData() {
  var username = localStorage.getItem("username");
  var coins = localStorage.getItem("coins");
  var referralCoins = localStorage.getItem("referralCoins");
  var avatar = localStorage.getItem("avatar");

  if (username) {
    // عرض بيانات المستخدم
    document.getElementById("username-display").innerText = username;
    document.getElementById("user-coins").innerText = coins;
    document.getElementById("referral-coins").innerText = referralCoins || "0";

    // تحديث صورة المستخدم
    var userAvatar = document.getElementById('user-avatar');
    if (avatar) {
      userAvatar.src = avatar;
    }

    // تمكين الأزرار الخاصة بالتعدين
    document.getElementById("allahuAkbar-btn").disabled = false;
    document.getElementById("alhamdulillah-btn").disabled = false;
    document.getElementById("laIlahaIllallah-btn").disabled = false;
    document.getElementById("subhanAllah-btn").disabled = false;
  } else {
    // إذا لم يتم تسجيل الدخول
    window.location.href = 'login.html';
  }
}

// وظيفة لتسجيل الخروج
function logoutUser() {
  // إزالة بيانات المستخدم من التخزين المحلي
  localStorage.removeItem("username");
  localStorage.removeItem("coins");
  localStorage.removeItem("referralCoins");
  localStorage.removeItem("avatar");

  // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  window.location.href = 'login.html';
}

// وظيفة لتحميل صورة المستخدم
function uploadPhoto() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(readerEvent) {
      var img = readerEvent.target.result;
      localStorage.setItem("avatar", img); // حفظ الصورة في التخزين المحلي

      // تحديث الصورة في الصفحة
      document.getElementById('user-avatar').src = img;
    };
    
    reader.readAsDataURL(file);
  };

  input.click(); // فتح نافذة اختيار الملف
}

// وظيفة لتسجيل الدخول
function loginUser() {
  var username = document.getElementById('login-username').value;
  var password = document.getElementById('login-password').value;
  
  // التحقق من صحة بيانات الدخول
  if(username && password) {
    // تخزين بيانات المستخدم في التخزين المحلي
    localStorage.setItem("username", username);
    localStorage.setItem("coins", "0");
    localStorage.setItem("referralCoins", "0");

    // إعادة التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
    window.location.href = 'index.html';
  } else {
    alert("يرجى إدخال اسم المستخدم وكلمة المرور");
  }
}

// وظيفة للتسجيل
function registerUser() {
  var username = document.getElementById('register-username').value;
  var email = document.getElementById('register-email').value;
  var password = document.getElementById('register-password').value;
  var passwordRepeat = document.getElementById('register-password-repeat').value;

  // التحقق من صحة البيانات
  if (username && email && password && passwordRepeat && password === passwordRepeat) {
    // تخزين بيانات المستخدم في التخزين المحلي
    localStorage.setItem("username", username);
    localStorage.setItem("coins", "0");
    localStorage.setItem("referralCoins", "0");

    // إعادة التوجيه إلى الصفحة الرئيسية بعد التسجيل
    window.location.href = 'index.html';
  } else {
    alert("يرجى التأكد من البيانات المدخلة");
  }
}

// تحميل بيانات المستخدم عند فتح الصفحة الرئيسية
if (window.location.href.indexOf("index.html") !== -1) {
  loadUserData();
}