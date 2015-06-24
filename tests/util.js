/* global console:true */
var assert = require('chai').assert;
var Actor = require('studio').Actor;
var Studio = require('studio');

module.exports ={
    senderActor:new Actor({
        id: 'test.service.sender',
        process: function (body) {
            return body;
        }
    }),
    assertPromise:function(done,promise){
        promise.then(function () {
            assert.equal(true, true);
        }).then(done).catch(function(error){
            done(error);
        });
    }
};
