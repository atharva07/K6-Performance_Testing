import http from 'k6/http'

export default function() {

    const body  = JSON.stringify({
        username : "Test501",
        password : "Test232"
    });

    const params = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    let res = http.post("https://test-api.k6.io/auth/token/login/", body, params);

    const accessToken  = res.json().access;
    console.log(accessToken);
}