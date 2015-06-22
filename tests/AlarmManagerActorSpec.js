/* global console:true */
var assert = require('chai').assert;

require(process.cwd() + '/src/actor/AlarmManagerActor');

var util = require('../../util');
var actorInstance = util.senderActor;
var assertPromise = util.assertPromise;
var eventFactory = require(process.cwd() + '/test/mock/model/eventFactory');
var securityContextFactory = require(process.cwd() + '/test/mock/model/securityContextFactory');

describe('insertEventActor', function () {
    it('should throw UNAUTHORIZED if event not sent by an actor starting with service.event', function (done) {
        assertPromise(done, actorInstance.send('service.event.insert',eventFactory.createValidItemRegistration(),
            securityContextFactory.createSuperUser()).catch(function(error){
                assert.equal(error,errorList.UNAUTHORIZED);
            }));
    });

});
