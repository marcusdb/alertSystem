EventEmitter = require('events').EventEmitter
Sender       = require './sender'
Util         = require 'util'
request      = require 'request'

class HoardD extends EventEmitter
  
  constructor: (@conf, @cli) ->
    
    @alarms = @conf.alarms
    @graphiteLocation=@conf.graphiteLocation    
    super
 

  run_verification: ->
    @verify for alarm in @alarms

  verify: (alarm) ->



  triggerAlarm: ->
    sender = new Sender @conf, @cli, @
    sender.send()
  
module.exports = HoardD
