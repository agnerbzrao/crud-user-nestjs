import * as request from 'supertest';

const baseURL = process.env.API_URL;

describe('Test the auth controller (e2e)', () => {
  const apiRequest = request(baseURL);
  it('should create a new user and the response must be equal 201', async () => {
    const response = await apiRequest
      .post('/auth/signup')
      .send({
        userName: 'Agner Functional Test',
        userEmail: 'agner.functional.test@test.com',
        userPassword: '123456',
        userConfirmPassword: '1234561',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual({
      message: "The passwords didn't match",
    });
  });
});
