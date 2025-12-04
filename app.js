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

// setup everything when page loads
window.onload = function() {
  loadReminders();
  setupEventListeners();
  checkNotificationPermission();
  render();
};

// event listeners
function setupEventListeners() {
  // notification button
  document.getElementById('btn-permission').onclick = function() {
    askNotificationPermission();
  };

  // form submit
  document.getElementById('reminder-form').onsubmit = function(e) {
    e.preventDefault();
    addReminder();
  };

  // search box
  document.getElementById('search-input').oninput = function(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function() {
      searchText = e.target.value.toLowerCase();
      currentPage = 1;
      render();
    }, 300);
  };

  // sort dropdown
  document.getElementById('sort-select').onchange = function(e) {
    sortBy = e.target.value;
    currentPage = 1;
    render();
  };

  // undo button
  document.getElementById('btn-undo').onclick = function() {
    undoDelete();
  };

  // keyboard shortcut
  document.onkeydown = function(e) {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      undoDelete();
    }
  };
}
