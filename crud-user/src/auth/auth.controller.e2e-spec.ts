import * as request from 'supertest';

const baseURL = process.env.API_URL;

describe('Test the auth controller (e2e)', () => {
  let accessToken = null;
  let idUserToDelete = null;
  const apiRequest = request(baseURL);

  it('should not create a new user and the response must be equal 400', async () => {
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
    expect(response.body.message).toEqual('User has created successfully.');
    idUserToDelete = response.body.userData.id;
  });

  it('should do a login with user and password and the response must be equal 200', async () => {
    const response = await apiRequest
      .post('/auth/login')
      .send({
        userEmail: 'agner.functional.test@test.com',
        userPassword: '123456',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    accessToken = response?.body?.access_token;
  });

  it('should get all users wtih access token and the response must be equal 200', async () => {
    const response = await apiRequest
      .get('/auth/get-all-users')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('userName');
    expect(response.body[0]).toHaveProperty('userEmail');
    expect(response.body[0]).toHaveProperty('userPassword');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.body[0]).toHaveProperty('deletedAt');
  });

  it('should delete a user wtih access token and the response must be equal 200', async () => {
    const response = await apiRequest
      .delete(`/auth/${idUserToDelete}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
  });
});
