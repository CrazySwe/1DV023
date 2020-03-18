/**
 * WebhookController.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const webhookController = {}

webhookController.indexPost = function (req, res) {
  const ioserver = req.app.get('socketio')
  const projectId = req.body.project.id
  const data = req.body
  console.dir(req.body)

  // Everyone in the same room of project will get event.
  let evt = ''
  if (data.object_kind === 'note' && data.issue) {
    console.dir('There is a new comment on this issue.')
    evt = 'issue_comment'
  } else if (data.object_kind === 'issue') {
    switch (data.object_attributes.action) {
      case 'open':
        evt = 'issue_opened'
        console.dir('New Issue Opened.')
        break
      case 'close':
        evt = 'issue_closed'
        console.dir('Issue Closed.')
        break
      case 'reopen':
        evt = 'issue_reopen'
        console.dir('Issue Reopened.')
        break
      case 'update':
        evt = 'issue_update'
        console.dir('Issue Updated.')
        break
    }
  }
  ioserver.to(projectId).emit(evt, req.body)
  res.sendStatus(200)
}

module.exports = webhookController
