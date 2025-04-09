import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  cloud: {
    projectID: 3760392,
    name: 'Fake Store API Performance Test'
  },
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
  },
};

export default function () {
  // Test GET /products endpoint
  const productsResponse = http.get('https://fakestoreapi.com/products');
  check(productsResponse, {
    'products status is 200': (r) => r.status === 200,
    'products response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Test GET /products/{id} endpoint
  const productId = Math.floor(Math.random() * 20) + 1; // Random product ID between 1-20
  const productResponse = http.get(`https://fakestoreapi.com/products/${productId}`);
  check(productResponse, {
    'product status is 200': (r) => r.status === 200,
    'product response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Wait 1 second between iterations
} 