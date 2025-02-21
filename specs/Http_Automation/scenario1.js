import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://test.k6.io.');
    //console.log(res.status);
    //console.log(res.body);
    check(res, {
        'status is 200' : (r) => r.status === 200,
        'page is startpage' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
    });

    // Assertion
    // check(res, {
    //     'page is startpage' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
    // });
}