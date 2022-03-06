const supertest = require('supertest');
const app = require("../server");
const request= supertest(app)

describe('api test', () => {
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
    })
});
