import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options= {
    scenarios: {
        addBook: {
            executor: 'per-vu-iterations',
            vus: 10,
            iterations: 100,
            maxDuration: '40s',
        }
    }
}

export default function() {
    const url = 'http://216.10.245.166/Library/Addbook.php';
    const payload = JSON.stringify({
        name : 'Learn k6 Automation with Javascript',
        isbn: 'abc1354',
        aisle: '3302345',
        author: 'John wick luka',
    });

    const params = {
        headers : {
            'Content-Type' : 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}