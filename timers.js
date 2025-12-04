// timer stuff using setInterval polling
// This is more reliable for background tabs than setTimeout

var timerInterval = null;

// start the polling loop
function startTimerLoop() {
  if (timerInterval) clearInterval(timerInterval);

  // check every second
  timerInterval = setInterval(function () {
    checkReminders();
  }, 1000);
}

// check if any reminders are due
function checkReminders() {
  var now = Date.now();
  var changed = false;

  for (var i = 0; i < reminders.length; i++) {
    var r = reminders[i];
    if (r.active && r.timestamp <= now) {
      triggerReminder(r);
      changed = true;
    }
  }

  // triggerReminder handles saving and rendering, so we don't need to do it here
}

// trigger the reminder
function triggerReminder(reminder) {
  showNotification('Reminder!', reminder.title);

  reminder.active = false;
  saveReminders();
  render();
}

