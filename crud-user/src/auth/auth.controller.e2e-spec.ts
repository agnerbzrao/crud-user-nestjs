import * as request from 'supertest';

const baseURL = process.env.API_URL;

describe('Test the auth controller (e2e)', () => {
  const apiRequest = request(baseURL);
  it('should create a new user and the response must be equal 201', async () => {
    const response = await apiRequest.post('/auth/signup').field({
      userName: 'Agner Functional Test',
      userEmail: 'agner.functional.test@test.com',
      userPassword: '123456',
      userConfirmPassword: '1234561',
    });
    expect(response.status).toBe(201);
    console.log(response.body);
  });
});
