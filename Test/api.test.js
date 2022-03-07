const { response } = require('express');
const request = require('supertest');
const server = require('../server');

describe('API server', () => {
    let api;
    let testNote = {
        title: 'Hi',
        note: "Hi",
    };

    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to get /data with status 200', (done) => {
        request(api).get('/data').expect(200, done);
    });
    it('responds to get /new with status 200', (done) => {
        request(api).get('/new').expect(200, done);
    });

    it('responds to post /new with redirection status 302', (done) => {
        request(api).post('/new').send(testNote).expect(302,done)
            
    });

    it('retrieves a note by id', (done) => {
        request(api)
            .get('/data/3')
            .expect(200)
            .expect({ id: 3, title: 'Hello2', note: 'hello', color: 'white' }, done);
    });

    it('responds to non existing paths with 404', (done) => {
        request(api).get('/cats/42').expect(404).expect({}, done);
    });


    

    it('responds to invalid method request with 404', (done) => {
        request(api).post('/').expect(404, done);
    });
});
