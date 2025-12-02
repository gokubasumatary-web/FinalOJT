// notification stuff

// audio context
// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// // play a nice chime sound
// function playNotificationSound() {
//   if (audioCtx.state === 'suspended') {
//     audioCtx.resume();
//   }

//   var now = audioCtx.currentTime;

//   // Create oscillators for a major chord (C5, E5, G5)
//   var notes = [523.25, 659.25, 783.99];

//   notes.forEach(function (freq, i) {
//     var osc = audioCtx.createOscillator();
//     var gain = audioCtx.createGain();

//     osc.type = 'sine';
//     osc.frequency.setValueAtTime(freq, now + (i * 0.1));

//     gain.gain.setValueAtTime(0, now + (i * 0.1));
//     gain.gain.linearRampToValueAtTime(0.3, now + (i * 0.1) + 0.05);
//     gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.1) + 1.5);

//     osc.connect(gain);
//     gain.connect(audioCtx.destination);

//     osc.start(now + (i * 0.1));
//     osc.stop(now + (i * 0.1) + 1.5);
//   });
// }

// ask for permission
function askNotificationPermission() {
  if (Notification.permission === 'denied') {
    showToast('Notifications are blocked. Please enable them in your browser settings.', 'error');
    return;
  }

  Notification.requestPermission().then(function (permission) {
    checkNotificationPermission();
    if (permission === 'granted') {
      showNotification('Success!', 'Notifications enabled');
      playNotificationSound();
    } else {
      showToast('Notifications denied.', 'warning');
    }
  });
}

// check if permission is granted
function checkNotificationPermission() {
  var btn = document.getElementById('btn-permission');
  var permission = Notification.permission;

  if (permission === 'granted') {
    btn.textContent = 'Notifications Enabled';
    btn.classList.add('granted');
    btn.disabled = true;
  } else if (permission === 'denied') {
    btn.textContent = 'Notifications Blocked';
    btn.disabled = false; // Allow clicking to see the "how to unblock" toast
    btn.onclick = function () {
      showToast('Notifications are blocked. Please enable them in your browser settings.', 'error');
    };
  } else {
    btn.textContent = 'Enable Notifications';
    btn.disabled = false;
    btn.onclick = askNotificationPermission;
  }
}

// show notification
function showNotification(title, message) {
  // Always play sound if possible, even if notification permission is not granted (e.g. for in-app alerts)
  playNotificationSound();

  if (Notification.permission === 'granted') {
    var notification = new Notification(title, {
      body: message,
      icon: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png', // Generic bell icon
      requireInteraction: true,
      silent: true // We play our own sound
    });

    notification.onclick = function () {
      window.focus();
      notification.close();
    };
  } else {
    // Fallback to toast if notifications are not granted
    showToast(title + ': ' + message, 'info');
  }
}
