import http from 'k6/http';
import { check, sleep } from 'k6';

var url = 'https://jsonplaceholder.typicode.com';

export const options = {
  cloud: {
    projectID: 3760392,
    name: 'Fake Store API Performance Test'
  },
  stages: [
    { duration: '10s', target: 2 }, // Ramp up to 20 users
    { duration: '20s', target: 5 },  // Stay at 20 users for 1 minute
    { duration: '5s', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<150'], // 95% of requests should be below 150ms
    http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
  },
};

export default function () {
  // Test GET /photos endpoint
  const photosResponse = http.get(`${url}/photos`);
  check(photosResponse, {
    'photos status is 200': (r) => r.status === 200,
    'products response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Test GET /posts/{id} endpoint
  const postId = Math.floor(Math.random() * 20) + 1; // Random post ID between 1-20
  const productResponse = http.get(`${url}/posts/${postId}`);
  check(productResponse, {
    'product status is 200': (r) => r.status === 200,
    'product response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Wait 1 second between iterations
} 