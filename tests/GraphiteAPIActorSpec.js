/* global console:true */
require('coffee-script').register();
var util = require('./util');
var actorInstance = util.senderActor;
var assertPromise = util.assertPromise;
require(process.cwd() + '/src/actors/GraphiteAPIActor');


describe('GraphiteAPIActor', function () {
    it('should read from Graphite', function (done) {
        assertPromise(done, actorInstance.send('GraphiteAPIActor',{
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
