// timer stuff using setTimeout

// set timer for reminder
function setTimer(reminder) {
  if (!reminder.active) return;
  
  var delay = reminder.timestamp - Date.now();
  
  if (delay <= 0) {
    reminder.active = false;
    saveReminders();
    return;
  }
  
  var timer = setTimeout(function() {
    triggerReminder(reminder);
  }, delay);
  
  timers.push({ id: reminder.id, timer: timer });
}

// set all the timers
function setAllTimers() {
  // clear old timers
  for (var i = 0; i < timers.length; i++) {
    clearTimeout(timers[i].timer);
  }
  timers = [];
  
  // set new ones
  for (var i = 0; i < reminders.length; i++) {
    if (reminders[i].active && reminders[i].timestamp > Date.now()) {
      setTimer(reminders[i]);
    }
  }
}

// clear timer
function clearTimer(id) {
  for (var i = 0; i < timers.length; i++) {
    if (timers[i].id === id) {
      clearTimeout(timers[i].timer);
      timers.splice(i, 1);
      break;
    }
  }
}

// trigger the reminder
function triggerReminder(reminder) {
  showNotification('Reminder!', reminder.title);
  
  reminder.active = false;
  clearTimer(reminder.id);
  saveReminders();
  render();
}
