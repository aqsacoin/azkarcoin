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
  fetch(`/admin/edit-user/${userId}`, {
    method: 'POST',
    body: JSON.stringify({ userId: userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(`تم تعديل المستخدم ${userId}`);
      loadUsers();  // إعادة تحميل قائمة المستخدمين بعد التعديل
    } else {
      alert('حدث خطأ أثناء تعديل المستخدم');
    }
  })
  .catch(error => console.error('Error:', error));
}

function deleteUser(userId) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
    fetch(`/admin/delete-user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(`تم حذف المستخدم ${userId}`);
        loadUsers();  // إعادة تحميل قائمة المستخدمين بعد الحذف
      } else {
        alert('حدث خطأ أثناء حذف المستخدم');
      }
    })
    .catch(error => console.error('Error:', error));
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
  fetch(`/admin/edit-ad/${adId}`, {
    method: 'POST',
    body: JSON.stringify({ adId: adId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(`تم تعديل الإعلان ${adId}`);
      loadAds();  // إعادة تحميل قائمة الإعلانات بعد التعديل
    } else {
      alert('حدث خطأ أثناء تعديل الإعلان');
    }
  })
  .catch(error => console.error('Error:', error));
}

function deleteAd(adId) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذا الإعلان؟')) {
    fetch(`/admin/delete-ad/${adId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(`تم حذف الإعلان ${adId}`);
        loadAds();  // إعادة تحميل قائمة الإعلانات بعد الحذف
      } else {
        alert('حدث خطأ أثناء حذف الإعلان');
      }
    })
    .catch(error => console.error('Error:', error));
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
  fetch(`/admin/edit-azkar/${azkarId}`, {
    method: 'POST',
    body: JSON.stringify({ azkarId: azkarId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(`تم تعديل الذكر ${azkarId}`);
      loadAzkar();  // إعادة تحميل قائمة الأذكار بعد التعديل
    } else {
      alert('حدث خطأ أثناء تعديل الذكر');
    }
  })
  .catch(error => console.error('Error:', error));
}

function deleteAzkar(azkarId) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذا الذكر؟')) {
    fetch(`/admin/delete-azkar/${azkarId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(`تم حذف الذكر ${azkarId}`);
        loadAzkar();  // إعادة تحميل قائمة الأذكار بعد الحذف
      } else {
        alert('حدث خطأ أثناء حذف الذكر');
      }
    })
    .catch(error => console.error('Error:', error));
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
  fetch(`/admin/edit-mining-settings`, {
    method: 'POST',
    body: JSON.stringify({ setting: 'newSetting' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('تم تعديل إعدادات التعدين');
      loadMiningSettings();  // إعادة تحميل الإعدادات بعد التعديل
    } else {
      alert('حدث خطأ أثناء تعديل الإعدادات');
    }
  })
  .catch(error => console.error('Error:', error));
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