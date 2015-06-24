Studio = require 'studio'

new Studio.Actor {
  id: 'PagerDutyActor',
  process: (body, headers, sender, receiver)->

    @send ('AlarmManagerActor').then (alarms)->{}
}
