function showSection(sectionId) {
  // إخفاء جميع الأقسام
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // عرض القسم المحدد
  const sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) {
    sectionToShow.style.display = 'block';
  }
}

function loadUsers() {
  // عرض المستخدمين من قاعدة البيانات أو من مصدر البيانات
  document.getElementById('user-list').innerHTML = `
    <ul>
      <li>مستخدم 1</li>
      <li>مستخدم 2</li>
      <li>مستخدم 3</li>
    </ul>
  `;
}

function editAds() {
  // عرض الإعلانات من قاعدة البيانات أو من مصدر البيانات
  document.getElementById('ads-list').innerHTML = `
    <ul>
      <li>إعلان 1 <button onclick="deleteAd()">حذف</button></li>
      <li>إعلان 2 <button onclick="deleteAd()">حذف</button></li>
    </ul>
  `;
}

function deleteAd() {
  // حذف الإعلان
  alert("تم حذف الإعلان");
}

function editAzkar() {
  // عرض الأذكار من قاعدة البيانات أو من مصدر البيانات
  document.getElementById('azkar-list').innerHTML = `
    <ul>
      <li>ذكر 1 <button onclick="deleteAzkar()">حذف</button></li>
      <li>ذكر 2 <button onclick="deleteAzkar()">حذف</button></li>
    </ul>
  `;
}

function deleteAzkar() {
  // حذف الذكر
  alert("تم حذف الذكر");
}

function editMiningSettings() {
  // عرض إعدادات التعدين
  document.getElementById('mining-settings').innerHTML = `
    <p>تعديل إعدادات التعدين هنا.</p>
  `;
}

function loadTasks() {
  // عرض المهام اليومية
  document.getElementById('tasks-list').innerHTML = `
    <ul>
      <li>مهمة 1 <button onclick="deleteTask()">حذف</button></li>
      <li>مهمة 2 <button onclick="deleteTask()">حذف</button></li>
    </ul>
  `;
}

function deleteTask() {
  // حذف المهمة
  alert("تم حذف المهمة");
}