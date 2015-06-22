Studio = require 'studio'

new Studio.Actor {
  id: 'ControllerActor',
    process: (body, headers, sender, receiver)->

      @send ('AlarmManagerActor').then (alarms)->{}
}
