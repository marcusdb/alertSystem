Studio = require 'studio'
config = require './src/config'

new Studio.Actor {
  id: 'PagerDutyActor',
  process: (body, headers, sender, receiver)->

    @send ('AlarmManagerActor').then (alarms)->{}
}
