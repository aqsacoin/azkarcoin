document.addEventListener("DOMContentLoaded", () => {
    // الحصول على العناصر
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mainPage = document.getElementById("mainPage");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const showAyahBtn = document.getElementById("showAyahBtn");
    const showHadithBtn = document.getElementById("showHadithBtn");
    const showDhikrBtn = document.getElementById("showDhikrBtn");
    const mineBtn = document.getElementById("mineBtn");
    const userNameDisplay = document.getElementById("userNameDisplay");
    const userEmailDisplay = document.getElementById("userEmailDisplay");
    const timerDisplay = document.getElementById("timer");
    const minedCoinsDisplay = document.getElementById("minedCoins");

    let minedCoins = 0;
    let miningInterval;
    let timer = 0;
    let loggedInUser;

    // التحقق من وجود مستخدم مسجل
    if (localStorage.getItem("loggedInUser")) {
        loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        showMainPage();
    }

    // دالة عرض الصفحة الرئيسية
    function showMainPage() {
        loginForm.style.display = "none";
        registerForm.style.display = "none";
        mainPage.style.display = "block";
        userNameDisplay.textContent = `مرحبًا، ${loggedInUser.username}`;
        userEmailDisplay.textContent = `بريدك الإلكتروني: ${loggedInUser.email}`;
    }

    // دالة تسجيل الدخول
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = document.getElementById("usernameLogin").value;
        const password = document.getElementById("passwordLogin").value;

        const storedUser = JSON.parse(localStorage.getItem("user_" + email));
        if (storedUser && storedUser.password === password) {
            loggedInUser = storedUser;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            showMainPage();
        } else {
            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        }
    });

    // دالة التسجيل
    registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = document.getElementById("emailRegister").value;
        const username = document.getElementById("usernameRegister").value;
        const password = document.getElementById("passwordRegister").value;
        const confirmPassword = document.getElementById("confirmPasswordRegister").value;

        if (password === confirmPassword) {
            const newUser = {
                email: email,
                username: username,
                password: password
            };

            localStorage.setItem("user_" + email, JSON.stringify(newUser));
            alert("تم التسجيل بنجاح!");
        } else {
            alert("كلمة المرور غير متطابقة.");
        }
    });

    // استعلام API للآيات القرآنية
    async function getRandomAyah() {
        try {
            const response = await fetch("https://api.alquran.cloud/v1/ayah/random");
            const data = await response.json();
            return data.data.text;
        } catch (error) {
            console.error("خطأ في جلب الآية:", error);
            return "حدث خطأ أثناء جلب الآية.";
        }
    }

    // مصفوفة الأحاديث النبوية
    const hadiths = [
        "قال رسول الله صلى الله عليه وسلم: (من لا يشكر الناس لا يشكر الله).",
        "قال رسول الله صلى الله عليه وسلم: (إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى).",
        "قال رسول الله صلى الله عليه وسلم: (من لا يرحم الناس لا يرحمه الله).",
        "قال رسول الله صلى الله عليه وسلم: (لا تؤذوا عباد الله، ولا تعينوا على ظلمهم).",
        "قال رسول الله صلى الله عليه وسلم: (الدين النصيحة)."
    ];

    // استعلام API للأذكار
    const dhikrs = [
        "سبحان الله وبحمده، سبحان الله العظيم",
        "اللهم صلِّ وسلم على نبينا محمد",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه"
    ];

    // أحداث الأزرار (مثل عرض الآية، الحديث، الذكر)
    showAyahBtn.addEventListener("click", async () => {
        const randomAyah = await getRandomAyah();
        alert("آية من القرآن الكريم: " + randomAyah);
    });

    showHadithBtn.addEventListener("click", () => {
        const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
        alert("حديث نبوي: " + randomHadith);
    });

    showDhikrBtn.addEventListener("click", () => {
        const randomDhikr = dhikrs[Math.floor(Math.random() * dhikrs.length)];
        alert("ذكر: " + randomDhikr);
    });

    // دالة التعدين
    mineBtn.addEventListener("click", () => {
        mineBtn.disabled = true; // تعطيل زر التعدين أثناء التعدين
        startMining();
    });

    // دالة بدء التعدين
    function startMining() {
        timer = 0;
        miningInterval = setInterval(() => {
            timer++;
            updateTimerDisplay();
        }, 1000); // تحديث المؤقت كل ثانية
    }

    // دالة تحديث المؤقت
    function updateTimerDisplay() {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        timerDisplay.textContent = `المؤقت: ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        
        // التحقق إذا كان قد مر 24 ساعة
        if (timer >= 86400) { // 86400 ثانية = 24 ساعة
            stopMining();
            minedCoins += 3; // إضافة 3 عملات بعد كل 24 ساعة
            minedCoinsDisplay.textContent = `عدد العملات المستخرجة: ${minedCoins}`;
        }
    }

    // دالة إيقاف التعدين
    function stopMining() {
        clearInterval(miningInterval); // إيقاف المؤقت
        mineBtn.disabled = false; // تمكين زر التعدين مرة أخرى
        timer = 0; // إعادة تعيين المؤقت
    }

    // دالة إضافة صفر أمام الأرقام الصغيرة
    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }
});
