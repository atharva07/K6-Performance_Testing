import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{page:order}': ['p(95)<250'],
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99'],
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/8aa69d4b-5b07-4f58-a0cd-6d18abf585ec');

    if (res.error) {
        httpErrors.add(1);  
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Submit order
    res = http.get(
        'https://run.mocky.io/v3/faf57a57-51f9-4933-a1e5-30a2e6b87310?mocky-delay=2000ms',
        {
            tags: {
                page: 'order'
            }
        }
    );

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    check(res, 
        { 
            'status is 201': (r) => r.status === 201 
        }, 
        { 
            page: 'order' 
        }
    );

    sleep(1);
}