Studio = require 'studio'


new Studio.Actor {
  id: 'AlarmCheckerActor'
  process: (dataSet)->
    dataSet.data.forEach((element)=>
      if !@checkDataCompleteness(element.datapoints) @triggerAlarm(@buildAlarm())
      else !@isBelowTriggerPoint element.datapoints @conditionBuilder(dataSet.trigger) @triggerAlarm(@buildAlarm())
    )

  conditionBuilder: (trigger)->
    new Function('x', 'return x' + trigger)
  isBelowTriggerPoint: (datapoints, condition)->
    total = datapoints.length - 6 #-6 to remove last minute
    alarmConditionMatches = datapoints.reduce((previousValue, currentValue) ->
      if condition currentValue[0]
        return 1 + previousValue
      else
        return 0 + previousValue
    , 0)
    if total > 12 and (alarmConditionMatches / total) >= 0.90
      return false
    else return true
  checkDataCompleteness: (datapoints)->
    total = datapoints.length - 6 #-6 to remove last minute
    filled = datapoints.reduce((previousValue, currentValue) ->
      if (currentValue[0]?)
        return 1 + previousValue
      else
        return 0 + previousValue
    , 0)
    if total > 12 and (filled / total) >= 0.90
      return true
    else return false

  triggerAlarm: (alarm)->


  buildAlarm: (service_key, incident_key, event_type, description, details, contexts)->
    service_key: service_key
    incident_key: incident_key
    event_type: event_type
    description: description
    details: details
    contexts: contexts
}
