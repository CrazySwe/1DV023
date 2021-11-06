/**
 * Issue Notifier.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */

'use strict'

const socket = window.io()

/**
 * Prints out a new notification.
 *
 * @param {number} issueId - The issue id or 'iid' from gitlab documentation.
 * @param {string} action - The type of action.
 * @param {string} user  - The username.
 */
function addNotification (issueId, action, user) {
  document.getElementById('notifications').innerHTML +=
  `<div class="notification"> \
  <div>Action: ${action}</div> \
  <div>User: ${user}</div>\
  </div>`

  // document.getElementById(`issue-${issueId}`).appendChild(`<span class="notify">1</span>`)
}

// function removeIssue(id) { return true }
// function addIssue(id) { return true }

socket.on('issue_comment', function (data) {
  addNotification(data.object_attributes.project_id, 'New Comment', data.user.username)
  // Handle the comment
})

socket.on('issue_opened', function (data) {
  addNotification(data.object_attributes.project_id, 'New Issue', data.user.username)
  // Handle the new issue
  // Add issue to issues.
})

socket.on('issue_closed', function (data) {
  addNotification(data.object_attributes.project_id, 'Issue Closed', data.user.username)
  // Handle the issue closed
})

socket.on('issue_reopen', function (data) {
  addNotification(data.object_attributes.project_id, 'Issue Reopened', data.user.username)
  // Handle the issue reopen
  // Re-add issue to issues and add notify
})

socket.on('issue_update', function (data) {
  addNotification(data.object_attributes.project_id, 'Issue Updated', data.user.username)
  // Handle the issue update
  // Create notify of update and red marker on issue?
})
