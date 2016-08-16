var assert = require('assert');
var request = require('supertest');
var app = require('../app');

// describe('Array', function() {
//     describe('#indexOf()', function() {
//         it('should return -1 when the value is not present', function() {
//             assert.equal(-1, [1,1,3].indexOf(4));
//         });
//     });
// });




describe('GET /albums', function () {
    
    it('Response status OK', function (done) {
        request(app)
            .get('/albums')
            .expect(200)
            .end(function(error) {
                if(error) throw error;
                done();
            });
    });
    
});
