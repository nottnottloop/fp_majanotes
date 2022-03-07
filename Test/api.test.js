const supertest = require('supertest');
const app = require("../server");
const request= supertest(app)

describe('api test', () => {
<<<<<<< HEAD
    it('gets the cinemas endpoint', async ()=> {
        const res = await request.get("/cinemas");
        expect(res.statusCode).toBe(200)
    });
    it('cant post to cinemas endpoint', async ()=>{
        const res=await request.post("/cinemas")
        expect(res.statusCode).toBe(404)
    })
    it('Create new park', async ()=>{
        const res=await request.post("/parks/create")
        expect(res.statusCode).toBe(400)
=======
    it('gets the new notes page', async ()=> {
        const res = await request.get("/new");
        expect(res.statusCode).toBe(200)
    });
    it('can post to new notes', async ()=>{
        const res=await request.post("/new")
        expect(res.statusCode).toBe(200)
    })
    it('Gets homepage', async ()=>{
        const res=await request.get("/")
        expect(res.statusCode).toBe(200)
>>>>>>> b624919b9f7bc4b369e368393f9ef01a4331c724
    })
});
