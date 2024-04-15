import * as request from 'supertest';

const baseURL = process.env.API_URL;

describe('Test the costumer controller (e2e)', () => {
  const apiRequest = request(baseURL);

  it('should the response be equal 201', async () => {
    const response = await apiRequest
      .post('/customer')
      .field({
        costumerName: 'Agner Functional Test',
        costumerEmail: 'agner.functional.test@test.com',
        status: 'active',
      })
      .attach('costumerImage', './test/image/cachorrinhos-filhotes.jpg');
    expect(response.status).toBe(201);
  });

  it('should the response be equal 200', async () => {
    const response = await apiRequest.get('/customer');
    expect(response.status).toBe(200);
  });

  it('should the response be equal 200 and equal specifics object propertys', async () => {
    const response = await apiRequest.get('/customer/2');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 2,
      costumerName: 'Agner Souza',
      costumerEmail: 'agner2@teste.com',
      costumerImage: 'site-05fa0544-e157-4e91-b406-d52b6beecf43.jpg',
      status: 'active',
    });
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('deletedAt');
  });

  it('should the response be equal 404 and recive the message costumer not found', async () => {
    const response = await apiRequest.get('/customer/999999999999999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Costumer with id 999999999999999 not found',
    });
  });

  it('should the response be equal 200 and equal specifics property', async () => {
    const response = await apiRequest.get('/customer/costumer-image-buffer/2');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ type: 'Buffer' });
    expect(response.body).toHaveProperty('data');
  });

  it('should the response be equal 404 and recive the message costumer not found', async () => {
    const response = await apiRequest.get(
      '/customer/costumer-image-buffer/999999999999999',
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Costumer image with id 999999999999999 not found',
    });
  });

  it('should the response be equal 200', async () => {
    const response = await apiRequest.get('/customer/all-customers');
    expect(response.status).toBe(200);
  });
});
