// ui stuff - showing reminders on page

// filter by search text
function filterReminders() {
  var filtered = [];
  for (var i = 0; i < reminders.length; i++) {
    if (searchText === '' || reminders[i].title.toLowerCase().includes(searchText)) {
      filtered.push(reminders[i]);
    }
  }
  return filtered;
}

// sort the list
function sortReminders(list) {
  var sorted = list.slice();

  sorted.sort(function (a, b) {
    if (sortBy === 'time-asc') {
      return a.timestamp - b.timestamp;
    } else if (sortBy === 'time-desc') {
      return b.timestamp - a.timestamp;
    } else if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title);
    }
  });

  return sorted;
}

// get page of reminders
function paginateReminders(list) {
  var start = (currentPage - 1) * itemsPerPage;
  var end = start + itemsPerPage;
  var page = [];

  for (var i = start; i < end && i < list.length; i++) {
    page.push(list[i]);
  }

  return page;
}

// render everything on page
function render() {
  var filtered = filterReminders();
  var sorted = sortReminders(filtered);
  var paginated = paginateReminders(sorted);

  renderList(paginated);
  renderPagination(sorted.length);
  renderMetrics();
  renderUndoButton();
}

// show the list
function renderList(list) {
  var listEl = document.getElementById('reminder-list');
  listEl.innerHTML = '';

  if (list.length === 0) {
    listEl.innerHTML = '<li class="empty-state">No reminders yet</li>';
    return;
  }

  for (var i = 0; i < list.length; i++) {
    var reminder = list[i];
    var li = document.createElement('li');
    li.className = 'reminder-card';
    if (!reminder.active) {
      li.className += ' expired';
    }

    var date = new Date(reminder.timestamp);
    var timeString = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    li.innerHTML = `
      <div class="reminder-card__content">
        <div class="reminder-card__title">` + reminder.title + `</div>
        <div class="reminder-card__time">
          ` + timeString + `
          ` + (reminder.active ? '' : ' - Done') + `
        </div>
      </div>
      <div class="reminder-card__actions">
        <button class="edit-btn" title="Edit">✎</button>
        <button class="delete-btn" title="Delete">X</button>
      </div>
    `;

    // Add edit button click handler
    var editBtn = li.querySelector('.edit-btn');
    editBtn.onclick = (function (id) {
      return function () {
        startEditing(id);
      };
    })(reminder.id);

    // Add delete button click handler
    var deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.onclick = (function (id) {
      return function () {
        deleteReminder(id);
      };
    })(reminder.id);

    listEl.appendChild(li);
  }
}

// start editing a reminder
function startEditing(id) {
  var reminder = reminders.find(function (r) { return r.id === id; });
  if (!reminder) return;

  editingId = id;

  document.getElementById('reminder-title').value = reminder.title;

  // format date for input
  var date = new Date(reminder.timestamp);
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hours = ('0' + date.getHours()).slice(-2);
  var minutes = ('0' + date.getMinutes()).slice(-2);

  var timeString = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
  document.getElementById('reminder-time').value = timeString;

  document.querySelector('#reminder-form button[type="submit"]').textContent = 'Update Reminder';

  // scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  showToast('Editing reminder...', 'info');
}

// show toast notification
function showToast(message, type) {
  var toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'info');
  toast.textContent = message;

  document.body.appendChild(toast);

  // trigger reflow
  toast.offsetHeight;

  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// show page numbers
function renderPagination(totalItems) {
  var pagination = document.getElementById('pagination');
  var totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  var html = '';

  // prev button
  html += '<button class="page-btn" ' + (currentPage === 1 ? 'disabled' : '') + ' onclick="goToPage(' + (currentPage - 1) + ')">Previous</button>';

  // pages
  for (var i = 1; i <= totalPages; i++) {
    var activeClass = i === currentPage ? 'active' : '';
    html += '<button class="page-btn ' + activeClass + '" onclick="goToPage(' + i + ')">' + i + '</button>';
  }

  // next button
  html += '<button class="page-btn" ' + (currentPage === totalPages ? 'disabled' : '') + ' onclick="goToPage(' + (currentPage + 1) + ')">Next</button>';

  pagination.innerHTML = html;
}

// go to different page
function goToPage(page) {
  var filtered = filterReminders();
  var sorted = sortReminders(filtered);
  var totalPages = Math.ceil(sorted.length / itemsPerPage);

  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    render();
  }
}

// update the numbers at top
function renderMetrics() {
  var total = reminders.length;
  var active = 0;

  for (var i = 0; i < reminders.length; i++) {
    if (reminders[i].active) {
      active++;
    }
  }

  document.getElementById('metric-total').textContent = total;
  document.getElementById('metric-active').textContent = active;
}

// show or hide undo button
function renderUndoButton() {
  var undoBtn = document.getElementById('btn-undo');
  if (lastDeleted) {
    undoBtn.style.display = 'block';
  } else {
    undoBtn.style.display = 'none';
  }
}

// --- Interactive Effects ---



// Neon Ripple Effect
function setupRippleEffect() {
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('btn-permission') || e.target.classList.contains('page-btn')) {
      var btn = e.target;
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      btn.appendChild(ripple);

      setTimeout(function () {
        ripple.remove();
      }, 600);
    }
  });
}


// Initialize effects
document.addEventListener('DOMContentLoaded', function () {

  setupRippleEffect();

});

// Re-apply tilt effect when list updates

