const app = require('../app');
const request = require('supertest');

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "prueba.test@gmail.com",
        password: "321123",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /hotels debe traer los hoteles', async () => {
    const res = await request(app).get('/hotels');
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

test('POST /hotels debe crear los hoteles', async () => {
    const hotelBody = {
        name: "test name",
        description:"test description",
        price:"250000",
        address:"test address",
        lat:"1.2222",
        lon:"1.3333",
    }
    const res = await request(app)
    .post('/hotels')
    .send (hotelBody)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(hotelBody.name)
    expect(res.body.id).toBeDefined();

});

test('PUT /hotels/:id debe atualizar un hotel', async() => {
    const hotelBody = {
        name: "test name update"
    }
     const res = await request(app)
     .put(`/hotels/${id}`)
     .send(hotelBody)
     .set('Authorization', `Bearer ${token}`);
     expect(res.status).toBe(200);
     expect(res.body.name).toBe(hotelBody.name)
});

test('DELETE /hotels/:id debe eliminar un hotel', async () => {
    const res = await request(app)
    .delete(`/hotels/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
