const app = require('../app');
const request = require('supertest');

let id;
let token

beforeAll(async () => {
    const credentials = {
      email: "prueba.test@gmail.com",
      password: "321123"
    };
    const res = await request(app).post("/users/login").send(credentials);
    token = res.body.token;
  });

test('GET/bookings debe traer todos los bookings', async () => {
    const res = await request(app)
    .get('/bookings')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)

});

test("POST /booking deben crear un booking", async () => {
    const bookingBody = {
        checkIn:"2024-06-01",
        checkOut:"2024-06-01"
    };
    const res = await request(app)
      .post('/bookings')
      .send(bookingBody)
      .set("Authorization", `Bearer ${token}`);
      id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body. checkIn).toBe(bookingBody.checkIn);
    expect(res.body.checkOut).toBe(bookingBody.checkOut);
  });

  test("PUT /booking/:id debe actualizar", async () => {
    const bookingUpdate = {
      checkIn: "2024-06-05",
    };
    const res = await request(app)
      .put(`/bookings/${id}`)
      .send(bookingUpdate)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.checkIn).toBe(bookingUpdate. checkIn);
  });


test("DELETE /booking/:id debe eliminar un booking", async () => {
    const res = await request(app)
      .delete(`/bookings/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });