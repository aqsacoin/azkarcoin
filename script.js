// المصفوفات
const ayat = [
    "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا",
    "وَقُل رَّبُّ زِدْنِي عِلْمًا",
    "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَاِي وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
    // أضف باقي الآيات هنا
];

const hadiths = [
    "قال رسول الله صلى الله عليه وسلم: " + 
    "من لا يشكر الناس لا يشكر الله.",
    "قال رسول الله صلى الله عليه وسلم: " + 
    "خير الناس أنفعهم للناس.",
    // أضف باقي الأحاديث هنا
];

const dhikrs = [
    "سبحان الله والحمد لله ولا إله إلا الله والله أكبر",
    "اللهم صل على محمد",
    "اللهم اغفر لي ولأبوي وللمؤمنين",
    // أضف باقي الأذكار هنا
];

// العناصر في الصفحة
const showAyahBtn = document.getElementById("showAyahBtn");
const showHadithBtn = document.getElementById("showHadithBtn");
const showDhikrBtn = document.getElementById("showDhikrBtn");
const mineBtn = document.getElementById("mineBtn");
const timerDisplay = document.getElementById("timer");
const minedCoinsDisplay = document.getElementById("minedCoins");

let minedCoins = 0;
let timer = 8 * 60 * 60; // 8 ساعات بالثواني
let miningActive = false;

showAyahBtn.addEventListener("click", () => {
    const randomAyah = ayat[Math.floor(Math.random() * ayat.length)];
    alert(randomAyah);
    checkIfCanMine();
});

showHadithBtn.addEventListener("click", () => {
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    alert(randomHadith);
    checkIfCanMine();
});

showDhikrBtn.addEventListener("click", () => {
    const randomDhikr = dhikrs[Math.floor(Math.random() * dhikrs.length)];
    alert(randomDhikr);
