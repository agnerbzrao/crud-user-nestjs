import * as request from 'supertest';

const baseURL = process.env.API_URL;

describe('Test the auth controller (e2e)', () => {
  const apiRequest = request(baseURL);
  it('should create a new user and the response must be equal 400', async () => {
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
    expect(response.body.message).toEqual("The passwords didn't match");
  });

  it('should create a new user and the response must be equal 201', async () => {
    const response = await apiRequest
      .post('/auth/signup')
      .send({
        userName: 'Agner Functional Test',
        userEmail: 'agner.functional.test@test.com',
        userPassword: '123456',
        userConfirmPassword: '123456',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual({
      message: 'User has created successfully.',
    });
  });

  it('should get all users and the response must be equal 200', async () => {
    const response = await apiRequest.get('/auth/get-all-users');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('userName');
    expect(response.body[0]).toHaveProperty('userEmail');
    expect(response.body[0]).toHaveProperty('userPassword');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.body[0]).toHaveProperty('deletedAt');
  });
});
