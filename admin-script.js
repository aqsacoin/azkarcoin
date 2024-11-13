// الدالة لعرض القسم المختار وإخفاء باقي الأقسام
function showSection(sectionId) {
  // إخفاء جميع الأقسام
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // عرض القسم المختار
  const section = document.getElementById(sectionId);
  section.style.display = 'block';
}

// إدارة المستخدمين
function loadUsers() {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '<p>قيد التحميل...</p>';
  setTimeout(() => {
    userList.innerHTML = `
      <ul>
        <li>مستخدم 1 <button onclick="editUser(1)">تعديل</button><button onclick="deleteUser(1)">حذف</button></li>
        <li>مستخدم 2 <button onclick="editUser(2)">تعديل</button><button onclick="deleteUser(2)">حذف</button></li>
      </ul>
    `;
  }, 1000);
}

function addUser() {
  alert('إضافة مستخدم جديد');
}

function editUser(userId) {
  alert(`تعديل المستخدم ${userId}`);
}

function deleteUser(userId) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
    alert(`تم حذف المستخدم ${userId}`);
  }
}

// إدارة الإعلانات
function loadAds() {
  const adsList = document.getElementById('ads-list');
  adsList.innerHTML = '<p>قيد التحميل...</p>';
  setTimeout(() => {
    adsList.innerHTML = `
      <ul>
        <li>إعلان 1 <button onclick="editAd(1)">تعديل</button><button onclick="deleteAd(1)">حذف</button></li>
        <li>إعلان 2 <button onclick="editAd(2)">تعديل</button><button onclick="deleteAd(2)">حذف</button></li>
      </ul>
    `;
  }, 1000);
}

function addAd() {
  alert('إضافة إعلان جديد');
}

function editAd(adId) {
  alert(`تعديل الإعلان ${adId}`);
}

function deleteAd(adId) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذا الإعلان؟')) {
    alert(`تم حذف الإعلان ${adId}`);
  }
}

// إدارة الأذكار
function loadAzkar() {
  const azkarList = document.getElementById('azkar-list');
  azkarList.innerHTML = '<p>قيد التحميل...</p>';
  setTimeout(() => {
    azkarList.innerHTML = `
      <ul>
        <li>ذكر 1 <button onclick="editAzkar(1)">تعديل</button><button onclick="deleteAzkar(1)">حذف</button></li>
        <li>ذكر 2 <button onclick="editAzkar(2)">تعديل</button><button onclick="deleteAzkar(2)">حذف</button></li>
      </ul>
    `;
  }, 1000);
}

function addAzkar() {
  alert('إضافة ذكر جديد');
}

function editAzkar(azkarId) {
  alert(`تعديل الذكر ${azkarId}`);
}

function deleteAzkar(azkarId) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذا الذكر؟')) {
    alert(`تم حذف الذكر ${azkarId}`);
  }
}

// إعدادات التعدين
function loadMiningSettings() {
  const miningSettings = document.getElementById('mining-settings');
  miningSettings.innerHTML = '<p>قيد التحميل...</p>';
  setTimeout(() => {
    miningSettings.innerHTML = `
      <p>إعدادات التعدين الحالية: 
        <button onclick="editMiningSettings()">تعديل</button>
      </p>
    `;
  }, 1000);
}

function editMiningSettings() {
  alert('تعديل إعدادات التعدين');
}

// إدارة المهام اليومية
function loadTasks() {
  const tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = '<p>قيد التحميل...</p>';
  setTimeout(() => {
    tasksList.innerHTML = `
      <ul>
        <li>مهمة 1 <button onclick="editTask(1)">تعديل</button><button onclick="deleteTask(1)">حذف</button></li>
        <li>مهمة 2 <button onclick="editTask(2)">تعديل</button><button onclick="deleteTask(2)">حذف</button></li>
      </ul>
    `;
  }, 1000);
}

function addTask() {
  alert('إضافة مهمة جديدة');
}

function editTask(taskId) {
  alert(`تعديل المهمة ${taskId}`);
}

function deleteTask(taskId) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذه المهمة؟')) {
    alert(`تم حذف المهمة ${taskId}`);
  }
}