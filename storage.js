// storage stuff for saving reminders

// load saved reminders
function loadReminders() {
  var saved = localStorage.getItem('reminders');
  if (saved) {
    reminders = JSON.parse(saved);
    // remove expired ones
    reminders = reminders.filter(function(r) {
      return r.timestamp > Date.now();
    });
    saveReminders();
  }
  setAllTimers();
}

// save to localstorage
function saveReminders() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

// add new reminder
function addReminder() {
  var title = document.getElementById('reminder-title').value;
  var time = document.getElementById('reminder-time').value;
  
  if (!title || !time) {
    alert('Please fill all fields');
    return;
  }
  
  var timestamp = new Date(time).getTime();
  
  if (timestamp <= Date.now()) {
    alert('Please select a future time');
    return;
  }
  
  // make reminder object
  var reminder = {
    id: Date.now() + '-' + Math.random(),
    title: title,
    timestamp: timestamp,
    active: true
  };
  
  reminders.push(reminder);
  saveReminders();
  setTimer(reminder);
  
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
    clearTimer(id);
    saveReminders();
    render();
  }
}

// undo delete
function undoDelete() {
  if (lastDeleted) {
    reminders.push(lastDeleted);
    setTimer(lastDeleted);
    saveReminders();
    lastDeleted = null;
    render();
  }
}
