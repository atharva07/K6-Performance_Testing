import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus : 10,
    duration : '10s',
    thresholds : {
        'http_req_duration': ['p(90)<300'],
        'http_req_duration': ['max<2000'],
        'http_req_failed': ['rate < 0.01'],
        'http_reqs': ['count > 30'],
        'http_reqs': ['rate > 4'],
        'vus': ['value > 9']
    }
}

export default function () {
    const res = http.get('https://test.k6.io/');
   
    check(res, {
        'status is 200' : (r) => r.status === 200,
        'page is startpage' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
    });
}