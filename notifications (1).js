// notification stuff

// ask for permission
function askNotificationPermission() {
  Notification.requestPermission().then(function(permission) {
    checkNotificationPermission();
    if (permission === 'granted') {
      showNotification('Success!', 'Notifications enabled');
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
    btn.disabled = true;
  } else {
    btn.textContent = 'Enable Notifications';
    btn.disabled = false;
  }
}

// show notification
function showNotification(title, message) {
  if (Notification.permission === 'granted') {
    var notification = new Notification(title, {
      body: message,
      icon: '⚡',
      requireInteraction: true
    });
    
    notification.onclick = function() {
      window.focus();
      notification.close();
    };
  }
}
