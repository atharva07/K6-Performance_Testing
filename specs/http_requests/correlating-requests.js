import http from 'k6/http'
import { check } from 'k6';

export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    //console.log(res);
    const crocodiles = res.json();
    console.log(crocodiles[0]);
    console.log(crocodiles[0].id);
    const crocodileName = crocodiles[0].name;

    const crocodileId = crocodiles[0].id;
    res = http.get('https://test-api.k6.io/public/crocodiles/'+ crocodileId +'/');

    // we can alsp use String interpolation
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile is Bert': (r) => r.body.includes('Bert'),
        'Crocodile is Bert': (r) => r.json().name === crocodileName
    })
}