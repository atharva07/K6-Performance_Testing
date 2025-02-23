import http from 'k6/http';

export const options = {
    thresholds : {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/8aa69d4b-5b07-4f58-a0cd-6d18abf585ec');
    http.get('https://run.mocky.io/v3/faf57a57-51f9-4933-a1e5-30a2e6b87310?mocky-delay=2000ms');
}