// المصفوفات الخاصة بالآيات، الأذكار، والأحاديث
const verses = [
  "الآية 1", "الآية 2", "الآية 3", "الآية 4", "الآية 5", 
  // أضف المزيد هنا ...
];

const azkars = [
  "ذكر 1", "ذكر 2", "ذكر 3", "ذكر 4", "ذكر 5",
  // أضف المزيد هنا ...
];

const hadiths = [
  "حديث 1", "حديث 2", "حديث 3", "حديث 4", "حديث 5",
  // أضف المزيد هنا ...
];

// إعدادات التسجيل والدخول
document.getElementById('register').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("كلمة السر غير متطابقة!");
    return;
  }

  const user = { email, username, password };
  localStorage.setItem('user', JSON.stringify(user));

  alert("تم التسجيل بنجاح!");
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
});

document.getElementById('login').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert("تم تسجيل الدخول بنجاح!");
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    startMining();
  } else {
    alert("بيانات الدخول غير صحيحة");
  }
});

// التعدين والمؤقت
let miningTimer;
let miningTimeLeft = 8 * 60 * 60; // 8 ساعات بالثواني

function startMining() {
  miningTimer = setInterval(function() {
    const hours = Math.floor(miningTimeLeft / 3600);
    const minutes = Math.floor((miningTimeLeft % 3600) / 60);
    const seconds = miningTimeLeft % 60;

    document.getElementById('timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    miningTimeLeft--;

    if (miningTimeLeft < 0) {
      clearInterval(miningTimer);
      alert("دورة التعدين انتهت!");
      // إعادة تعيين المؤقت لبدء دورة تعدين جديدة
      miningTimeLeft = 8 * 60 * 60; // 8 ساعات
      startMining();
    }
  }, 1000);
}
