/* global console:true */
require('coffee-script').register();
var util = require('./util');
var senderActor = util.senderActor;
var assertPromise = util.assertPromise;
requireDir = require('node-require-directory');
requireDir('./src/actors');
var sinon = require('sinon');
var alarmCheckerActor = require('../src/actors/AlarmCheckerActor')

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
    afterEach(function () {
        alarmCheckerActor.triggerAlarm.restore(); 
    });
    it('should trigger an alarm for lack of metrics', function (done) {
        sinon.stub(alarmCheckerActor, "triggerAlarm");
        senderActor.send('GraphiteAPIActor',{
            "name": "Disk usage alarm",
            "condition": {
                "metric": "none",
                "duration": "-5minutes",
                "trigger": ">90"
            }
        }).then(function(result){
            assert(jQuery.ajax.calledWithMatch({ url: "/todo/42/items" }));
            done();

        })
    });
    it('should trigger an alarm when trigger conditions are met', function (done) {

    });
    it('should not trigger an alarm twice', function (done) {

    });

});