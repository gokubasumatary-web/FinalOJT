// notification stuff

// audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// play a nice chime sound
function playNotificationSound() {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  var now = audioCtx.currentTime;

  // Create oscillators for a major chord (C5, E5, G5)
  var notes = [523.25, 659.25, 783.99];

  notes.forEach(function (freq, i) {
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + (i * 0.1));

    gain.gain.setValueAtTime(0, now + (i * 0.1));
    gain.gain.linearRampToValueAtTime(0.3, now + (i * 0.1) + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.1) + 1.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now + (i * 0.1));
    osc.stop(now + (i * 0.1) + 1.5);
  });
}

// ask for permission
function askNotificationPermission() {
  if (window.location.protocol === 'file:') {
    alert('WARNING: Notifications may not work when opening the file directly. Please use a local server (VS Code Live Server, etc.) for best results.');
  }

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
  if (!btn) return;

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
  // Always play sound if possible
  try {
    playNotificationSound();
  } catch (e) {
    console.error('Error playing sound:', e);
  }

  // Check permission status explicitly
  if (Notification.permission === 'granted') {
    try {
      var notification = new Notification(title, {
        body: message,
        icon: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png',
        requireInteraction: true,
        silent: true
      });

      notification.onshow = function () {
        console.log('Notification shown successfully');
      };

      notification.onerror = function (e) {
        console.error('Notification error:', e);
        alert('System Notification Error: The browser tried to show the notification but failed. This often happens in "file://" mode or if "Focus Assist" is on.');
      };

      notification.onclick = function () {
        window.focus();
        notification.close();
      };

      // Close after 5 seconds
      setTimeout(function () {
        notification.close();
      }, 5000);

    } catch (e) {
      console.error('Error creating notification:', e);
      alert('System Notification Failed: ' + e.message);
      // Fallback to toast
      showToast(title + ': ' + message, 'info');
    }
  } else {
    // Permission not granted
    console.warn('Notification permission not granted. Status:', Notification.permission);

    // Show in-app toast
    showToast(title + ': ' + message, 'info');

    // ALERT THE USER so they know why it failed
    // We use a small timeout to let the toast appear first
    setTimeout(function () {
      var reason = 'Unknown';
      if (Notification.permission === 'denied') reason = 'You have blocked notifications for this site.';
      if (Notification.permission === 'default') reason = 'You have not enabled notifications yet. Click the "Enable Notifications" button.';

      alert('SYSTEM NOTIFICATION NOT SHOWN!\n\nReason: ' + reason + '\n\nCurrent Status: ' + Notification.permission + '\n\nIf you are using "file://" protocol, browsers often block notifications by default. Please use a local server or check your browser settings.');
    }, 500);
  }
}
