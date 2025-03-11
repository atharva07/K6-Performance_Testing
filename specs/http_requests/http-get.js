import http from 'k6/http'
import { check } from 'k6';

export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    //console.log(res);

    res = http.get('https://test-api.k6.io/public/crocodiles/1/');

    console.log(res.headers);
    console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile is Bert': (r) => r.body.includes('Bert'),
        'Crocodile is Bert': (r) => r.json().name === 'Bert'
    })
}