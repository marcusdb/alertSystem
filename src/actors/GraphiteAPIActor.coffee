Studio = require 'studio'

new Studio.Actor {
  id: 'GraphiteAPIActor',
    process: (body, headers, sender, receiver)->

      return 'Hello World!!!'
}
