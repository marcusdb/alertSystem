Studio = require 'studio'

new Studio.Actor {
  id: 'AlarmCheckerActor'
  process: (dataSet)->

    dataSet.data.datapoints.forEach((element)->

    )

  checkDataCompleteness:(datapoints)->
    total=datapoints.length
    filled= datapoints.reduce((previousValue, currentValue, index, array) ->
      if (currentValue?)
        return 1+previousValue
      else
        return 0+previousValue
    ,0)

  triggerAlarm:(alarm)->

  buildAlarm:(service_key,incident_key,event_type,description,details,contexts)->
    service_key:service_key
    incident_key:incident_key
    event_type:event_type
    description:description
    details:details
    contexts:contexts
}
