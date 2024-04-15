import * as request from 'supertest';

const baseURL = process.env.API_URL;

describe('SuperheroController (e2e)', () => {
  const apiRequest = request(baseURL);

  it('should have the response', async () => {
    const response = await apiRequest.get('/customer');

    expect(response.status).toBe(200);
  });
});
