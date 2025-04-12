import { check } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

// Создаем тренд для отслеживания времени отклика
let responseTimes = new Trend('response_times');

export let options = {
   cloud: {
        projectID: 3760392,
        name: 'Best Company perf checks'
      },
  stages: [
    { duration: '30s', target: 10 }, // Поднимаем нагрузку до 10 пользователей за 30 секунд
    { duration: '1m', target: 10 },  // Удерживаем нагрузку на 10 пользователей в течение 1 минуты
    { duration: '30s', target: 0 },  // Спад нагрузки до 0 пользователей за 30 секунд
  ],
  thresholds: {
    http_req_duration: ['p(95)<150'], // 95% запросов должны быть ниже 150ms
    http_req_failed: ['rate<0.01'],   // Менее 1% запросов должны завершаться с ошибкой
  },
};

export default function () {
  let urls = [
    "https://ventionteams.com/company",
    "https://ventionteams.com/media-kit",
    "https://ventionteams.com/solutions/ai",
    "https://ventionteams.com/solutions/big-data",
    "https://ventionteams.com/solutions/adtech",
    "https://ventionteams.com/company/contacts",
    "https://ventionteams.com/company/testimonials",
    "https://ventionteams.com/company/locations",
    "https://ventionteams.com/privacy-policy",
    "https://ventionteams.com/company/how-we-work",
    "https://ventionteams.com/company/corporate-social-responsibilty",
    "https://ventionteams.com/our-partnerships",
    "https://ventionteams.com/our-work",
  ];

  urls.forEach(url => {
    let res = http.get(url);
    responseTimes.add(res.timings.duration);  // Добавляем время отклика в тренд

    // Проверка на успешность запроса
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
}
