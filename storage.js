// storage stuff for saving reminders

// load saved reminders
function loadReminders() {
  var saved = localStorage.getItem('reminders');
  if (saved) {
    reminders = JSON.parse(saved);
    // remove expired ones
    reminders = reminders.filter(function (r) {
      return r.timestamp > Date.now();
    });
    saveReminders();
  }
  // setAllTimers(); // No longer needed with polling loop
}

// save to localstorage
function saveReminders() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

// add new reminder or update existing
function addReminder() {
  var title = document.getElementById('reminder-title').value;
  var time = document.getElementById('reminder-time').value;

  if (!title || !time) {
    showToast('Please fill all fields', 'error');
    return;
  }

  var timestamp = new Date(time).getTime();

  if (timestamp <= Date.now()) {
    showToast('Please select a future time', 'error');
    return;
  }

  if (editingId) {
    // update existing
    var index = reminders.findIndex(function (r) { return r.id === editingId; });
    if (index !== -1) {
      reminders[index].title = title;
      reminders[index].timestamp = timestamp;
      reminders[index].active = true;

      // clearTimer(editingId);
      // setTimer(reminders[index]);

      showToast('Reminder Updated', 'success');
    }
    editingId = null;
    document.querySelector('#reminder-form button[type="submit"]').textContent = 'Set Reminder';
  } else {
    // create new
    var reminder = {
      id: Date.now() + '-' + Math.random(),
      title: title,
      timestamp: timestamp,
      active: true
    };

    reminders.push(reminder);
    // setTimer(reminder);

    // check notification status for popup
    if (Notification.permission === 'granted') {
      showToast('Reminder Set! You will be notified.', 'success');
    } else {
      showToast('Reminder Set! Enable notifications to get alerted.', 'warning');
    }
  }

  saveReminders();

  // clear the form
  document.getElementById('reminder-form').reset();

  render();
}

// delete reminder
function deleteReminder(id) {
  var index = -1;
  for (var i = 0; i < reminders.length; i++) {
    if (reminders[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    lastDeleted = reminders[index];
    reminders.splice(index, 1);
    // clearTimer(id);
    saveReminders();
    render();
  }
}

// undo delete
function undoDelete() {
  if (lastDeleted) {
    reminders.push(lastDeleted);
    // setTimer(lastDeleted);
    saveReminders();
    lastDeleted = null;
    render();
  }
}
