// وظيفة لتحميل بيانات المستخدم
function loadUserData() {
  var username = localStorage.getItem("username");
  var coins = localStorage.getItem("coins");
  var referralCoins = localStorage.getItem("referralCoins");
  var avatar = localStorage.getItem("avatar");

  if (username && coins !== null && referralCoins !== null) {
    // عرض بيانات المستخدم
    document.getElementById("username-display").innerText = username;
    document.getElementById("user-coins").innerText = coins;
    document.getElementById("referral-coins").innerText = referralCoins || "0";

    // تحديث صورة المستخدم إذا كانت موجودة
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
    // إذا كانت البيانات مفقودة، إظهار رسالة أو إعادة توجيه المستخدم
    window.location.href = 'login.html';  // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم تكن البيانات موجودة
  }
}

// تحديث وظيفة رفع الصورة مع معالجة الأخطاء
function uploadPhoto() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return; // إذا لم يتم اختيار ملف، لا تتابع

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

// تحميل بيانات المستخدم عند فتح الصفحة الرئيسية
if (window.location.href.indexOf("index.html") !== -1) {
  loadUserData();
}