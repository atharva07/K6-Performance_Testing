import http from 'k6/http';
import { check, sleep } from 'k6';
//import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

export const options = {
    vus : 10,
    duration : '10s',
    thresholds : {
        http_req_duration: ['p(90)<300'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate < 0.01'],
        http_reqs: ['count > 30'],
        http_reqs: ['rate > 4'],
        vus: ['value > 9'],
        checks: ['rate>=0.95'],
        response_time_news_page: ['p(95) <= 400']
    }
}

let myCounter = new Counter('my_counter');
let newPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    //let res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    let res = http.get('https://test.k6.io/');
    //console.log(exec.scenario.iterationInTest);
    // 
    myCounter.add(1);
    check(res, {
        'status is 200' : (r) => r.status === 200,
        'page is startpage' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
    });
    //sleep(1);

    res = http.get('https://test.k6.io/news.php');
    newPageResponseTrend.add(res.timings.duration);
    sleep(1);
}