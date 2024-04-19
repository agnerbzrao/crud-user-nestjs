import * as request from 'supertest';

const baseURL = process.env.API_URL;

describe('Test the customer controller (e2e)', () => {
  const apiRequest = request(baseURL);
  let idUserCreated = null;

  it('should create a new customer without image and data body and the response must be equal 400', async () => {
    const response = await apiRequest.post('/customer');
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'customerImage field is required',
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('should create a new customer with image but without data body and the response must be equal 400', async () => {
    const response = await apiRequest
      .post('/customer')
      .attach('customerImage', './test/image/cachorrinhos-filhotes.jpg');

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: [
        'The field customerName is too long',
        'The e-mail must have @ and .com',
        'The field status is required',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('should create a new customer and the response must be equal 201', async () => {
    const response = await apiRequest
      .post('/customer')
      .field({
        customerName: 'Agner Functional Test',
        customerEmail: 'agner.functional.test@test.com',
        status: 'active',
      })
      .attach('customerImage', './test/image/cachorrinhos-filhotes.jpg');

    expect(response.status).toBe(201);
    idUserCreated = response?.body?.id;
  });

  it('should search a specific customer and the response be equal 200 and equal specifics object propertys', async () => {
    const response = await apiRequest.get(`/customer/${idUserCreated}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: idUserCreated,
      customerName: 'Agner Functional Test',
      customerEmail: 'agner.functional.test@test.com',
      status: 'active',
    });
    expect(response.body).toHaveProperty('customerImage');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('deletedAt');
  });

  it('should update a specific customer and the response be equal 404 and recive the message customer not found', async () => {
    const response = await apiRequest.put('/customer/999999999999999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Customer with id 999999999999999 not found',
    });
  });

  it('should update a specific customer and the response be equal 200', async () => {
    const response = await apiRequest.put(`/customer/${idUserCreated}`).field({
      customerName: 'Agner Functional Test Put',
      customerEmail: 'agner.functional.test.put@test.com',
    });
    expect(response.status).toBe(200);
  });

  it('should search a specific customer after update and the response be equal 200 and equal specifics object propertys', async () => {
    const response = await apiRequest.get(`/customer/${idUserCreated}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: idUserCreated,
      customerName: 'Agner Functional Test Put',
      customerEmail: 'agner.functional.test.put@test.com',
      status: 'active',
    });
    expect(response.body).toHaveProperty('customerImage');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('deletedAt');
  });

  it('should search all customer and the response be equal 200', async () => {
    const response = await apiRequest.get('/customer');
    expect(response.status).toBe(200);
  });

  it('should search all customers even them deleted and the response be equal 200', async () => {
    const response = await apiRequest.get('/customer/all-customers');
    expect(response.status).toBe(200);
  });

  it('should searh a specific customer and the response be equal 404 and recive the message customer not found', async () => {
    const response = await apiRequest.get('/customer/999999999999999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Customer with id 999999999999999 not found',
    });
  });

  it('should search a specific customer image and the response be equal 200 and equal specifics property', async () => {
    const response = await apiRequest.get(
      `/customer/customer-image-buffer/${idUserCreated}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ type: 'Buffer' });
    expect(response.body).toHaveProperty('data');
  });

  it('should search a specific customer image and the response be equal 404 and recive the message customer not found', async () => {
    const response = await apiRequest.get(
      '/customer/customer-image-buffer/999999999999999',
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Customer image with id 999999999999999 not found',
    });
  });

  it('should delete a specific customer and the response be equal 200', async () => {
    const response = await apiRequest.delete(`/customer/${idUserCreated}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Customer deleted successfully.',
    });
  });

  it('should delete a specific customer and the response be equal 404', async () => {
    const response = await apiRequest.delete(`/customer/999999999999999`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Customer with id 999999999999999 not found',
    });
  });
});
