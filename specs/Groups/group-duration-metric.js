import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95) < 6000'],
        'http_req_duration{expected_response:true}': ['p(95) < 6000'],
        'group_duration{group:::Main page}': ['p(95) < 9000'],
        'group_duration{group:::News page}': ['p(95) < 6000'],
        'group_duration{group:::Main page::Assets}': ['p(95) < 3000'],
    }
}

export default function () {

    group('Main page', function() {
        let res = http.get('https://run.mocky.io/v3/6715315e-ecb4-408f-a913-115727c98218?mocky-delay=5000ms');
        check(res, {
            'status is 200': (r) => r.status === 200
        });

        group('Assets', function () {
            let res1 = http.get('https://run.mocky.io/v3/6715315e-ecb4-408f-a913-115727c98218?mocky-delay=1000ms');
            let res2 = http.get('https://run.mocky.io/v3/6715315e-ecb4-408f-a913-115727c98218?mocky-delay=1000ms');

            check(res1, { 'css loaded successfully': (r) => r.status === 200 });
            check(res2, { 'JS loaded successfully': (r) => r.status === 200 });
        });
    });

    group('News page', function() {
        http.get('https://run.mocky.io/v3/9d0de2a7-7198-40f7-b179-150127e6457f');
    });

    sleep(1);
}