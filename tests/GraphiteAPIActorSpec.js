/* global console:true */
require('coffee-script').register();
var util = require('./util');
var senderActor = util.senderActor;
var assertPromise = util.assertPromise;
requireDir = require('node-require-directory');
requireDir('./src/actors');
var sinon = require('sinon');


describe('GraphiteAPIActor', function () {
    it('should read from Graphite', function (done) {
        assertPromise(done, senderActor.send('GraphiteAPIActor',{
            "name": "Disk usage alarm",
            "condition": {
                "metric": "hoard.*.df.*.*.percent",
                "duration": "-5minutes",
                "trigger": ">90"
            }
        }).then(function(result){
            console.log(result)

        }));
    });

});

describe('AlarmCheckerActor', function () {
    it('should trigger an alarm for lack of metrics', function (done) {
        assertPromise(done, senderActor.send('GraphiteAPIActor',{
            "name": "Disk usage alarm",
            "condition": {
                "metric": "none",
                "duration": "-5minutes",
                "trigger": ">90"
            }
        }).then(function(result){


        }));
    });
    it('should trigger an alarm when trigger conditions are met', function (done) {
        assertPromise(done, senderActor.send('GraphiteAPIActor',{
            "name": "Disk usage alarm",
            "condition": {
                "metric": "hoard.*.df.*.*.percent",
                "duration": "-5minutes",
                "trigger": ">90"
            }
        }).then(function(result){
            console.log(result)

        }));
    });
    it('should not trigger an alarm twice', function (done) {
        assertPromise(done, senderActor.send('GraphiteAPIActor',{
            "name": "Disk usage alarm",
            "condition": {
                "metric": "hoard.*.df.*.*.percent",
                "duration": "-5minutes",
                "trigger": ">90"
            }
        }).then(function(result){
            console.log(result)

        }));
    });

});