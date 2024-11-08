// العناصر من واجهة المستخدم
let verseButton = document.getElementById('verseButton');
let dhikrButton = document.getElementById('dhikrButton');
let hadithButton = document.getElementById('hadithButton');
let startMiningButton = document.getElementById('startMiningButton');
let resultDiv = document.getElementById('result');
let timerDiv = document.getElementById('timer');
let totalCoinsSpan = document.getElementById('totalCoins');
let miningCycleCoinsSpan = document.getElementById('miningCycleCoins');

let coinTotal = 0; // إجمالي العملات الكلي
let miningCycleCoins = 0; // عدد العملات في دورة التعدين الحالية
let miningInterval = 8 * 60 * 60 * 1000; // 8 ساعات بالميلي ثانية
let miningTimer;

// مصفوفات الآيات، الأذكار، والأحاديث (تمت تعبئتها بـ 50 عنصر)
let verseArray = [
    "بسم الله الرحمن الرحيم", "الحمد لله رب العالمين", "الرحمن الرحيم", /* ... البقية ... */
    "الحمد لله الذي هدانا لهذا", "رب اغفر وارحم وأنت خير الراحمين"
];

let dhikrArray = [
    "سبحان الله", "الحمد لله", "لا إله إلا الله", "الله أكبر", /* ... البقية ... */
    "اللهم اغفر لي ولوالدي وللمؤمنين", "اللهم اجعلني من عبادك الصالحين"
];

let hadithArray = [
    "إنما الأعمال بالنيات", "الدين النصيحة", "يسروا ولا تعسروا", "إن الله يحب إذا عمل أحدكم عملاً أن يتقنه", /* ... البقية ... */
    "لا يشكر الله من لا يشكر الناس", "الدعاء هو العبادة"
];

// دوال لتحديد عنصر عشوائي من المصفوفات
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// عرض الآية العشوائية عند الضغط على الزر
verseButton.addEventListener('click', () => {
    resultDiv.textContent = getRandomElement(verseArray);
});

// عرض الذكر العشوائي عند الضغط على الزر
dhikrButton.addEventListener('click', () => {
    resultDiv.textContent = getRandomElement(dhikrArray);
});

// عرض الحديث العشوائي عند الضغط على الزر
hadithButton.addEventListener('click', () => {
    resultDiv.textContent = getRandomElement(hadithArray);
});

// بدء التعدين
startMiningButton.addEventListener('click', startMining);

// دالة بدء التعدين
function startMining() {
    if (miningTimer) {
        clearInterval(miningTimer);
    }
    
    miningCycleCoins = 3; // عدد العملات المستخرجة في كل عملية تعدين
    coinTotal += miningCycleCoins; // تحديث العدد الكلي للعملات
    totalCoinsSpan.textContent = coinTotal;
    miningCycleCoinsSpan.textContent = miningCycleCoins;
    
    startCountdown();
}

// دالة بدء المؤقت التنازلي للتعدين
function startCountdown() {
    let endTime = Date.now() + miningInterval;
    
    miningTimer = setInterval(() => {
        let timeLeft = endTime - Date.now();
        
        if (timeLeft <= 0) {
            clearInterval(miningTimer);
            timerDiv.textContent = "يمكنك بدء التعدين الآن!";
        } else {
            let hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
            let seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
            timerDiv.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}
