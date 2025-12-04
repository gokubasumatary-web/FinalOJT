# My Reminders - Notification-Based Task Management App

A modern, feature-rich web application for creating and managing reminders with desktop notifications. Built with vanilla JavaScript, featuring a sleek glassmorphism UI design.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Technical Details](#technical-details)
- [Browser Support](#browser-support)
- [File Documentation](#file-documentation)

---

## 🎯 Overview

**My Reminders** is a progressive web application that allows users to set time-based reminders with desktop notifications. The app stores reminders locally using browser storage and continuously monitors their status, triggering notifications when reminders are due—even if the tab is in the background.

### Key Capabilities
- ✅ Create, edit, and delete reminders
- ✅ Desktop notifications with audio alerts
- ✅ Search and sort functionality
- ✅ Persistent local storage
- ✅ Pagination for large reminder lists
- ✅ Undo delete functionality
- ✅ Keyboard shortcuts (Ctrl+Z for undo)

---

## ✨ Features

### 1. **Reminder Management**
- **Create Reminders**: Add a title and time to create a new reminder
- **Edit Reminders**: Modify existing reminders with the edit button
- **Delete Reminders**: Remove reminders with one-click deletion
- **Undo Delete**: Recover deleted reminders using the undo button or Ctrl+Z

### 2. **Notifications System**
- **Browser Notifications**: Desktop notifications appear when reminders trigger
- **Audio Alerts**: Custom synthesized chime sound plays alongside notifications
- **Permission Management**: User-friendly permission request and status display
- **Test Notifications**: Test feature to verify notification functionality

### 3. **Search & Organization**
- **Real-time Search**: Filter reminders by title as you type
- **Multiple Sort Options**:
  - Earliest First (time ascending)
  - Latest First (time descending)
  - A to Z (alphabetical)
  - Z to A (reverse alphabetical)

### 4. **Data Display**
- **Metrics Dashboard**: Shows total and active reminder counts
- **Status Indicators**: Visual distinction between active and expired reminders
- **Pagination**: Display 5 reminders per page with navigation controls
- **Empty State**: Helpful message when no reminders exist

### 5. **User Experience**
- **Toast Notifications**: Temporary success/warning/error messages
- **Persistent Storage**: Reminders saved to browser localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations

---

## 📁 Project Structure

```
OJT/
├── index.html          # Main HTML structure
├── app.js              # Application initialization and event handling
├── ui.js               # UI rendering and DOM manipulation
├── storage.js          # LocalStorage management
├── timers.js           # Reminder polling and triggering logic
├── notifications.js    # Desktop notification and audio handling
├── styles.css          # Styling and animations
└── README.md           # Project documentation (this file)
```

---

## 🚀 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for notification functionality)

### Method 1: Using VS Code Live Server (Recommended)
1. Install the "Live Server" extension in VS Code
2. Open the project folder in VS Code
3. Right-click on `index.html` and select "Open with Live Server"
4. The app will open in your default browser

### Method 2: Using Python Simple Server
```bash
# Navigate to the project directory
cd path/to/guru\ OJT

# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Method 3: Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server

# Open the provided URL in your browser (usually http://localhost:8080)
```

---

## 📖 Usage Guide

### Creating a Reminder
1. Enter a reminder title (e.g., "Study JavaScript")
2. Click the time input field and select a date and time in the future
3. Click "Set Reminder" button
4. A success notification will appear

### Editing a Reminder
1. Click the pencil icon (✎) on any reminder card
2. The form will populate with the reminder's current details
3. Modify the title or time as needed
4. Click "Update Reminder" to save changes

### Deleting a Reminder
1. Click the X button on any reminder card
2. The reminder will be removed from the list
3. Click "↶ Undo Delete" or press Ctrl+Z to restore it

### Searching Reminders
1. Type in the search box to filter reminders by title
2. The list updates in real-time as you type
3. Clear the search box to show all reminders

### Sorting Reminders
1. Use the "Sort" dropdown to organize reminders:
   - **Earliest First**: Reminders due soonest appear first
   - **Latest First**: Reminders due latest appear first
   - **A to Z**: Alphabetical by title
   - **Z to A**: Reverse alphabetical by title

### Managing Notifications
1. Click "Enable Notifications" to request browser permission
2. Approve the permission prompt when it appears
3. Once enabled, you'll receive notifications when reminders trigger
4. Click "Test Notification" to verify notifications are working

---

## 🔧 Technical Details

### Architecture

#### **app.js** - Application Core
- Global state management (reminders array, timers, pagination)
- Window load event handler for initialization
- Event listener setup for all UI controls
- Keyboard shortcut handling (Ctrl+Z)

#### **ui.js** - Presentation Layer (268 lines)
- Filtering reminders by search text
- Sorting reminders by multiple criteria
- Pagination logic (5 items per page)
- DOM rendering functions:
  - `renderList()`: Displays reminder cards
  - `renderPagination()`: Creates page navigation
  - `renderMetrics()`: Updates dashboard counters
  - `renderUndoButton()`: Shows/hides undo button
- Master `render()` function coordinates all updates

#### **storage.js** - Data Persistence (111 lines)
- `loadReminders()`: Retrieves reminders from localStorage on startup
- `saveReminders()`: Persists reminder array to localStorage
- `addReminder()`: Creates new reminders or updates existing ones
  - Validates input (title and time required)
  - Ensures time is in the future
  - Generates unique IDs using timestamp + random number
- `deleteReminder()`: Removes reminders and saves state

#### **timers.js** - Reminder Triggering
- `startTimerLoop()`: Initializes 1-second polling interval
- `checkReminders()`: Checks each reminder against current time
- `triggerReminder()`: Fires notification and marks reminder as inactive
- Uses `setInterval` for reliable background tab performance

#### **notifications.js** - User Alerts (144 lines)
- Audio Context API integration for custom sounds
- `playNotificationSound()`: Generates major chord chime (C5, E5, G5)
- `askNotificationPermission()`: Requests Notification API permissions
- `checkNotificationPermission()`: Updates button state based on permission
- `showNotification()`: Displays desktop notifications with icon
- Browser detection warning for file:// protocol

#### **styles.css** - Visual Design (500 lines)
- **Theme Variables**: Dark mode color palette with gradients
- **Glassmorphism UI**: Semi-transparent glass-effect cards
- **Animations**: 
  - Fade-in on page load
  - Smooth transitions on buttons and interactive elements
  - Elastic easing for bouncy animations
- **Responsive Design**: Centered layout, adapts to screen size
- **Custom Styling**:
  - Gradient text for logo
  - Glowing effects for emphasis
  - Status-based card styling (active vs. expired)

#### **index.html** - Structure
- Semantic HTML5 structure
- Dashboard layout with header and content sections
- Form for reminder creation
- Reminder list container with pagination
- Metric cards showing totals and active counts
- Control panel with search and sort dropdowns

### Data Model

```javascript
// Reminder Object
{
  id: "1733386400000-0.1234",  // Timestamp + random ID
  title: "Study JavaScript",    // Reminder text
  timestamp: 1733386400000,     // Unix timestamp (milliseconds)
  active: true                  // Boolean flag for status
}
```

### Storage
- **Method**: Browser localStorage
- **Key**: `'reminders'`
- **Format**: JSON stringified array
- **Persistence**: Survives browser restarts

### Timer Mechanism
- **Polling Interval**: 1000ms (1 second)
- **Comparison**: Reminder timestamp vs. `Date.now()`
- **Reliability**: Works in background tabs (setInterval more reliable than setTimeout)
- **State Change**: Sets `active` flag to `false` when triggered

---

## 🌐 Browser Support

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome/Chromium | ✅ Full Support | All features working |
| Firefox | ✅ Full Support | All features working |
| Safari | ✅ Full Support | Notifications may require user approval |
| Edge | ✅ Full Support | All features working |
| IE 11 | ❌ Not Supported | ES6+ features used |

### Important Notes
- **HTTPS/Local Server Required**: Notifications API only works with secure context or localhost
- **File Protocol Warning**: Opening `index.html` directly (file://) will trigger a warning about notification limitations
- **Audio Context**: Some browsers may require user interaction before audio playback

---

## 📄 File Documentation

### Global Variables (app.js)
```javascript
var reminders = [];        // Array of reminder objects
var timers = [];          // Timer IDs (legacy, not used with polling)
var currentPage = 1;      // Current pagination page
var itemsPerPage = 5;     // Items shown per page
var searchText = '';      // Current search filter
var sortBy = 'time-asc';  // Current sort order
var lastDeleted = null;   // Last deleted reminder for undo
var searchTimeout;        // Debounce timer for search
var editingId = null;     // ID of reminder being edited
```

### Key Functions by Module

#### Storage Module
- `loadReminders()` - Load from localStorage
- `saveReminders()` - Persist to localStorage
- `addReminder()` - Create/update reminder
- `deleteReminder(id)` - Remove reminder

#### UI Module
- `filterReminders()` - Apply search filter
- `sortReminders(list)` - Sort by selected criteria
- `paginateReminders(list)` - Get current page items
- `render()` - Main render orchestrator
- `renderList(list)` - Draw reminder cards
- `renderPagination(count)` - Draw page buttons
- `renderMetrics()` - Update counters
- `renderUndoButton()` - Show/hide undo button

#### Timer Module
- `startTimerLoop()` - Initialize polling
- `checkReminders()` - Check all reminders
- `triggerReminder(reminder)` - Fire notification

#### Notifications Module
- `playNotificationSound()` - Generate audio
- `askNotificationPermission()` - Request permission
- `checkNotificationPermission()` - Update UI state
- `showNotification(title, message)` - Display notification

---

## 🎨 Customization

### Change Theme Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary: #06b6d4;        /* Cyan - Main accent */
  --accent: #8b5cf6;         /* Purple - Secondary accent */
  --success: #10b981;        /* Green - Success messages */
  --danger: #f43f5e;         /* Red - Danger/Delete */
}
```

### Adjust Pagination
In `app.js`, change:
```javascript
var itemsPerPage = 5;  // Change to desired number
```

### Modify Notification Sound
In `notifications.js`, edit the frequency array:
```javascript
var notes = [523.25, 659.25, 783.99];  // Change frequencies
```

---

## 🐛 Troubleshooting

### Notifications not working
- Ensure you're using a local server (not file://)
- Check browser notification permissions in settings
- Try the "Test Notification" button to verify setup
- Ensure notifications are allowed in browser privacy settings

### Reminders not triggering
- Check browser console for errors (F12)
- Verify the reminder time is in the future
- Ensure the page is loaded and tab is open/active
- Check that at least 1 second has passed since setting reminder

### Data not persisting
- Check if localStorage is enabled in browser
- Verify browser privacy settings allow localStorage
- Ensure you're not in private/incognito mode
- Clear cache and reload if issues persist

---

## 📝 License

This project is part of the Guru OJT program. Feel free to use and modify for educational purposes.

---

## 🙋 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages (F12)
3. Ensure all JavaScript files are loading correctly
4. Verify your local server is running properly

---

**Last Updated**: December 2025  
**Project**: FinalOJT  
**Repository**: gokubasumatary-web/FinalOJT
