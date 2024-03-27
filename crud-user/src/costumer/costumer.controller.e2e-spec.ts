import * as request from 'supertest';

const baseURL = 'http://localhost:4000';

describe('SuperheroController (e2e)', () => {
  const apiRequest = request(baseURL);

  it('should have the response', async () => {
    const response = await apiRequest.get('/customer');

    expect(response.status).toBe(200);
  });
});
