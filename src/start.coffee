Server = require './server'
Path   = require 'path'
Cli    = require('cli').enable('status', 'version')
Fs     = require 'fs'
Studio = require

config = require './src/config'
requireDir = require('node-require-directory');
requireDir('./src/actors');

# Command Line Setup
module.exports = entry_point = () ->
  Cli.enable 'version'
  Cli.setUsage 'node start.js -c <config json>'
  Cli.setApp 'AlertDaemon', '0.1.0'
  Cli.parse
    'config': ['c', 'Configuration file path', 'path', './config.json']

  Cli.main (args, options) ->
    if Path.existsSync options.config
      try
        config.conf = JSON.parse(Fs.readFileSync(options.config, 'utf-8'))

      catch error
        Cli.debug "Error parsing config file: #{error}"
    else
      Cli.fatal "Can't find a config file"

    hoard = new Server conf, Cli
    hoard.load_scripts()

    hoard.on 'run', hoard.run_scripts

    setInterval(->
      hoard.emit 'run'
    ,conf.sampleInterval * 1000)

    Cli.info "AlertDaemon started. Samples each #{conf.sampleInterval} seconds."
