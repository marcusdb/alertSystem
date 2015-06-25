Studio = require 'studio'
request = Studio.Promise.promisify require 'request'

new Studio.Actor {
  id: 'GraphiteAPIActor'
  process: (timedMetric)->
      request('http://stats.rastreabilidadebrasil.com.br/graphite/render?target='+timedMetric.condition.metric+'&from='+timedMetric.condition.duration+'s&format=json').spread((response, body) ->
        body
      ).catch((err) ->
        console.error(err)
      )
}
