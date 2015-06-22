Studio = require 'studio'

new Studio.Actor {
  id: 'AlarmManagerActor',
    process: (body, headers, sender, receiver)->

      return 'Hello World!!!'
}
