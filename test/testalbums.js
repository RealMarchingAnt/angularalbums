// var assert = require('assert');
var mongo = require('mongodb');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var ObjectID = require('mongodb').ObjectID;
var mongo = require('mocha-mongo')('mongodb://localhost:27017/albums');

var ready = mongo.ready();
var clean = mongo.cleanCollections(['albums']);
/**
 * Test getting all albums
 */
describe('Get all the albums', function () {


    before(ready(function (db, done) {
        var log = function (res) {}
        db.collection('albums').insert({
            _id: "123",
            title: "Album 1",
            description: "This is my albums",
            coverimage: "test.png"
        }, log);
        db.collection('albums').insert({
            _id: "456",
            title: "Album 2",
            description: "This is my second album",
            coverimage: "test2.png"
        }, log);
        db.collection('albums').insert({
            _id: "789",
            title: "Album 3",
            description: "This is my third album",
            coverimage: "test3.png"
        }, log);
        done();
    }));

    after(clean(function (db, done) {
        db.collection('albums').find().count(function (err, count) {
            expect(count).to.equal(0);
            done();
        });
    }));

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
                expect(res.body).to.have.length(3);
                done();
            });
    });



});

/**
 * Test getting ONE album
 */
describe('Get one album', function () {

    before(ready(function (db, done) {
        var log = function (err,res) {
            // console.log("err:" + err);
            // console.log("res:" + JSON.stringify(res));
        };
        db.collection('albums').insert({
            _id: "56a8cc1d06be5c02237ca6c4",
            title: "Album 1",
            description: "This is my albums",
            coverimage: "test.png"
        }, log);
        db.collection('albums').insert({
            _id: "56a8cc1d06be5c02237ca6c5",
            title: "Album 2",
            description: "This is my second album",
            coverimage: "test2.png"
        }, log);
        db.collection('albums').insert({
            _id: "56a8cc1d06be5c02237ca6c6",
            title: "Album 3",
            description: "This is my third album",
            coverimage: "test3.png"
        }, log);
        done();
    }));

    after(clean(function (db, done) {
        db.collection('albums').find().count(function (err, count) {
            expect(count).to.equal(0);
            done();
        });
    }));

    it('Returns status OK', function (done) {
        request(app)
            .get('/albums/56a8cc1d06be5c02237ca6c4')
            .expect(200)
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });

    it('Returns JSON data', function (done) {
        request(app)
            .get('/albums/56a8cc1d06be5c02237ca6c4')
            .expect('Content-Type', /json/)
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });

    it('Returns an album with title, description, and cover image url', function (done) {
        request(app)
            .get('/albums/56a8cc1d06be5c02237ca6c5')
            .expect(200, {
                _id: '56a8cc1d06be5c02237ca6c5',
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
