import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95) < 500'],
        'group_duration{group:::Main page}': ['p(95) < 500'],
        'group_duration{group:::Main page::Assets}': ['p(95) < 500'],
    }
}

export default function () {

    group('Main page', function() {
        let res = http.get('https://test.k6.io/');
        check(res, {
            'status is 200': (r) => r.status === 200
        });

        group('Assets', function () {
            let res1 = http.get('https://test.k6.io/static/css/site.css');
            let res2 = http.get('https://test.k6.io/static/js/prisms.js');

            check(res1, { 'css loaded successfully': (r) => r.status === 200 });
            check(res2, { 'JS loaded successfully': (r) => r.status === 200 });
        });
    });

    group('News page', function() {
        http.get('https://test.k6.io/news.php');
    });

    sleep(1);
}