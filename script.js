// متغيرات لتتبع ترتيب الضغط على الأذكار
let currentStep = 0;

// ترتيب الأذكار المطلوب
const azkarOrder = ["subhanAllah", "laIlahaIllallah", "alhamdulillah", "allahuAkbar"];

// وظيفة لتشغيل الصوت عند الضغط على الأزرار والتحقق من الترتيب
function playAzkarSound(azkarType) {
  // تشغيل الصوت
  var audio = new Audio(azkarType + '.mp3');
  audio.play();
  
  // تحقق من الضغط على الأذكار بالترتيب الصحيح
  if (azkarOrder[currentStep] === azkarType) {
    currentStep++;
    if (currentStep === azkarOrder.length) {
      // تم الضغط على الأذكار بالترتيب الصحيح، تفعيل زر التعدين
      document.getElementById('start-mining-btn').disabled = false;
      currentStep = 0; // إعادة تعيين الترتيب للمرة القادمة
    }
  } else {
    // إعادة تعيين الترتيب إذا لم يكن الضغط بالترتيب الصحيح
    currentStep = 0;
  }
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
      startButton.disabled = true; // تعطيل زر التعدين بعد انتهاء فترة التعدين
      enableAzkarButtons(); // إعادة تفعيل أزرار الأذكار
    }
  }, 1000);

  miningInfo.innerHTML = "يتم الآن التعدين...";
  startButton.disabled = true; // تعطيل زر التعدين أثناء التعدين
  disableAzkarButtons(); // تعطيل أزرار الأذكار أثناء التعدين
}

// تعطيل أزرار الأذكار
function disableAzkarButtons() {
  document.getElementById("subhanAllah-btn").disabled = true;
  document.getElementById("laIlahaIllallah-btn").disabled = true;
  document.getElementById("alhamdulillah-btn").disabled = true;
  document.getElementById("allahuAkbar-btn").disabled = true;
}

// تفعيل أزرار الأذكار
function enableAzkarButtons() {
  document.getElementById("subhanAllah-btn").disabled = false;
  document.getElementById("laIlahaIllallah-btn").disabled = false;
  document.getElementById("alhamdulillah-btn").disabled = false;
  document.getElementById("allahuAkbar-btn").disabled = false;
}

// تحميل بيانات المستخدم عند فتح الصفحة الرئيسية
if (window.location.href.indexOf("index.html") !== -1) {
  loadUserData();
  document.getElementById('start-mining-btn').disabled = true; // تعطيل زر التعدين حتى يتم الضغط على الأذكار بالترتيب
}