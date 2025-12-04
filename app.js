// main app file

// global stuff
var reminders = [];
var timers = [];
var currentPage = 1;
var itemsPerPage = 5;
var searchText = '';
var sortBy = 'time-asc';
var lastDeleted = null;
var searchTimeout;
var editingId = null;

// setup everything when page loads
window.onload = function () {
  loadReminders();
  startTimerLoop();
  setupEventListeners();
  checkNotificationPermission();
  render();
};

// event listeners
function setupEventListeners() {
  // notification button
  var btnPermission = document.getElementById('btn-permission');
  if (btnPermission) {
    btnPermission.onclick = function () {
      askNotificationPermission();
    };
  }

  // test notification button
  var btnTest = document.getElementById('btn-test-notification');
  if (btnTest) {
    btnTest.onclick = function () {
      if (Notification.permission === 'default') {
        askNotificationPermission();
      } else {
        showNotification('Test Notification', 'This is a test to ensure notifications are working!');
      }
    };
  }

  // form submit
  var form = document.getElementById('reminder-form');
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      addReminder();
    };
  }

  // search box
  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.oninput = function (e) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function () {
        searchText = e.target.value.toLowerCase();
        currentPage = 1;
        render();
      }, 300);
    };
  }

  // sort dropdown
  var sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.onchange = function (e) {
      sortBy = e.target.value;
      currentPage = 1;
      render();
    };
  }

  // undo button
  var btnUndo = document.getElementById('btn-undo');
  if (btnUndo) {
    btnUndo.onclick = function () {
      undoDelete();
    };
  }

  // keyboard shortcut
  document.onkeydown = function (e) {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      undoDelete();
    }
  };
}

