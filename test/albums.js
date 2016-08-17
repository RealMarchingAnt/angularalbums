// var assert = require('assert');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');

/**
 * Test getting all albums
 */
describe('Get all the albums', function () {

    it('Response status OK', function (done) {
        request(app)
            .get('/albums')
            .expect(200)
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });

    it('Returns JSON data', function (done) {
        request(app)
            .get('/albums')
            .expect('Content-Type', /json/)
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });    

    it('Returns a list of JSON Objects', function (done) {
        request(app)
            .get('/albums')
            .expect(200)
            .end(function (error, res) {
                if (error) throw error;
                expect(res.body).to.have.length(2);
                done();
            });
    });
    


});

/**
 * Test getting ONE album
 */
describe('Get one album', function () {

    it('Returns status OK', function (done) {
        request(app)
            .get('/albums/123')
            .expect(200)
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });

    it('Returns JSON data', function (done) {
        request(app)
            .get('/albums/123')
            .expect('Content-Type', /json/)
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });

    it('Returns an album with title, description, and cover image url', function (done) {
        request(app)
            .get('/albums/456')
            .expect(200, {
                _id: '456',
                title: 'Album 2',
                description: "This is my second album",
                coverimage: "test2.png"
            })
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });

});
