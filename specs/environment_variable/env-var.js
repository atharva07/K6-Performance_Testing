import http from 'k6/http';

export default function() {
    // console.log(__ENV.BASE_URL);
    // http.get("https://test-api.k6.io/public/crocodiles/");
    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}